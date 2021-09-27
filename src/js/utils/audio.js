import selectAudio from "../../assets/audio/select.wav";
import deselectAudio from "../../assets/audio/deselect.wav";

export const playSelectAudio = () => {
  let audio = new Audio(selectAudio);
  audio.play();
}

export const playDeselectAudio = () => {
  let audio = new Audio(deselectAudio);
  audio.play();
}