import domready from '../../js/domready';

async function modals() {
  const modals = [...document.querySelectorAll('.ons-js-modal')];

  if (modals.length) {
    const Modal = (await import('./modal')).default;

    modals.forEach(component => new Modal(component));
  }
}

domready(modals);
