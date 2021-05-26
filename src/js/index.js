import "normalize.css";
import "../css/layout.css";
import "../css/core.css";

import $ from "jquery";

import {
  onClickBackButton,
  onClickNextButton,
} from "./interactions/navigation";

$(function () {
  $("#back").on("click", onClickBackButton);
  $("#next").on("click", onClickNextButton);
});
