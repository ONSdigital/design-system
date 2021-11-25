import domready from '../../js/domready';

async function modals() {
  const modals = [...document.querySelectorAll('.ons-js-modal')];
  const timeouts = [...document.querySelectorAll('.ons-js-timeout-modal')];

  if (modals.length && !timeouts.length) {
    const Modal = (await import('./modal')).default;

    modals.forEach(component => new Modal(component));
  }
}

domready(modals);
