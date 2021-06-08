import Point from "./Point";
import { graphicTypes } from "../config/constants";

/** Class representing a rectangle on the Cartesian plane. */
export default class Rectangle {
  /**
   * @param {number} width 
   * @param {number} height 
   */
  constructor(width, height) {
    this._width = width;
    this._height = height;
    this._origin = new Point(0, height); // Top left corner.
    this._classNames = [];
    this._type = graphicTypes.RECTANGLE;
  }

  /**
   * @param {Point} point
   */
  setOrigin(point) {
    this._origin = point;
  }

  /**
   * @param {Point} point
   * @returns {boolean}
   */
  containsPoint(point) {
    let x =
      point.x >= this._origin.x && point.x <= this._origin.x + this._width;
    let y =
      point.y <= this._origin.y && point.y >= this._origin.y - this._height;
    return x && y;
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
      width: this._width,
      height: this._height,
      origin: this._origin.asGraphic(graphHeight),
      classNames: this._classNames.join(" ")
    };
  }

  /**
   * @param {string} className
   */
  addClassName(className) {
    this._classNames.push(className);
  }

  get width() {
    return this._width;
  }

  get height() {
    return this._height;
  }

  get origin() {
    return this._origin;
  }

  get classNames() {
    return this._classNames.join(" ");
  }

  get type() {
    return this._type;
  }
}
