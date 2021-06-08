import Point from "../geometry/Point";
import Polygon from "../geometry/Polygon";
import Rectangle from "../geometry/Rectangle";
import GraphicsManager from "../utils/GraphicsManager";
import { createPolygon, createMask, createRectangle } from "../utils/svg";
import { store, retrieve } from "../utils/localStorage";
import $ from "jquery";

/**
 * @param {number} width
 * @param {number} height
 * @param {string} svgSelector
 */
export const addStepTwoGraphics = (width, height, svgSelector) => {
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

/**
 * @param {number} width
 * @param {number} height
 * @param {string} svgSelector
 */
export const addStepThreeGraphics = (width, height, svgSelector) => {
  let maskRect = new Rectangle(width, height);
  maskRect = createRectangle(maskRect.asGraphic(height));
  maskRect.attr("fill", "#fff");

  let maskPolygon = new Polygon(
    retrieve("constraint")._points.map((p) => new Point(p._x, p._y))
  );
  maskPolygon = createPolygon(maskPolygon.asGraphic(height), false);
  maskPolygon.attr("fill", "#000");

  // Add mask to trace constraint polygon.
  let mask = createMask("overlayMask");
  mask.append(maskRect);
  mask.append(maskPolygon);
  $(svgSelector).append(mask);

  // Add overlay to highlight mask.
  let overlay = new Rectangle(width, height);
  overlay.addClassName("dark");
  overlay = createRectangle(overlay.asGraphic(height));
  overlay.attr("mask", "url(#overlayMask)");
  $(svgSelector).append(overlay);

  //let manager = new GraphicsManager(width, height, svgSelector);
};
