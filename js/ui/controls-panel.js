/**
 * Controls Panel
 *
 * Provides the user interface for:
 * - Selecting HF bands
 * - Controlling simulation time
 * - Solar activity selection
 * - Mögel-Dellinger event trigger
 * - Viewing current conditions
 * - Language selection
 */

import { HF_BANDS, getAllBands } from '../models/bands.js';
import { t, LANGUAGES, getCurrentLanguage, setLanguage } from '../i18n/i18n.js';
import { SOLAR_ACTIVITY_LEVELS, getAllActivityLevels } from '../models/solar-activity.js';

export class ControlsPanel {
    constructor(containerId, options = {}) {
        this.container = document.getElementById(containerId);

        // State
        this.selectedBand = '20m';
        this.currentTime = new Date();
        this.solarActivity = 'normal';
        this.mogelDellingerActive = false;
        this.auroraActive = false;
        this.sporadicEActive = false;

        // Callbacks
        this.onBandChange = options.onBandChange || (() => {});
        this.onTimeChange = options.onTimeChange || (() => {});
        this.onSolarActivityChange = options.onSolarActivityChange || (() => {});
        this.onMogelDellingerToggle = options.onMogelDellingerToggle || (() => {});
        this.onAuroraToggle = options.onAuroraToggle || (() => {});
        this.onSporadicEToggle = options.onSporadicEToggle || (() => {});

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
                    <h3>${t('ui.solarActivity')}</h3>
                    <div class="solar-activity-selector" id="solar-activity-buttons"></div>
                    <div class="solar-activity-info" id="solar-activity-info"></div>
                    <div class="special-events-control">
                        <div class="event-button-group">
                            <button class="mogel-dellinger-button ${this.mogelDellingerActive ? 'active' : ''}" id="mogel-dellinger-btn">
                                <span class="event-icon">⚡</span>
                                <span class="event-label">${t('ui.mogelDellinger.trigger')}</span>
                            </button>
                            <button class="aurora-button ${this.auroraActive ? 'active' : ''}" id="aurora-btn">
                                <span class="event-icon">🌌</span>
                                <span class="event-label">${t('ui.aurora.trigger')}</span>
                            </button>
                            <button class="sporadic-e-button ${this.sporadicEActive ? 'active' : ''}" id="sporadic-e-btn">
                                <span class="event-icon">✨</span>
                                <span class="event-label">${t('ui.sporadicE.trigger')}</span>
                            </button>
                        </div>
                        <div class="event-hints">
                            <div class="event-hint">${t('ui.mogelDellinger.hint')}</div>
                            <div class="event-hint">${t('ui.aurora.hint')}</div>
                            <div class="event-hint">${t('ui.sporadicE.hint')}</div>
                        </div>
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
        this.renderSolarActivityButtons();
        this.setupEventListeners();
        this.updateBandInfo();
        this.updateSolarActivityInfo();
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
     * Render solar activity selection buttons
     */
    renderSolarActivityButtons() {
        const container = document.getElementById('solar-activity-buttons');
        const levels = getAllActivityLevels();

        container.innerHTML = levels.map(level => `
            <button
                class="solar-activity-button ${level.id === this.solarActivity ? 'selected' : ''}"
                data-activity="${level.id}"
                style="--activity-color: ${level.color}"
            >
                <span class="activity-icon">${level.icon}</span>
                <span class="activity-name">${t(`solarActivity.${level.id}.name`)}</span>
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

        // Solar activity buttons
        document.getElementById('solar-activity-buttons')?.addEventListener('click', (e) => {
            const button = e.target.closest('.solar-activity-button');
            if (button) {
                this.selectSolarActivity(button.dataset.activity);
            }
        });

        // Mögel-Dellinger button
        document.getElementById('mogel-dellinger-btn')?.addEventListener('click', () => {
            this.toggleMogelDellinger();
        });

        // Aurora button
        document.getElementById('aurora-btn')?.addEventListener('click', () => {
            this.toggleAurora();
        });

        // Sporadic E button
        document.getElementById('sporadic-e-btn')?.addEventListener('click', () => {
            this.toggleSporadicE();
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
     * Select solar activity level
     */
    selectSolarActivity(activityId) {
        this.solarActivity = activityId;

        // Update button states
        document.querySelectorAll('.solar-activity-button').forEach(btn => {
            btn.classList.toggle('selected', btn.dataset.activity === activityId);
        });

        // Update info display
        this.updateSolarActivityInfo();

        // Notify callback
        this.onSolarActivityChange(activityId);
    }

    /**
     * Toggle Mögel-Dellinger event
     */
    toggleMogelDellinger() {
        this.mogelDellingerActive = !this.mogelDellingerActive;

        // Update button state
        const btn = document.getElementById('mogel-dellinger-btn');
        btn.classList.toggle('active', this.mogelDellingerActive);

        // Update label
        const label = btn.querySelector('.event-label');
        label.textContent = this.mogelDellingerActive
            ? t('ui.mogelDellinger.active')
            : t('ui.mogelDellinger.trigger');

        // Notify callback
        this.onMogelDellingerToggle(this.mogelDellingerActive);
    }

    /**
     * Toggle Aurora event
     */
    toggleAurora() {
        this.auroraActive = !this.auroraActive;

        // Update button state
        const btn = document.getElementById('aurora-btn');
        btn.classList.toggle('active', this.auroraActive);

        // Update label
        const label = btn.querySelector('.event-label');
        label.textContent = this.auroraActive
            ? t('ui.aurora.active')
            : t('ui.aurora.trigger');

        // Notify callback
        this.onAuroraToggle(this.auroraActive);
    }

    /**
     * Toggle Sporadic E event
     */
    toggleSporadicE() {
        this.sporadicEActive = !this.sporadicEActive;

        // Update button state
        const btn = document.getElementById('sporadic-e-btn');
        btn.classList.toggle('active', this.sporadicEActive);

        // Update label
        const label = btn.querySelector('.event-label');
        label.textContent = this.sporadicEActive
            ? t('ui.sporadicE.active')
            : t('ui.sporadicE.trigger');

        // Notify callback
        this.onSporadicEToggle(this.sporadicEActive);
    }

    /**
     * Update solar activity info display
     */
    updateSolarActivityInfo() {
        const level = SOLAR_ACTIVITY_LEVELS[this.solarActivity];
        const infoContainer = document.getElementById('solar-activity-info');

        if (!infoContainer) return;

        infoContainer.innerHTML = `
            <div class="solar-activity-details">
                <p class="solar-description">${t(`solarActivity.${level.id}.simpleDescription`)}</p>
                <div class="solar-hint">
                    <strong>Tip:</strong> ${t(`solarActivity.${level.id}.learningHint`)}
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
            time: this.currentTime,
            solarActivity: this.solarActivity,
            mogelDellingerActive: this.mogelDellingerActive,
            auroraActive: this.auroraActive,
            sporadicEActive: this.sporadicEActive
        };
    }
}
