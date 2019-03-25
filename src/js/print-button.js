import domready from 'js/domready';

function addEventListeners() {
  const buttons = [...document.querySelectorAll('.js-print-btn')];

  buttons.forEach(button => {
    button.addEventListener('click', handleClick);
    button.classList.remove('u-d-no');
  });
}

function handleClick(event) {
  event.preventDefault();
  window.print();
}

domready(addEventListeners);
