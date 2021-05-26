import Point from "./Point";
import Line from "./Line";

/** Class representing a polygon on the Cartesian plane. */
export default class Polygon {
  /**
   * @param {Point[]} points
   */
  constructor(points) {
    this._points = points;
  }

  translate(x, y) {
    this._points = this._points.map((p) => p.add(x, y));
  }

  scale(c) {
    this._points = this._points.map((p) => p.multiply(c));
  }

  /**
   * @param {Point} point
   * @returns {boolean}
   */
  containsPoint(point) {
    // Based on https://stackoverflow.com/questions/22521982/check-if-point-is-inside-a-polygon.
    let contains = false;
    let x = point.x;
    let y = point.y;
    let v = this._points.map((p) => [p.x, p.y]);

    for (let i = 0, j = v.length - 1; i < v.length; j = i++) {
      let xi = v[i][0],
        yi = v[i][1],
        xj = v[j][0],
        yj = v[j][1];
      if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi)
        contains = !contains;
    }
    return contains;
  }

  /**
   * @param {Polygon} polygon
   * @returns {boolean}
   */
  containsPolygon(polygon) {
    let contains = true;
    polygon.points.forEach((p) => {
      contains = contains && this.containsPoint(p);
    });
    return contains;
  }

  /**
   * @param {number} graphHeight
   * @returns {JSON}
   */
  asGraphic(graphHeight) {
    return {
      points: this._points.map((p) => p.asGraphic(graphHeight)),
    };
  }

  get points() {
    return this._points;
  }

  get segments() {
    let segments = [];
    for (let i = 0; i < this._points.length; i++) {
      let next = i === this._points.length - 1 ? 0 : i + 1;
      segments.push(new Line(this._points[i], this._points[next]));
    }
    return segments;
  }
}
