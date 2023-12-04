import domready from '../../js/domready';

async function btt() {
  const bttElement = [...document.querySelectorAll('.ons-js-btt')];
  console.log([...bttElement]);

  if (bttElement) {
    const Btt = (await import('./btt')).default;
    bttElement.forEach(btn => new Btt(btn));
  }
}

domready(btt);
