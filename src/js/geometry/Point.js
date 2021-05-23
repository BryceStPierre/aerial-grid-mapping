/* A point represented on a two-dimensional Cartesian plane. */

export default class Point {
  constructor(x = 0, y = 0) {
    this._x = x;
    this._y = y;
  }

  add(a, b) {
    this._x += a;
    this._y += b;
  }

  multiply(a) {
    this._x *= a;
    this._y *= a;
  }

  /**
   * @param {Point} p
   */
  rotate90DegreesClockwiseAbout(p) {
    // Based on (x, y) => (y, -x).
    return new Point(this._y + p.x - p.y, -1 * this._x + p.x + p.y);
  }

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

  get json() {
    return {
      x: this._x,
      y: this._y,
    };
  }
}
