import domready from 'js/domready';

async function submitButton() {
  const submitButton = [...document.querySelectorAll('.js-button')];

  if (submitButton.length) {
    const SubmitButton = (await import('./button')).default;
    submitButton.forEach(button => {
      new SubmitButton(button);
    });
  }
}

domready(submitButton);
