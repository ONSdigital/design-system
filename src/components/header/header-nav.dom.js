import domready from '../../js/domready';

domready(async () => {
  const toggleMainBtn = document.querySelector('.ons-js-toggle-main');
  const mainNavList = document.querySelector('.ons-js-header-nav');

  if (toggleMainBtn) {
    const NavToggle = (await import('./header-nav')).default;

    new NavToggle(toggleMainBtn, mainNavList).registerEvents();
  }
});
