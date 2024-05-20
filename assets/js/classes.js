/**
 * Classes module:
 * This module contains all the relevent class for the project.
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

// Class [ConvertColor] - For converting a color passed in lighter or darker
export class ConvertColor {
  /**
   * Class [ConvertColor]: Provides some handy methods to lighten or darken a color passed to the class
   * @param {string} color - The color to be converted. Can be RGB, hex or hsl
   * @param {number} percent - The percentage you would like to lighten or darken the color by
   */
  constructor(color, percent) {
    this.color = color;
    this.percent = percent;

    if (color.charAt(0) == 'h') {
      this.color = this.hslToHex(this.color);
    }
    if (color.charAt(0) == 'r') {
      this.color = this.RGBToHex(this.color);
    }
  }

  /**Method [shadeColor]: shades the color passed by the percentage passed into the constructor */
  shadeColor() {

    var R = parseInt(this.color.substring(1, 3), 16);
    var G = parseInt(this.color.substring(3, 5), 16);
    var B = parseInt(this.color.substring(5, 7), 16);

    R = parseInt(R * (100 + this.percent) / 100);
    G = parseInt(G * (100 + this.percent) / 100);
    B = parseInt(B * (100 + this.percent) / 100);

    R = (R < 255) ? R : 255;
    G = (G < 255) ? G : 255;
    B = (B < 255) ? B : 255;

    R = Math.round(R);
    G = Math.round(G);
    B = Math.round(B);

    var RR = ((R.toString(16).length == 1) ? "0" + R.toString(16) : R.toString(16));
    var GG = ((G.toString(16).length == 1) ? "0" + G.toString(16) : G.toString(16));
    var BB = ((B.toString(16).length == 1) ? "0" + B.toString(16) : B.toString(16));

    return "#" + RR + GG + BB;
  }

  /**Method [RGBToHex]: Can be used to convert an rgb color into a hex color */
  RGBToHex(rgb) {
    // Choose correct separator
    let sep = rgb.indexOf(",") > -1 ? "," : " ";
    // Turn "rgb(r,g,b)" into [r,g,b]
    rgb = rgb.substr(4).split(")")[0].split(sep);

    let r = (+rgb[0]).toString(16),
      g = (+rgb[1]).toString(16),
      b = (+rgb[2]).toString(16);

    if (r.length == 1)
      r = "0" + r;
    if (g.length == 1)
      g = "0" + g;
    if (b.length == 1)
      b = "0" + b;

    return "#" + r + g + b;
  }

  /**
   * Method [hslToHex]: Converts a hsl color to an rgb color
   * @param {string} hsl 
   */
  hslToHex(hsl) {

    let sep = hsl.indexOf(",") > -1 ? "," : " ";
    hsl = hsl.substring(4).split(")")[0].split(sep);

    let h = hsl[0],
      s = hsl[1].slice(0, -1),
      l = hsl[2].slice(0, -1);

    l /= 100;
    const a = s * Math.min(l, 1 - l) / 100;
    const f = n => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color).toString(16).padStart(2, '0');
    };
    return `#${f(0)}${f(8)}${f(4)}`;
  }
}

// Results window class
export class ResultsWindow {
  /**
   * 
   * @param {Element} container - The html container where the window is to be displayed
   */
  constructor(container) {
    this.con = container;

    // Create window
    this.win = document.createElement('div');
    this.win.className = 'results-win';
    //
    this.hTag = document.createElement('h1');
    this.win.append(this.hTag);
    // Append to container
    this.con.append(this.win);

  }

  /**Method [show] - Shows the result window and the text to be displayed
   * @param {string} txt 
   */
  show(txt) {
    this.hTag.textContent = txt;
    this.win.style.display = 'grid';
  }

  /**Method [hide] - Hides the results window */
  hide() {
    this.win.style.display = 'none';
  }
}

// Game sound class
export class AddGameSound {
  /**
   * Class for adding an audio tag to the document body
   * Contains method for playing, pausing and resetting
   *  the sound passed in to the constructor
   * @param {String} src - The source path for the sound to be added to the audio tag
   */
  constructor(src) {
    this.src = src;

    // Create the audio tag
    this.audioTag = document.createElement('audio');
    this.audioTag.src = this.src;
    document.body.append(this.audioTag);
  }

  /**
   * Method - Plays the sound from the file passed in the constructor
   * @param {Boolean} state - If true is passed in, the sound will play
   */
  play(state) {
    if (state) {
      this.audioTag.currentTime = 0;
      this.audioTag.play();
    }
  }

  /**
   * Method - Pauses the sound from the file passed in the constructor
   * @param {Boolean} state - If true is passed in, the sound will pause
   */
  pause(state) {
    if (state) {
      this.audioTag.pause();
    }
  }
}