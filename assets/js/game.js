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
  bgColor: 'mintcream',
  frameColor: 'blue',
  frameColorDark: 'navy',
  gameSounds: true
};
// Constants
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
}



// Export functions for testing purposes

