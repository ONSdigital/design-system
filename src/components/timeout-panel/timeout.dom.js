import domready from '../../js/domready';

async function panels() {
  const timeouts = [...document.querySelectorAll('.ons-js-timeout-panel')];

  if (timeouts.length) {
    const Timeout = (await import('./timeout')).default;

    timeouts.forEach(context => {
      new Timeout(context);
    });
  }
}

domready(panels);
