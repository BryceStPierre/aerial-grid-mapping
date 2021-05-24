import Point from "./Point";

/** Class representing a rectangle on the Cartesian plane. */
export default class Rectangle {
  constructor(width, height) {
    this._width = width;
    this._height = height;
    this._origin = new Point(0, height); // Top left corner.
  }

  /**
   * @param {Point} p
   */
  setOrigin(p) {
    this._origin = p;
  }

  /**
   * 
   * @param {number} graphHeight 
   * @returns {JSON}
   */
  asGraphic(graphHeight) {
    return {
      width: this._width,
      height: this._height,
      origin: this._origin.asGraphic(graphHeight),
    };
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
}
