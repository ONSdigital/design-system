export default function skipToMain(link) {
  const id = link.getAttribute('href').replace('#', '');
  link.addEventListener('click', event => {
    event.preventDefault();
    document.getElementById(id).tabIndex = 0;
    document.getElementById(id).focus();
  });
}
