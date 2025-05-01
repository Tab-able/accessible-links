(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.accessibleLinks = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.applyFocus = applyFocus;
  _exports.handleFocusOnAnchor = handleFocusOnAnchor;
  _exports.onPageLoad = onPageLoad;
  _exports.onPopState = onPopState;
  _exports.removeFocus = removeFocus;
  // Define the class name to be applied to elements when they gain focus
  var focusClass = 'accessible-links-focused';

  // Set to track elements where we added tabindex
  var trackedElements = new Set();

  /**
   * Function to add focus-related attributes and class to the element
   * @param {HTMLElement} element - The target element to apply focus
   * @param {boolean} shouldFocus - Whether to trigger a focus event on the element
   */
  function applyFocus(element) {
    var shouldFocus = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
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
      trackedElements["delete"](element); // Stop tracking after removal
    }

    // Remove custom focus class
    element.classList.remove(focusClass);
  }

  /**
   * Function to handle focus on an anchor element
   * @param {string} anchorId - The ID or hash of the target anchor
   */
  function handleFocusOnAnchor(anchorId) {
    var destinationElement = document.querySelector(anchorId);
    if (destinationElement) {
      applyFocus(destinationElement);

      // Add a one-time event listener to clean up focus attributes on blur
      destinationElement.addEventListener('blur', function () {
        return removeFocus(destinationElement);
      }, {
        once: true
      });
    }
  }

  /**
   * Event listener for page load and handling hash focus
   */
  function onPageLoad() {
    if (window.location.hash) {
      var anchorId = window.location.hash;
      var destinationElement = document.querySelector(anchorId);
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
});
