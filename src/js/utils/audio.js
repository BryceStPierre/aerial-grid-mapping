import selectAudio from "../../audio/select.wav";
import deselectAudio from "../../audio/deselect.wav";

export const playSelectAudio = () => {
  let audio = new Audio(selectAudio);
  audio.play();
}

export const playDeselectAudio = () => {
  let audio = new Audio(deselectAudio);
  audio.play();
}