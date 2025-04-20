"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.applyFocus = applyFocus;
exports.handleFocusOnAnchor = handleFocusOnAnchor;
exports.onPageLoad = onPageLoad;
exports.onPopState = onPopState;
exports.removeFocus = removeFocus;
// Define the class name to be applied to elements when they gain focus
var focusClass = 'accessible-links-focused';

/**
 * Function to add focus-related attributes and class to the element
 * @param {HTMLElement} element - The target element to apply focus
 * @param {boolean} shouldFocus - Whether to trigger a focus event on the element
 */
function applyFocus(element) {
  var shouldFocus = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  // Add tabindex attribute with value -1 to make the element programmatically focusable
  element.setAttribute('tabindex', '-1');

  // Add a custom class to indicate the element has focus
  element.classList.add(focusClass);

  // Trigger a focus event on the element if shouldFocus is true
  if (shouldFocus) {
    element.focus(); // Programmatically set focus to the element
  }
}

/**
 * Function to clean up focus-related attributes and class
 * @param {HTMLElement} element - The target element to clean up
 */
function removeFocus(element) {
  // Remove the tabindex attribute to restore the element's default state
  element.removeAttribute('tabindex');

  // Remove the custom focus class
  element.classList.remove(focusClass);
}

/**
 * Function to handle focus on an anchor element
 * @param {string} anchorId - The ID or hash of the target anchor
 */
function handleFocusOnAnchor(anchorId) {
  // Find the target element based on the anchor ID or hash
  var destinationElement = document.querySelector(anchorId);
  if (destinationElement) {
    // Apply focus-related attributes and optionally trigger the focus event
    applyFocus(destinationElement);

    // Add a one-time event listener to clean up the focus attributes on blur
    destinationElement.addEventListener('blur', function () {
      return removeFocus(destinationElement);
    }, {
      once: true
    } // Ensure the listener is removed after being triggered
    );
  }
}

/**
 * Event listener for page load and handling hash focus
 * Ensures the focus is applied to the target element when a hash is present in the URL
 */
function onPageLoad() {
  if (window.location.hash) {
    var anchorId = window.location.hash;

    // Apply focus and trigger the focus event specifically for page load
    var destinationElement = document.querySelector(anchorId);
    if (destinationElement) {
      applyFocus(destinationElement, true); // Pass true to trigger focus
    }
  }
}

/**
 * Event listener for browser history navigation and hash focus
 * Ensures focus is reapplied to the target element when navigating via browser history
 */
function onPopState() {
  if (window.location.hash) {
    handleFocusOnAnchor(window.location.hash);
  }
}

// Attach event listeners to handle focus on page load and browser navigation
window.addEventListener('load', onPageLoad); // Trigger on page load
window.addEventListener('popstate', onPopState); // Trigger on browser history navigation
