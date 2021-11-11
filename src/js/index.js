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
import { initializeGridUnitSizeControl, initializeStep3 } from "./ui/step3";
import { establishScale } from "./utils/geography";
import { retrieve, store } from "./utils/localStorage";
import { dimensions, initialLocation } from "./config/constants";

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
      store("scale", scale);

      initializeStep2(width, height, "#stepTwo svg");
    }
    // If on step two, initialize step three.
    else if (onStep(2)) {
      const width = retrieve("width");
      const height = retrieve("height");

      const handleSelectionUpdate = (selectedPortion) => {
        store("gridSelection", selectedPortion);

        let numberOfUnits = 0;
        if (selectedPortion.bitmap.length > 0) {
          numberOfUnits = Array.from(selectedPortion.bitmap)
            .flat()
            .reduce((previous, current) => previous + current);
        }

        const scale = retrieve("scale");
        const gridUnitSize = retrieve("gridUnitSize");
        const gridSelectionArea =
          numberOfUnits * Math.pow(gridUnitSize * scale, 2);
        document.querySelector("#gridSelectionArea").innerHTML =
          gridSelectionArea.toFixed(2);
        document.querySelector("#gridSelectionCount").innerHTML = numberOfUnits;
      };

      store("gridUnitSize", dimensions.gridUnitSize.default);

      initializeGridUnitSizeControl("#gridUnitSize", (newGridUnitSize) => {
        store("gridUnitSize", newGridUnitSize);
        initializeStep3(
          width,
          height,
          "#stepThree svg",
          handleSelectionUpdate,
          newGridUnitSize
        );
      });

      initializeStep3(width, height, "#stepThree svg", handleSelectionUpdate);
    }

    handleNextNavigation();
  });
});
