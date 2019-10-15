import domready from 'js/domready';

async function submitButton() {
  const buttons = [...document.querySelectorAll('.js-button')];

  if (buttons.length) {
    const SubmitButton = (await import('./button')).default;
    buttons.forEach(button => {
      new SubmitButton(button);
    });
  }
}

domready(submitButton);
