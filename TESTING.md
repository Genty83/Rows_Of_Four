# Testing

## Contents

This site has been tested using the following testing procedures

* [Code Validation](#Code-validation)  

* [Lighthouse Testing](#Lighthouse-Testing)

* [Browser Compatibility](#Browser-Compatibility)

* [Manual Testing](#Manual-Testing)

* [Automated Testing](#Automated-Testing)

## Code Validation

The HTML code was validated using the [W3C Markup Validator](https://validator.w3.org/).

The CSS code was validated using the [W3C CSS Validator](https://jigsaw.w3.org/css-validator/).

The Javascript was validated using gthe [JSHints JavaScript Code Quality Tool](https://jshint.com/).

### W3C Markup validator

File | Image | Pass/Fail | Comments 
--- | --- | --- | ---
index.html | ![html validator image](./assets/images/readme/html-validator-img.png) | Pass | W3C Markup Validator returned no errors in the code but returned 1 info warning regarding a trailing slash on a link tag.
404.html | ![html validator image](./assets/images/readme/404-html-validator.png) | Pass | Code passed through with no issues. There was 1 trailing slash warning on a link tag which has been rectified.

### W3C CSS validator

File | Image | Pass/Fail | Comments 
--- | --- | --- | ---
style.css | ![css validator image](./assets/images/readme/css-validator-img.png) | Pass | CSS file passed through with no errors or warnings.

### JsHint Code Quality Tool

File | Image | Pass/Fail | Comments 
--- | --- | --- | ---
index.js | ![JsHint image](./assets/images/readme/index-jshint-img.png) | Pass | 2 warning were shown for missing semicolons. These have now been resolved.
game.js | ![JsHint image](./assets/images/readme/game-jshint-img.png) | Pass | 1 warning for a missing semicolon was shown which has now been resolved.
classes.js | ![JsHint image](./assets/images/readme/classes-jshint-img.png) | Pass | No issues were found when passing the file through the validator.

[Back to top ⇧](#Testing)

## Lighthouse Testing

### index.html file

Screen Size | Image | Pass/Fail | Comments 
--- | --- | --- | ---
Desktop | ![Lighthouse image](./assets/images/readme/landing-page-lighthouse-img.png) | Pass | No issues found when lighthouse report was ran on desktop version.
Mobile | ![Lighthouse image](./assets/images/readme/landing-page-lighthouse-img.png) | Pass | No issues found when lighthouse report was ran on mobile version.

### 404.html file

Screen Size | Image | Pass/Fail | Comments 
--- | --- | --- | ---
Desktop | ![Lighthouse image](./assets/images/readme/404-lighthouse-img.png) | Pass | No issues found when lighthouse report was ran on desktop version.
Mobile | ![Lighthouse image](./assets/images/readme/404-mobile-lighthouse-img.png) | Pass | No issues found when lighthouse report was ran on mobile version.

[Back to top ⇧](#Testing)

## Browser Compatibility

**Desktop**  

Browser | Outcome | Pass/Fail
--- | --- | ---
Google Chrome  | No issues were found | Pass
Microsoft Edge | No issues found | Pass
Firefox | No issues found | Pass

**Mobile**  

Device | Outcome | Pass/Fail
--- | --- | ---
MacBook Pro 15" | No appearance, responsiveness nor functionality issues. | Pass
Dell Latitude 5300 | No appearance, responsiveness nor functionality issues. | Pass
iPad Pro 12.9" | No appearance, responsiveness nor functionality issues. | Pass
iPad Pro 10.5" | No appearance, responsiveness nor functionality issues. | Pass
iPhone XR | No appearance, responsiveness nor functionality issues. | Pass
iPhone 7 | No appearance, responsiveness nor functionality issues. | Pass

[Back to top ⇧](#Testing)

## Manual Testing Issues

**index.html**

* A trailing slash in a link tag was picked up in the W3C validator. This was removed to clear the issue.

**style.css**

* Online resources were used to assist me with styling the color picker input box. 

**index.js**

* There was a small bug in the startGame function where the user could select the same colour coins and board colour. Alogical statememnt was added that shows an alert window to notify the user and prevent this happening.

**game.js**

* There was asmall issue with the board resizing due to the height and width variables in the setDimesions function.
These variables have been adjusted to rectify this issue.

* There is an issue with the game restarting when you resize the browser window. I am currently unable to solve this issue.

* An if statement was added to the displayResults function to play the winner and loser sounds. This was moved from its orignal location in the newGame function.

**classes.js**

* Stacked overflow and some other additional online sources were used to create thew functions to convert a colour from RGB to HSL and RGB to HEX in the CovertColor class.

## Automated Testing Issues



[Back to top ⇧](#Testing)