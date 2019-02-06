import domready from './domready';
import LoaderBtn from './loader-btn';
import { trackEvent } from './analytics';

domready(() => {
  const timeoutIncrement = 5;
  const timeout = timeoutIncrement * 1000; // 5 seconds
  const submitBtn = new LoaderBtn('.js-btn-submit');
  let count = 0;
  submitBtn.addEventListener('click', () => {
    submitBtn.disable();

    window.setTimeout(() => {
      count += timeoutIncrement;

      trackEvent('send', {
        hitType: 'event',
        eventCategory: 'Error',
        eventAction: 'Submission timeout',
        eventLabel: `Submission took ${count} seconds`
      });
    }, timeout);
  });
});
