/**
 * Solar Weather Panel
 *
 * A read-only, collapsible panel showing how simulation state relates to
 * solar weather conditions. Targeted at beginners who benefit from
 * descriptive, observational language.
 */

import { t } from '../i18n/i18n.js';
import { getSolarConditions } from '../systems/propagation-engine.js';
import { SOLAR_ACTIVITY_LEVELS } from '../models/solar-activity.js';

// Bands ordered by frequency (low to high)
const BAND_ORDER = ['160m', '80m', '60m', '40m', '30m', '20m', '17m', '15m', '12m', '10m', '6m'];

export class SolarWeatherPanel {
    constructor(containerId, options = {}) {
        this.container = document.getElementById(containerId);
        if (!this.container) {
            console.warn(`SolarWeatherPanel: Container ${containerId} not found`);
            return;
        }

        this.options = {
            storageKey: 'solarWeatherPanelCollapsed',
            ...options
        };

        // Load collapse state from localStorage
        this.collapsed = localStorage.getItem(this.options.storageKey) === 'true';

        // Initial render
        this.render();

        // Listen for language changes
        window.addEventListener('languagechange', () => this.render());
    }

    /**
     * Render the panel
     */
    render() {
        const solarConditions = getSolarConditions();
        const rating = this.calculateOverallRating(solarConditions);
        const bandRecs = this.generateBandRecommendations(solarConditions);

        this.container.innerHTML = `
            <div class="solar-weather-panel ${this.collapsed ? 'collapsed' : ''}">
                <div class="solar-weather-header" title="${this.collapsed ? t('solarWeather.expandHint') : t('solarWeather.collapseHint')}">
                    <div class="solar-weather-title">
                        <span class="solar-weather-title-icon">☀️</span>
                        <span>${t('solarWeather.panelTitle')}</span>
                    </div>
                    <span class="solar-weather-toggle">▼</span>
                </div>
                <div class="solar-weather-content">
                    <!-- Overall Rating Badge -->
                    ${this.renderRatingBadge(rating)}

                    <!-- Sun Activity -->
                    ${this.renderSunActivity(solarConditions)}

                    <!-- Active Events -->
                    ${this.renderActiveEvents(solarConditions)}

                    <!-- Band Recommendations -->
                    ${this.renderBandRecommendations(bandRecs)}

                    <!-- Educational Note -->
                    <div class="solar-weather-note">
                        ${t('solarWeather.educationalNote')}
                    </div>
                </div>
            </div>
        `;

        // Setup event listeners
        this.setupEventListeners();
    }

    /**
     * Setup event listeners
     */
    setupEventListeners() {
        const header = this.container.querySelector('.solar-weather-header');
        if (header) {
            header.addEventListener('click', () => this.toggleCollapse());
        }
    }

    /**
     * Toggle collapse state
     */
    toggleCollapse() {
        this.collapsed = !this.collapsed;
        localStorage.setItem(this.options.storageKey, this.collapsed.toString());

        const panel = this.container.querySelector('.solar-weather-panel');
        const header = this.container.querySelector('.solar-weather-header');

        if (panel) {
            panel.classList.toggle('collapsed', this.collapsed);
        }
        if (header) {
            header.title = this.collapsed ? t('solarWeather.expandHint') : t('solarWeather.collapseHint');
        }
    }

    /**
     * Update the panel with new state
     */
    update() {
        this.render();
    }

    /**
     * Calculate overall rating based on conditions
     */
    calculateOverallRating(solarConditions) {
        // Start with activity level
        let rating = 'good';

        const activityLevel = solarConditions.activityLevel;

        // Base rating on activity level
        if (activityLevel === 'quiet') {
            rating = 'fair';
        } else if (activityLevel === 'normal') {
            rating = 'good';
        } else if (activityLevel === 'active') {
            rating = 'excellent';
        } else if (activityLevel === 'storm') {
            rating = 'poor';
        }

        // Adjust for active events
        if (solarConditions.mogelDellingerActive) {
            // Solar flare severely impacts conditions
            rating = 'severe';
        } else if (solarConditions.auroraActive) {
            // Aurora impacts polar paths
            if (rating === 'excellent') rating = 'good';
            else if (rating === 'good') rating = 'fair';
            else if (rating === 'fair') rating = 'poor';
        }

        // Sporadic E is actually good for higher bands
        if (solarConditions.sporadicEActive && rating !== 'severe') {
            // Sporadic E improves conditions on some bands
            if (rating === 'fair') rating = 'good';
        }

        return rating;
    }

    /**
     * Render the overall rating badge
     */
    renderRatingBadge(rating) {
        const icons = {
            excellent: '📶',
            good: '📊',
            fair: '📉',
            poor: '⚠️',
            severe: '🚨'
        };

        const ratingText = t(`solarWeather.rating.${rating}`);

        return `
            <div class="solar-weather-rating condition-badge--${rating}">
                <span class="solar-weather-rating-icon">${icons[rating] || '📊'}</span>
                <span>${ratingText}</span>
            </div>
        `;
    }

