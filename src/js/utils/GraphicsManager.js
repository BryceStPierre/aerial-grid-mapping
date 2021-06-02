import $ from "jquery";
import {
  createPoint,
  createLine,
  createPolygon,
  createRectangle,
} from "./svg";
import { graphicTypes } from "../config/constants";

/** Class representing a polygon on the Cartesian plane. */
export default class GraphicsManager {
  constructor(width, height, svgSelector) {
    this._width = width;
    this._height = height;
    this._svgSelector = svgSelector;
    this._graphics = [];
    this._graphicTypes = [];

    $(this._svgSelector).on("mousemove", this.handleMouseMove);
    $(this._svgSelector).on("mouseup", this.handleMouseUp);
  }

  handleMouseDown = (index) => {
    this._isDragging = true;
    this._selectedIndex = index;
  };

  handleMouseMove = (e) => {
    if (
      this._isDragging &&
      this._graphicTypes[this._selectedIndex] === graphicTypes.POLYGON
    ) {
      let cartesianX = e.offsetX;
      let cartesianY = this._height - e.offsetY;
      this._graphics[this._selectedIndex].x = cartesianX;
      this._graphics[this._selectedIndex].y = cartesianY;
      this.render();
    }
  };

  handleMouseUp = (e) => {
    this._isDragging = false;
  };

  addGraphic(graphic, graphicType) {
    this._graphics.push(graphic);
    this._graphicTypes.push(graphicType);
    this.render();
  }

  render() {
    // Clear SVG contents.
    $(this._svgSelector).html("");

    // Append updated SVG contents.
    this._graphics.forEach((g, i) => {
      let element;
      if (this._graphicTypes[i] === graphicTypes.POINT) {
        element = createPoint(g.asGraphic(this._height));
      // TODO: Add line.
      // } else if (this._graphicTypes[i] === graphicTypes.LINE) {
      //   element = createLine(g.asGraphic(this._height));
      } else if (this._graphicTypes[i] === graphicTypes.RECTANGLE) {
        element = createRectangle(g.asGraphic(this._height));
      } else if (this._graphicTypes[i] === graphicTypes.POLYGON) {
        element = createPolygon(g.asGraphic(this._height), true);
        // TODO: Add mousedown to polygonVertices.
        // element.on("mousedown", () => this.handleMouseDown(i));
      }
      $(this._svgSelector).append(element);
    });
  }
}
