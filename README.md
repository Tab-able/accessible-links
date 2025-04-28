# Accessible Links from Tab-able
Looking for the node package [@tabable/accessible-links](https://www.npmjs.com/package/@tabable/accessible-links)?

## Overview
This plugin resolves <a href="https://codepen.io/Tab-able/full/dPPPONR">focus management issues</a> for internal links to improve accessibility for all users, particularly individuals relying on assistive technologies like screen readers.

### Features:
- **Automatic Focus Management**: Seamlessly adds the `tabindex` attribute with a value of `-1` to non-interactive elements targeted by internal links.
- **Enhanced Accessibility**: Ensures users are moved directly to the intended section without disruptions or resets to the top of the page.
- **Assistive Technology Compatibility**: Enhances user experiences for Windows Screen Magnifier, JAWS, and iOS VoiceOver. 
- **Lightweight Integration**: Works effortlessly with your site without requiring extensive configuration.
- **Customization Option**: Applies a class to the focused element, enabling tailored styling.

## How It Works

1. **For Links with DOM Anchors**:
   - When a link pointing to a DOM anchor is activated:
     - The target content receives the attribute `tabindex="-1"`.
     - The target content is also assigned the class `accessible-links-focused`.

2. **On Blur**:
   - When focus leaves the target content:
     - The `tabindex="-1"` attribute is removed.
     - The `accessible-links-focused` class is also removed.

3. **For Links Navigating to Content on New Pages**:
   - When a link leading to content on a new page is activated:
     - Upon loading the new page, a focus event is initialized for the targeted content.
     - Steps 1 and 2 are then applied, ensuring the intended focus management is performed.

---
## Installation Guide for Non-npm Users

If you are not using npm and would like to embed the JavaScript file directly into your HTML, follow these steps:

### 1. Download the File
Download the minified JavaScript file (`script.min.js`) from the `/dist` folder.

### 2. Embed the Script
Add the following `<script>` tag to your HTML file to include the JavaScript file:
```html
<script src="path-to/accessible-links.min.js"></script>
```
### 3. Automatic Functionality
Once the script is embedded, the following features are automatically activated:
- Focus on Page Load: If the URL contains a hash (e.g., `#section1`), the corresponding element with the matching ID will gain focus when the page loads.
- Focus on Browser Navigation: When navigating browser history using the back/forward buttons, the script ensures focus is reapplied to the appropriate element.

You don’t need to manually call any functions or add event listeners—they are already included in the script.
Example usage:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Accessible Links Example</title>
</head>
<body>
    <a href="#section1">Go to Section 1</a>
    <div id="section1">Section 1 Content</div>

    <!-- Place your script at the end of the DOM -->
    <script src="script.min.js"></script>
</body>
</html>
```

## Installation Guide for Node.js

1. Install the package using:
   ```bash
   npm install accessible-links
   ```
2. Import and use it in your Node.js project. 
   Example usage:
   ```bash
   const { onPageLoad, onPopState } = require('accessible-links');

   // Set up event listeners to handle focus management
   window.addEventListener('load', onPageLoad); // Ensures focus is handled when the page loads with a hash fragment
   window.addEventListener('popstate', onPopState); // Reapplies focus when navigating browser history
   ```

## Execute The Build
To optimize the JavaScript file for production, follow these steps:

1. **Install Dependencies**:
   ```bash
   npm install
   ```
2. **Run the Build Script**:
   ```bash
   npm run build
   ``` 
