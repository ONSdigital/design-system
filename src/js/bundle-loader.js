// Handles whether es2015+ or es5 bundles should be loaded, as the nomodule attribute isn't supported by Safari 10 and it loads both bundles.
(() => {
  let scripts = [...document.querySelectorAll('script')]
    .find(element => element.hasAttribute('data-scripts'))
    .getAttribute('data-scripts')
    .split(',');

  const check = document.createElement('script');

  if (!('noModule' in check) && 'onbeforeload' in check) {
    scripts = scripts.map(script => script.replace('.js', '.es5.js'));
  }

  scripts.forEach(path => {
    const script = document.createElement('script');
    script.src = path;
    document.body.appendChild(script);
  });
})();
