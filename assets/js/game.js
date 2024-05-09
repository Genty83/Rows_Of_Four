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
import { GridCell, ResultsWindow, AddGameSound } from "./classes.js";

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
const SOUND_BTN = document.getElementById('game-volume-btn');
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
  // Create a new instance of the results window
  var resultsWin = new ResultsWindow(GAME_CONTAINER);
  // Class instances for game sounds
  var coinSound = new AddGameSound('assets/audio/coin-drop.mp3');
  var successSound = new AddGameSound('assets/audio/success.mp3');
  var failSound = new AddGameSound('assets/audio/fail.mp3');

  // Call the set dimensions function
  setDimensions();

  // ** Event Listeners **
  // Calls the setDimensions function to resize container
  window.addEventListener("resize", setDimensions); 
  // Connects the home icon button to go back to landing page
  HOME_BTN.addEventListener('click', goToHomePage);
  // Add event listener for sound button
  SOUND_BTN.addEventListener('click', toggleSound);
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
  computerTurn(timeDelta);
  // Fill the canvas background color
  fillCanvasBackground();
  // Draw the grid
  drawGrid();
  // Call the display result function
  displayResult();

  // call the next frame
  requestAnimationFrame(gameLoop);
}

/**Function [click] - Called when the user clicks on a cell in the board */
function click() {

  if (gameOver) {
    newGame();
    resultsWin.hide();
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

/**Function [winner] - Checks the board for a potential winner */
export function winner(cells = []) {

  let count = 0, lastOwner = null;
  let winningCells = [];
  for (let i = 0; i < cells.length; i++) {

    // If there is no owner, reset the count
    if (cells[i].owner == null) {
      count = 0;
      winningCells = [];
    }
    // If it the same owner, add to the count
    else if (cells[i].owner == lastOwner) {
      count++;
      winningCells.push(cells[i]);
    }
    // If there is a new owner then new count
    else {
      count = 1;
      winningCells = [];
      winningCells.push(cells[i]);
    }
    // set the lastOwner
    lastOwner = cells[i].owner;
    // four in a row is a win
    if (count == 4) {
      for (let cell of winningCells) {
        cell.winner = true;
      }
      return true;
    }
  }
  return false;
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
  // Game sound function will go here
  coinSound.play(SETTINGS.gameSounds);
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
  createGrid();
}

/**Function [goComputer] - Calculates the computers turn.
 * Checks from a variety of options based on priority order.
 */
function computerTurn(delta) {

  // set up the options array
  let compOptions = [];
  compOptions[0] = []; // computer wins
  compOptions[1] = []; // block the player from winning
  compOptions[2] = []; // no significance
  compOptions[3] = []; // give away a win

  // If players turn or game over then exit function
  if (playersTurn || gameOver) {
    return;
  }

  // count down till the computer makes its selection
  if (timeComp > 0) {
    timeComp -= delta;
    if (timeComp <= 0) {
      selectCell();
    }
    return;
  }

  // loop through each column
  let cell;
  for (let i = 0; i < GRID_COLS; i++) {
    cell = highlightCell(grid[0][i].cx, grid[0][i].cy);

    // column full, go to the next column
    if (cell == null) {
      continue;
    }

    // first priority, computer wins
    cell.owner = playersTurn;
    if (checkWin(cell.row, cell.col)) {
      compOptions[0].push(i);
    } else {

      // second priority, block the player
      cell.owner = !playersTurn;
      if (checkWin(cell.row, cell.col)) {
        compOptions[1].push(i);
      } else {
        cell.owner = playersTurn;

        // check the cell above
        if (cell.row > 0) {
          grid[cell.row - 1][cell.col].owner = !playersTurn;
          // last priority, let player win
          if (checkWin(cell.row - 1, cell.col)) {
            compOptions[3].push(i);
          }
          // third priority, no significance
          else {
            compOptions[2].push(i);
          }
          // deselect cell above
          grid[cell.row - 1][cell.col].owner = null;
        }
        // no row above, third priority, no significance
        else {
          compOptions[2].push(i);
        }
      }
    }

    // cancel highlight and selection
    cell.highlight = null;
    cell.owner = null;
  }

  // clear the winning cells
  for (let row of grid) {
    for (let cell of row) {
      cell.winner = false;
    }
  }

  // randomly select a column in priority order
  let col;
  if (compOptions[0].length > 0) {
    col = compOptions[0][Math.floor(Math.random() * compOptions[0].length)];
  } else if (compOptions[1].length > 0) {
    col = compOptions[1][Math.floor(Math.random() * compOptions[1].length)];
  } else if (compOptions[2].length > 0) {
    col = compOptions[2][Math.floor(Math.random() * compOptions[2].length)];
  } else if (compOptions[3].length > 0) {
    col = compOptions[3][Math.floor(Math.random() * compOptions[3].length)];
  }

  // highlight the selected cell
  highlightCell(grid[0][col].cx, grid[0][col].cy);

  // set the delay
  timeComp = DELAY_COMP;
}

/**Function [displayResult] - Displays the result of the winner*/
function displayResult() {
  // Exit function if gameover variable does not equal true.
  if (!gameOver) {
    return;
  } else {
    if (playersTurn) {
      // Play success game sound
      successSound.play(SETTINGS.gameSounds);
    } else {
      // Play fail sound
      failSound.play(SETTINGS.gameSounds);
    }
  }

  let text;
  if (gameTied) {
    text = TEXT_TIE;
  } else {
    if (playersTurn) {
      text = SETTINGS.playerName + '  ' + TEXT_PLAYER_WIN;
    } else {
      text = TEXT_COMP + '  ' + TEXT_COMP_WIN;
    }
  }
  // Play sound & Show results window
  resultsWin.show(text);
}

/** Function [toggleSound] - Toggles the game sound on or off */
function toggleSound() {
  if (SETTINGS.gameSounds) {
    SETTINGS.gameSounds = false;
    SOUND_BTN.textContent = 'volume_off';
  } else {
    SETTINGS.gameSounds = true;
    SOUND_BTN.textContent = 'volume_up';
  }
}