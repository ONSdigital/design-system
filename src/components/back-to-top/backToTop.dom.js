import domready from '../../js/domready';

async function backToTop() {
  const bttElement = [...document.querySelectorAll('.ons-js-back-to-top')];

  if (bttElement) {
    const Btt = (await import('./backToTop')).default;
    bttElement.forEach((btn) => new Btt(btn));
  }
}

domready(backToTop);
