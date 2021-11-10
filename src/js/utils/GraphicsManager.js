import {
  createPoint,
  createLine,
  createPolygon,
  createRectangle,
  createGrid,
} from "./svg";
import { playDeselectAudio, playSelectAudio } from "../utils/audio";
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

    document
      .querySelector(this._svgSelector)
      .addEventListener("mousemove", this.handleMouseMove);
    document
      .querySelector(this._svgSelector)
      .addEventListener("mouseup", this.handleMouseUp);
  }

  /**
   * @param {object} graphic
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
   * Handle drag effect, currently only for Polygon objects.
   * @param {TouchEvent} e
   */
  handleTouchMove = (e) => {
    if (
      this._isDragging &&
      this._graphics[this._selectedIndex].type === graphicTypes.POLYGON
    ) {
      const svgRect = document
        .querySelector(this._svgSelector)
        .getBoundingClientRect();
      const cartesianX = e.targetTouches[0].clientX - svgRect.left;
      const cartesianY = this._height - e.targetTouches[0].clientY + svgRect.top;
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
   * @param {number} graphicIndex
   * @param {number} row
   * @param {number} column
   */
  handleClickGridUnit = (graphicIndex, row, column) => {
    let isSelected = this._graphics[graphicIndex].toggleSelected(row, column);
    if (isSelected) playSelectAudio();
    else playDeselectAudio();
    this.render();
  };

  /**
   * Clear graphics and display them in their current state.
   */
  render() {
    document.querySelector(this._svgSelector).innerHTML = "";

    this._graphics.forEach((g, i) => {
      let svgElement = g;
      if (g.type === graphicTypes.POINT) {
        svgElement = createPoint(g.asGraphic(this._height));
      } else if (g.type === graphicTypes.LINE) {
        svgElement = createLine(g.asGraphic(0, this._width, this._height));
      } else if (g.type === graphicTypes.RECTANGLE) {
        svgElement = createRectangle(g.asGraphic(this._height));
      } else if (g.type === graphicTypes.POLYGON) {
        svgElement = createPolygon(g.asGraphic(this._height), true);
        Array.from(svgElement.children)
          .filter((e) => e.classList.contains("vertex"))
          .forEach((element, index) => {
            element.addEventListener("mousedown", () =>
              this.handleMouseDown(i, index)
            );
            element.addEventListener("touchstart", () =>
              this.handleMouseDown(i, index)
            );
            element.addEventListener("touchmove", (e) =>
              this.handleTouchMove(e)
            );
            element.addEventListener("touchend", () =>
              this.handleMouseUp()
            );
          });
      } else if (g.type === graphicTypes.GRID) {
        svgElement = createGrid(g.asGraphic());
        Array.from(svgElement.children)
          .filter((e) => e.classList.contains("units"))
          .forEach((e) => {
            Array.from(e.children)
              .filter((e) => e.tagName === "polygon")
              .forEach((element) => {
                element.addEventListener("click", () => {
                  this.handleClickGridUnit(
                    i,
                    Number(element.dataset.row),
                    Number(element.dataset.column)
                  );
                });
              });
          });
      }
      document.querySelector(this._svgSelector).append(svgElement);
    });
  }
}
