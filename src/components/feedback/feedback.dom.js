import domready from 'js/domready';

async function initialise() {
  const buttons = [...document.querySelectorAll('.js-feedback-button')];
  const feedbackForm = [...document.querySelectorAll('.js-feedback-form')];
  if (feedbackForm.length) {
    const Feedback = (await import('./feedback')).default;
    new Feedback(buttons);
  }
}
domready(initialise);
