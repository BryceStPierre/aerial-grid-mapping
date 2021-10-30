import "normalize.css";
import "../css/core.css";
import "../css/steps.css";

import {
  handleBackNavigation,
  handleNextNavigation,
  onStep,
} from "./ui/navigation";
import { addBasicMap, addStaticMap } from "./ui/map";
import { establishScale } from "./utils/geography";
import { addStepTwoGraphics, addStepThreeGraphics } from "./ui/graphics";
import { retrieve, store } from "./utils/localStorage";
import { initialLocation } from "./config/constants";

document.addEventListener("DOMContentLoaded", () => {
  let map = addBasicMap({
    lat: initialLocation.lat,
    lng: initialLocation.lng,
  });

  document
    .querySelector("#back")
    .addEventListener("click", handleBackNavigation);

  document.querySelector("#next").addEventListener("click", () => {
    // If on step one, initialize step two.
    if (onStep(1)) {
      let mapElement = document.querySelector("#map");
      const width = mapElement.offsetWidth;
      const height = mapElement.offsetHeight;
      store("width", width);
      store("height", height);

      addStaticMap(
        width,
        height,
        map.getBounds().getCenter().toJSON(),
        map.getZoom()
      );

      const scale = establishScale(
        width,
        height,
        map.getBounds().getNorthEast().toJSON(),
        map.getBounds().getSouthWest().toJSON()
      );

      addStepTwoGraphics(width, height, "#stepTwo svg");
    }
    // If on step two, initialize step three.
    else if (onStep(2)) {
      const width = retrieve("width");
      const height = retrieve("height");

      addStepThreeGraphics(width, height, "#stepThree svg");
    }

    handleNextNavigation();
  });
});
