import domready from '../../js/domready';

async function backToTop() {
    const backToTop = [...document.querySelectorAll('.ons-js-back-to-top')];

    if (backToTop) {
        const BackToTop = (await import('./back-to-top')).default;
        backToTop.forEach((btn) => new BackToTop(btn));
    }
}

domready(backToTop);
