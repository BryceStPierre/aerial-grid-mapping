import $ from "jquery";

export const addStaticMap = (width, height, center, zoom) => {
  const parameters = [
    `key=${$("#staticMap").data("api-key")}`,
    'maptype=satellite',
    'scale=2',
    `zoom=${zoom}`,
    `size=${width}x${height}`,
    `center=${center.lat},${center.lng}`
  ];

  const url = `https://maps.googleapis.com/maps/api/staticmap?${parameters.join("&")}`;

  $("#staticMap")
    .attr("src", url)
    .attr("width", width)
    .attr("height", height)
    .attr("alt", "Static Map");
}