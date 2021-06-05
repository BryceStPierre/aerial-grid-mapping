import $ from "jquery";
import {
  createPoint,
  createLine,
  createPolygon,
  createRectangle,
  createGrid,
} from "./svg";
import { graphicTypes } from "../config/constants";

/** Class managing the graphics objects within a parent SVG element.  */
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

    $(this._svgSelector).on("mousemove", this.handleMouseMove);
    $(this._svgSelector).on("mouseup", this.handleMouseUp);
  }

  /**
   * @param {object} graphic
   * @param {number} graphicType
   */
  addGraphic(graphic) {
    this._graphics.push(graphic);
    this.render();
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
      this._graphics[this._selectedIndex].type === graphicTypes.POLYGON
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

  handleClickGridUnit = (graphicIndex, row, column) => {
    this._graphics[graphicIndex].toggleSelected(row, column);
    this.render();
  };

  /**
   * Clear graphics and display them in their current state.
   */
  render() {
    $(this._svgSelector).html("");

    this._graphics.forEach((g, i) => {
      let svgElement;
      if (g.type === graphicTypes.POINT) {
        svgElement = createPoint(g.asGraphic(this._height));
      } else if (g.type === graphicTypes.LINE) {
        svgElement = createLine(g.asGraphic(0, this._width, this._height));
      } else if (g.type === graphicTypes.RECTANGLE) {
        svgElement = createRectangle(g.asGraphic(this._height));
      } else if (g.type === graphicTypes.POLYGON) {
        svgElement = createPolygon(g.asGraphic(this._height), true);
        svgElement.children(".vertex").each((index, element) => {
          $(element).on("mousedown", () => this.handleMouseDown(i, index));
        });
      } else if (g.type === graphicTypes.GRID) {
        svgElement = createGrid(g.asGraphic(this._height));
        svgElement.children(".units polygon").each((index, element) => {
          $(element).on("click", () =>
            this.handleClickGridUnit(
              i,
              $(element).data("row"),
              $(element).data("column")
            )
          );
        });
      }
      $(this._svgSelector).append(svgElement);
    });
  }
}
