import $ from "jquery";

import { strings } from "../config";

export const handleBackNavigation = () => {
  if ($("#stepThree").hasClass("active")) {
    $("section, #staticMap").removeClass("active");
    $("#stepText").text(strings.stepTwo);
    $("#stepTwo").addClass("active");
    $("#staticMap").addClass("active");
    $("#next").removeAttr("disabled");
  } else if ($("#stepTwo").hasClass("active")) {
    $("section, #staticMap").removeClass("active");
    $("#stepText").text(strings.stepOne);
    $("#stepOne").addClass("active");
    $("#back").attr("disabled", true);
  }
};

export const handleNextNavigation = () => {
  if ($("#stepOne").hasClass("active")) {
    $("section, #staticMap").removeClass("active");
    $("#stepText").text(strings.stepTwo);
    $("#stepTwo").addClass("active");
    $("#staticMap").addClass("active");
    $("#back").removeAttr("disabled");
  } else if ($("#stepTwo").hasClass("active")) {
    $("section").removeClass("active");
    $("#stepText").text(strings.stepThree);
    $("#stepThree").addClass("active");
    $("#next").attr("disabled", true);
  }
};
