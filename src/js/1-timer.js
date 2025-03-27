import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

let userSelectedDate;
const startButton = document.querySelector("button[data-start]");
const inputField = document.querySelector("#datetime-picker");
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      userSelectedDate = selectedDates[0];
      const dateNow = new Date().getTime()
      if (userSelectedDate <= dateNow) {
          iziToast.show({
            title: 'Wrong Date!',
            message: 'Please choose a date in the future',
            color: "red"
            });
          startButton.setAttribute("disabled","")
      } else {
          startButton.removeAttribute("disabled")
      }
  },
};

flatpickr("#datetime-picker", options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
};

function addLeadingZero(value) {
    let newValue = String(value).padStart(2,"0");
    return newValue;
};

startButton.addEventListener("click", ev => {
    const timeNow = new Date().getTime();
    let diff = userSelectedDate.getTime() - timeNow;
    startButton.setAttribute("disabled", "")
    inputField.setAttribute("disabled", "")
    const intervalId = setInterval(() => {
        const daysField = document.querySelector("span[data-days]");
        const hoursField = document.querySelector("span[data-hours]");
        const minutesField = document.querySelector("span[data-minutes]");
        const secondsField = document.querySelector("span[data-seconds]");
        let result = convertMs(diff);
        daysField.textContent = addLeadingZero(result.days);
        hoursField.textContent = addLeadingZero(result.hours);
        minutesField.textContent = addLeadingZero(result.minutes);
        secondsField.textContent = addLeadingZero(result.seconds);
        diff = diff - 1000;
        if (diff < 0) {
            clearInterval(intervalId);
            inputField.removeAttribute("disabled")
        }
    }, 1000);
    
});