import domready from '../../js/domready';

async function initialiseAccordions() {
  const toggleAllButtons = [...document.querySelectorAll('.ons-js-accordion-all')];

  if (toggleAllButtons.length) {
    const collapsibleComponents = [...document.querySelectorAll('.ons-js-collapsible')];

    const Collapsible = (await import('../collapsible/collapsible')).default;
    const Accordion = (await import('./accordion')).default;
    const collapsibles = collapsibleComponents.map(element => new Collapsible(element));

    toggleAllButtons.forEach(button => {
      new Accordion(button, collapsibles);
    });
  }
}

domready(initialiseAccordions);
