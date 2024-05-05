/**
 * Main module:
 * This is the main js file.
 * Contains the main block to be called when the site loads
 */

// Imports - Add all imported functions and classes underneather this line.
import { SETTINGS, GAME_CONTAINER, HERO_CONTAINER, gameLoop, newGame } from "./game.js";
import { ConvertColor, AddGameSound } from "./classes.js";

// Constants
const START_BTN = document.getElementById('start-game-btn');
const INSTRUCTIONS_BTN = document.getElementById('instructions-btn');
const INSTRUCTIONS_FORM = document.getElementById('instructions-form');
const INSTRUCTIONS_CLOSE_BTN = document.getElementById('instructions-close-btn');
const OPTIONS_MENU = document.querySelector('.options-menu');
const OPTIONS_MENU_SAVE_BTN = document.getElementById('opt-save-btn');
const OPTIONS_MENU_CLOSE_BTN = document.getElementById('options-close-btn');

// *** CODE IN THIS BLOCK WILL ONLY RUN IF THE CONTAINER DISPLAY IS NOT NONE ***
if (HERO_CONTAINER.style.display != 'none') {

  // Event listeners
  INSTRUCTIONS_BTN.addEventListener('click', () => {
    INSTRUCTIONS_FORM.style.display = 'block';
    disableEvents(true);
  });

  INSTRUCTIONS_CLOSE_BTN.addEventListener('click', () => {
    INSTRUCTIONS_FORM.style.display = 'none';
    disableEvents(false);
  });
}

START_BTN.addEventListener('click', () => {
  OPTIONS_MENU.style.display = 'grid';
  disableEvents(true);
});

OPTIONS_MENU_CLOSE_BTN.addEventListener('click', () => {
  OPTIONS_MENU.style.display = 'none';
  disableEvents(false);
});

OPTIONS_MENU_SAVE_BTN.addEventListener('click', () => {
  startGame();
});

/**Function to log all game settings and switch to the game container */
function startGame() {

  // Variables
  let newGameSound = new AddGameSound('assets/audio/game-started.mp3');
  let pName = document.getElementById('p-name').value;
  let pColor = document.getElementById('p-color').value;
  let cColor = document.getElementById('c-color').value;
  let bgColor = document.getElementById('bg-color').value;
  let brdColor = document.getElementById('brd-color').value;
  let alertmsg = 'Cannot have 2 colours the same! Please select a different colour!';

  // Conditions
  if (pName != '') {
    SETTINGS.playerName = pName;
  }
  if (pColor == cColor || pColor == bgColor || pColor == brdColor) {
    alert(alertmsg);
    return;
  } else {
    SETTINGS.pColor = pColor;
    SETTINGS.pColorDark = new ConvertColor(pColor, -40).shadeColor();
  }
  if (cColor == pColor || cColor == bgColor || cColor == brdColor) {
    alert(alertmsg);
    return;
  } else {
    SETTINGS.cColor = cColor;
    SETTINGS.cColorDark = new ConvertColor(cColor, -40).shadeColor();
  }
  if (bgColor == pColor || bgColor == cColor || bgColor == brdColor) {
    alert(alertmsg);
    return;
  } else {
    SETTINGS.bgColor = bgColor;
  }
  if (brdColor == cColor || brdColor == pColor || brdColor == bgColor) {
    alert(alertmsg);
    return;
  } else {
    SETTINGS.frameColor = brdColor;
    SETTINGS.frameColorDark = new ConvertColor(brdColor, -40).shadeColor();
  }
  // Switch container
  HERO_CONTAINER.style.display = 'none';
  GAME_CONTAINER.style.display = 'flex';
  // game loop
  requestAnimationFrame(gameLoop);
  // Call newGame function
  newGame();
  // Close the options menu
  OPTIONS_MENU.style.display = 'none';
  // Play new game sound
  newGameSound.play(SETTINGS.gameSounds);
  // Re-enable events
  disableEvents(false);
}

/**
 * Function [disableEvents] - Disable/enable pointer events for containers
 * @param {Boolean} state - Boolean value to determine events on or off
 */
function disableEvents(state) {

  let topContainer = document.querySelector('.content-top-container');
  let bottomContainer = document.querySelector('.content-bottom-container');

  if (state) {
    topContainer.style.pointerEvents = 'none';
    bottomContainer.style.pointerEvents = 'none';
  } else {
    topContainer.style.pointerEvents = 'auto';
    bottomContainer.style.pointerEvents = 'auto';
  }
}