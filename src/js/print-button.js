import domready from './domready';

export default function addEventListeners() {
  const buttons = [...document.querySelectorAll('.ons-js-print-btn')];

  buttons.forEach(button => {
    button.addEventListener('click', handleClick);
    button.classList.remove('ons-u-d-no');
  });
}

function handleClick() {
  window.print();
}

domready(addEventListeners);
