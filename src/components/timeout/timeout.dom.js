import domready from '../../js/domready';

async function modals() {
  const timeouts = [...document.querySelectorAll('.ons-js-timeout-modal')];

  if (timeouts.length) {
    const Timeout = (await import('./timeout')).default;

    timeouts.forEach(component => new Timeout(component));
  }
}

domready(modals);
