import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import 'flatpickr/dist/themes/dark.css';
import Notiflix from 'notiflix';

const input = document.querySelector('#datetime-picker');
const btnStart = document.querySelector('button[data-start]');
const daysTimer = document.querySelector('span[data-days]');
const hoursTimer = document.querySelector('span[data-hours]');
const minutesTimer = document.querySelector('span[data-minutes]');
const secondsTimer = document.querySelector('span[data-seconds]');

let futureTime = null;
let intervalId = null;

const timer = {
  start() {
    intervalId = setInterval(() => {
      const startTime = Date.now();
      const deltaTime = futureTime - startTime;

      const time = convertMs(deltaTime);
      deltaTime < 0 ? clearInterval(intervalId) : updateClockFace(time);
    }, 1000);

    btnStart.setAttribute('disabled', true);
    input.setAttribute('disabled', true);
  },
};

btnStart.addEventListener('click', timer.start.bind(timer));
btnStart.setAttribute('disabled', true);

function getTimeComponent(time) {}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    futureTime = selectedDates[0].getTime();
    const startTime = Date.now();
    const deltaTime = futureTime - startTime;
    if (deltaTime > 0) {
      btnStart.removeAttribute('disabled');
    } else {
      Notiflix.Report.failure('Please choose a date in the future', '', 'Okey');
      btnStart.setAttribute('disabled', true);
    }
  },
};
flatpickr('#datetime-picker', options);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);

  const hours = Math.floor((ms % day) / hour);

  const minutes = Math.floor(((ms % day) % hour) / minute);

  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function updateClockFace({ days, hours, minutes, seconds }) {
  daysTimer.textContent = `${days}`;
  hoursTimer.textContent = `${hours}`;
  minutesTimer.textContent = `${minutes}`;
  secondsTimer.textContent = `${seconds}`;
}

