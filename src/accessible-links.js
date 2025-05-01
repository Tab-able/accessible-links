// Define the class name to be applied to elements when they gain focus
const focusClass = 'accessible-links-focused';

// Set to track elements where we added tabindex
const trackedElements = new Set();

/**
 * Function to add focus-related attributes and class to the element
 * @param {HTMLElement} element - The target element to apply focus
 * @param {boolean} shouldFocus - Whether to trigger a focus event on the element
 */
function applyFocus(element, shouldFocus = false) {
    // Add tabindex only if it doesn't exist
    if (!element.hasAttribute('tabindex')) {
        element.setAttribute('tabindex', '-1');
        trackedElements.add(element); // Track that we added this attribute
    }

    // Add a custom class to indicate focus
    element.classList.add(focusClass);

    // Trigger focus event if needed
    if (shouldFocus) {
        element.focus();
    }
}

/**
 * Function to clean up focus-related attributes and class
 * @param {HTMLElement} element - The target element to clean up
 */
function removeFocus(element) {
    // Remove tabindex only if we previously added it
    if (trackedElements.has(element)) {
        element.removeAttribute('tabindex');
        trackedElements.delete(element); // Stop tracking after removal
    }

    // Remove custom focus class
    element.classList.remove(focusClass);
}

/**
 * Function to handle focus on an anchor element
 * @param {string} anchorId - The ID or hash of the target anchor
 */
function handleFocusOnAnchor(anchorId) {
    const destinationElement = document.querySelector(anchorId);

    if (destinationElement) {
        applyFocus(destinationElement);

        // Add a one-time event listener to clean up focus attributes on blur
        destinationElement.addEventListener('blur', () => removeFocus(destinationElement), { once: true });
    }
}

/**
 * Event listener for page load and handling hash focus
 */
function onPageLoad() {
    if (window.location.hash) {
        const anchorId = window.location.hash;
        const destinationElement = document.querySelector(anchorId);
        if (destinationElement) {
            applyFocus(destinationElement, true);
        }
    }
}

/**
 * Event listener for browser history navigation and hash focus
 */
function onPopState() {
    if (window.location.hash) {
        handleFocusOnAnchor(window.location.hash);
    }
}

// Attach event listeners to handle focus on page load and browser navigation
window.addEventListener('load', onPageLoad);
window.addEventListener('popstate', onPopState);

export { applyFocus, removeFocus, handleFocusOnAnchor, onPageLoad, onPopState };