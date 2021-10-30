import { dimensions } from "../config/constants";

/**
 * @param {JSON} point
 * @returns {SVGElement}
 */
export const createPoint = (point) => {
  let element = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "circle"
  );
  element.setAttribute("class", "point");
  element.setAttribute("r", 5);
  element.setAttribute("cx", point.x);
  element.setAttribute("cy", point.y);
  return element;
};

/**
 * @param {JSON} line
 * @returns {SVGElement}
 */
export const createLine = (line) => {
  let element = document.createElementNS("http://www.w3.org/2000/svg", "line");
  element.setAttribute("class", "line");
  element.setAttribute("x1", line.start.x);
  element.setAttribute("y1", line.start.y);
  element.setAttribute("x2", line.finish.x);
  element.setAttribute("y2", line.finish.y);
  return element;
};

/**
 * @param {JSON} rectangle
 * @returns {SVGElement}
 */
export const createRectangle = (rectangle) => {
  let element = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  element.setAttribute("class", "rectangle");
  if (rectangle.classNames.length > 0)
    element.classList.add(...rectangle.classNames);
  element.setAttribute("x", rectangle.origin.x);
  element.setAttribute("y", rectangle.origin.y);
  element.setAttribute("width", rectangle.width);
  element.setAttribute("height", rectangle.height);
  return element;
};

/**
 * @param {JSON} polygon
 * @param {boolean} editable
 * @returns {SVGElement}
 */
export const createPolygon = (polygon, editable = false) => {
  let polygonElement = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "polygon"
  );
  polygonElement.setAttribute("class", "polygon");
  polygonElement.setAttribute("points", polygon.pointString);

  if (!editable) {
    if (polygon.classNames.length > 0)
      polygonElement.classList.add(...polygon.classNames);
    return polygonElement;
  }

  let polygonGroup = createGroup();
  polygonGroup.setAttribute("class", "polygon-container");

  polygonGroup.append(polygonElement);
  polygon.pointArray.forEach((p) => {
    let vertex = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "circle"
    );
    vertex.setAttribute("class", "vertex");
    vertex.setAttribute("r", dimensions.vertexRadius);
    vertex.setAttribute("cx", p.x);
    vertex.setAttribute("cy", p.y);

    polygonGroup.append(vertex);
  });

  if (polygon.classNames.length > 0)
    polygonGroup.classList.add(...polygon.classNames);

  return polygonGroup;
};

/**
 * @returns {SVGElement}
 */
export const createGroup = () => {
  return document.createElementNS("http://www.w3.org/2000/svg", "g");
};

/**
 * @param {string} maskId
 * @returns {SVGElement}
 */
export const createMask = (maskId) => {
  let mask = document.createElementNS("http://www.w3.org/2000/svg", "mask");
  mask.setAttribute("id", maskId);
  return mask;
};

/**
 * @param {JSON} gridUnit
 * @returns {SVGElement}
 */
export const createGridUnit = (gridUnit) => {
  let element = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "polygon"
  );
  element.setAttribute("points", gridUnit.polygon.pointString);
  element.classList.add("polygon");

  if (gridUnit.polygon.classNames.length > 0)
    element.classList.add(...gridUnit.polygon.classNames);
  if (gridUnit.selected) element.classList.add("selected");

  element.setAttribute("data-row", gridUnit.row);
  element.setAttribute("data-column", gridUnit.column);
  return element;
};

/**
 * @param {JSON} grid
 * @returns {SVGElement}
 */
export const createGrid = (grid) => {
  let gridGroup = createGroup();
  gridGroup.setAttribute("class", "grid");

  let lineGroup = createGroup();
  lineGroup.setAttribute("class", "lines");
  grid.lines
    .map((line) => createLine(line))
    .forEach((line) => lineGroup.append(line));

  let unitGroup = createGroup();
  unitGroup.setAttribute("class", "units");
  grid.units
    .map((unit) => createGridUnit(unit))
    .forEach((unit) => unitGroup.append(unit));

  gridGroup.append(lineGroup);
  gridGroup.append(unitGroup);
  return gridGroup;
};
