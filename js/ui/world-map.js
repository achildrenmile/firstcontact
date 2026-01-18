/**
 * World Map Renderer
 *
 * Renders the interactive world map with:
 * - Day/night overlay
 * - Grey line visualization
 * - Signal path animations
 * - Clickable locations
 *
 * Uses HTML Canvas for smooth rendering and animation.
 */

import { PRESET_LOCATIONS, generatePathPoints } from '../models/location.js';
import {
    calculateSunPosition,
    generateTerminatorLine,
    getLightingCondition
} from '../systems/sun-position.js';
import { t } from '../i18n/i18n.js';
import { icon } from './icons.js';

export class WorldMap {
    constructor(canvasId, options = {}) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');

        // Map dimensions and projection (base size, will be scaled)
        this.baseWidth = options.width || 900;
        this.baseHeight = options.height || 450;
        this.width = this.baseWidth;
        this.height = this.baseHeight;

        // Initial sizing
        this.updateCanvasSize();

        // State
        this.currentTime = new Date();
        this.playerLocation = PRESET_LOCATIONS.vienna || PRESET_LOCATIONS.berlin;
        this.targetLocation = null;
        this.signalPath = null;
        this.isAnimating = false;
        this.showMaidenheadGrid = false;

        // Zoom and pan state
        this.zoom = 1;
        this.minZoom = 1;
        this.maxZoom = 4;
        this.panX = 0;
        this.panY = 0;
        this.isPanning = false;
        this.lastPanPoint = null;

        // Event callbacks
        this.onLocationClick = options.onLocationClick || (() => {});

        // Colors
        this.colors = {
            land: '#2d5a27',
            water: '#1a3a5c',
            dayOverlay: 'rgba(255, 220, 150, 0.12)',
            nightOverlay: 'rgba(0, 5, 25, 0.55)',
            greyLine: 'rgba(255, 180, 100, 0.35)',
            playerMarker: '#00ff88',
            targetMarker: '#ff6b6b',
            locationDot: 'rgba(255, 255, 255, 0.9)',
            locationGlow: 'rgba(255, 255, 255, 0.3)',
            signalSuccess: '#4ade80',
            signalFail: '#ef4444',
            signalPath: '#fbbf24',
            gridLine: 'rgba(100, 150, 200, 0.15)',
            equator: 'rgba(255, 200, 100, 0.25)',
            maidenheadGrid: 'rgba(255, 100, 100, 0.4)',
            maidenheadLabel: 'rgba(255, 150, 150, 0.8)'
        };

        // TopoJSON data for land
        this.landPolygons = null;

        // Pinch zoom state
        this.lastPinchDistance = null;

        // Setup event listeners
        this.setupEventListeners();

        // Create zoom controls
        this.createZoomControls();

        // Initial render (with basic background while TopoJSON loads)
        this.render();

        // Load world map TopoJSON data
        this.loadTopoJSON();

