export default function inPageLinks(links) {
  if (!document.getElementById('patternlib-page__example') === null) {
    links.forEach(link => {
      const id = link.getAttribute('href').replace('#', '');

      link.addEventListener('click', event => {
        event.preventDefault();
        focusOnInput(id);
      });
    });
  }
}

function focusOnInput(id) {
  const container = document.getElementById(id);
  container.scrollIntoView();

  const input = [
    ...container.getElementsByTagName('INPUT'),
    ...container.getElementsByTagName('TEXTAREA'),
    ...container.getElementsByTagName('SELECT'),
  ].filter(input => {
    const type = input.getAttribute('type');

    return type !== 'readonly' && type !== 'hidden' && type !== 'checkbox' && type !== 'radio';
  })[0];

  if (input) {
    input.focus();
  }
}
