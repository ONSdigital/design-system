import domready from '../../js/domready';

async function modals() {
  const timeouts = [...document.querySelectorAll('.ons-js-timeout-modal')];

  if (timeouts.length) {
    const Timeout = (await import('./timeout')).default;

    timeouts.forEach(context => {
      let url = context.getAttribute('data-server-session-expiry-endpoint');
      let time = context.getAttribute('data-server-session-expires-at');
      new Timeout(context, url, time);
    });
  }
}

domready(modals);
