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

export class WorldMap {
    constructor(canvasId, options = {}) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');

        // Map dimensions and projection
        this.width = options.width || 900;
        this.height = options.height || 450;

        this.canvas.width = this.width;
        this.canvas.height = this.height;

        // State
        this.currentTime = new Date();
        this.playerLocation = PRESET_LOCATIONS.vienna || PRESET_LOCATIONS.berlin;
        this.targetLocation = null;
        this.signalPath = null;
        this.isAnimating = false;

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
            equator: 'rgba(255, 200, 100, 0.25)'
        };

        // TopoJSON data for land
        this.landPolygons = null;

        // Setup event listeners
        this.setupEventListeners();

        // Initial render (with basic background while TopoJSON loads)
        this.render();

        // Load world map TopoJSON data
        this.loadTopoJSON();
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
     * Setup mouse/touch event listeners
     */
    setupEventListeners() {
        this.canvas.addEventListener('click', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Convert to lat/lon
            const { lat, lon } = this.pixelToLatLon(x, y);

            // Find nearest preset location
            const nearest = this.findNearestLocation(lat, lon);

            if (nearest) {
                this.onLocationClick(nearest);
            }
        });

        // Hover effect
        this.canvas.addEventListener('mousemove', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const { lat, lon } = this.pixelToLatLon(x, y);
            const nearest = this.findNearestLocation(lat, lon, 30);

            this.canvas.style.cursor = nearest ? 'pointer' : 'default';
        });
    }

    /**
     * Convert pixel coordinates to lat/lon (Equirectangular projection)
     */
    pixelToLatLon(x, y) {
        const lon = (x / this.width) * 360 - 180;
        const lat = 90 - (y / this.height) * 180;
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

        // Clear canvas
        ctx.clearRect(0, 0, this.width, this.height);

        // Draw base map
        this.drawBaseMap();

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
     */
    drawSignalPath() {
        if (!this.signalPath || !this.signalPath.points) return;

        const ctx = this.ctx;
        const points = this.signalPath.points;

        // Determine color based on success
        const baseColor = this.signalPathSuccess
            ? this.colors.signalSuccess
            : this.colors.signalFail;

        // Draw path glow
        ctx.strokeStyle = this.signalPathSuccess
            ? 'rgba(74, 222, 128, 0.3)'
            : 'rgba(239, 68, 68, 0.3)';
        ctx.lineWidth = 8;
        ctx.lineCap = 'round';

        ctx.beginPath();
        let first = true;
        for (const point of points) {
            const pixel = this.latLonToPixel(point.latitude, point.longitude);
            if (first) {
                ctx.moveTo(pixel.x, pixel.y);
                first = false;
            } else {
                ctx.lineTo(pixel.x, pixel.y);
            }
        }
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
        first = true;
        for (const point of points) {
            const pixel = this.latLonToPixel(point.latitude, point.longitude);
            if (first) {
                ctx.moveTo(pixel.x, pixel.y);
                first = false;
            } else {
                ctx.lineTo(pixel.x, pixel.y);
            }
        }
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
