import domready from '../../js/domready';

async function initialiseDetailsEls() {
  const detailsComponents = [...document.querySelectorAll('.ons-js-details')];
  const accordionComponents = [...document.querySelectorAll('.ons-js-accordion')];

  if (detailsComponents.length && !accordionComponents.length) {
    const Details = (await import('./details')).default;
    detailsComponents.map((element) => new Details(element));

    // Open all details tags when printing.
    window.addEventListener('beforeprint', () => {
      detailsComponents.map((element) => element.setAttribute('open', ''));
    });

    // Close all details tags after printing.
    window.addEventListener('afterprint', () => {
      detailsComponents.map((element) => element.removeAttribute('open'));
    });
  }
}

domready(initialiseDetailsEls);
