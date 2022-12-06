import domready from '../../js/domready';

async function initialiseAccordions() {
  const toggleAllButtons = [...document.querySelectorAll('.ons-js-accordion-all')];

  if (toggleAllButtons.length) {
    const detailsComponents = [...document.querySelectorAll('.ons-js-details')];

    const Details = (await import('../details/details')).default;
    const Accordion = (await import('./accordion')).default;
    const detailsEls = detailsComponents.map(element => new Details(element));

    toggleAllButtons.forEach(button => {
      new Accordion(button, detailsEls);
    });
  }
}

domready(initialiseAccordions);
