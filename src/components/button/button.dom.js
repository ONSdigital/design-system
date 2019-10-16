import domready from 'js/domready';

async function submitButton() {
  const buttons = [...document.querySelectorAll('.js-button')];
  const form = [...document.getElementsByTagName('form')];

  if (buttons.length && form.length) {
    const SubmitButton = (await import('./button')).default;
    buttons.forEach(button => {
      new SubmitButton(button, form[0]);
    });
  }
}

domready(submitButton);
