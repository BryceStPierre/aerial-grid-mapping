import "normalize.css";
import "../css/core.css";
import "../css/steps.css";

import $ from "jquery";

import { handleBackNavigation, handleNextNavigation } from "./ui/navigation";
import { addBasicMap, addStaticMap } from "./ui/map";
import { establishScale } from "./utils/geography";
import { addStepTwoCanvas } from "./ui/canvas";

$(function () {
  let map = addBasicMap({
    lat: 43.665,
    lng: -79.402,
  });

  $("#back").on("click", () => {
    handleBackNavigation();
  });

  $("#next").on("click", () => {
    if ($("#stepOne").hasClass("active")) {
      const width = $("#map").width();
      const height = $("#map").height();

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
      
      addStepTwoCanvas(width, height, "#stepTwo svg");
    }

    handleNextNavigation();
  });
});
