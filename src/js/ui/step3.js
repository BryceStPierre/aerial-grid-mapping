import Point from "../geometry/Point";
import Line from "../geometry/Line";
import Polygon from "../geometry/Polygon";
import Rectangle from "../geometry/Rectangle";
import Grid from "../geometry/Grid";
import GraphicsManager from "../utils/GraphicsManager";
import {
  createPolygon,
  createGroup,
  createMask,
  createRectangle,
} from "../utils/svg";
import { retrieve } from "../utils/localStorage";
import { dimensions } from "../config/constants";

const handleSelectionUpdate = (selectedPortion) => {
  // TODO: Use selected portion for something.
  console.log(selectedPortion);
};

/**
 * @param {number} width
 * @param {number} height
 * @param {string} svgSelector
 */
export const initializeStep3 = (width, height, svgSelector, gridUnitSize = dimensions.gridUnitSize.default) => {
  let maskRect = new Rectangle(width, height);
  maskRect = createRectangle(maskRect.asGraphic(height));
  maskRect.setAttribute("fill", "#fff");

  let constraint = new Polygon(
    retrieve("constraint")._points.map((p) => new Point(p._x, p._y))
  );
  let maskPolygon = createPolygon(constraint.asGraphic(height), false);
  maskPolygon.setAttribute("fill", "#000");

  // Add mask to trace constraint polygon.
  let mask = createMask("overlayMask");
  mask.append(maskRect);
  mask.append(maskPolygon);
  let maskGroup = createGroup();
  maskGroup.append(mask);

  // Add overlay to highlight mask.
  let overlay = new Rectangle(width, height);
  overlay.addClassName("dark");
  overlay = createRectangle(overlay.asGraphic(height));
  overlay.setAttribute("mask", "url(#overlayMask)");
  maskGroup.append(overlay);

  let manager = new GraphicsManager(width, height, svgSelector);
  manager.addGraphic(maskGroup);

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

  // Compute point for the initial line used for the grid.
  let pointWithMinimumX = constraint.points[0];
  constraint.points.forEach((point) => {
    if (point.x < pointWithMinimumX.x) pointWithMinimumX = point;
  });

  let grid = new Grid(
    width,
    height,
    gridUnitSize,
    new Line(averageSlope, pointWithMinimumX)
  );
  grid.onSelectionUpdate(handleSelectionUpdate);
  grid.setConstraint(constraint);
  manager.addGraphic(grid);
};
