setTimeout(() => {
  if (typeof window.google_tag_manager !== 'undefined') {
    window.dataLayer = window.dataLayer || [];
    trackEvent = (data) => {
      window.dataLayer.push({ data });
    };
  }
}, 300);

export const trackElement = (el) => {
  return trackEvent({
    event_tracked: 'true',
    event_category: el.getAttribute('data-ga-category') || '',
    event_action: el.getAttribute('data-ga-action') || '',
    event_label: el.getAttribute('data-ga-label') || '',
  });
};

export default function initAnalytics() {
  document.body.addEventListener('click', ({ target }) => {
    if (target.getAttribute('data-ga')) {
      trackElement(target);
    }
  });

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
