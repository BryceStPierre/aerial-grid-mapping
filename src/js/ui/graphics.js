import $ from "jquery";

import Point from "../geometry/Point";
import Line from "../geometry/Line";
import Polygon from "../geometry/Polygon";
import Rectangle from "../geometry/Rectangle";
import Grid from "../geometry/Grid";
import GraphicsManager from "../utils/GraphicsManager";
import { createPolygon, createMask, createRectangle } from "../utils/svg";
import { store, retrieve } from "../utils/localStorage";

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

  let constraint = new Polygon(
    retrieve("constraint")._points.map((p) => new Point(p._x, p._y))
  );
  let maskPolygon = createPolygon(constraint.asGraphic(height), false);
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

  // Compute slope for the initial line used for the grid.
  const slopes = constraint.segments
    .filter((line) => line.slope > 0)
    .map((line) => {
      if (!isFinite(line.slope)) {
        if (line.slope == Number.POSITIVE_INFINITY) return 500;
        if (line.slope == Number.NEGATIVE_INFINITY) return -500;
      }
      return line.slope;
    });
  const averageSlope = slopes.reduce((a, c) => a + c) / slopes.length;

  let pointWithMinimumX = new Point(
    constraint.points[0].x + (Math.random() > 0.5 ? 0.001 : -0.001),
    constraint.points[0].y
  );
  constraint.points.forEach((p) => {
    if (p.x < pointWithMinimumX.x) pointWithMinimumX = p;
  });

  let manager = new GraphicsManager(width, height, svgSelector);
  // let grid = new Grid(
  //   width,
  //   height,
  //   20,
  //   new Line(averageSlope, pointWithMinimumX)
  // );
  // manager.addGraphic(grid);
};
