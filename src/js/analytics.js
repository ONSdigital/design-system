import domready from './domready';

export let trackEvent = () => {};

if (window.google_tag_manager !== undefined) {
    console.log('GA active');
    trackEvent = (type, data) => {
        gtag('event', type, { ...data });
        console.log('Data sent to Data Layer');
    };
} else {
    console.log('Google analytics not connected');
}

export const trackElement = (el, type) => {
    const attributes = el.attributes;
    const eventData = {};
    // Loop through all attributes of the element
    for (let i = 0; i < attributes.length; i++) {
        const attributeName = attributes[i].name;
        // Check if the attribute starts with 'data-ga-'
        if (attributeName.startsWith('data-ga-')) {
            // Extract the key by removing 'data-ga-' prefix
            const key = attributeName.replace('data-ga-', '').replace('-', '_');
            // Use the attribute value as the value for the key
            eventData[key] = el.getAttribute(attributeName);
        }
    }
    return trackEvent(`ons_${type}`, eventData);
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
            return trackElement(target, 'click');
        } else if (target.parentElement?.getAttribute('data-ga') === 'click') {
            return trackElement(target.parentElement, 'click');
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
