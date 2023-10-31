import domready from './domready';

export let trackEvent = (event, data) => {
  console.log(`[Analytics disabled] Event: ${event}`); // eslint-disable-line no-console
  console.log(data); // eslint-disable-line no-console
};

if (typeof window.gtag !== 'undefined') {
  trackEvent = (evt, data) => {
    window.gtag('event', evt, data);
  };
}

export const trackElement = (el) => {
  return trackEvent('send', {
    event_category: el.getAttribute('data-ga-category') || '',
    event_action: el.getAttribute('data-ga-action') || '',
    event_label: el.getAttribute('data-ga-label') || '',
  });
};

export default function initAnalytics() {
  let trackVisibleElements = [...document.querySelectorAll('[data-ga=visible]')];

  const interval = window.setInterval(() => {
    trackVisibleElements = trackVisibleElements.filter((element) => {
      return element ? trackElement(element) && false : true;
    });
    if (trackVisibleElements.length === 0) {
      window.clearInterval(interval);
    }
  }, 200);

  [...document.querySelectorAll('[data-ga=error]')].map(trackElement);

  document.body.addEventListener('click', ({ target }) => {
    if (target.getAttribute('data-ga') === 'click') {
      trackElement(target);
    }
  });

  const afterPrint = () => {
    return trackEvent('send', {
      event_category: 'Print Intent',
      event_action: 'Print Intent',
      event_label: window.location.pathname.split('/').slice(-3).join('/'),
    });
  };

  if (window.matchMedia) {
    const mediaQueryList = window.matchMedia('print');
    mediaQueryList.addListener(function (mql) {
      if (!mql.matches) {
        afterPrint();
      }
    });
  }
  window.onafterprint = afterPrint;
}

domready(initAnalytics);
