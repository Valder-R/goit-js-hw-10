// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";

const inputDelay = document.querySelector("input[name='delay']");
const form = document.querySelector(".form")
form.addEventListener("submit", (ev) => {
  ev.preventDefault();
  let delay = inputDelay.value;
  const selectedState = document.querySelector('input[name="state"]:checked');
  let isSuccess;
  if (selectedState.value == "fulfilled") {
    isSuccess = true;
  } else {
    isSuccess = false;
  }
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (isSuccess) {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });
  promise
      .then(value => {
      iziToast.show({
              message: `✅ Fulfilled promise in ${value}ms`,
              backgroundColor: '#59a10d',
              position:'topRight'
          });
    })
    .catch(error => {
        iziToast.show({
              message: `❌ Rejected promise in ${error}ms`,
              backgroundColor: '#ef4040',
              position: 'topRight'
          });
    });
})
