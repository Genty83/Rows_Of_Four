/**
 * Game module:
 * This module contains all the code for the game.
 * All game related functions are to be added to this file.
 * 
 * A complete list of functions can be seen below.
 * >>> goToHomePage - Takes you back to the home page.
 * >>> gameLoop - Starts the game loop.
 * >>> setDimensions - Sets the canvas dimensions.
 * >>> fillCanvasBackground - Fills the canvas background color.
 */

// Imports - All all imports underneath here.
import { GridCell } from "./classes.js";

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
  // Add click events to canvas
  canv.addEventListener("click", click);
  canv.addEventListener("mousemove", highlightGrid);
}

/**Function [goToHomePage] - Go to home page */
function goToHomePage() {
  HERO_CONTAINER.style.display = 'grid';
  GAME_CONTAINER.style.display = 'none';
}

/**Export Function [gameLoop] - Starts the game loop */
export function gameLoop(timeNow) {
  // initialise timeLast
  if (!timeLast) {
    timeLast = timeNow;
  }
  // calculate the time difference
  timeDelta = (timeNow - timeLast) / 1000; // seconds
  timeLast = timeNow;
  // update go computer function
  
  // Fill the canvas background color
  fillCanvasBackground();
  // Draw the grid
  drawGrid();

  // call the next frame
  requestAnimationFrame(gameLoop);
}

/**Function [click] - Called when the user clicks on a cell in the board */
function click() {

  if (gameOver) {
    newGame();
    return;
  }

  if (!playersTurn) {
    return;
  }

  selectCell();
}

/**Function [checkWin] - Checks if the game is a win */
function checkWin(row, col) {

  // get all the cells from each direction
  let diagL = [], diagR = [], horiz = [], vert = [];
  for (let i = 0; i < GRID_ROWS; i++) {
    for (let j = 0; j < GRID_COLS; j++) {

      // horizontal cells
      if (i == row) {
        horiz.push(grid[i][j]);
      }

      // vertical cells
      if (j == col) {
        vert.push(grid[i][j]);
      }

      // top left to bottom right
      if (i - j == row - col) {
        diagL.push(grid[i][j]);
      }

      // top right to bottom left
      if (i + j == row + col) {
        diagR.push(grid[i][j]);
      }
    }
  }

  // if any have four in a row, return a win!
  return winner(diagL) || winner(diagR) || winner(horiz) || winner(vert);
}

/**Function [fillCanvasBackground] - Fills the canvas background */
function fillCanvasBackground() {
  ctx.fillStyle = SETTINGS.bgColor;
  ctx.fillRect(0, 0, width, height);
}

/**Function [drawGrid] - Draws the board on the canvas */
function drawGrid() {

  // frame and button
  let cell = grid[0][0];
  let fh = cell.h * GRID_ROWS;
  let fw = cell.w * GRID_COLS;
  ctx.fillStyle = SETTINGS.frameColor;
  ctx.fillRect(cell.left, cell.top, fw, fh);

  ctx.lineWidth = 6;
  ctx.strokeStyle = SETTINGS.frameColorDark;
  ctx.strokeRect(cell.left, cell.top, fw, fh);

  ctx.fillStyle = SETTINGS.frameColorDark;
  ctx.fillRect(cell.left - margin / 2, cell.top + fh - margin / 2, fw + margin, margin);

  // cells
  for (let row of grid) {
    for (let cell of row) {
      cell.drawCell(ctx, SETTINGS);
    }
  }
}

/**Function [createGrid] - Creates the grid */
function createGrid() {

  grid = [];

  // set up cell size and margins
  let cell, marginX, marginY;

  // portrait mode
  if ((width - margin * 2) * GRID_ROWS / GRID_COLS < height - margin * 2) {
    cell = (width - margin * 2) / GRID_COLS;
    marginX = margin;
    marginY = (height - cell * GRID_ROWS) / 2;
  }

  // landscape mode
  else {
    cell = (height - margin * 2) / GRID_ROWS;
    marginX = (width - cell * GRID_COLS) / 2;
    marginY = margin;
  }

  // populate the grid
  for (let i = 0; i < GRID_ROWS; i++) {
    grid[i] = [];
    for (let j = 0; j < GRID_COLS; j++) {
      let left = marginX + j * cell;
      let top = marginY + i * cell;
      grid[i][j] = new GridCell(left, top, cell, cell, i, j);
    }
  }
}

/**Function [highlightCell] - Highlights the cell border when the cursor hovers over it. */
function highlightCell(x, y) {
  let col = null;
  for (let row of grid) {
    for (let cell of row) {

      // clear existing highlighting
      cell.highlight = null;

      // get the column
      if (cell.contains(x, y)) {
        col = cell.col;
      }
    }
  }

  if (col == null) {
    return;
  }

  // highlight the first unoccupied cell 
  for (let i = GRID_ROWS - 1; i >= 0; i--) {
    if (grid[i][col].owner == null) {
      grid[i][col].highlight = playersTurn;
      return grid[i][col];
    }
  }
  return null;
}

/**Funtion [highlightGrid] -  */
function highlightGrid(/** @type {MouseEvent} */ ev) {
  if (!playersTurn || gameOver) {
    return;
  }
  highlightCell(ev.clientX, ev.clientY);
}

/**Function [selectCell] - Selects the cell to fill on the board */
function selectCell() {

  let highlighting = false;
  OUTER: for (let row of grid) {
    for (let cell of row) {
      if (cell.highlight != null) {
        highlighting = true;
        cell.highlight = null;
        cell.owner = playersTurn;
        if (checkWin(cell.row, cell.col)) {
          gameOver = true;
        }
        break OUTER;
      }
    }
  }

  // don't allow selection if no highlighting
  if (!highlighting) {
    return;
  }

  // check for a tied game
  if (!gameOver) {
    gameTied = true;
    OUTER: for (let row of grid) {
      for (let cell of row) {
        if (cell.owner == null) {
          gameTied = false;
          break OUTER;
        }
      }
    }

    // set game over
    if (gameTied) {
      gameOver = true;
    }
  }

  // switch the player if no game over
  if (!gameOver) {
    playersTurn = !playersTurn;
  }
  if (SETTINGS.gameSounds) {
    // Call method from GameSound class to play coin drop sound
    GAME_SOUND.playSound('assets/audio/coin-drop.mp3');
  }
}

/** Function: Sets the dimensions of the board */
function setDimensions() {

  height = window.innerHeight * 0.90;
  width = window.innerWidth;
  canv.height = height;
  canv.width = width;
  margin = MARGIN * Math.min(height, width);
  // Call the new game function
  newGame();
}

/**Function: Creates a new game */
export function newGame() {
  // Use math.random to determine which player starts
  playersTurn = Math.random() < 0.5;
  gameOver = false;
  gameTied = false;
  // Call the createGrid function
  createGrid()
}


// Export functions for testing purposes

