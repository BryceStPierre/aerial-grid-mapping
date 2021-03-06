import Point from "../geometry/Point";
import Polygon from "../geometry/Polygon";
import Rectangle from "../geometry/Rectangle";
import GraphicsManager from "../utils/GraphicsManager";
import { store } from "../utils/localStorage";

/**
 * @param {number} width
 * @param {number} height
 * @param {string} svgSelector
 */
export const initializeStep2 = (width, height, svgSelector) => {
  let manager = new GraphicsManager(width, height, svgSelector);

  // Add overlay over top of static map image.
  let overlay = new Rectangle(width, height);
  overlay.addClassName("overlay");
  manager.addGraphic(overlay);

  // Add a parallelogram used for constraining the grid region.
  let constraint = new Polygon([
    new Point(0.2 * width, 0.75 * height),
    new Point(0.6 * width, 0.75 * height),
    new Point(0.8 * width, 0.25 * height),
    new Point(0.4 * width, 0.25 * height),
  ]);
  constraint.addClassName("constraint");
  constraint.onUpdate = (polygon) => store("constraint", polygon);
  manager.addGraphic(constraint);
};
