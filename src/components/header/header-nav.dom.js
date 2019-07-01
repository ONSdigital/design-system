import NavToggle from './header-nav';

domReady(() => {
  const toggleMainBtn = document.querySelector('.js-toggle-main');
  const mainNavList = document.querySelector('.js-header-nav');

  if (toggleMainBtn) {
    new NavToggle(toggleMainBtn, mainNavList).registerEvents();
  }
});
