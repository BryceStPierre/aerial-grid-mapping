import "normalize.css";
import "../css/layout.css";
import "../css/core.css";

import $ from "jquery";

$(function () {
  $("#back").on("click", function () {
    if ($("#stepThree").hasClass("active")) {
      $("section").removeClass("active");
      $("#stepTwo").addClass("active");
      $("#next").removeAttr("disabled");
    } else if ($("#stepTwo").hasClass("active")) {
      $("section").removeClass("active");
      $("#stepOne").addClass("active");
      $("#back").attr("disabled", true);
    }
  });

  $("#next").on("click", function () {
    if ($("#stepOne").hasClass("active")) {
      $("section").removeClass("active");
      $("#stepTwo").addClass("active");
      $("#back").removeAttr("disabled");
    } else if ($("#stepTwo").hasClass("active")) {
      $("section").removeClass("active");
      $("#stepThree").addClass("active");
      $("#next").attr("disabled", true);
    }
  });
})