        // Setup resize handler
        this.setupResizeHandler();
    }

    /**
     * Update canvas size based on container size
     */
    updateCanvasSize() {
        const container = this.canvas.parentElement;
        if (!container) {
            this.canvas.width = this.baseWidth;
            this.canvas.height = this.baseHeight;
            return;
        }

        // Get available space in container
        const availableWidth = container.clientWidth;
        const availableHeight = container.clientHeight;

        // Use the largest size that fits while maintaining 2:1 aspect ratio
        const aspectRatio = 2;
        let width = availableWidth;
        let height = width / aspectRatio;

        // If height exceeds available, scale down
        if (height > availableHeight) {
            height = availableHeight;
            width = height * aspectRatio;
        }

        this.width = Math.max(300, width);
        this.height = this.width / aspectRatio;

        // Set canvas dimensions
        this.canvas.width = this.width;
        this.canvas.height = this.height;

        // For high-DPI displays
        const dpr = window.devicePixelRatio || 1;
        if (dpr > 1) {
            this.canvas.width = this.width * dpr;
            this.canvas.height = this.height * dpr;
            this.canvas.style.width = this.width + 'px';
            this.canvas.style.height = this.height + 'px';
            this.ctx.scale(dpr, dpr);
        }
    }

    /**
     * Setup window resize handler
     */
    setupResizeHandler() {
        let resizeTimeout;
        window.addEventListener('resize', () => {
            // Debounce resize events
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                this.updateCanvasSize();
                this.render();
            }, 100);
        });

        // Also handle orientation change on mobile
        window.addEventListener('orientationchange', () => {
            setTimeout(() => {
                this.updateCanvasSize();
                this.render();
            }, 200);
        });
    }

    /**
     * Create zoom control buttons and map overlays toggle
     */
    createZoomControls() {
        const container = this.canvas.parentElement;
        if (!container) return;

        // Create zoom controls container
        const controls = document.createElement('div');
        controls.className = 'map-zoom-controls';
        controls.innerHTML = `
            <button class="zoom-btn zoom-in" title="Zoom in">+</button>
            <button class="zoom-btn zoom-out" title="Zoom out">−</button>
            <button class="zoom-btn zoom-reset" title="Reset">⟲</button>
        `;

        container.appendChild(controls);

        // Create overlay toggles container
        const overlayControls = document.createElement('div');
        overlayControls.className = 'map-overlay-controls';
        overlayControls.innerHTML = `
            <label class="overlay-toggle" title="Maidenhead Grid Locator">
                <input type="checkbox" id="maidenhead-toggle">
                <span class="toggle-icon">${icon('grid', '', 16)}</span>
                <span class="toggle-label">Grid</span>
            </label>
        `;

        container.appendChild(overlayControls);

        // Event listeners
        controls.querySelector('.zoom-in').addEventListener('click', () => {
            this.setZoom(this.zoom * 1.3);
        });

        controls.querySelector('.zoom-out').addEventListener('click', () => {
            this.setZoom(this.zoom / 1.3);
        });

        controls.querySelector('.zoom-reset').addEventListener('click', () => {
            this.zoom = 1;
            this.panX = 0;
            this.panY = 0;
            this.render();
        });

        // Maidenhead grid toggle
        overlayControls.querySelector('#maidenhead-toggle').addEventListener('change', (e) => {
            this.setMaidenheadGrid(e.target.checked);
        });
    }

    /**
     * Set zoom level with constraints
     * Zooms towards the center of the visible area
     */
    setZoom(newZoom) {
        newZoom = Math.max(this.minZoom, Math.min(this.maxZoom, newZoom));
        if (newZoom !== this.zoom) {
            // Keep the center of the view fixed
            // panX/panY represent offset from center, so scale them proportionally
            const scaleChange = newZoom / this.zoom;
            this.panX *= scaleChange;
            this.panY *= scaleChange;
            this.zoom = newZoom;
            this.constrainPan();
            this.render();
        }
    }

    /**
     * Load and parse TopoJSON world map data
     */
    async loadTopoJSON() {
        try {
            const response = await fetch('world.json');
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }
            const topoData = await response.json();

            // Parse the TopoJSON and convert to polygons
            this.landPolygons = this.parseTopoJSON(topoData);
            console.log('World map loaded:', this.landPolygons.length, 'polygons');
            this.render();
        } catch (error) {
            console.warn('Could not load world.json:', error.message);
            console.warn('Map will display with basic background only.');
            // Render anyway with basic background (no land shapes)
            this.render();
        }
    }

    /**
     * Parse TopoJSON format and convert arcs to polygon coordinates
     */
    parseTopoJSON(topo) {
        const transform = topo.transform;
        const arcs = topo.arcs;

        // Decode all arcs (delta-encoded coordinates)
        const decodedArcs = arcs.map(arc => {
            const coords = [];
            let x = 0, y = 0;
            for (const point of arc) {
                x += point[0];
                y += point[1];
                // Apply transform: scale then translate
                const lon = x * transform.scale[0] + transform.translate[0];
                const lat = y * transform.scale[1] + transform.translate[1];
                coords.push([lon, lat]);
            }
            return coords;
        });

        // Extract land geometries
        const landGeometries = topo.objects.land.geometries;
        const polygons = [];

        for (const geom of landGeometries) {
            if (geom.type === 'Polygon') {
                const rings = geom.arcs.map(ring => this.decodeRing(ring, decodedArcs));
                polygons.push({ type: 'Polygon', rings });
            } else if (geom.type === 'MultiPolygon') {
                for (const polygon of geom.arcs) {
                    const rings = polygon.map(ring => this.decodeRing(ring, decodedArcs));
                    polygons.push({ type: 'Polygon', rings });
                }
            }
        }

        return polygons;
    }

    /**
     * Decode a ring of arc references into coordinates
     */
    decodeRing(arcRefs, decodedArcs) {
        const coords = [];
        for (const arcRef of arcRefs) {
            const arcIndex = arcRef < 0 ? ~arcRef : arcRef;
            const arc = decodedArcs[arcIndex];
            if (!arc) continue;

            // If negative, reverse the arc
            const arcCoords = arcRef < 0 ? [...arc].reverse() : arc;

            // Add coordinates (skip first if not first arc to avoid duplicates)
            for (let i = (coords.length === 0 ? 0 : 1); i < arcCoords.length; i++) {
                coords.push(arcCoords[i]);
            }
        }
        return coords;
    }

    /**
     * Draw land polygons from TopoJSON data
     */
    drawLandPolygons() {
        if (!this.landPolygons) return;

        const ctx = this.ctx;

        // Set up land style with gradient
        const landGradient = ctx.createLinearGradient(0, 0, 0, this.height);
        landGradient.addColorStop(0, '#4a8a4a');
        landGradient.addColorStop(0.5, '#3d7a3d');
        landGradient.addColorStop(1, '#2d6a2d');

        ctx.fillStyle = landGradient;
        ctx.strokeStyle = 'rgba(30, 60, 30, 0.5)';
        ctx.lineWidth = 0.5;

        for (const polygon of this.landPolygons) {
            for (const ring of polygon.rings) {
                if (ring.length < 3) continue;

                ctx.beginPath();
                let first = true;
                let prevX = null;

                for (const [lon, lat] of ring) {
                    const pixel = this.latLonToPixel(lat, lon);

                    // Handle antimeridian crossing (large jumps in x)
                    if (prevX !== null && Math.abs(pixel.x - prevX) > this.width / 2) {
                        // Close current path and start new one
                        ctx.closePath();
                        ctx.fill();
                        ctx.stroke();
                        ctx.beginPath();
                        first = true;
                    }

                    if (first) {
                        ctx.moveTo(pixel.x, pixel.y);
                        first = false;
                    } else {
                        ctx.lineTo(pixel.x, pixel.y);
                    }
                    prevX = pixel.x;
                }
                ctx.closePath();
                ctx.fill();
                ctx.stroke();
            }
        }
    }

    /**
     * Get canvas coordinates from event (handles scaling)
     */
    getCanvasCoords(e) {
        const rect = this.canvas.getBoundingClientRect();
        // Scale coordinates from display size to logical size
        const scaleX = this.width / rect.width;
        const scaleY = this.height / rect.height;
        const x = (e.clientX - rect.left) * scaleX;
        const y = (e.clientY - rect.top) * scaleY;
        return { x, y };
    }

    /**
     * Setup mouse/touch event listeners
     */
    setupEventListeners() {
        // Handle both click and touch events
        const handleInteraction = (e) => {
            // Prevent default to avoid double-firing on touch devices
            if (e.type === 'touchend') {
                e.preventDefault();
            }

            // Get coordinates from touch or click
            let clientX, clientY;
            if (e.changedTouches && e.changedTouches.length > 0) {
                clientX = e.changedTouches[0].clientX;
                clientY = e.changedTouches[0].clientY;
            } else {
                clientX = e.clientX;
                clientY = e.clientY;
            }

            const rect = this.canvas.getBoundingClientRect();
            const scaleX = this.width / rect.width;
            const scaleY = this.height / rect.height;
            const x = (clientX - rect.left) * scaleX;
            const y = (clientY - rect.top) * scaleY;

            // Convert to lat/lon
            const { lat, lon } = this.pixelToLatLon(x, y);

            // Find nearest preset location (larger touch target on mobile)
            const isMobile = e.type.startsWith('touch');
            const nearest = this.findNearestLocation(lat, lon, isMobile ? 60 : 50);

            if (nearest) {
                this.onLocationClick(nearest);
            }
        };

        this.canvas.addEventListener('click', handleInteraction);
        this.canvas.addEventListener('touchend', handleInteraction, { passive: false });

        // Hover effect (desktop only)
        this.canvas.addEventListener('mousemove', (e) => {
            const { x, y } = this.getCanvasCoords(e);
            const { lat, lon } = this.pixelToLatLon(x, y);
            const nearest = this.findNearestLocation(lat, lon, 30);

            this.canvas.style.cursor = nearest ? 'pointer' : 'default';
        });

        // Touch handling for pinch zoom and pan
        this.canvas.addEventListener('touchstart', (e) => {
            if (e.touches.length === 2) {
                // Pinch start
                e.preventDefault();
                this.lastPinchDistance = this.getPinchDistance(e.touches);
            } else if (e.touches.length === 1) {
                const touch = e.touches[0];
                const rect = this.canvas.getBoundingClientRect();
                const scaleX = this.width / rect.width;
                const scaleY = this.height / rect.height;
                const x = (touch.clientX - rect.left) * scaleX;
                const y = (touch.clientY - rect.top) * scaleY;
                const { lat, lon } = this.pixelToLatLon(x, y);
                const nearest = this.findNearestLocation(lat, lon, 60);

                if (nearest) {
                    e.preventDefault();
                } else if (this.zoom > 1) {
                    // Pan when zoomed
                    e.preventDefault();
                    this.isPanning = true;
                    this.lastPanPoint = { x: touch.clientX, y: touch.clientY };
                }
            }
        }, { passive: false });

        this.canvas.addEventListener('touchmove', (e) => {
            if (e.touches.length === 2 && this.lastPinchDistance !== null) {
                // Pinch zoom
                e.preventDefault();
                const newDistance = this.getPinchDistance(e.touches);
                const scale = newDistance / this.lastPinchDistance;
                this.setZoom(this.zoom * scale);
                this.lastPinchDistance = newDistance;
            } else if (e.touches.length === 1 && this.isPanning) {
                // Pan
                e.preventDefault();
                const touch = e.touches[0];
                const screenDx = touch.clientX - this.lastPanPoint.x;
                const screenDy = touch.clientY - this.lastPanPoint.y;
                const { dx, dy } = this.screenToLogicalDelta(screenDx, screenDy);
                this.panX += dx;
                this.panY += dy;
                this.lastPanPoint = { x: touch.clientX, y: touch.clientY };
                this.constrainPan();
                this.render();
            }
        }, { passive: false });

        this.canvas.addEventListener('touchend', (e) => {
            this.lastPinchDistance = null;
            this.isPanning = false;
            this.lastPanPoint = null;
        });

        // Wheel zoom
        this.canvas.addEventListener('wheel', (e) => {
            e.preventDefault();
            const rect = this.canvas.getBoundingClientRect();
            // Convert screen mouse position to logical coordinates
            const mouseX = (e.clientX - rect.left) * (this.width / rect.width);
            const mouseY = (e.clientY - rect.top) * (this.height / rect.height);

            const zoomFactor = e.deltaY > 0 ? 0.9 : 1.1;
            const newZoom = Math.max(this.minZoom, Math.min(this.maxZoom, this.zoom * zoomFactor));

            if (newZoom !== this.zoom) {
                // Zoom towards mouse position (in logical coordinates)
                const scaleChange = newZoom / this.zoom;
                // Calculate the point on the map under the mouse
                const mapX = (mouseX - this.width / 2 - this.panX) / this.zoom + this.width / 2;
                const mapY = (mouseY - this.height / 2 - this.panY) / this.zoom + this.height / 2;
                // After zoom, this point should still be under the mouse
                this.panX = mouseX - this.width / 2 - (mapX - this.width / 2) * newZoom;
                this.panY = mouseY - this.height / 2 - (mapY - this.height / 2) * newZoom;
                this.zoom = newZoom;
                this.constrainPan();
                this.render();
            }
        }, { passive: false });

        // Pan with middle mouse or drag when zoomed
        this.canvas.addEventListener('mousedown', (e) => {
            if (this.zoom > 1 && (e.button === 0 || e.button === 1)) {
                const { x, y } = this.getCanvasCoords(e);
                const { lat, lon } = this.pixelToLatLon(x, y);
                const nearest = this.findNearestLocation(lat, lon, 30);

                if (!nearest) {
                    this.isPanning = true;
                    this.lastPanPoint = { x: e.clientX, y: e.clientY };
                    this.canvas.style.cursor = 'grabbing';
                    e.preventDefault();
                }
            }
        });

        window.addEventListener('mousemove', (e) => {
            if (this.isPanning && this.lastPanPoint) {
                const screenDx = e.clientX - this.lastPanPoint.x;
                const screenDy = e.clientY - this.lastPanPoint.y;
                const { dx, dy } = this.screenToLogicalDelta(screenDx, screenDy);
                this.panX += dx;
                this.panY += dy;
                this.lastPanPoint = { x: e.clientX, y: e.clientY };
                this.constrainPan();
                this.render();
            }
        });

        window.addEventListener('mouseup', () => {
            if (this.isPanning) {
                this.isPanning = false;
                this.lastPanPoint = null;
                this.canvas.style.cursor = 'default';
            }
        });

        // Double-click to reset zoom
        this.canvas.addEventListener('dblclick', (e) => {
            if (this.zoom !== 1) {
                this.zoom = 1;
                this.panX = 0;
                this.panY = 0;
                this.render();
            }
        });
    }

    /**
     * Constrain pan to keep map visible
     * Uses logical coordinates (this.width/height) not display coordinates
     */
    constrainPan() {
        // Calculate max pan in logical coordinates
        const maxPanX = (this.width * (this.zoom - 1)) / 2;
        const maxPanY = (this.height * (this.zoom - 1)) / 2;

        this.panX = Math.max(-maxPanX, Math.min(maxPanX, this.panX));
        this.panY = Math.max(-maxPanY, Math.min(maxPanY, this.panY));
    }

    /**
     * Convert screen delta to logical delta (accounts for display scaling)
     */
    screenToLogicalDelta(dx, dy) {
        const rect = this.canvas.getBoundingClientRect();
        return {
            dx: dx * (this.width / rect.width),
            dy: dy * (this.height / rect.height)
        };
    }

    /**
     * Get distance between two touch points
     */
    getPinchDistance(touches) {
        const dx = touches[0].clientX - touches[1].clientX;
        const dy = touches[0].clientY - touches[1].clientY;
        return Math.sqrt(dx * dx + dy * dy);
    }

    /**
     * Convert pixel coordinates to lat/lon (Equirectangular projection)
     * Accounts for zoom and pan
     */
    pixelToLatLon(x, y) {
        // Reverse the zoom/pan transformation
        const centerX = this.width / 2;
        const centerY = this.height / 2;

        // Undo pan and zoom
        const mapX = (x - this.panX - centerX) / this.zoom + centerX;
        const mapY = (y - this.panY - centerY) / this.zoom + centerY;

        const lon = (mapX / this.width) * 360 - 180;
        const lat = 90 - (mapY / this.height) * 180;
        return { lat, lon };
    }

    /**
     * Convert lat/lon to pixel coordinates
     */
    latLonToPixel(lat, lon) {
        const x = ((lon + 180) / 360) * this.width;
        const y = ((90 - lat) / 180) * this.height;
        return { x, y };
    }

    /**
     * Find the nearest preset location to a point
     */
    findNearestLocation(lat, lon, maxDistancePx = 50) {
        let nearest = null;
        let nearestDistance = Infinity;

        for (const location of Object.values(PRESET_LOCATIONS)) {
            const pixel = this.latLonToPixel(location.latitude, location.longitude);
            const clickPixel = this.latLonToPixel(lat, lon);

            const distance = Math.sqrt(
                Math.pow(pixel.x - clickPixel.x, 2) +
                Math.pow(pixel.y - clickPixel.y, 2)
            );

            if (distance < nearestDistance && distance < maxDistancePx) {
                nearestDistance = distance;
                nearest = location;
            }
        }

        return nearest;
    }

    /**
     * Set the current simulation time
     */
    setTime(dateTime) {
        this.currentTime = dateTime;
        this.render();
    }

    /**
     * Set the player's location
     */
    setPlayerLocation(location) {
        this.playerLocation = location;
        this.render();
    }

    /**
     * Set the target location for propagation attempt
     */
    setTargetLocation(location) {
        this.targetLocation = location;
        this.render();
    }

    /**
     * Show a signal path (from propagation result)
     */
    showSignalPath(path, success) {
        this.signalPath = path;
        this.signalPathSuccess = success;

        if (success) {
            this.animateSignalPath();
        } else {
            this.render();
        }
    }

    /**
     * Clear the signal path
     */
    clearSignalPath() {
        this.signalPath = null;
        this.isAnimating = false;
        this.render();
    }

    /**
     * Main render function
     */
    render() {
        const ctx = this.ctx;

        // Save context state
        ctx.save();

        // Clear canvas (before transform)
        ctx.clearRect(0, 0, this.width, this.height);

        // Apply zoom and pan transformation
        ctx.translate(this.panX, this.panY);
        ctx.translate(this.width / 2, this.height / 2);
        ctx.scale(this.zoom, this.zoom);
        ctx.translate(-this.width / 2, -this.height / 2);

        // Draw base map
        this.drawBaseMap();

        // Draw Maidenhead grid (before day/night so it's subtle)
        this.drawMaidenheadGrid();

        // Draw day/night overlay
        this.drawDayNightOverlay();

        // Draw grey line
        this.drawGreyLine();

        // Draw preset locations
        this.drawLocations();

        // Draw player location
        this.drawPlayerMarker();

        // Draw target location if set
        if (this.targetLocation) {
            this.drawTargetMarker();
        }

        // Draw signal path if set
        if (this.signalPath) {
            this.drawSignalPath();
        }

        // Draw sun position indicator
        this.drawSunIndicator();

        // Restore context state
        ctx.restore();
    }

    /**
     * Draw the base world map
     */
    drawBaseMap() {
        const ctx = this.ctx;

        // Draw ocean background
        ctx.fillStyle = '#1a3d5c';
        ctx.fillRect(0, 0, this.width, this.height);

        // Draw land polygons from TopoJSON data
        this.drawLandPolygons();

        // Draw subtle grid on top
        ctx.lineWidth = 0.5;
        ctx.strokeStyle = this.colors.gridLine;

        // Latitude lines
        for (let lat = -60; lat <= 60; lat += 30) {
            if (lat === 0) continue;
            const y = this.latLonToPixel(lat, 0).y;
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(this.width, y);
            ctx.stroke();
        }

        // Longitude lines
        for (let lon = -150; lon <= 180; lon += 30) {
            const x = this.latLonToPixel(0, lon).x;
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, this.height);
            ctx.stroke();
        }

        // Draw equator (highlighted)
        ctx.strokeStyle = this.colors.equator;
        ctx.lineWidth = 1;
        const equatorY = this.latLonToPixel(0, 0).y;
        ctx.beginPath();
        ctx.moveTo(0, equatorY);
        ctx.lineTo(this.width, equatorY);
        ctx.stroke();
    }

    /**
     * Draw day/night overlay based on current time
     */
    drawDayNightOverlay() {
        const ctx = this.ctx;
        const sunPos = calculateSunPosition(this.currentTime);

        // Create gradient for day/night
        // Sample every 5 degrees longitude for smooth shading
        for (let lon = -180; lon < 180; lon += 5) {
            for (let lat = -90; lat < 90; lat += 5) {
                const condition = getLightingCondition(lat, lon, this.currentTime);
                const pixel = this.latLonToPixel(lat + 2.5, lon + 2.5);

                let alpha;
                if (condition.condition === 'night') {
                    alpha = 0.5;
                } else if (condition.condition === 'day') {
                    alpha = 0;
                } else {
                    // Twilight
                    alpha = 0.25;
                }

                if (alpha > 0) {
                    ctx.fillStyle = `rgba(0, 0, 40, ${alpha})`;
                    const w = (5 / 360) * this.width;
                    const h = (5 / 180) * this.height;
                    ctx.fillRect(pixel.x - w / 2, pixel.y - h / 2, w, h);
                }
            }
        }
    }

    /**
     * Draw the grey line (terminator with twilight zone)
     */
    drawGreyLine() {
        const ctx = this.ctx;
        const terminatorPoints = generateTerminatorLine(this.currentTime, 72);

        // Draw twilight band (grey line)
        ctx.fillStyle = this.colors.greyLine;
        ctx.beginPath();

        let first = true;
        for (const point of terminatorPoints) {
            const pixel = this.latLonToPixel(point.latitude, point.longitude);
            if (first) {
                ctx.moveTo(pixel.x, pixel.y);
                first = false;
            } else {
                ctx.lineTo(pixel.x, pixel.y);
            }
        }

        ctx.closePath();
        ctx.fill();

        // Draw terminator line itself
        ctx.strokeStyle = 'rgba(255, 180, 100, 0.8)';
        ctx.lineWidth = 2;
        ctx.stroke();
    }

    /**
     * Draw preset location markers
     */
    drawLocations() {
        const ctx = this.ctx;

        for (const location of Object.values(PRESET_LOCATIONS)) {
            // Skip player and target locations (drawn separately)
            if (location === this.playerLocation || location === this.targetLocation) {
                continue;
            }

            const pixel = this.latLonToPixel(location.latitude, location.longitude);

            // Draw outer glow
            ctx.fillStyle = this.colors.locationGlow;
            ctx.beginPath();
            ctx.arc(pixel.x, pixel.y, 7, 0, Math.PI * 2);
            ctx.fill();

            // Draw dot with border
            ctx.fillStyle = this.colors.locationDot;
            ctx.beginPath();
            ctx.arc(pixel.x, pixel.y, 4, 0, Math.PI * 2);
            ctx.fill();

            // Draw subtle border
            ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)';
            ctx.lineWidth = 1;
            ctx.stroke();

            // Draw label with shadow for readability
            ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
            ctx.font = '10px sans-serif';
            ctx.fillText(location.code || location.name.split(',')[0], pixel.x + 7, pixel.y + 4);
            ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
            ctx.fillText(location.code || location.name.split(',')[0], pixel.x + 6, pixel.y + 3);
        }
    }

    /**
     * Draw player's location marker
     */
    drawPlayerMarker() {
        if (!this.playerLocation) return;

        const ctx = this.ctx;
        const pixel = this.latLonToPixel(
            this.playerLocation.latitude,
            this.playerLocation.longitude
        );

        // Pulsing effect
        const pulse = 1 + 0.2 * Math.sin(Date.now() / 500);

        // Outer glow
        ctx.fillStyle = 'rgba(0, 255, 136, 0.3)';
        ctx.beginPath();
        ctx.arc(pixel.x, pixel.y, 15 * pulse, 0, Math.PI * 2);
        ctx.fill();

        // Inner marker
        ctx.fillStyle = this.colors.playerMarker;
        ctx.beginPath();
        ctx.arc(pixel.x, pixel.y, 8, 0, Math.PI * 2);
        ctx.fill();

        // Center dot
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(pixel.x, pixel.y, 3, 0, Math.PI * 2);
        ctx.fill();

        // Label
        ctx.fillStyle = this.colors.playerMarker;
        ctx.font = 'bold 12px sans-serif';
        ctx.fillText(t('ui.you'), pixel.x + 12, pixel.y + 4);
    }

    /**
     * Draw target location marker
     */
    drawTargetMarker() {
        if (!this.targetLocation) return;

        const ctx = this.ctx;
        const pixel = this.latLonToPixel(
            this.targetLocation.latitude,
            this.targetLocation.longitude
        );

        // Target crosshair
        ctx.strokeStyle = this.colors.targetMarker;
        ctx.lineWidth = 2;

        const size = 12;
        ctx.beginPath();
        ctx.moveTo(pixel.x - size, pixel.y);
        ctx.lineTo(pixel.x + size, pixel.y);
        ctx.moveTo(pixel.x, pixel.y - size);
        ctx.lineTo(pixel.x, pixel.y + size);
        ctx.stroke();

        // Circle
        ctx.beginPath();
        ctx.arc(pixel.x, pixel.y, 8, 0, Math.PI * 2);
        ctx.stroke();

        // Label
        ctx.fillStyle = this.colors.targetMarker;
        ctx.font = 'bold 11px sans-serif';
        ctx.fillText(this.targetLocation.name.split(',')[0], pixel.x + 15, pixel.y + 4);
    }

    /**
     * Draw the signal path
     * Handles date line crossings for long path visualization
     */
    drawSignalPath() {
        if (!this.signalPath || !this.signalPath.points) return;

        const ctx = this.ctx;
        const points = this.signalPath.points;

        // Determine color based on success
        const baseColor = this.signalPathSuccess
            ? this.colors.signalSuccess
            : this.colors.signalFail;

        // Helper function to draw path segments, handling date line crossings
        // When path crosses ±180° longitude, draw to edge and continue from opposite edge
        const drawPathWithDateLineCrossing = () => {
            let prevPoint = null;

            for (const point of points) {
                if (prevPoint === null) {
                    const pixel = this.latLonToPixel(point.latitude, point.longitude);
                    ctx.moveTo(pixel.x, pixel.y);
                } else {
                    const lonDiff = point.longitude - prevPoint.longitude;

                    // Date line crossing: jump > 180° means we crossed the edge
                    if (Math.abs(lonDiff) > 180) {
                        // Interpolate where we cross the edge
                        const goingEast = lonDiff < 0; // e.g., 170 to -170 = going east
                        const edgeLon = goingEast ? 180 : -180;

                        // Normalize for interpolation
                        const prevLon = prevPoint.longitude;
                        const currLon = goingEast ? point.longitude + 360 : point.longitude - 360;

                        // Find fraction where we hit the edge
                        const t = (edgeLon - prevLon) / (currLon - prevLon);
                        const edgeLat = prevPoint.latitude + t * (point.latitude - prevPoint.latitude);

                        // Draw to edge
                        const edgePixel = this.latLonToPixel(edgeLat, edgeLon);
                        ctx.lineTo(edgePixel.x, edgePixel.y);

                        // Start new segment from opposite edge
                        ctx.stroke();
                        ctx.beginPath();
                        const oppositePixel = this.latLonToPixel(edgeLat, -edgeLon);
                        ctx.moveTo(oppositePixel.x, oppositePixel.y);

                        // Draw to current point
                        const pixel = this.latLonToPixel(point.latitude, point.longitude);
                        ctx.lineTo(pixel.x, pixel.y);
                    } else {
                        const pixel = this.latLonToPixel(point.latitude, point.longitude);
                        ctx.lineTo(pixel.x, pixel.y);
                    }
                }
                prevPoint = point;
            }
        };

        // Draw path glow
        ctx.strokeStyle = this.signalPathSuccess
            ? 'rgba(74, 222, 128, 0.3)'
            : 'rgba(239, 68, 68, 0.3)';
        ctx.lineWidth = 8;
        ctx.lineCap = 'round';

        ctx.beginPath();
        drawPathWithDateLineCrossing();
        ctx.stroke();

        // Draw main path line
        ctx.strokeStyle = baseColor;
        ctx.lineWidth = 3;

        // For successful paths, make it dashed to show "radio waves"
        if (this.signalPathSuccess) {
            ctx.setLineDash([8, 4]);
        } else {
            ctx.setLineDash([4, 8]); // Dotted for failed
        }

        ctx.beginPath();
        drawPathWithDateLineCrossing();
        ctx.stroke();

        ctx.setLineDash([]); // Reset dash

        // Draw hop reflection points for successful paths
        if (this.signalPathSuccess && this.signalPath.hops) {
            ctx.fillStyle = '#fbbf24';
            for (const hop of this.signalPath.hops) {
                // Draw at midpoint of each hop
                const midLat = (hop.startPoint.latitude + hop.endPoint.latitude) / 2;
                const midLon = (hop.startPoint.longitude + hop.endPoint.longitude) / 2;
                const pixel = this.latLonToPixel(midLat, midLon);

                ctx.beginPath();
                ctx.arc(pixel.x, pixel.y, 5, 0, Math.PI * 2);
                ctx.fill();
            }
        }
    }

    /**
     * Animate the signal path (pulsing effect for successful contacts)
     */
    animateSignalPath() {
        if (!this.signalPath || !this.signalPathSuccess) return;

        this.isAnimating = true;

        const animate = () => {
            if (!this.isAnimating) return;

            this.render();
            requestAnimationFrame(animate);
        };

        animate();

        // Stop animation after 3 seconds
        setTimeout(() => {
            this.isAnimating = false;
            this.render();
        }, 3000);
    }

    /**
     * Toggle Maidenhead grid display
     */
    setMaidenheadGrid(show) {
        this.showMaidenheadGrid = show;
        this.render();
    }

    /**
     * Draw Maidenhead grid locator overlay
     * Fields are 20° longitude x 10° latitude, labeled AA-RR
     */
    drawMaidenheadGrid() {
        if (!this.showMaidenheadGrid) return;

        const ctx = this.ctx;

        // Draw field boundaries (18 columns x 18 rows)
        ctx.strokeStyle = this.colors.maidenheadGrid;
        ctx.lineWidth = 1;

        // Vertical lines (longitude) - every 20°
        for (let i = 0; i <= 18; i++) {
            const lon = -180 + i * 20;
            const pixel = this.latLonToPixel(0, lon);
            ctx.beginPath();
            ctx.moveTo(pixel.x, 0);
            ctx.lineTo(pixel.x, this.height);
            ctx.stroke();
        }

        // Horizontal lines (latitude) - every 10°
        for (let i = 0; i <= 18; i++) {
            const lat = -90 + i * 10;
            const pixel = this.latLonToPixel(lat, 0);
            ctx.beginPath();
            ctx.moveTo(0, pixel.y);
            ctx.lineTo(this.width, pixel.y);
            ctx.stroke();
        }

        // Draw field labels (e.g., JN, FN, etc.)
        ctx.fillStyle = this.colors.maidenheadLabel;
        ctx.font = 'bold 11px monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        for (let lonIdx = 0; lonIdx < 18; lonIdx++) {
            for (let latIdx = 0; latIdx < 18; latIdx++) {
                const lon = -180 + lonIdx * 20 + 10; // Center of field
                const lat = -90 + latIdx * 10 + 5;   // Center of field

                // Maidenhead field letters: A-R for both lon and lat
                const lonChar = String.fromCharCode(65 + lonIdx); // A-R
                const latChar = String.fromCharCode(65 + latIdx); // A-R
                const label = lonChar + latChar;

                const pixel = this.latLonToPixel(lat, lon);
                ctx.fillText(label, pixel.x, pixel.y);
            }
        }

        ctx.textAlign = 'left';
        ctx.textBaseline = 'alphabetic';
    }

    /**
     * Draw sun position indicator
     */
    drawSunIndicator() {
        const ctx = this.ctx;
        const sunPos = calculateSunPosition(this.currentTime);
        const pixel = this.latLonToPixel(sunPos.latitude, sunPos.longitude);

        // Sun glow
        const gradient = ctx.createRadialGradient(
            pixel.x, pixel.y, 0,
            pixel.x, pixel.y, 30
        );
        gradient.addColorStop(0, 'rgba(255, 200, 50, 0.8)');
        gradient.addColorStop(1, 'rgba(255, 200, 50, 0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(pixel.x, pixel.y, 30, 0, Math.PI * 2);
        ctx.fill();

        // Sun circle
        ctx.fillStyle = '#ffdd00';
        ctx.beginPath();
        ctx.arc(pixel.x, pixel.y, 8, 0, Math.PI * 2);
        ctx.fill();

        // Label
        ctx.fillStyle = '#ffdd00';
        ctx.font = '10px sans-serif';
        ctx.fillText('☀', pixel.x - 5, pixel.y + 20);
    }
}
