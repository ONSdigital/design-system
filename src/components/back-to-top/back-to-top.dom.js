import domready from '../../js/domready';

async function backToTop() {
    const bttElement = [...document.querySelectorAll('.ons-js-back-to-top')];

    if (bttElement) {
        const Btt = (await import('./back-to-top')).default;
        bttElement.forEach((btn) => new Btt(btn));
    }
}

domready(backToTop);
