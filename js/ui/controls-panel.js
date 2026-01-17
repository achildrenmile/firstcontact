/**
 * Controls Panel
 *
 * Provides the user interface for:
 * - Selecting HF bands
 * - Controlling simulation time
 * - Viewing current conditions
 * - Language selection
 */

import { HF_BANDS, getAllBands } from '../models/bands.js';
import { t, LANGUAGES, getCurrentLanguage, setLanguage } from '../i18n/i18n.js';

export class ControlsPanel {
    constructor(containerId, options = {}) {
        this.container = document.getElementById(containerId);

        // State
        this.selectedBand = '20m';
        this.currentTime = new Date();

        // Callbacks
        this.onBandChange = options.onBandChange || (() => {});
        this.onTimeChange = options.onTimeChange || (() => {});

        // Build the UI
        this.render();

        // Listen for language changes
        window.addEventListener('languagechange', () => this.render());
    }

    /**
     * Render the control panel
     */
    render() {
        this.container.innerHTML = `
            <div class="controls-panel">
                <section class="control-section language-section">
                    <h3>${t('ui.language')}</h3>
                    <div class="language-selector" id="language-selector">
                        ${this.renderLanguageButtons()}
                    </div>
                </section>

                <section class="control-section">
                    <h3>${t('ui.selectBand')}</h3>
                    <div class="band-selector" id="band-buttons"></div>
                    <div class="band-info" id="band-info"></div>
                </section>

                <section class="control-section">
                    <h3>${t('ui.timeOfDay')}</h3>
                    <div class="time-control">
                        <input type="range" id="time-slider" min="0" max="1439" value="720" />
                        <div class="time-display" id="time-display">12:00 UTC</div>
                    </div>
                    <div class="time-presets">
                        <button class="time-preset" data-hour="6">${t('ui.timePresets.dawn')}</button>
                        <button class="time-preset" data-hour="12">${t('ui.timePresets.noon')}</button>
                        <button class="time-preset" data-hour="18">${t('ui.timePresets.dusk')}</button>
                        <button class="time-preset" data-hour="0">${t('ui.timePresets.midnight')}</button>
                    </div>
                </section>

                <section class="control-section">
                    <h3>${t('ui.currentConditions')}</h3>
                    <div class="conditions-display" id="conditions-display">
                        ${t('ui.welcome.subtitle')}
                    </div>
                </section>
            </div>
        `;

        this.renderBandButtons();
        this.setupEventListeners();
        this.updateBandInfo();
    }

    /**
     * Render language selection buttons
     */
    renderLanguageButtons() {
        const currentLang = getCurrentLanguage();
        return Object.values(LANGUAGES).map(lang => `
            <button class="lang-button ${lang.code === currentLang ? 'selected' : ''}"
                    data-lang="${lang.code}">
                <span class="lang-flag">${lang.flag}</span>
                <span class="lang-name">${lang.name}</span>
            </button>
        `).join('');
    }

    /**
     * Render band selection buttons
     */
    renderBandButtons() {
        const container = document.getElementById('band-buttons');
        const bands = getAllBands();

        container.innerHTML = bands.map(band => `
            <button
                class="band-button ${band.id === this.selectedBand ? 'selected' : ''}"
                data-band="${band.id}"
                style="--band-color: ${band.color}"
            >
                <span class="band-name">${band.id}</span>
                <span class="band-personality">${t(`bands.${band.id}.personality`)}</span>
            </button>
        `).join('');
    }

    /**
     * Setup event listeners
     */
    setupEventListeners() {
        // Language buttons
        document.getElementById('language-selector')?.addEventListener('click', async (e) => {
            const button = e.target.closest('.lang-button');
            if (button) {
                const lang = button.dataset.lang;
                await setLanguage(lang);
            }
        });

        // Band buttons
        document.getElementById('band-buttons').addEventListener('click', (e) => {
            const button = e.target.closest('.band-button');
            if (button) {
                this.selectBand(button.dataset.band);
            }
        });

        // Time slider
        const slider = document.getElementById('time-slider');
        slider.addEventListener('input', (e) => {
            this.setTimeFromSlider(parseInt(e.target.value));
        });

        // Time presets
        document.querySelectorAll('.time-preset').forEach(button => {
            button.addEventListener('click', (e) => {
                const hour = parseInt(e.target.dataset.hour);
                this.setHour(hour);
            });
        });
    }

    /**
     * Select a band
     */
    selectBand(bandId) {
        this.selectedBand = bandId;

        // Update button states
        document.querySelectorAll('.band-button').forEach(btn => {
            btn.classList.toggle('selected', btn.dataset.band === bandId);
        });

        // Update info display
        this.updateBandInfo();

        // Notify callback
        this.onBandChange(bandId);
    }

    /**
     * Update the band information display
     */
    updateBandInfo() {
        const band = HF_BANDS[this.selectedBand];
        const infoContainer = document.getElementById('band-info');

        infoContainer.innerHTML = `
            <div class="band-details">
                <div class="band-header">
                    <span class="band-icon">${band.icon}</span>
                    <span class="band-tagline">${t(`bands.${band.id}.tagline`)}</span>
                </div>
                <p class="band-description">${t(`bands.${band.id}.simpleDescription`)}</p>
                <div class="band-hint">
                    <strong>Tip:</strong> ${t(`bands.${band.id}.learningHint`)}
                </div>
            </div>
        `;
    }

    /**
     * Set time from slider value (0-1439 = minutes in a day)
     */
    setTimeFromSlider(minutes) {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;

        this.currentTime = new Date();
        this.currentTime.setUTCHours(hours, mins, 0, 0);

        this.updateTimeDisplay();
        this.onTimeChange(this.currentTime);
    }

    /**
     * Set to a specific hour
     */
    setHour(hour) {
        this.currentTime = new Date();
        this.currentTime.setUTCHours(hour, 0, 0, 0);

        // Update slider
        document.getElementById('time-slider').value = hour * 60;

        this.updateTimeDisplay();
        this.onTimeChange(this.currentTime);
    }

    /**
     * Update time display
     */
    updateTimeDisplay() {
        const hours = this.currentTime.getUTCHours();
        const mins = this.currentTime.getUTCMinutes();

        const timeStr = `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')} UTC`;

        // Determine period
        let period = '';
        if (hours >= 5 && hours < 7) period = t('ui.timePeriods.dawn');
        else if (hours >= 7 && hours < 12) period = t('ui.timePeriods.morning');
        else if (hours >= 12 && hours < 14) period = t('ui.timePeriods.midday');
        else if (hours >= 14 && hours < 17) period = t('ui.timePeriods.afternoon');
        else if (hours >= 17 && hours < 19) period = t('ui.timePeriods.dusk');
        else if (hours >= 19 && hours < 22) period = t('ui.timePeriods.evening');
        else period = t('ui.timePeriods.night');

        document.getElementById('time-display').textContent = `${timeStr} ${period}`;
    }

    /**
     * Update conditions display
     */
    updateConditionsDisplay(text) {
        document.getElementById('conditions-display').innerHTML = text;
    }

    /**
     * Get current state
     */
    getState() {
        return {
            band: this.selectedBand,
            time: this.currentTime
        };
    }
}
