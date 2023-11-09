import domready from '../../js/domready';

domready(async () => {
  const abbreviations = [...document.querySelectorAll('.ons-js-input-abbr')];
  console.log(abbreviations.length);
  if (abbreviations.length) {
    abbreviations.forEach((element) => {
      element.addEventListener('click', (event) => {
        event.preventDefault();
        const input = element.parentNode.querySelector('.ons-input');
        input.focus();
      });
    });
  }
});

//Add functionality when the input is focussed, the abbreviation's tooltip appears
domready(async () => {
  const inputs = [...document.querySelectorAll('.ons-input')];
  console.log(inputs.length);
  if (inputs.length) {
    inputs.forEach((element) => {
      element.addEventListener('focus', (event) => {
        const abbreviation = element.parentNode.querySelector('.ons-js-input-abbr');
        abbreviation.classList.add('ons-input__abbr--active');
      });
    });
  }
});
