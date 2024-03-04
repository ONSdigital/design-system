import domready from './domready';

export let trackEvent = () => {};

if (window.google_tag_manager !== undefined) {
  console.log('GA active');
  trackEvent = (type, data) => {
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      dataLayer.push(arguments);
    }
    gtag('event', type, { ...data });
    console.log('Data sent to Data Layer');
  };
} else {
  console.log('Google analytics not connected');
}

export const trackElement = (el, type) => {
  return trackEvent(type, {
    event_category: el.getAttribute('data-ga-category') || '',
    event_action: el.getAttribute('data-ga-action') || '',
    event_label: el.getAttribute('data-ga-label') || '',
  });
};

export default function initAnalytics() {
  let trackVisibleElements = [...document.querySelectorAll('[data-ga=visible]')];

  const interval = window.setInterval(() => {
    trackVisibleElements = trackVisibleElements.filter((element) => {
      return element ? trackElement(element, 'visible') && false : true;
    });
    if (trackVisibleElements.length === 0) {
      window.clearInterval(interval);
    }
  }, 200);

  document.body.addEventListener('click', ({ target }) => {
    if (target.getAttribute('data-ga') === 'click') {
      trackElement(target, target.getAttribute('data-ga'));
    }
  });
  [...document.querySelectorAll('[data-ga=error]')].map((element) => trackElement(element, 'error'));

  const afterPrint = () => {
    return trackEvent({
      event_tracked: 'true',
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
