import $ from "jquery";

/**
 * @param {JSON} point
 * @returns {SVGElement}
 */
export const createPoint = (point) => {
  let element = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  element.setAttribute("class", `point ${point.classNames}`);
  element.setAttribute("r", 5);
  element.setAttribute("cx", point.x);
  element.setAttribute("cy", point.y);
  return $(element);
};

/**
 * @param {JSON} line
 * @returns {SVGElement}
 */
export const createLine = (line) => {
  let element = document.createElementNS("http://www.w3.org/2000/svg", "line");
  element.setAttribute("class", `line ${line.classNames}`);
  element.setAttribute("x1", line.start.x);
  element.setAttribute("y1", line.start.y);
  element.setAttribute("x2", line.finish.x);
  element.setAttribute("y2", line.finish.y);
  return $(element);
};

/**
 * @param {JSON} rectangle
 * @returns {SVGElement}
 */
export const createRectangle = (rectangle) => {
  let element = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  element.setAttribute("class", `rectangle ${rectangle.classNames}`);
  element.setAttribute("x", rectangle.origin.x);
  element.setAttribute("y", rectangle.origin.y);
  element.setAttribute("width", rectangle.width);
  element.setAttribute("height", rectangle.height);
  return $(element);
};

/**
 * @param {JSON} polygon
 * @param {boolean} editable
 * @returns {SVGElement}
 */
export const createPolygon = (polygon, editable = false) => {
  let polygonElement = $(
    document.createElementNS("http://www.w3.org/2000/svg", "polygon")
  )
    .attr("class", "polygon")
    .attr("points", polygon.pointString);

  if (!editable) {
    polygonElement.addClass(polygon.classNames);
    return polygonElement;
  }

  let polygonGroup = createGroup().attr("class", "polygon-container");

  polygonGroup.append(polygonElement);
  polygon.pointArray.forEach((p) => {
    let vertex = $(
      document.createElementNS("http://www.w3.org/2000/svg", "circle")
    )
      .attr("class", "vertex")
      .attr("r", 15)
      .attr("cx", p.x)
      .attr("cy", p.y);

    polygonGroup.append(vertex);
  });
  polygonGroup.addClass(polygon.classNames);

  return polygonGroup;
};

/**
 * @returns {SVGElement}
 */
 export const createGroup = () => {
  return $(document.createElementNS("http://www.w3.org/2000/svg", "g"));
};

/**
 * @param {string} maskId 
 * @returns {SVGElement}
 */
export const createMask = (maskId) => {
  return $(document.createElementNS("http://www.w3.org/2000/svg", "mask"))
    .attr("id", maskId);
};

/**
 * @param {JSON} gridUnit
 * @returns {SVGElement}
 */
export const createGridUnit = (gridUnit) => {
  return $(document.createElementNS("http://www.w3.org/2000/svg", "polygon"))
    .attr("points", gridUnit.polygon.pointString)
    .attr("class", `polygon ${gridUnit.polygon.classNames} ${gridUnit.selected ? " selected" : ""}`)
    .attr("data-row", gridUnit.row)
    .attr("data-column", gridUnit.column);
};

/**
 * @param {JSON} grid
 * @returns {SVGElement}
 */
export const createGrid = (grid) => {
  let gridGroup = createGroup().attr("class", "grid");

  let lineGroup = createGroup().attr("class", "lines");
  grid.lines
    .map((line) => createLine(line))
    .forEach((line) => lineGroup.append(line));

  let unitGroup = createGroup().attr("class", "units");
  grid.units
    .map((unit) => createGridUnit(unit))
    .forEach((unit) => unitGroup.append(unit));

  gridGroup.append(lineGroup);
  gridGroup.append(unitGroup);
  return gridGroup;
};
