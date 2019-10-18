import domready from 'js/domready';

async function loaderButton() {
  const buttons = [...document.querySelectorAll('.js-loader-btn')];
  const form = [...document.getElementsByTagName('form')];

  if (buttons.length && form.length) {
    const LoaderButton = (await import('./button')).default;
    buttons.forEach(button => {
      new LoaderButton(button, form[0]);
    });
  }
}

domready(loaderButton);
