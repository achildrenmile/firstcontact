/**
 * Feedback Panel
 *
 * Displays propagation results, explanations, and learning content.
 * This is where the educational magic happens - transforming simulation
 * results into understandable, actionable insights.
 */

import { t } from '../i18n/i18n.js';
import { SolarWeatherPanel } from './solar-weather-panel.js';

export class FeedbackPanel {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.solarWeatherPanel = null;
        this.render();

        // Listen for language changes
        window.addEventListener('languagechange', () => this.render());
    }

    /**
     * Initial render
     */
    render() {
        this.container.innerHTML = `
            <div class="feedback-panel">
                <div class="feedback-welcome" id="feedback-content">
                    <h2>${t('ui.welcome.title')}</h2>
                    <p>${t('ui.welcome.subtitle')}</p>
                    <div class="getting-started">
                        <h3>${t('ui.welcome.gettingStarted')}</h3>
                        <ol>
                            <li>${t('ui.welcome.step1')}</li>
                            <li>${t('ui.welcome.step2')}</li>
                            <li>${t('ui.welcome.step3')}</li>
                            <li>${t('ui.welcome.step4')}</li>
                        </ol>
                    </div>
                </div>
                <div id="solar-weather-container"></div>
            </div>
        `;

        // Initialize or update solar weather panel
        this.initSolarWeatherPanel();
    }

    /**
     * Initialize the solar weather panel
     */
    initSolarWeatherPanel() {
        // Always create a new instance after render since the container is recreated
        this.solarWeatherPanel = new SolarWeatherPanel('solar-weather-container');
    }

    /**
     * Update the solar weather panel
     */
    updateSolarWeather() {
        if (this.solarWeatherPanel) {
            this.solarWeatherPanel.update();
        }
    }

    /**
     * Show propagation result
     */
    showResult(explanation) {
        const content = document.getElementById('feedback-content');

        content.innerHTML = `
            <div class="result-container ${explanation.signalMeter.value > 20 ? 'success' : 'failure'}">
                <!-- Headline -->
                <h2 class="result-headline">${explanation.headline}</h2>

                <!-- Signal Meter -->
                <div class="signal-meter">
                    <div class="signal-bar">
                        <div class="signal-fill"
                            style="width: ${explanation.signalMeter.value}%;
                                   background-color: ${explanation.signalMeter.color}">
                        </div>
                    </div>
                    <div class="signal-label">
                        ${t('propagation.signalLabel', {
                            quality: explanation.signalMeter.quality,
                            value: explanation.signalMeter.value
                        })}
                    </div>
                </div>

                <!-- Path Mode Indicator (for long path) -->
                ${explanation.pathMode === 'long' ? `
                    <div class="path-mode-indicator long-path">
                        <span class="path-icon">🌍</span>
                        <span class="path-label">${t('propagation.pathType.long')}</span>
                        ${explanation.pathComparison ? `<span class="path-comparison">${explanation.pathComparison}</span>` : ''}
                    </div>
                ` : (explanation.hasLongPathOption ? `
                    <div class="path-mode-indicator short-path">
                        <span class="path-icon">➡️</span>
                        <span class="path-label">${t('propagation.pathType.short')}</span>
                    </div>
                ` : '')}

                <!-- Short Explanation -->
                <p class="result-summary">${explanation.shortExplanation}</p>

                <!-- Factors -->
                <div class="factors-section">
                    <h3>${t('propagation.factors.dLayerAbsorption').split(' ')[0]}...</h3>
                    ${this.renderFactors(explanation.factors)}
                </div>

                <!-- Learning Points -->
                ${this.renderLearningPoints(explanation.learningPoints)}

                <!-- Suggestions -->
                ${this.renderSuggestions(explanation.suggestions)}

                <!-- Encouragement -->
                <div class="encouragement">
                    <strong>${explanation.encouragement.message}</strong>
                    <p>${explanation.encouragement.detail}</p>
                </div>
            </div>
        `;
    }

    /**
     * Render factors that affected propagation
     */
    renderFactors(factors) {
        return `
            <div class="factors-list">
                ${factors.map(factor => `
                    <div class="factor-item" style="border-left-color: ${factor.impactColor}">
                        <div class="factor-header">
                            <span class="factor-icon">${factor.impactIcon}</span>
                            <span class="factor-name">${factor.name}</span>
                            <span class="factor-impact"
                                style="color: ${factor.impactColor}">
                                ${factor.impactText}
                            </span>
                        </div>
                        <p class="factor-description">${factor.description}</p>
                        <details class="factor-details">
                            <summary>${t('learning.sectionTitle').split(' ')[0]}...</summary>
                            <p>${factor.educational}</p>
                        </details>
                    </div>
                `).join('')}
            </div>
        `;
    }

    /**
     * Render learning points
     */
    renderLearningPoints(learningPoints) {
        if (!learningPoints || learningPoints.length === 0) return '';

        return `
            <div class="learning-section">
                <h3>${t('learning.sectionTitle')}</h3>
                ${learningPoints.map(point => `
                    <div class="learning-point">
                        <h4>${point.concept}</h4>
                        <p>${point.insight}</p>
                        ${point.experiment ? `
                            <div class="experiment-hint">
                                <strong>${t('learning.tryThis')}</strong> ${point.experiment}
                            </div>
                        ` : ''}
                    </div>
                `).join('')}
            </div>
        `;
    }

    /**
     * Render suggestions for next experiments
     */
    renderSuggestions(suggestions) {
        if (!suggestions || suggestions.length === 0) return '';

        return `
            <div class="suggestions-section">
                <h3>${t('suggestions.sectionTitle')}</h3>
                <div class="suggestions-list">
                    ${suggestions.map(suggestion => `
                        <div class="suggestion-item">
                            <span class="suggestion-icon">${suggestion.icon}</span>
                            <div class="suggestion-content">
                                <strong>${suggestion.action}</strong>
                                <p>${suggestion.reason}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    /**
     * Show a discovery celebration
     */
    showDiscovery(discovery) {
        const overlay = document.createElement('div');
        overlay.className = 'discovery-overlay';
        overlay.innerHTML = `
            <div class="discovery-modal">
                <div class="discovery-icon">${this.getDiscoveryIcon(discovery.celebrationType)}</div>
                <h2>${t('discoveries.title')}</h2>
                <h3>${discovery.concept}</h3>
                <p>${discovery.message}</p>
                <button class="discovery-dismiss">${t('discoveries.gotIt')}</button>
            </div>
        `;

        this.container.appendChild(overlay);

        // Animate in
        setTimeout(() => overlay.classList.add('visible'), 10);

        // Dismiss handler
        overlay.querySelector('.discovery-dismiss').addEventListener('click', () => {
            overlay.classList.remove('visible');
            setTimeout(() => overlay.remove(), 300);
        });
    }

    /**
     * Get icon for discovery type
     */
    getDiscoveryIcon(type) {
        const icons = {
            lightbulb: '💡',
            star: '⭐',
            globe: '🌍',
            radio: '📻'
        };
        return icons[type] || '🎉';
    }

    /**
     * Show a tutorial hint
     */
    showHint(hint) {
        const existingHint = this.container.querySelector('.hint-overlay');
        if (existingHint) existingHint.remove();

        const hintEl = document.createElement('div');
        hintEl.className = 'hint-overlay';
        hintEl.innerHTML = `
            <div class="hint-content">
                <h4>${hint.title}</h4>
                <p>${hint.content}</p>
            </div>
        `;

        this.container.appendChild(hintEl);

        // Auto-dismiss after 5 seconds
        setTimeout(() => {
            hintEl.classList.add('fade-out');
            setTimeout(() => hintEl.remove(), 300);
        }, 5000);
    }

    /**
     * Show loading state
     */
    showLoading() {
        const content = document.getElementById('feedback-content');
        content.innerHTML = `
            <div class="loading-state">
                <div class="radio-wave"></div>
                <p>${t('loading.transmitting')}</p>
            </div>
        `;
    }

    /**
     * Show band comparison
     */
    showBandComparison(comparison) {
        const modal = document.createElement('div');
        modal.className = 'comparison-modal';

        const changeIcon = comparison.strengthChange > 0 ? '📈' : '📉';
        const changeClass = comparison.strengthChange > 0 ? 'positive' : 'negative';

        modal.innerHTML = `
            <div class="comparison-content">
                <h3>${t('comparison.title')}</h3>
                <div class="comparison-bands">
                    <span>${comparison.bands[0]}</span>
                    <span class="comparison-arrow">→</span>
                    <span>${comparison.bands[1]}</span>
                </div>
                <div class="comparison-result ${changeClass}">
                    ${changeIcon} ${comparison.explanation}
                </div>
                <p class="comparison-reason">${comparison.keyDifference}</p>
            </div>
        `;

        // Find a good place to show this (could be in feedback panel or as overlay)
        const existing = this.container.querySelector('.comparison-modal');
        if (existing) existing.remove();

        this.container.appendChild(modal);

        // Auto-dismiss
        setTimeout(() => {
            modal.classList.add('fade-out');
            setTimeout(() => modal.remove(), 300);
        }, 4000);
    }

    /**
     * Clear the feedback panel
     */
    clear() {
        this.render();
    }
}
