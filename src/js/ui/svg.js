import $ from "jquery";

/**
 * @param {JSON} point
 * @returns {HTMLElement}
 */
export const createPoint = (point) => {
  return $(document.createElementNS("http://www.w3.org/2000/svg", "circle"))
    .attr("class", "point")
    .attr("r", 50)
    .attr("cx", point.x)
    .attr("cy", point.y);
};

/**
 * @param {JSON} line
 * @returns {HTMLElement}
 */
export const createLine = (line) => {
  return $(document.createElementNS("http://www.w3.org/2000/svg", "line"))
    .attr("class", "line")
    .attr("x1", line.start.x)
    .attr("y1", line.start.y)
    .attr("x2", line.finish.x)
    .attr("y2", line.finish.y);
};

/**
 * @param {JSON} polygon
 * @returns {HTMLElement}
 */
export const createPolygon = (polygon, editable = false) => {
  let polygonElement = $(
    document.createElementNS("http://www.w3.org/2000/svg", "polygon")
  )
    .attr("class", "polygon")
    .attr("points", polygon.pointString);

  if (!editable) return polygonElement;

  let polygonGroup = $(
    document.createElementNS("http://www.w3.org/2000/svg", "g")
  ).attr("class", "polygon-container");

  polygonGroup.append(polygonElement);
  polygon.pointArray.forEach((p) => {
    let vertex = $(
      document.createElementNS("http://www.w3.org/2000/svg", "circle")
    )
      .attr("class", "vertex")
      .attr("r", 10)
      .attr("x", p.x)
      .attr("y", p.y);

    polygonGroup.append(vertex);
  });

  return polygonGroup;
};

/**
 * @param {JSON} rectangle
 * @returns {HTMLElement}
 */
export const createRectangle = (rectangle) => {
  return $(document.createElementNS("http://www.w3.org/2000/svg", "rect"))
    .attr("class", "rectangle")
    .attr("x", rectangle.origin.x)
    .attr("y", rectangle.origin.y)
    .attr("width", rectangle.width)
    .attr("height", rectangle.height);
};
