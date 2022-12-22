import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const input = document.querySelector('#datetime-picker');
const buttonStart = document.querySelector('button[data-start]');
const timer = document.querySelector('.timer');
const daysEL = document.querySelector('span[data-days]');
const hoursEL = document.querySelector('span[data-hours]');
const minutesEL = document.querySelector('span[data-minutes]');
const secondsEL = document.querySelector('span[data-seconds]');

let selectedDate = null;

buttonStart.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      buttonStart.disabled = false;
    }
    selectedDate = selectedDates[0];
  },
};

buttonStart.addEventListener('click', onClickStart);
function onClickStart() {
  //   flatpickr(input, (enableTime = false));
  buttonStart.disabled = true;
  let timerId = setInterval(() => {
    const differenceDate = selectedDate - new Date();
    if (differenceDate >= 0) {
      const { days, hours, minutes, seconds } = convertMs(differenceDate);
      daysEL.textContent = addLeadingZero(days);
      hoursEL.textContent = addLeadingZero(hours);
      minutesEL.textContent = addLeadingZero(minutes);
      secondsEL.textContent = addLeadingZero(seconds);
    } else {
      clearInterval(timerId);
    }
  }, 1000);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

flatpickr(input, options);

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
