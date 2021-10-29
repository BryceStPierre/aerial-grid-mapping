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

document.addEventListener("DOMContentLoaded", () => {
  let map = addBasicMap({
    lat: 43.665,
    lng: -79.402,
  });

  document
    .querySelector("#back")
    .addEventListener("click", handleBackNavigation);

  document.querySelector("#next").addEventListener("click", () => {
    // Initialize step two.
    if (onStep(1)) {
      const width = document.querySelector("#map").offsetWidth;
      const height = document.querySelector("#map").offsetHeight;
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
    // Initialize step three.
    else if (onStep(2)) {
      const width = retrieve("width");
      const height = retrieve("height");

      addStepThreeGraphics(width, height, "#stepThree svg");
    }

    handleNextNavigation();
  });
});
