export const addBasicMap = (center) => {
  let mapOptions = {
    center,
    tilt: 0,
    zoom: 11,
    mapTypeControl: false,
    rotateControl: false,
    mapTypeControl: false,
    mapTypeId: "hybrid",
    rotateControl: false,
    streetViewControl: false,
  };

  let map = new google.maps.Map(document.getElementById("map"), mapOptions);
  let input = document.getElementById("placeSearch");
  let searchBox = new google.maps.places.SearchBox(input);

  map.controls[google.maps.ControlPosition.TOP_CENTER].push(input);

  map.addListener("bounds_changed", () => {
    searchBox.setBounds(map.getBounds());
  });

  let markers = [];

  searchBox.addListener("places_changed", () => {
    const places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }
    
    markers.forEach((marker) => {
      marker.setMap(null);
    });
    markers = [];
    
    const bounds = new google.maps.LatLngBounds();
    places.forEach((place) => {
      if (!place.geometry || !place.geometry.location) {
        console.log("Returned place contains no geometry");
        return;
      }

      markers.push(
        new google.maps.Marker({
          map,
          title: place.name,
          position: place.geometry.location,
        })
      );

      if (place.geometry.viewport)
        bounds.union(place.geometry.viewport);
      else
        bounds.extend(place.geometry.location);
    });
    map.fitBounds(bounds);
    map.setZoom(20);
  });

  return map;
};

export const addStaticMap = (width, height, center, zoom) => {
  const parameters = [
    `key=${document.querySelector("#staticMap").dataset.apiKey}`,
    'maptype=satellite',
    'scale=2',
    `zoom=${zoom}`,
    `size=${width}x${height}`,
    `center=${center.lat},${center.lng}`
  ];

  const url = `https://maps.googleapis.com/maps/api/staticmap?${parameters.join("&")}`;

  document.querySelector("#staticMap").setAttribute("src", url);
  document.querySelector("#staticMap").setAttribute("width", width);
  document.querySelector("#staticMap").setAttribute("height", height);
  document.querySelector("#staticMap").setAttribute("alt", "Static Map");
}
