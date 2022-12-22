function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
const body = document.querySelector('body');
const buttonStart = document.querySelector('[data-start]');
const buttonStop = document.querySelector('[data-stop]');
let intervalId = null;
buttonStop.disabled = true;

buttonStart.addEventListener('click', onClickStart);
function onClickStart(e) {
  buttonStop.disabled = false;
  buttonStart.disabled = true;
  intervalId = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  //   buttonStart.setAttribute('disabled', 'disabled');
}
buttonStop.addEventListener('click', onClickStop);
function onClickStop(e) {
  buttonStop.disabled = true;
  buttonStart.disabled = false;
  clearInterval(intervalId);
}
