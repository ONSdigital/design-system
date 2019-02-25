import DOMReady from 'js/domready';

function feedback() {
  const buttons = [...document.querySelectorAll('.js-feedback-button')];
  const feedbackDetails = document.querySelector('.js-feedback');

  if (feedbackDetails) {
    buttons.forEach(button => button.addEventListener('click', () => openFeedback(feedbackDetails)));
  }
}

function openFeedback(feedbackDetails) {
  if (!feedbackDetails.hasAttribute('open')) {
    feedbackDetails.querySelector('.js-collapsible-summary').click();
  }
}

DOMReady(feedback);
