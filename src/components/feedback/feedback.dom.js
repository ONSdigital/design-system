import domready from 'js/domready';

async function initialise() {
  const buttons = [...document.querySelectorAll('.js-feedback-button')];

  if (buttons.length) {
    const Feedback = (await import('./feedback')).default;
    new Feedback(buttons);
  }
}
domready(initialise);
