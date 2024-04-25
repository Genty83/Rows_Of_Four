/**
 * Classes module:
 * This module contains all the relevent class for the project.
 * Below is a list of the classes present in the file.
 * 
 * >>> GridCell:  This class is used to draw the coin on the board
 */

/**Class [GridCell] - This class is used to draw the coin on the board */
export class GridCell {
  constructor(left, top, w, h, row, col) {
    // Properties
    this.bot = top + h;
    this.left = left;
    this.right = left + w;
    this.top = top;
    this.w = w;
    this.h = h;
    this.gridCircle = 0.7;
    this.row = row;
    this.col = col;
    this.cx = left + w / 2;
    this.cy = top + h / 2;
    this.r = w * this.gridCircle / 2;
    this.highlight = null;
    this.owner = null;
    this.winner = false;
    this.colorWin = 'black';
  }

  /**
   * Used to get the x/y co-ordinates of the cell
   * @param {Number} x - cell x axis co-ordinates
   * @param {Number} y - cell y axis co-ordinates
   * @returns - the cell x/y co-ordinates
   */
  contains(x, y) {
    return x > this.left && x < this.right && y > this.top && y < this.bot;
  }

  /**
   * Method to fill the cell on the board
   * @param {CanvasRenderingContext2D} ctx 
   * @param {Object} Settings - Takes the game settings object
   */
  drawCell(ctx, Settings) {

    let cellColor, cellBorderColor;

    if (this.owner == null) {
      cellColor = Settings.bgColor;
      cellBorderColor = Settings.bgColor;
    } else if (this.owner) {
      cellColor = Settings.pColor;
      cellBorderColor = Settings.pColorDark;
    } else {
      cellColor = Settings.cColor;
      cellBorderColor = Settings.cColorDark;
    }

    // draw the circle
    ctx.fillStyle = cellColor;
    ctx.beginPath();
    ctx.arc(this.cx, this.cy, this.r, 0, Math.PI * 2);
    ctx.fill();

    // Draw the circle border
    ctx.lineWidth = this.r / 8;
    ctx.strokeStyle = Settings.frameColorDark;
    ctx.beginPath();
    ctx.arc(this.cx, this.cy, this.r, 0, Math.PI * 2);
    ctx.stroke();

    // Draw circle inner border
    ctx.lineWidth = 4;
    ctx.strokeStyle = cellBorderColor;
    ctx.beginPath();
    ctx.arc(this.cx, this.cy, this.r - 3, 0, Math.PI * 2);
    ctx.stroke();

    // draw highlighting on cell border
    if (this.winner || this.highlight != null) {

      // colour
      cellColor = this.winner ? this.colorWin : this.highlight ? Settings.pColor : Settings.cColor;

      // draw a circle around the perimeter
      ctx.lineWidth = this.r / 8;
      ctx.strokeStyle = cellColor;
      ctx.beginPath();
      ctx.arc(this.cx, this.cy, this.r, 0, Math.PI * 2);
      ctx.stroke();
    }
  }
}