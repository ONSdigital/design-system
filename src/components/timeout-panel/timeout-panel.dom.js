import domready from '../../js/domready';

async function panels() {
  const timeouts = [...document.querySelectorAll('.ons-panel')];

  if (timeouts.length) {
    const Timeout = (await import('./timeout-panel')).default;

    timeouts.forEach(context => {
      let time = context.getAttribute('countdownInSeconds');
      let url = context.getAttribute('urlOnTimeout');
      new Timeout(context, time, url);
    });
  }
}

domready(panels);
