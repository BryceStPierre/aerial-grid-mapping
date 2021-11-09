import "normalize.css";
import "../css/core.css";
import "../css/steps.css";

import {
  handleBackNavigation,
  handleNextNavigation,
  onStep,
} from "./ui/navigation";
import { addBasicMap, addStaticMap } from "./ui/map";
import { initializeStep2 } from "./ui/step2";
import { initializeStep3 } from "./ui/step3";
import { establishScale } from "./utils/geography";
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

      initializeStep2(width, height, "#stepTwo svg");
    }
    // If on step two, initialize step three.
    else if (onStep(2)) {
      const width = retrieve("width");
      const height = retrieve("height");

      initializeStep3(width, height, "#stepThree svg");
    }

    handleNextNavigation();
  });
});
