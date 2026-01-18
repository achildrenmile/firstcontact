/**
 * First Contact - Main Application
 *
 * Ties together all the modules and manages the game state.
 */

import { Location, PRESET_LOCATIONS, calculateDistance } from './models/location.js';
import { HF_BANDS } from './models/bands.js';
import { evaluatePropagation, getSolarConditions } from './systems/propagation-engine.js';
import { generateExplanation, explainBandChange, detectDiscovery } from './systems/explanation-engine.js';
import { getLightingCondition } from './systems/sun-position.js';
import { WorldMap } from './ui/world-map.js';
import { ControlsPanel } from './ui/controls-panel.js';
import { FeedbackPanel } from './ui/feedback-panel.js';
import { initI18n, t, formatDistance, getCurrentLanguage } from './i18n/i18n.js';
import { Tutorial, showTutorialPrompt } from './ui/tutorial.js';

class FirstContactApp {
    constructor() {
        // Debug: Check if vienna exists
        console.log('PRESET_LOCATIONS.vienna:', PRESET_LOCATIONS.vienna);

        // Game state
        this.state = {
            playerLocation: PRESET_LOCATIONS.vienna || PRESET_LOCATIONS.berlin,
            targetLocation: null,
            selectedBand: '20m',
            currentTime: new Date(),
            lastResult: null,
            lastBandResult: {},  // Results by band for comparison

            // Learning tracking
            contactAttempts: 0,
            successfulContacts: 0,
            bandsTriedSet: new Set(),
            discoveries: {
                dLayerAbsorption: false,
                greyLine: false,
                frequencyDistance: false
            },
            dayFailedNightSucceeded: false,
            higherBandFartherSuccess: false
        };

        // Initialize UI components
        this.initializeUI();

        // Set initial time to current
        this.setTime(new Date());

        // Update header with translations
        this.updateHeader();

        // Listen for language changes
        window.addEventListener('languagechange', () => {
            this.updateHeader();
            this.updateConditionsDisplay();
        });

        // Initialize tutorial system
        this.tutorial = new Tutorial(this);

        // Check if this is first launch
        this.checkFirstLaunch();

        console.log('First Contact initialized');
    }

    /**
     * Check if this is the first launch and show tutorial prompt
     */
    checkFirstLaunch() {
        if (!this.tutorial.hasCompletedTutorial()) {
            // Small delay to let the UI settle
            setTimeout(() => {
                showTutorialPrompt(
                    () => this.tutorial.start(),
                    () => this.tutorial.markCompleted()
                );
            }, 500);
        }
    }

    /**
     * Start tutorial manually (for replay)
     */
    startTutorial() {
        this.tutorial.reset();
        this.tutorial.start();
    }

    /**
     * Update header with translations
     */
    updateHeader() {
        const titleEl = document.querySelector('.app-title');
        const subtitleEl = document.querySelector('.app-subtitle');

        if (titleEl) titleEl.textContent = t('app.title');
        if (subtitleEl) subtitleEl.textContent = t('app.subtitle');

        // Update button text
        const tutorialBtn = document.getElementById('tutorial-button');
        const helpBtn = document.getElementById('help-button');

        if (tutorialBtn) {
            tutorialBtn.querySelector('.btn-text').textContent = t('ui.buttons.tutorial');
            tutorialBtn.title = t('ui.buttons.tutorialTitle');
        }
        if (helpBtn) {
            helpBtn.querySelector('.btn-text').textContent = t('ui.buttons.help');
            helpBtn.title = t('ui.buttons.helpTitle');
        }

        // Setup header buttons
        this.setupHeaderButtons();

        // Setup footer links
        this.setupFooterLinks();
    }

    /**
     * Setup header button event listeners
     */
    setupHeaderButtons() {
        const tutorialBtn = document.getElementById('tutorial-button');
        const helpBtn = document.getElementById('help-button');

        if (tutorialBtn) {
            tutorialBtn.onclick = () => this.startTutorial();
        }

        if (helpBtn) {
            helpBtn.onclick = () => this.showHelp();
        }
    }