    /**
     * Render sun activity section
     */
    renderSunActivity(solarConditions) {
        const activityLevel = solarConditions.activityLevel;
        const personality = t(`solarWeather.sunPersonality.${activityLevel}`);
        const description = t(`solarWeather.sunDescription.${activityLevel}`);

        const icons = {
            quiet: '🌑',
            normal: '🌤️',
            active: '☀️',
            storm: '🌋'
        };

        return `
            <div class="weather-item weather-item--stacked">
                <span class="weather-item-label">${t('solarWeather.sunActivity')}</span>
                <div class="weather-item-sun">
                    <span class="weather-item-icon">${icons[activityLevel] || '☀️'}</span>
                    <span class="weather-item-personality">${personality}</span>
                </div>
                <div class="weather-item-description">${description}</div>
            </div>
        `;
    }

    /**
     * Render active events (solar flare, aurora, sporadic E)
     */
    renderActiveEvents(solarConditions) {
        const events = [];

        if (solarConditions.mogelDellingerActive) {
            events.push(`
                <div class="event-alert event-alert--flare">
                    <span class="event-alert-icon">⚡</span>
                    <div class="event-alert-content">
                        <span class="event-alert-name">${t('solarWeather.events.solarFlare')}</span>
                        <span class="event-alert-effect">${t('solarWeather.events.solarFlareEffect')}</span>
                    </div>
                </div>
            `);
        }

        if (solarConditions.auroraActive) {
            events.push(`
                <div class="event-alert event-alert--aurora">
                    <span class="event-alert-icon">🌌</span>
                    <div class="event-alert-content">
                        <span class="event-alert-name">${t('solarWeather.events.aurora')}</span>
                        <span class="event-alert-effect">${t('solarWeather.events.auroraEffect')}</span>
                    </div>
                </div>
            `);
        }

        if (solarConditions.sporadicEActive) {
            events.push(`
                <div class="event-alert event-alert--sporadic-e">
                    <span class="event-alert-icon">✨</span>
                    <div class="event-alert-content">
                        <span class="event-alert-name">${t('solarWeather.events.sporadicE')}</span>
                        <span class="event-alert-effect">${t('solarWeather.events.sporadicEEffect')}</span>
                    </div>
                </div>
            `);
        }

        if (events.length === 0) {
            return '';
        }

        return `
            <div class="event-alerts">
                ${events.join('')}
            </div>
        `;
    }

    /**
     * Generate band recommendations based on current conditions
     */
    generateBandRecommendations(solarConditions) {
        const activityLevel = solarConditions.activityLevel;
        const activityConfig = SOLAR_ACTIVITY_LEVELS[activityLevel];
        const recommendations = {};

        // Base ratings on activity level
        for (const band of BAND_ORDER) {
            recommendations[band] = this.getBandRating(band, activityLevel, solarConditions);
        }

        return recommendations;
    }

    /**
     * Get rating for a specific band
     */
    getBandRating(band, activityLevel, solarConditions) {
        // Frequency-based categorization
        const highBands = ['10m', '12m', '15m', '17m', '6m'];
        const midBands = ['20m', '30m'];
        const lowBands = ['40m', '60m', '80m', '160m'];

        const isHigh = highBands.includes(band);
        const isMid = midBands.includes(band);
        const isLow = lowBands.includes(band);

        let rating = 'fair';

        // Base on activity level
        if (activityLevel === 'quiet') {
            if (isHigh) rating = 'poor';
            else if (isMid) rating = 'fair';
            else rating = 'good';
        } else if (activityLevel === 'normal') {
            if (isHigh) rating = 'fair';
            else if (isMid) rating = 'good';
            else rating = 'good';
        } else if (activityLevel === 'active') {
            if (isHigh) rating = 'excellent';
            else if (isMid) rating = 'excellent';
            else rating = 'fair'; // Higher absorption
        } else if (activityLevel === 'storm') {
            rating = 'poor';
        }

        // Adjust for solar flare (Mögel-Dellinger)
        if (solarConditions.mogelDellingerActive) {
            // All bands severely affected on day side
            if (isLow || isMid) {
                rating = 'closed';
            } else {
                rating = 'poor';
            }
        }

        // Sporadic E boost for high bands
        if (solarConditions.sporadicEActive && !solarConditions.mogelDellingerActive) {
            if (band === '6m') {
                rating = 'excellent';
            } else if (band === '10m' || band === '12m') {
                if (rating === 'fair') rating = 'good';
                else if (rating === 'good') rating = 'excellent';
            } else if (band === '15m') {
                if (rating === 'fair') rating = 'good';
            }
        }

        return rating;
    }

    /**
     * Render band recommendations
     */
    renderBandRecommendations(recommendations) {
        const chips = BAND_ORDER.map(band => {
            const rating = recommendations[band];
            return `<span class="band-rec band-rec--${rating}">${band}</span>`;
        }).join('');

        return `
            <div class="band-rec-section">
                <div class="band-rec-label">${t('solarWeather.recommendedBands')}</div>
                <div class="band-rec-list">
                    ${chips}
                </div>
            </div>
        `;
    }
}
