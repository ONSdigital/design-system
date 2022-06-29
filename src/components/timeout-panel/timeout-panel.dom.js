import domready from '../../js/domready';

async function timeoutPanels() {
  const panels = [...document.querySelectorAll('.ons-js-panel-with-countdown')];

  if (panels.length) {
    const Timeout = (await import('../../js/timeout')).default;

    panels.forEach(context => {
      let time = context.getAttribute('data-server-session-expires-at');
      new Timeout(context, null, time, false, true);
    });
  }
}

domready(timeoutPanels);
