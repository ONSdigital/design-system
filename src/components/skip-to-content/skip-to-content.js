export default function skipToMain(link) {
  const id = link.getAttribute('href').replace('#', '');
  link.addEventListener('click', event => {
    event.preventDefault();
    console.log(id);
    document.getElementById(id).scrollIntoView();
  });
}
