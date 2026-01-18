/**
 * Tutorial System
 *
 * Provides an interactive guided tutorial for beginners.
 * Walks users through the basics of radio propagation simulation.
 */

import { t } from '../i18n/i18n.js';

/**
 * Tutorial step definition
 */
class TutorialStep {
    constructor(config) {
        this.id = config.id;
        this.targetSelector = config.targetSelector;  // Element to highlight
        this.position = config.position || 'bottom';  // Tooltip position
        this.waitForAction = config.waitForAction || null;  // Action to wait for
        this.onEnter = config.onEnter || null;  // Callback when step starts
        this.onExit = config.onExit || null;  // Callback when step completes
        this.allowClick = config.allowClick !== false;  // Allow clicking highlighted element
    }
}

/**
 * Main Tutorial class
 */
export class Tutorial {
    constructor(app) {
        this.app = app;
        this.currentStep = 0;
        this.isActive = false;
        this.overlay = null;
        this.tooltip = null;
        this.highlight = null;
        this.steps = this.defineSteps();

        // Bind methods
        this.handleAction = this.handleAction.bind(this);
        this.handleKeydown = this.handleKeydown.bind(this);
    }

    /**
     * Define all tutorial steps
     */
    defineSteps() {
        return [
            // Step 0: Welcome
            new TutorialStep({
                id: 'welcome',
                targetSelector: null,  // Center screen
                position: 'center',
                waitForAction: 'click'
            }),

            // Step 1: Explain the map
            new TutorialStep({
                id: 'map_intro',
                targetSelector: '#world-map',
                position: 'left',
                waitForAction: 'click'
            }),

            // Step 2: Your location
            new TutorialStep({
                id: 'your_location',
                targetSelector: '#world-map',
                position: 'left',
                waitForAction: 'click'
            }),

            // Step 3: Location selector
            new TutorialStep({
                id: 'location_selector',
                targetSelector: '.location-section',
                position: 'right',
                waitForAction: 'click'
            }),

            // Step 4: Day/Night explanation
            new TutorialStep({
                id: 'day_night',
                targetSelector: '#world-map',
                position: 'left',
                waitForAction: 'click'
            }),

            // Step 5: Grey line explanation
            new TutorialStep({
                id: 'grey_line',
                targetSelector: '#world-map',
                position: 'left',
                waitForAction: 'click'
            }),

            // Step 6: Skip zone explanation
            new TutorialStep({
                id: 'skip_zone',
                targetSelector: '#world-map',
                position: 'left',
                waitForAction: 'click'
            }),

            // Step 7: Band selection intro
            new TutorialStep({
                id: 'bands_intro',
                targetSelector: '.band-selector',
                position: 'right',
                waitForAction: 'click'
            }),

            // Step 8: Select 20m band
            new TutorialStep({
                id: 'select_band',
                targetSelector: '[data-band="20m"]',
                position: 'right',
                waitForAction: 'bandChange',
                allowClick: true
            }),

            // Step 9: Power level intro
            new TutorialStep({
                id: 'power_intro',
                targetSelector: '.power-selector',
                position: 'right',
                waitForAction: 'click'
            }),

            // Step 10: Antenna selection intro
            new TutorialStep({
                id: 'antenna_intro',
                targetSelector: '.antenna-selector',
                position: 'right',
                waitForAction: 'click'
            }),

            // Step 11: Yagi direction (temporarily select Yagi to show direction controls)
            new TutorialStep({
                id: 'antenna_yagi',
                targetSelector: '#antenna-direction-container',
                position: 'right',
                waitForAction: 'click',
                onEnter: (app) => {
                    // Select Yagi to show direction selector
                    app.controlsPanel.selectAntenna('yagi');
                },
                onExit: (app) => {
                    // Reset to default dipole
                    app.controlsPanel.selectAntenna('dipole');
                }
            }),

            // Step 12: Time control intro
            new TutorialStep({
                id: 'time_intro',
                targetSelector: '.time-control',
                position: 'right',
                waitForAction: 'click'
            }),

            // Step 13: Try changing time
            new TutorialStep({
                id: 'try_time',
                targetSelector: '#time-slider',
                position: 'right',
                waitForAction: 'timeChange',
                allowClick: true
            }),

            // Step 14: Solar activity explanation
            new TutorialStep({
                id: 'solar_activity',
                targetSelector: '.solar-activity-selector',
                position: 'right',
                waitForAction: 'click'
            }),

            // Step 15: Special events intro
            new TutorialStep({
                id: 'special_events',
                targetSelector: '.special-events-control',
                position: 'right',
                waitForAction: 'click'
            }),

            // Step 16: Sporadic E explanation (most exciting for new users)
            new TutorialStep({
                id: 'sporadic_e',
                targetSelector: '#sporadic-e-btn',
                position: 'right',
                waitForAction: 'click'
            }),

            // Step 17: Make first contact
            new TutorialStep({
                id: 'first_contact',
                targetSelector: '#world-map',
                position: 'left',
                waitForAction: 'contactAttempt',
                allowClick: true
            }),

            // Step 18: Explain results
            new TutorialStep({
                id: 'results_intro',
                targetSelector: '#feedback-panel',
                position: 'left',
                waitForAction: 'click'
            }),

            // Step 19: Factors explanation
            new TutorialStep({
                id: 'factors_explained',
                targetSelector: '.factors-section',
                position: 'left',
                waitForAction: 'click'
            }),

            // Step 20: Experiment prompt
            new TutorialStep({
                id: 'experiment',
                targetSelector: null,
                position: 'center',
                waitForAction: 'click'
            }),

            // Step 21: Completion
            new TutorialStep({
                id: 'complete',
                targetSelector: null,
                position: 'center',
                waitForAction: 'click'
            })
        ];
    }

