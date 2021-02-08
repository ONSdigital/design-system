export default function skipToMain(link) {
  const id = link.getAttribute('href').replace('#', '');
  link.addEventListener('click', event => {
    event.preventDefault();
    document.getElementById(id).tabIndex = -1;
    document.getElementById(id).style.outline = 'none';
    document.getElementById(id).focus();
  });
}
