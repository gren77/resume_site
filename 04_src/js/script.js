// Variant switcher - no dependencies, vanilla JS only
(function () {
    'use strict';

    // Default active variant
    let activeVariant = 'lawfirm';

    /**
     * Update which content blocks are visible based on active variant
     * Elements with data-variant attribute are shown if they include the active variant
     * Elements without data-variant are always visible
     */
    function updateVisibleContent() {
        const variantElements = document.querySelectorAll('[data-variant]');

        variantElements.forEach(function (element) {
            const variants = element.getAttribute('data-variant').split(',').map(v => v.trim());

            if (variants.includes(activeVariant)) {
                element.classList.add('visible');
            } else {
                element.classList.remove('visible');
            }
        });
    }

    /**
     * Update active state on navigation buttons
     */
    function updateNavActiveState() {
        const buttons = document.querySelectorAll('.variant-btn');

        buttons.forEach(function (button) {
            const targetVariant = button.getAttribute('data-variant-target');

            if (targetVariant === activeVariant) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });
    }

    /**
     * Handle variant button click
     */
    function handleVariantClick(event) {
        const button = event.target;
        const newVariant = button.getAttribute('data-variant-target');

        if (newVariant && newVariant !== activeVariant) {
            activeVariant = newVariant;
            updateVisibleContent();
            updateNavActiveState();
        }
    }

    /**
     * Initialize variant system on page load
     */
    function init() {
        // Set initial state
        updateVisibleContent();
        updateNavActiveState();

        // Attach click handlers to variant buttons
        const buttons = document.querySelectorAll('.variant-btn');
        buttons.forEach(function (button) {
            button.addEventListener('click', handleVariantClick);
        });
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
