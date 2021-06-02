import Point from "../geometry/Point";
import GraphicsManager from "../utils/GraphicsManager";

import { graphicTypes } from "../config/constants";

/**
 * @param {number} width
 * @param {number} height
 * @param {string} selector
 */
export const addStepTwoCanvas = (width, height, svgSelector) => {
  let manager = new GraphicsManager(width, height, svgSelector);
  manager.addGraphic(new Point(150, 150), graphicTypes.POINT);

  // Add overlay over top of static map image.
  // let overlayRect = new Rectangle(width, height - 25);
  // overlayRect.setOrigin(new Point(0, height));
  // let overlay = createRectangle(overlayRect.asGraphic(height));
  // overlay.addClass("overlay");
  // $(baseSelector).append(overlay);

  // // Add a parallelogram used for constraining the grid region.
  // let constraintPoly = new Polygon([
  //   new Point(0.2 * width, 0.75 * height),
  //   new Point(0.6 * width, 0.75 * height),
  //   new Point(0.8 * width, 0.25 * height),
  //   new Point(0.4 * width, 0.25 * height)
  // ]);
  // let constraint = createPolygon(constraintPoly.asGraphic(height), true, function (i) {
  //   constraintPoly.translate()
  // });
  // constraint.addClass("constraint");
  // $(baseSelector).append(constraint);
};
