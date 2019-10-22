import domready from 'js/domready';

async function submitButton() {
  const buttons = [...document.querySelectorAll('.js-submit-btn')];
  const form = [...document.getElementsByTagName('form')];
  let submitType;

  if (buttons.length && form.length) {
    const SubmitButton = (await import('./button')).default;
    buttons.forEach(button => {
      if (button.classList.contains('js-timer')) {
        submitType = 'timer';
      } else if (button.classList.contains('js-loader')) {
        submitType = 'loader';
      }
      new SubmitButton(button, form[0], submitType);
    });
  }
}

domready(submitButton);