    /**
     * Check if tutorial has been completed before
     */
    hasCompletedTutorial() {
        return localStorage.getItem('firstcontact-tutorial-completed') === 'true';
    }

    /**
     * Mark tutorial as completed
     */
    markCompleted() {
        localStorage.setItem('firstcontact-tutorial-completed', 'true');
    }

    /**
     * Reset tutorial (for testing or replay)
     */
    reset() {
        localStorage.removeItem('firstcontact-tutorial-completed');
        this.currentStep = 0;
    }

    /**
     * Start the tutorial
     */
    start() {
        if (this.isActive) return;

        this.isActive = true;
        this.currentStep = 0;

        // Create overlay elements
        this.createOverlay();

        // Add event listeners
        document.addEventListener('keydown', this.handleKeydown);

        // Show first step
        this.showStep(0);
    }

    /**
     * Stop the tutorial
     */
    stop() {
        if (!this.isActive) return;

        this.isActive = false;

        // Remove overlay elements
        this.removeOverlay();

        // Remove event listeners
        document.removeEventListener('keydown', this.handleKeydown);

        // Mark as completed
        this.markCompleted();
    }

    /**
     * Skip the tutorial
     */
    skip() {
        this.stop();
    }

    /**
     * Create overlay elements
     */
    createOverlay() {
        // Main overlay (darkens background)
        this.overlay = document.createElement('div');
        this.overlay.className = 'tutorial-overlay';
        this.overlay.innerHTML = `
            <div class="tutorial-backdrop"></div>
        `;
        document.body.appendChild(this.overlay);

        // Highlight element
        this.highlight = document.createElement('div');
        this.highlight.className = 'tutorial-highlight';
        this.overlay.appendChild(this.highlight);

        // Tooltip element
        this.tooltip = document.createElement('div');
        this.tooltip.className = 'tutorial-tooltip';
        this.overlay.appendChild(this.tooltip);
    }

    /**
     * Remove overlay elements
     */
    removeOverlay() {
        if (this.overlay) {
            this.overlay.remove();
            this.overlay = null;
            this.tooltip = null;
            this.highlight = null;
        }
    }

    /**
     * Show a specific tutorial step
     */
    showStep(stepIndex) {
        if (stepIndex >= this.steps.length) {
            this.stop();
            return;
        }

        const step = this.steps[stepIndex];
        this.currentStep = stepIndex;

        // Call onEnter if defined
        if (step.onEnter) {
            step.onEnter(this.app);
        }

        // Update highlight
        this.updateHighlight(step);

        // Update tooltip
        this.updateTooltip(step);

        // Setup action listener
        this.setupActionListener(step);
    }

