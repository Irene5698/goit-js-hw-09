import Notiflix from 'notiflix';
const formInput = document.querySelector('.form');
formInput.addEventListener('submit', onSubmitBtn);

function onSubmitBtn(evt) {
  evt.preventDefault();

  let firstDelay = Number(evt.currentTarget.delay.value);
  const stepDelay = Number(evt.currentTarget.step.value);
  const amountIteration = Number(evt.currentTarget.amount.value);

  for (let i = 1; i <= amountIteration; i += 1) {
    createPromise(i, firstDelay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay} ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay} ms`
        );
      });

    firstDelay += stepDelay;
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolved, rejected) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolved({ position, delay });
      } else {
        rejected({ position, delay });
      }
    }, delay);
  });
}
