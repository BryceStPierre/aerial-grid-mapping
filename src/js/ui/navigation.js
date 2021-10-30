import { strings } from "../config/constants";

export const onStep = (step) =>
  document.querySelector("section.active").dataset.step == step;

export const handleBackNavigation = () => navigate(-1);

export const handleNextNavigation = () => navigate(1);

/**
 * Navigate through the app by managing the buttons and sections.
 * @param {number} stepChange
 */
const navigate = (stepChange) => {
  const currentStep = document.querySelector("section.active").dataset.step;
  const numberOfSteps = document.querySelectorAll("section").length;
  let nextStep = Number(currentStep) + stepChange;

  if (nextStep === 0 || nextStep > numberOfSteps) return;

  document.querySelectorAll("section, #staticMap").forEach((element) => {
    element.classList.remove("active");
  });

  document.querySelector("#stepText").innerHTML = strings[nextStep - 1];
  document
    .querySelector(`section[data-step="${nextStep}"]`)
    .classList.add("active");

  if (nextStep === 1)
    return document.querySelector("#back").setAttribute("disabled", "");

  if (nextStep >= 2)
    document.querySelector("#staticMap").classList.add("active");

  if (nextStep === numberOfSteps)
    return document.querySelector("#next").setAttribute("disabled", "");

  document.querySelector("#back").removeAttribute("disabled");
  document.querySelector("#next").removeAttribute("disabled");
};
