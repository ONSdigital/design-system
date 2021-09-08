import domready from '../../js/domready';

async function submitButton() {
  const buttons = [...document.querySelectorAll('.ons-js-submit-btn')];
  let submitType;

  if (buttons.length) {
    const SubmitButton = (await import('./button')).default;
    buttons.forEach(button => {
      if (button.classList.contains('ons-js-timer')) {
        submitType = 'timer';
      } else if (button.classList.contains('ons-js-loader')) {
        submitType = 'loader';
      } else if (button.classList.contains('ons-btn--link')) {
        submitType = 'link';
      }
      new SubmitButton(button, submitType);
    });
  }
}

domready(submitButton);