    /**
     * Show help modal
     */
    showHelp() {
        // Debug: show current language
        console.log('Help modal - current language:', getCurrentLanguage());
        console.log('Help title translation:', t('help.title'));

        // Remove existing modal if any
        const existing = document.querySelector('.help-modal-overlay');
        if (existing) existing.remove();

        const overlay = document.createElement('div');
        overlay.className = 'help-modal-overlay';
        overlay.innerHTML = `
            <div class="help-modal">
                <div class="help-modal-header">
                    <h2>📡 ${t('help.title')}</h2>
                    <button class="help-modal-close">&times;</button>
                </div>
                <div class="help-modal-content">
                    <div class="help-section">
                        <h3>🎯 ${t('help.goal.title')}</h3>
                        <p>${t('help.goal.text')}</p>
                    </div>

                    <div class="help-section">
                        <h3>🗺️ ${t('help.map.title')}</h3>
                        <p>${t('help.map.text')}</p>
                        <ul>
                            <li><strong style="color: #22c55e">●</strong> ${t('help.map.you')}</li>
                            <li><strong style="color: #fff">●</strong> ${t('help.map.cities')}</li>
                            <li><strong style="color: #fbbf24">☀</strong> ${t('help.map.sun')}</li>
                        </ul>
                    </div>

                    <div class="help-section">
                        <h3>📻 ${t('help.bands.title')}</h3>
                        <p>${t('help.bands.text')}</p>
                        <ul>
                            <li><strong>160m</strong> - ${t('help.bands.160m')}</li>
                            <li><strong>80m</strong> - ${t('help.bands.80m')}</li>
                            <li><strong>40m</strong> - ${t('help.bands.40m')}</li>
                            <li><strong>20m</strong> - ${t('help.bands.20m')}</li>
                            <li><strong>15m</strong> - ${t('help.bands.15m')}</li>
                            <li><strong>10m</strong> - ${t('help.bands.10m')}</li>
                        </ul>
                    </div>

                    <div class="help-section">
                        <h3>⏰ ${t('help.time.title')}</h3>
                        <p>${t('help.time.text')}</p>
                    </div>

                    <div class="help-section">
                        <h3>💡 ${t('help.tips.title')}</h3>
                        <div class="help-tip">
                            <strong>${t('help.tips.tip1.title')}</strong><br>
                            ${t('help.tips.tip1.text')}
                        </div>
                        <div class="help-tip">
                            <strong>${t('help.tips.tip2.title')}</strong><br>
                            ${t('help.tips.tip2.text')}
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(overlay);

        // Close handlers
        const closeBtn = overlay.querySelector('.help-modal-close');
        closeBtn.onclick = () => overlay.remove();
        overlay.onclick = (e) => {
            if (e.target === overlay) overlay.remove();
        };

        // ESC key closes
        const escHandler = (e) => {
            if (e.key === 'Escape') {
                overlay.remove();
                document.removeEventListener('keydown', escHandler);
            }
        };
        document.addEventListener('keydown', escHandler);
    }

    /**
     * Setup footer link event listeners
     */
    setupFooterLinks() {
        const imprintLink = document.getElementById('imprint-link');
        const privacyLink = document.getElementById('privacy-link');

        if (imprintLink) {
            imprintLink.onclick = (e) => {
                e.preventDefault();
                this.showImprint();
            };
        }

        if (privacyLink) {
            privacyLink.onclick = (e) => {
                e.preventDefault();
                this.showPrivacy();
            };
        }
    }

    /**
     * Show imprint modal
     */
    showImprint() {
        const existing = document.querySelector('.legal-modal-overlay');
        if (existing) existing.remove();

        const overlay = document.createElement('div');
        overlay.className = 'legal-modal-overlay';
        overlay.innerHTML = `
            <div class="legal-modal">
                <div class="legal-modal-header">
                    <h2>${t('imprint.title')}</h2>
                    <button class="legal-modal-close">&times;</button>
                </div>
                <div class="legal-modal-content">
                    <p class="legal-info">${t('imprint.info')}</p>

                    <div class="legal-section">
                        <h3>${t('imprint.operator')}</h3>
                        <div class="legal-address">
                            <p><strong>${t('imprint.operatorName')}</strong></p>
                            <p>${t('imprint.operatorCallsign')}</p>
                            <p>${t('imprint.operatorAddress')}</p>
                            <p>${t('imprint.operatorCountry')}</p>
                        </div>
                    </div>

                    <div class="legal-section">
                        <h3>${t('imprint.contact')}</h3>
                        <p><a href="mailto:${t('imprint.contactEmail')}" class="legal-email">${t('imprint.contactEmail')}</a></p>
                    </div>

                    <div class="legal-section">
                        <h3>${t('imprint.liability.title')}</h3>
                        <p>${t('imprint.liability.text')}</p>
                    </div>

                    <div class="legal-section">
                        <h3>${t('imprint.copyright.title')}</h3>
                        <p>${t('imprint.copyright.text')}</p>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(overlay);
        this.setupModalCloseHandlers(overlay);
    }

