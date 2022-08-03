import domready from '../../js/domready';

async function initialiseCollapsibles() {
  const collapsibleComponents = [...document.querySelectorAll('.ons-js-collapsible')];
  const accordionComponents = [...document.querySelectorAll('.ons-js-accordion')];

  if (collapsibleComponents.length && !accordionComponents.length) {
    const Collapsible = (await import('./collapsible')).default;
    collapsibleComponents.map(element => new Collapsible(element));
  }
}

domready(initialiseCollapsibles);
