import Timer from "./Timer.js";

new Timer(
  document.querySelector(".timer")
);


const openButton = document.querySelector("[data-open-settings]")
const dialog = document.querySelector("[data-settings]");

openButton.addEventListener("click", () => {
  dialog.showModal() // Opens a modal
})