    /**
     * Update the highlight element
     */
    updateHighlight(step) {
        if (!step.targetSelector) {
            // Center screen, no highlight
            this.highlight.style.display = 'none';
            return;
        }

        const target = document.querySelector(step.targetSelector);
        if (!target) {
            this.highlight.style.display = 'none';
            return;
        }

        // Find the scrollable parent container (#controls has overflow-y: auto)
        const scrollableParent = document.getElementById('controls');

        if (scrollableParent && target.closest('#controls')) {
            // Calculate if element is visible in the scrollable container
            const parentRect = scrollableParent.getBoundingClientRect();
            const targetRect = target.getBoundingClientRect();

            // Check if target is outside visible area of parent
            const isAbove = targetRect.top < parentRect.top;
            const isBelow = targetRect.bottom > parentRect.bottom;

            if (isAbove || isBelow) {
                // Calculate scroll position to center the element
                const targetMiddle = targetRect.top + targetRect.height / 2;
                const parentMiddle = parentRect.top + parentRect.height / 2;
                const scrollOffset = targetMiddle - parentMiddle;

                scrollableParent.scrollBy({ top: scrollOffset, behavior: 'smooth' });
            }
        } else {
            // Fallback: use scrollIntoView on the target for non-controls elements
            target.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
        }

        // Wait for scroll to complete, then position highlight
        setTimeout(() => {
            this.positionHighlight(target, step);
        }, 300);
    }

    /**
     * Position the highlight around a target element
     */
    positionHighlight(target, step) {
        const rect = target.getBoundingClientRect();
        const padding = 8;

        this.highlight.style.display = 'block';
        this.highlight.style.left = `${rect.left - padding}px`;
        this.highlight.style.top = `${rect.top - padding}px`;
        this.highlight.style.width = `${rect.width + padding * 2}px`;
        this.highlight.style.height = `${rect.height + padding * 2}px`;

        // Allow or block clicks on highlighted element
        this.highlight.style.pointerEvents = step.allowClick ? 'none' : 'auto';

        // Also reposition tooltip after scroll
        this.positionTooltip(step);
    }

    /**
     * Update the tooltip content and position
     */
    updateTooltip(step) {
        const stepNum = this.currentStep + 1;
        const totalSteps = this.steps.length;

        // Get translated content
        const title = t(`tutorial.steps.${step.id}.title`);
        const content = t(`tutorial.steps.${step.id}.content`);
        const actionHint = this.getActionHint(step);

        this.tooltip.innerHTML = `
            <div class="tutorial-tooltip-header">
                <span class="tutorial-step-indicator">${stepNum}/${totalSteps}</span>
                <button class="tutorial-skip-btn" title="${t('tutorial.skip')}">&times;</button>
            </div>
            <h3 class="tutorial-tooltip-title">${title}</h3>
            <p class="tutorial-tooltip-content">${content}</p>
            ${actionHint ? `<p class="tutorial-tooltip-action">${actionHint}</p>` : ''}
            <div class="tutorial-tooltip-buttons">
                ${this.currentStep > 0 ? `<button class="tutorial-btn tutorial-btn-back">${t('tutorial.back')}</button>` : ''}
                <button class="tutorial-btn tutorial-btn-next">${this.currentStep === this.steps.length - 1 ? t('tutorial.finish') : t('tutorial.next')}</button>
            </div>
        `;

        // Position tooltip
        this.positionTooltip(step);

        // Add button listeners
        this.tooltip.querySelector('.tutorial-skip-btn')?.addEventListener('click', () => this.skip());
        this.tooltip.querySelector('.tutorial-btn-back')?.addEventListener('click', () => this.previousStep());
        this.tooltip.querySelector('.tutorial-btn-next')?.addEventListener('click', () => this.nextStep());
    }

    /**
     * Get action hint text
     */
    getActionHint(step) {
        switch (step.waitForAction) {
            case 'bandChange':
                return t('tutorial.hints.clickToContinue');
            case 'timeChange':
                return t('tutorial.hints.dragSlider');
            case 'contactAttempt':
                return t('tutorial.hints.clickMap');
            default:
                return t('tutorial.hints.clickToContinue');
        }
    }

    /**
     * Position the tooltip relative to the target
     */
    positionTooltip(step) {
        const tooltipWidth = 320;
        const tooltipHeight = this.tooltip.offsetHeight || 200;
        const padding = 20;

        if (step.position === 'center' || !step.targetSelector) {
            // Center on screen
            this.tooltip.style.left = `${(window.innerWidth - tooltipWidth) / 2}px`;
            this.tooltip.style.top = `${(window.innerHeight - tooltipHeight) / 2}px`;
            this.tooltip.classList.add('tutorial-tooltip-center');
            return;
        }

        this.tooltip.classList.remove('tutorial-tooltip-center');

        const target = document.querySelector(step.targetSelector);
        if (!target) return;

        const rect = target.getBoundingClientRect();
        let left, top;

        switch (step.position) {
            case 'right':
                left = rect.right + padding;
                top = rect.top + (rect.height - tooltipHeight) / 2;
                break;
            case 'left':
                left = rect.left - tooltipWidth - padding;
                top = rect.top + (rect.height - tooltipHeight) / 2;
                break;
            case 'top':
                left = rect.left + (rect.width - tooltipWidth) / 2;
                top = rect.top - tooltipHeight - padding;
                break;
            case 'bottom':
            default:
                left = rect.left + (rect.width - tooltipWidth) / 2;
                top = rect.bottom + padding;
                break;
        }

        // Keep tooltip on screen
        left = Math.max(padding, Math.min(left, window.innerWidth - tooltipWidth - padding));
        top = Math.max(padding, Math.min(top, window.innerHeight - tooltipHeight - padding));

        this.tooltip.style.left = `${left}px`;
        this.tooltip.style.top = `${top}px`;
    }

