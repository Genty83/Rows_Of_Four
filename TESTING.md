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

### Testing User Stories

* As a player, I want the game's website to be easy to navigate.

    - The website offers an intuitive structure for the player to find easily the information or section they are looking for.

    - The navigation bar is clearly presented to assist with the site's navigation.

* As a player, I want the game to be fun and engaging.

    - The game offers a level of customization for the user to change display aspects of the game. 

    - The computer difficulty is random offering players of all ages the abilty to beat the game.

* As a player, I want to have easy access to the game instructions.

    - The instructions are presents in a popup window easily accessable by clicking a button.

* As a player, I want the game controls to be easy to access during the game.

    - The game highlights on the board the colour of the player whos turn it is and where the coin will drop.

    - The controls are described in the instructions popup.

* As a player, I want to be able to play the game on different devices.

    - The game has been fully tested for responsiveness accross all devices.

### Landing Page

Test | Outcome | Pass/Fail
--- | --- | ---
Facebook | When clicking on the facebook link, it opens a new page in the browser and redirects me to the site. | Pass
Instagram | When clicking on the instagram link, it opens a new page in the browser and redirects me to the site. | Pass
Twitter | When clicking on the twitter link, it opens a new page in the browser and redirects me to the site. | Pass
Twitter | When clicking on the twitter link, it opens a new page in the browser and redirects me to the site. | Pass
Instructions Button | When the instruction button is clicked, it opens the instructions window | Pass
New Game Button | When the new game button is clicked it pens the options menu window | Pass
Intructions Window | When the instructions window is open, there is a close button present for the user to close the window | Pass
Instructions Window | When the instructions window is open, it prevents the user from clicking anywhere else on the page until the window is closed | Pass
Game Options Window | The game options window has a working close button to provide the uoption for the user to close the window | Pass
Game Options Window | The game options window provides an input field for entering the users name. | Pass
Game Options Window | The options game window provides the controls required for changing the appearance of the game. | Pass
Game Options Window | The game options menu provides a button to save the user changes | Pass
Game Options Window | Clicking the save button directs the user to the game | Pass
Game Options Window | The changes made in the options menu are reflected when the game starts | Pass

### 404 Page

Test | Outcome | Pass/Fail
--- | --- | ---
Return Home Button | Clicking the return home button takes the user back to the home page | Pass

### Game page

Test | Outcome | Pass/Fail
--- | --- | ---
Header | The header provides an icon button to redirect the user back to the landing page | Pass
Header | The header provides an icon button to mute and un-mute the in game sounds | Pass
Game board | When the user hovers over a cell, the cell is highlighted in the user chosen colour | Pass
Game Board | When the user clicked on a cell, the coin is visible in the expected location on the board | Pass
Game Board | When the user has 4 coins in a row, a popup window is displayed to show the user they have won the game | Pass
Game Board | When the computer has 4 coins in a row, a popup window is displayed to show the user the computer has won the game | Pass
Game Board | The game is over when the user or computer has 4 coins in a row either vertically, horintally or diagonally in both directions | Pass
Game board | Changes made in the game options menu are reflected in the appearance of the game board | Pass
Popup window | The end of game popup window displays the correct game winner information | Pass
Popup window | When the end of game popup is displayed, clicking anywhere in the window ouside the popup window starts a new game | Pass
Game Sounds | The game sounds work as expected | Pass


## Automated Testing Issues

Jest was used to run a small amount of automated test on the ColorConvertor class. All these tests passed.


[Back to top ⇧](#Testing)