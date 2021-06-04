import $ from "jquery";
import { createPoint, createLine, createPolygon, createRectangle } from "./svg";
import { graphicTypes } from "../config/constants";

/** Class managing the graphics objects within a SVG element.  */
export default class GraphicsManager {
  /**
   * @param {number} width
   * @param {number} height
   * @param {string} svgSelector
   */
  constructor(width, height, svgSelector) {
    this._width = width;
    this._height = height;
    this._svgSelector = svgSelector;
    this._graphics = [];
    this._graphicTypes = [];

    $(this._svgSelector).on("mousemove", this.handleMouseMove);
    $(this._svgSelector).on("mouseup", this.handleMouseUp);
  }

  /**
   * Handle drag start.
   * @param {number} graphicIndex
   * @param {number} vertexIndex
   */
  handleMouseDown = (graphicIndex, vertexIndex) => {
    this._isDragging = true;
    this._selectedIndex = graphicIndex;
    this._selectedVertex = vertexIndex;
  };

  /**
   * Handle drag effect, currently only for Polygon objects.
   * @param {MouseEvent} e
   */
  handleMouseMove = (e) => {
    if (
      this._isDragging &&
      this._graphicTypes[this._selectedIndex] === graphicTypes.POLYGON
    ) {
      const cartesianX = e.offsetX;
      const cartesianY = this._height - e.offsetY;
      this._graphics[this._selectedIndex].translatePoint(
        this._selectedVertex,
        cartesianX,
        cartesianY
      );
      this.render();
    }
  };

  /**
   * Handle drag finish.
   */
  handleMouseUp = () => {
    this._isDragging = false;
  };

  /**
   * @param {object} graphic
   * @param {number} graphicType
   */
  addGraphic(graphic, graphicType) {
    this._graphics.push(graphic);
    this._graphicTypes.push(graphicType);
    this.render();
  }

  /**
   * Clear graphics and display them in their current state.
   */
  render() {
    $(this._svgSelector).html("");

    this._graphics.forEach((g, i) => {
      let element;
      if (this._graphicTypes[i] === graphicTypes.POINT) {
        element = createPoint(g.asGraphic(this._height));
      } else if (this._graphicTypes[i] === graphicTypes.LINE) {
        element = createLine(g.asGraphic(0, this._width, this._height));
      } else if (this._graphicTypes[i] === graphicTypes.RECTANGLE) {
        element = createRectangle(g.asGraphic(this._height));
      } else if (this._graphicTypes[i] === graphicTypes.POLYGON) {
        element = createPolygon(g.asGraphic(this._height), true);
        element.children(".vertex").each((vertexIndex, vertexElement) => {
          $(vertexElement).on("mousedown", () =>
            this.handleMouseDown(i, vertexIndex)
          );
        });
      }
      $(this._svgSelector).append(element);
    });
  }
}
