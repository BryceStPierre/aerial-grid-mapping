/**
 * @param {number} angle
 * @returns {number} Angle in radians.
 */
const convertToRadians = (angle) => (angle * Math.PI) / 180;

/**
 * A formula for computing the great-circle distance between two points.
 * Source: https://www.movable-type.co.uk/scripts/latlong.html
 * @param {JSON} positionA
 * @param {JSON} positionB
 * @returns {number} The computed distance in metres.
 */
const haversineFormula = (positionA, positionB) => {
  const phiA = convertToRadians(positionA.lat);
  const phiB = convertToRadians(positionB.lat);
  const dPhi = convertToRadians(positionB.lat - positionA.lat);
  const dLambda = convertToRadians(positionB.lng - positionA.lng);

  let a = Math.sin(dPhi / 2) * Math.sin(dPhi / 2) +
    Math.cos(phiA) * Math.cos(phiB) * Math.sin(dLambda / 2) *
    Math.sin(dLambda / 2);

  return 2 * 6371e3 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};

/**
 * @param {number} width
 * @param {number} height
 * @param {LatLngBounds} mapBounds
 * @returns {JSON}
 */
export const establishScale = (
  width,
  height,
  northEastPosition,
  southWestPosition
) => {
  // Compute the pixel distance between upper-right and lower-left
  // corners of the map.
  const pixels = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));

  // Compute the physical distance in meters between north-east and
  // south-west coordinates of the map.
  const meters = haversineFormula(northEastPosition, southWestPosition);

  // (This figure can be used in multiplication to convert pixels to meters.)
  return meters / pixels;
};
