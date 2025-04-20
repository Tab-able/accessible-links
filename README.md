# Accessible Links from Tab-able

## Overview
This plugin resolves focus management issues for internal links to improve accessibility for all users, particularly individuals relying on assistive technologies like screen readers.

### Features:
- **Automatic Focus Management**: Seamlessly adds the `tabindex` attribute with a value of `-1` to non-interactive elements targeted by internal links.
- **Enhanced Accessibility**: Ensures users are moved directly to the intended section without disruptions or resets to the top of the page.
- **Assistive Technology Compatibility**: Enhances user experiences for Windows Screen Magnifier, JAWS, and iOS VoiceOver. 
- **Lightweight Integration**: Works effortlessly with your WordPress site without requiring extensive configuration.
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

## Installation Guide
1. Clone or download the repository
   ```bash
   git clone https://github.com/Tab-able/accessible-links.git
   ```
2. Load the JS into each page of your website.