import $ from "jquery";

/**
 * @param {JSON} point
 * @returns {SVGElement}
 */
export const createPoint = (point) => {
  return $(document.createElementNS("http://www.w3.org/2000/svg", "circle"))
    .attr("class", `point ${point.classNames}`)
    .attr("r", 5)
    .attr("cx", point.x)
    .attr("cy", point.y);
};

/**
 * @param {JSON} line
 * @returns {SVGElement}
 */
export const createLine = (line) => {
  return $(document.createElementNS("http://www.w3.org/2000/svg", "line"))
    .attr("class", `line ${line.classNames}`)
    .attr("x1", line.start.x)
    .attr("y1", line.start.y)
    .attr("x2", line.finish.x)
    .attr("y2", line.finish.y);
};

/**
 * @param {JSON} rectangle
 * @returns {SVGElement}
 */
export const createRectangle = (rectangle) => {
  return $(document.createElementNS("http://www.w3.org/2000/svg", "rect"))
    .attr("class", `rectangle ${rectangle.classNames}`)
    .attr("x", rectangle.origin.x)
    .attr("y", rectangle.origin.y)
    .attr("width", rectangle.width)
    .attr("height", rectangle.height);
};

/**
 * @param {JSON} polygon
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

  let polygonGroup = $(
    document.createElementNS("http://www.w3.org/2000/svg", "g")
  ).attr("class", "polygon-container");

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
 * @param {JSON} gridUnit
 * @returns {SVGElement}
 */
export const createGridUnit = (gridUnit) => {
  return $(document.createElementNS("http://www.w3.org/2000/svg", "polygon"))
    .attr("points", gridUnit.polygon.pointString)
    .attr("class", `polygon ${gridUnit.polygon.classNames}`)
    .attr("data-row", gridUnit.row)
    .attr("data-column", gridUnit.column);
};

/**
 * @param {JSON} grid
 * @returns {SVGElement}
 */
export const createGrid = (grid) => {
  let gridGroup = $(
    document.createElementNS("http://www.w3.org/2000/svg", "g")
  ).attr("class", "grid");

  let lineGroup = $(
    document.createElementNS("http://www.w3.org/2000/svg", "g")
  ).attr("class", "lines");
  grid.lines
    .map((line) => createLine(line))
    .forEach((line) => lineGroup.append(line));

  let unitGroup = $(
    document.createElementNS("http://www.w3.org/2000/svg", "g")
  ).attr("class", "units");
  grid.units
    .map((unit) => createGridUnit(unit))
    .forEach((unit) => unitGroup.append(unit));

  gridGroup.append(lineGroup);
  gripGroup.append(unitGroup);
  return gridGroup;
};
