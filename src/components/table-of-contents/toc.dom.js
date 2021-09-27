import domready from '../../js/domready';

async function toc() {
  const toc = [...document.querySelectorAll('.ons-js-toc-container')];

  if (toc.length) {
    const Toc = (await import('./toc')).default;

    toc.forEach(component => new Toc(component));
  }
}

domready(toc);
