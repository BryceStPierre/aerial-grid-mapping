import $ from "jquery";

export const onClickBackButton = () => {
  if ($("#stepThree").hasClass("active")) {
    $("section").removeClass("active");
    $("#stepTwo").addClass("active");
    $("#next").removeAttr("disabled");
  } else if ($("#stepTwo").hasClass("active")) {
    $("section").removeClass("active");
    $("#stepOne").addClass("active");
    $("#back").attr("disabled", true);
  }
};

export const onClickNextButton = () => {
  if ($("#stepOne").hasClass("active")) {
    $("section").removeClass("active");
    $("#stepTwo").addClass("active");
    $("#back").removeAttr("disabled");
  } else if ($("#stepTwo").hasClass("active")) {
    $("section").removeClass("active");
    $("#stepThree").addClass("active");
    $("#next").attr("disabled", true);
  }
};