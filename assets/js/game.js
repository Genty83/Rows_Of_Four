/**
 * Game module:
 * This module contains all the code for the game.
 * All game related functions are to be added to this file.
 * 
 * A complete list of functions can be seen below.
 * >>>
 * 
 */

// Imports - All all imports underneath here.

// Exported constants
export const GAME_CONTAINER = document.querySelector('.game-container');
export const HERO_CONTAINER = document.querySelector('.hero-container');
export const SETTINGS = {
  playerName: 'Player',
  pColor: '#C62828',
  pColorDark: '#B71C1C',
  cColor: '#FFEB3B',
  cColorDark: '#FDD835',
  bgColor: 'white',
  frameColor: 'blue',
  frameColorDark: 'navy',
  gameSounds: true
};
// Constants
const HOME_BTN = document.getElementById('game-home-btn');
const DELAY_COMP = 2; // seconds for the computer to take its turn
const GRID_COLS = 7; // number of grid columns
const GRID_ROWS = 6; // number of grid rows
const MARGIN = 0.02; // margin as a fraction of the shortest screen dimension
const TEXT_COMP = 'Computer';
const TEXT_TIE = 'Draw!';
const TEXT_COMP_WIN = 'Wins! Better Luck Next Time';
const TEXT_PLAYER_WIN = 'Wins! Congratulations!';

// *** THE BELOW BLOCK WILL RUN ONLY IF THE GAME CONTAINER DISPLAY IS NOT SET TO NONE ***
if (GAME_CONTAINER.style.display != 'none') {
  // Variables
  var canv = document.createElement("canvas");
  var ctx = canv.getContext("2d");
  var gameOver, gameTied, grid = [], playersTurn, timeComp, timeDelta, timeLast;
  var height, width, margin;
  // Append canvas to game container
  GAME_CONTAINER.appendChild(canv);

  // Call the set dimensions function
  setDimensions();

  // ** Event Listeners **
  // Calls the setDimensions function to resize container
  window.addEventListener("resize", setDimensions); 
  // Connects the home icon button to go back to landing page
  HOME_BTN.addEventListener('click', goToHomePage);
}

/**Function [goToHomePage] - Go to home page */
function goToHomePage() {
  HERO_CONTAINER.style.display = 'grid';
  GAME_CONTAINER.style.display = 'none';
}

/** Function: Sets the dimensions of the board */
function setDimensions() {

  height = window.innerHeight * 0.90;
  width = window.innerWidth;
  canv.height = height;
  canv.width = width;
  margin = MARGIN * Math.min(height, width);
  // Call the new game function
  
}

// Export functions for testing purposes