    /**
     * Setup listener for the current step's action
     */
    setupActionListener(step) {
        // Remove previous listeners
        this.removeActionListeners();

        if (!step.waitForAction || step.waitForAction === 'click') {
            // Just wait for next/continue click
            return;
        }

        // Setup specific action listeners
        switch (step.waitForAction) {
            case 'bandChange':
                this.actionHandler = () => this.handleAction('bandChange');
                window.addEventListener('bandchange', this.actionHandler);
                break;

            case 'timeChange':
                this.actionHandler = () => this.handleAction('timeChange');
                const slider = document.querySelector('#time-slider');
                if (slider) {
                    slider.addEventListener('input', this.actionHandler);
                }
                break;

            case 'contactAttempt':
                this.actionHandler = () => this.handleAction('contactAttempt');
                window.addEventListener('contactattempt', this.actionHandler);
                break;
        }
    }

    /**
     * Remove action listeners
     */
    removeActionListeners() {
        if (this.actionHandler) {
            window.removeEventListener('bandchange', this.actionHandler);
            window.removeEventListener('contactattempt', this.actionHandler);
            const slider = document.querySelector('#time-slider');
            if (slider) {
                slider.removeEventListener('input', this.actionHandler);
            }
            this.actionHandler = null;
        }
    }

    /**
     * Handle an action being completed
     */
    handleAction(actionType) {
        const step = this.steps[this.currentStep];
        if (step.waitForAction === actionType) {
            // Small delay to let the UI update
            setTimeout(() => this.nextStep(), 300);
        }
    }

    /**
     * Handle keyboard input
     */
    handleKeydown(e) {
        if (e.key === 'Escape') {
            this.skip();
        } else if (e.key === 'ArrowRight' || e.key === 'Enter') {
            this.nextStep();
        } else if (e.key === 'ArrowLeft') {
            this.previousStep();
        }
    }

    /**
     * Go to next step
     */
    nextStep() {
        const step = this.steps[this.currentStep];

        // Call onExit if defined
        if (step.onExit) {
            step.onExit(this.app);
        }

        this.removeActionListeners();
        this.showStep(this.currentStep + 1);
    }

    /**
     * Go to previous step
     */
    previousStep() {
        if (this.currentStep > 0) {
            this.removeActionListeners();
            this.showStep(this.currentStep - 1);
        }
    }

    /**
     * Dispatch custom events for tutorial actions
     */
    static dispatchBandChange() {
        window.dispatchEvent(new CustomEvent('bandchange'));
    }

    static dispatchContactAttempt() {
        window.dispatchEvent(new CustomEvent('contactattempt'));
    }
}

/**
 * Create and show tutorial start prompt
 */
export function showTutorialPrompt(onStart, onSkip) {
    const prompt = document.createElement('div');
    prompt.className = 'tutorial-prompt-overlay';
    prompt.innerHTML = `
        <div class="tutorial-prompt">
            <div class="tutorial-prompt-icon">📻</div>
            <h2>${t('tutorial.prompt.title')}</h2>
            <p>${t('tutorial.prompt.description')}</p>
            <div class="tutorial-prompt-buttons">
                <button class="tutorial-btn tutorial-btn-skip">${t('tutorial.prompt.skip')}</button>
                <button class="tutorial-btn tutorial-btn-start">${t('tutorial.prompt.start')}</button>
            </div>
        </div>
    `;

    document.body.appendChild(prompt);

    // Animate in
    setTimeout(() => prompt.classList.add('visible'), 10);

    prompt.querySelector('.tutorial-btn-start').addEventListener('click', () => {
        prompt.classList.remove('visible');
        setTimeout(() => {
            prompt.remove();
            onStart();
        }, 300);
    });

    prompt.querySelector('.tutorial-btn-skip').addEventListener('click', () => {
        prompt.classList.remove('visible');
        setTimeout(() => {
            prompt.remove();
            onSkip();
        }, 300);
    });
}
