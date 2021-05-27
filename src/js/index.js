import "normalize.css";
import "../css/core.css";
import "../css/steps.css";

import $ from "jquery";

import { handleBackNavigation, handleNextNavigation } from "./ui/navigation";
import { addBasicMap } from "./map/basic";
import { addStaticMap } from "./map/static";

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
      addStaticMap(
        $("#map").width(),
        $("#map").height(),
        map.getBounds().getCenter().toJSON(),
        map.getZoom()
      );
    }

    handleNextNavigation();
  });
});
