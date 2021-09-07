import domready from '../../js/domready';

domready(async () => {
  const toggleMainBtn = document.querySelector('.ons-js-toggle-main');
  const navEl = document.querySelector('.ons-js-header-nav');
  const navHideClass = 'ons-u-d-no@xxs@m';
  const toggleSearchBtn = document.querySelector('.ons-js-toggle-search');
  const searchEl = document.querySelector('.ons-js-header-search');
  const searchHideClass = 'ons-u-d-no@xs@m';

  if (toggleMainBtn) {
    const NavToggle = (await import('./header-nav')).default;

    new NavToggle(toggleMainBtn, navEl, navHideClass).registerEvents();
  }

  if (toggleSearchBtn) {
    const searchToggle = (await import('./header-nav')).default;

    new searchToggle(toggleSearchBtn, searchEl, searchHideClass).registerEvents();
  }
});
