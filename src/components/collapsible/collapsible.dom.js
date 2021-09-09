import domready from '../../js/domready';

async function initialiseCollapsibles() {
  const collapsibleComponents = [...document.querySelectorAll('.ons-js-collapsible')];

  if (collapsibleComponents.length) {
    const toggleAllButtons = [...document.querySelectorAll('.ons-js-collapsible-all')];

    const Collapsible = (await import('./collapsible')).default;
    const collapsibles = collapsibleComponents.map(element => new Collapsible(element));

    if (toggleAllButtons.length) {
      const CollapsibleGroup = (await import('./collapsible.group')).default;

      toggleAllButtons.forEach(button => {
        new CollapsibleGroup(button, collapsibles);
      });
    }
  }
}

domready(initialiseCollapsibles);
