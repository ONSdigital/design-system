import domready from '../../js/domready';

domready(async () => {
  const toggleMainBtn = document.querySelector('.js-toggle-main');
  const navEl = document.querySelector('.js-header-nav');
  const navHideClass = 'u-d-no@xxs@m';
  const toggleSearchBtn = document.querySelector('.js-toggle-search');
  const searchEl = document.querySelector('.js-header-search');
  const searchHideClass = 'u-d-no@xs@m';

  if (toggleMainBtn) {
    const NavToggle = (await import('./header-nav')).default;

    new NavToggle(toggleMainBtn, navEl, navHideClass).registerEvents();
  }

  if (toggleSearchBtn) {
    const searchToggle = (await import('./header-nav')).default;

    new searchToggle(toggleSearchBtn, searchEl, searchHideClass).registerEvents();
  }
});
