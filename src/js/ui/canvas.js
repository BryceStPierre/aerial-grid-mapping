import $ from "jquery";
import Rectangle from "../geometry/Rectangle";
import {
  createPoint,
  createLine,
  createPolygon,
  createRectangle,
} from "../utils/svg";

/**
 * @param {number} width 
 * @param {number} height 
 * @param {string} selector
 */
export const addStepTwoCanvas = (width, height, baseSelector) => {
  let backgroundRect = new Rectangle(width, height).asGraphic(height);
  let background = createRectangle(backgroundRect);
  background.addClass("background");
  $(baseSelector).append(background);
};
