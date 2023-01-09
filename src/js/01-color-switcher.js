const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');
const bodyEl = document.body;
let intervalId = null;

btnStart.addEventListener('click', startChangeColor);
btnStop.addEventListener('click', stopChangeColor);

btnStop.setAttribute('disabled', true);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function startChangeColor() {
  btnStart.setAttribute('disabled', true);
  btnStop.removeAttribute('disabled');

  bodyEl.style.backgroundColor = getRandomHexColor();
  intervalId = setInterval(() => {
    bodyEl.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function stopChangeColor() {
  clearInterval(intervalId);
  btnStart.removeAttribute('disabled');
  btnStop.setAttribute('disabled', true);
}
