/** Class representing a point on the Cartesian plane. */
export default class Point {
  constructor(x = 0, y = 0) {
    this._x = x;
    this._y = y;
  }

  add(x, y) {
    this._x += x;
    this._y += y;
  }

  multiply(c) {
    this._x *= c;
    this._y *= c;
  }

  /**
   * @param {Point} p
   * @returns {Point}
   */
  rotate90DegreesClockwiseAbout(p) {
    return new Point(this._y + p.x - p.y, (-1 * this._x) + p.x + p.y);
  }

  /**
   * @param {Point} p
   * @param {number} threshold
   * @returns {boolean}
   */
  isNear(p, threshold) {
    return Math.sqrt(
      Math.pow(this._x - p.x, 2) + Math.pow(this._y - p.y, 2)
    ) < threshold;
  }

  /**
   * @param {number} graphHeight 
   * @returns {JSON}
   */
  asGraphic(graphHeight) {
    return {
      x: this._x,
      y: graphHeight - this._y,
    };
  }

  get x() {
    return this._x;
  }
  set x(x) {
    this._x = x;
  }

  get y() {
    return this._y;
  }
  set y(y) {
    this._y = y;
  }
}