    /**
     * Show privacy modal
     */
    showPrivacy() {
        const existing = document.querySelector('.legal-modal-overlay');
        if (existing) existing.remove();

        const overlay = document.createElement('div');
        overlay.className = 'legal-modal-overlay';
        overlay.innerHTML = `
            <div class="legal-modal">
                <div class="legal-modal-header">
                    <h2>${t('privacy.title')}</h2>
                    <button class="legal-modal-close">&times;</button>
                </div>
                <div class="legal-modal-content">
                    <p class="legal-info">${t('privacy.intro')}</p>

                    <div class="legal-section">
                        <h3>${t('privacy.noData.title')}</h3>
                        <p>${t('privacy.noData.text')}</p>
                        <ul>
                            <li>${t('privacy.noDataList.forms')}</li>
                            <li>${t('privacy.noDataList.cookies')}</li>
                            <li>${t('privacy.noDataList.tracking')}</li>
                            <li>${t('privacy.noDataList.server')}</li>
                        </ul>
                    </div>

                    <div class="legal-section">
                        <h3>${t('privacy.localStorage.title')}</h3>
                        <p>${t('privacy.localStorage.text')}</p>
                    </div>

                    <div class="legal-section">
                        <h3>${t('privacy.cloudflare.title')}</h3>
                        <p>${t('privacy.cloudflare.text')}</p>
                    </div>

                    <div class="legal-section">
                        <h3>${t('privacy.rights.title')}</h3>
                        <p>${t('privacy.rights.text')}</p>
                    </div>

                    <div class="legal-section">
                        <h3>${t('privacy.contact.title')}</h3>
                        <p>${t('privacy.contact.text')}</p>
                        <p><a href="mailto:${t('imprint.contactEmail')}" class="legal-email">${t('imprint.contactEmail')}</a></p>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(overlay);
        this.setupModalCloseHandlers(overlay);
    }

    /**
     * Setup close handlers for modals
     */
    setupModalCloseHandlers(overlay) {
        const closeBtn = overlay.querySelector('.legal-modal-close');
        closeBtn.onclick = () => overlay.remove();
        overlay.onclick = (e) => {
            if (e.target === overlay) overlay.remove();
        };

        const escHandler = (e) => {
            if (e.key === 'Escape') {
                overlay.remove();
                document.removeEventListener('keydown', escHandler);
            }
        };
        document.addEventListener('keydown', escHandler);
    }

    /**
     * Initialize all UI components
     */
    initializeUI() {
        // World Map
        this.worldMap = new WorldMap('world-map', {
            onLocationClick: (location) => this.handleLocationClick(location)
        });
        this.worldMap.setPlayerLocation(this.state.playerLocation);

        // Controls Panel
        this.controlsPanel = new ControlsPanel('controls-panel', {
            onBandChange: (bandId) => this.handleBandChange(bandId),
            onTimeChange: (time) => this.handleTimeChange(time),
            onSolarActivityChange: (activityId) => this.handleSolarActivityChange(activityId),
            onMogelDellingerToggle: (active) => this.handleMogelDellingerToggle(active),
            onAuroraToggle: (active) => this.handleAuroraToggle(active)
        });

        // Feedback Panel
        this.feedbackPanel = new FeedbackPanel('feedback-panel');

        // Update player location in controls
        this.updatePlayerLocationDisplay();
    }

    /**
     * Handle click on a map location
     */
    handleLocationClick(location) {
        // Don't allow clicking own location
        if (location === this.state.playerLocation) {
            return;
        }

        this.state.targetLocation = location;
        this.worldMap.setTargetLocation(location);

        // Attempt propagation
        this.attemptContact();
    }

    /**
     * Handle band selection change
     */
    handleBandChange(bandId) {
        const previousBand = this.state.selectedBand;
        const previousResult = this.state.lastBandResult[previousBand];

        this.state.selectedBand = bandId;
        this.state.bandsTriedSet.add(bandId);

        // Dispatch event for tutorial
        Tutorial.dispatchBandChange();

        // If we have a target, re-evaluate and possibly show comparison
        if (this.state.targetLocation) {
            this.attemptContact();

            // Show comparison if we have results for both bands
            const currentResult = this.state.lastResult;
            if (previousResult && currentResult && previousBand !== bandId) {
                const comparison = explainBandChange(
                    previousBand,
                    bandId,
                    previousResult,
                    currentResult
                );
                this.feedbackPanel.showBandComparison(comparison);
            }
        }
    }

    /**
     * Handle time change
     */
    handleTimeChange(time) {
        this.setTime(time);

        // If we have a target, re-evaluate
        if (this.state.targetLocation) {
            this.attemptContact();
        }
    }

    /**
     * Handle solar activity change
     */
    handleSolarActivityChange(activityId) {
        const solarConditions = getSolarConditions();
        solarConditions.setActivityLevel(activityId);

        // If we have a target, re-evaluate
        if (this.state.targetLocation) {
            this.attemptContact();
        }
    }

    /**
     * Handle Mögel-Dellinger toggle
     */
    handleMogelDellingerToggle(active) {
        const solarConditions = getSolarConditions();
        if (active) {
            solarConditions.triggerMogelDellinger('moderate');
        } else {
            solarConditions.clearMogelDellinger();
        }

        // If we have a target, re-evaluate
        if (this.state.targetLocation) {
            this.attemptContact();
        }
    }

    /**
     * Handle Aurora toggle
     */
    handleAuroraToggle(active) {
        const solarConditions = getSolarConditions();
        if (active) {
            solarConditions.triggerAurora('moderate');
        } else {
            solarConditions.clearAurora();
        }

        // If we have a target, re-evaluate
        if (this.state.targetLocation) {
            this.attemptContact();
        }
    }

    /**
     * Set the simulation time
     */
    setTime(time) {
        this.state.currentTime = time;
        this.worldMap.setTime(time);
        this.updateConditionsDisplay();
    }

    /**
     * Attempt a radio contact
     */
    attemptContact() {
        if (!this.state.targetLocation) return;

        // Dispatch event for tutorial
        Tutorial.dispatchContactAttempt();

        // Show loading briefly
        this.feedbackPanel.showLoading();

        // Small delay for effect
        setTimeout(() => {
            try {
                // Evaluate propagation
                const result = evaluatePropagation({
                    source: this.state.playerLocation,
                    target: this.state.targetLocation,
                    bandId: this.state.selectedBand,
                    dateTime: this.state.currentTime
                });

                // Store result
                this.state.lastResult = result;
                this.state.lastBandResult[this.state.selectedBand] = result;

                // Update statistics
                this.state.contactAttempts++;
                if (result.success) {
                    this.state.successfulContacts++;
                }

                // Check for discoveries
                this.checkForDiscoveries(result);

                // Generate explanation
                const explanation = generateExplanation(result, {
                    bandId: this.state.selectedBand,
                    source: this.state.playerLocation,
                    target: this.state.targetLocation,
                    dateTime: this.state.currentTime
                });

                // Update UI
                this.worldMap.showSignalPath(result.path, result.success);
                this.feedbackPanel.showResult(explanation);

                // Update conditions display
                this.updateConditionsDisplay();
            } catch (error) {
                console.error('Error during contact attempt:', error);
                this.feedbackPanel.showResult({
                    success: false,
                    title: 'Fehler',
                    summary: 'Ein Fehler ist aufgetreten: ' + error.message,
                    factors: [],
                    suggestions: ['Bitte Seite neu laden']
                });
            }
        }, 300);
    }

    /**
     * Check if the player has made a discovery
     */
    checkForDiscoveries(result) {
        const discoveries = detectDiscovery(this.state, result);

        for (const discovery of discoveries) {
            // Mark as discovered
            if (discovery.concept === t('discoveries.dLayerAbsorption.concept')) {
                this.state.discoveries.dLayerAbsorption = true;
            } else if (discovery.concept === t('discoveries.greyLine.concept')) {
                this.state.discoveries.greyLine = true;
            } else if (discovery.concept === t('discoveries.frequencyDistance.concept')) {
                this.state.discoveries.frequencyDistance = true;
            }

            // Show celebration
            this.feedbackPanel.showDiscovery(discovery);
        }
    }

    /**
     * Update the conditions display in the controls panel
     */
    updateConditionsDisplay() {
        // Safety check
        if (!this.state.playerLocation) {
            console.error('playerLocation is undefined!', 'PRESET_LOCATIONS:', PRESET_LOCATIONS);
            return;
        }

        const conditions = getLightingCondition(
            this.state.playerLocation.latitude,
            this.state.playerLocation.longitude,
            this.state.currentTime
        );

        // Translate lighting condition
        let conditionDesc = conditions.description;
        let conditionEdu = conditions.educational;

        // Map to translated versions
        if (conditions.condition === 'day') {
            conditionDesc = t('lighting.day.description');
            conditionEdu = t('lighting.day.educational');
        } else if (conditions.condition === 'civil_twilight') {
            conditionDesc = t('lighting.civilTwilight.description');
            conditionEdu = t('lighting.civilTwilight.educational');
        } else if (conditions.condition === 'nautical_twilight') {
            conditionDesc = t('lighting.nauticalTwilight.description');
            conditionEdu = t('lighting.nauticalTwilight.educational');
        } else if (conditions.condition === 'astronomical_twilight') {
            conditionDesc = t('lighting.astronomicalTwilight.description');
            conditionEdu = t('lighting.astronomicalTwilight.educational');
        } else if (conditions.condition === 'night') {
            conditionDesc = t('lighting.night.description');
            conditionEdu = t('lighting.night.educational');
        }

        let html = `
            <div class="current-conditions">
                <div class="condition-item">
                    <span class="condition-label">${t('ui.conditions.yourLocation')}</span>
                    <span class="condition-value">${this.state.playerLocation.name}</span>
                </div>
                <div class="condition-item">
                    <span class="condition-label">${t('ui.conditions.localConditions')}</span>
                    <span class="condition-value">${conditionDesc}</span>
                </div>
                <p class="condition-note">${conditionEdu}</p>
            </div>
        `;

        if (this.state.targetLocation) {
            const targetConditions = getLightingCondition(
                this.state.targetLocation.latitude,
                this.state.targetLocation.longitude,
                this.state.currentTime
            );

            // Translate target conditions
            let targetDesc = targetConditions.description;
            if (targetConditions.condition === 'day') {
                targetDesc = t('lighting.day.description');
            } else if (targetConditions.condition === 'civil_twilight') {
                targetDesc = t('lighting.civilTwilight.description');
            } else if (targetConditions.condition === 'nautical_twilight') {
                targetDesc = t('lighting.nauticalTwilight.description');
            } else if (targetConditions.condition === 'astronomical_twilight') {
                targetDesc = t('lighting.astronomicalTwilight.description');
            } else if (targetConditions.condition === 'night') {
                targetDesc = t('lighting.night.description');
            }

            const distance = calculateDistance(
                this.state.playerLocation.latitude,
                this.state.playerLocation.longitude,
                this.state.targetLocation.latitude,
                this.state.targetLocation.longitude
            );

            html += `
                <div class="target-conditions">
                    <div class="condition-item">
                        <span class="condition-label">${t('ui.conditions.target')}</span>
                        <span class="condition-value">${this.state.targetLocation.name}</span>
                    </div>
                    <div class="condition-item">
                        <span class="condition-label">${t('ui.conditions.distance')}</span>
                        <span class="condition-value">${formatDistance(distance)}</span>
                    </div>
                    <div class="condition-item">
                        <span class="condition-label">${t('ui.conditions.targetConditions')}</span>
                        <span class="condition-value">${targetDesc}</span>
                    </div>
                </div>
            `;
        }

        this.controlsPanel.updateConditionsDisplay(html);
    }

    /**
     * Update player location display
     */
    updatePlayerLocationDisplay() {
        // Could add a location selector here in the future
    }

    /**
     * Change player location
     */
    setPlayerLocation(location) {
        this.state.playerLocation = location;
        this.worldMap.setPlayerLocation(location);
        this.updateConditionsDisplay();

        // Re-evaluate if we have a target
        if (this.state.targetLocation) {
            this.attemptContact();
        }
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', async () => {
    // Initialize i18n system first (German is default)
    await initI18n();

    // Then create the app
    window.app = new FirstContactApp();
});
