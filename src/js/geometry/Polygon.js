import Point from "./Point";
import Line from "./Line";
import { graphicTypes } from "../config/constants";

/** Class representing a polygon on the Cartesian plane. */
export default class Polygon {
  /**
   * @param {Point[]} points
   */
  constructor(points) {
    this._points = points;
    this._classNames = [];
    this._type = graphicTypes.POLYGON;
    this._onUpdate = null;
  }

  /**
   * @param {number} x 
   * @param {number} y 
   */
  translate(x, y) {
    this._points = this._points.map((p) => p.add(x, y));
    if (this._onUpdate) this._onUpdate(this);
  }

  /**
   * @param {number} c 
   */
  scale(c) {
    this._points = this._points.map((p) => p.multiply(c));
    if (this._onUpdate) this._onUpdate(this);
  }

  /**
   * @param {number} index 
   * @param {number} x 
   * @param {number} y 
   */
  translatePoint(index, x, y) {
    this._points[index].x = x;
    this._points[index].y = y;
    if (this._onUpdate) this._onUpdate(this);
  }

  /**
   * @param {Point} point
   * @returns {boolean}
   */
  containsPoint(point) {
    // Source: https://stackoverflow.com/questions/22521982/check-if-point-is-inside-a-polygon
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
    let points = this._points.map((p) => p.asGraphic(graphHeight));

    return {
      pointArray: points,
      pointString: points.map((p) => `${p.x},${p.y}`).join(" "),
      classNames: this._classNames.join(" ")
    };
  }

  /**
   * @param {string} className 
   */
  addClassName(className) {
    this._classNames.push(className);
  }

  set points(points) {
    this._points = points;
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

  get classNames() {
    return this._classNames.join(" ");
  }

  get type() {
    return this._type;
  }

  get onUpdate() {
    return this._onUpdate;
  }

  set onUpdate(onUpdate) {
    this._onUpdate = onUpdate;
  }
}
