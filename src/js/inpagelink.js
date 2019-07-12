import domready from 'js/domready';

function inPageLink() {
  const links = [...document.getElementsByClassName('js-inpagelink')];

  links.forEach(link => {
    const id = link.getAttribute('href').replace('#', '');

    link.addEventListener('click', event => {
      event.preventDefault();
      focusOnInput(id);
    });
  });
}

function focusOnInput(id) {
  const container = document.getElementById(id);

  let input;

  if (['INPUT', 'TEXTAREA', 'SELECT'].includes(container.tagName)) {
    input = container;
  } else {
    input = [
      ...container.getElementsByTagName('INPUT'),
      ...container.getElementsByTagName('TEXTAREA'),
      ...container.getElementsByTagName('SELECT'),
    ].filter(input => {
      const type = input.getAttribute('type');

      return type !== 'readonly' && type !== 'hidden';
    })[0];
  }

  if (input) {
    input.focus();
  }
}

domready(inPageLink);
