/** Class representing a line on the Cartesian plane. */
export default class Line {
  /**
   * @param {(number|Point)} a - The slope, or a point.
   * @param {(number|Point)} b - The y-intercept, or a point.
   */
  constructor(a, b) {
    // Construct using a slope and a y-intercept.
    if (typeof a === "number" && typeof b === "number") {
      this._slope = a;
      this._yIntercept = b;
    }
    // Construct using a slope and a point.
    else if (typeof a === "number" && typeof b === "object") {
      this._slope = a;
      this._yIntercept = b.y - this._slope * b.x; // If y = mx + b, then b = y - mx.
    }
    // Construct using two points.
    else if (typeof a === "object" && typeof b === "object") {
      this._slope = (b.y - a.y) / (b.x - a.x); // Slope = y2 - y1 / x2 - x1.
      this._yIntercept = b.y - this._slope * b.x; // Again, b = y - mx.
    }

    // Adjust the slope value for horizontal and vertical lines.
    if (this._slope === 0) this._slope = 0.0001;
    // Horizontal.
    else if (isNaN(this._slope)) this._slope = -500; // Vertical.
  }

  /**
   * @param {number} x
   * @returns {number} The computed y value.
   */
  solveWithX(x) {
    // Recall, y = mx + b.
    return this._slope * x + b;
  }

  /**
   * @param {number} y
   * @returns {number} The computed x value.
   */
  solveWithY(y) {
    // If y = mx + b, then x = (y - b) / m.
    return (y - this._yIntercept) / this._slope;
  }

  /**
   * @param {number} x
   * @returns {Point} The computed point.
   */
  pointAtX(x) {
    return new Point(x, this.solveWithX(x));
  }

  /**
   * @param {number} y
   * @returns {Point} The computed point.
   */
  pointAtY(y) {
    return new Point(this.solveWithY(y), y);
  }

  /**
   * @param {Line} line
   * @returns {Point} The computed point of intersection.
   */
  pointOfIntersectionWith(line) {
    // Assume this line is y = ax + b and the given line is y = cx + d.
    // Then set ax + b = cx + d. Thus, x = d - b / a - c.
    return this.pointAtX(
      (line.yIntercept - this._yIntercept) / (this._slope - line.slope)
    );
  }

  asGraphic(x1, x2, graphHeight) {
    return {
      p1: this.pointAtX(x1).asGraphic(graphHeight),
      p2: this.pointAtX(x2).asGraphic(graphHeight),
    };
  }

  get slope() {
    return this._slope;
  }
  get yIntercept() {
    return this._yIntercept;
  }
  get inverseSlope() {
    return -1 / this._slope;
  }
}
