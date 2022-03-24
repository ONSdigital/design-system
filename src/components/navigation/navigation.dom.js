import domready from '../../js/domready';

domready(async () => {
  const toggleNavigationBtn = document.querySelector('.ons-js-navigation-button');
  const navigationEl = document.querySelector('.ons-js-navigation');
  const navigationHideClass = 'ons-u-d-no@xxs@l';
  const toggleSubNavigationBtn = document.querySelector('.ons-js-sub-navigation-button');
  const subNavigationEl = document.querySelector('.proto-ons-js-secondary-nav');
  const subNavigationHideClass = 'ons-u-d-no';
  const toggleSearchBtn = document.querySelector('.ons-js-toggle-search');
  const searchEl = document.querySelector('.ons-js-navigation-search');
  const searchHideClass = 'ons-u-d-no@xs@l';

  if (toggleNavigationBtn) {
    const NavigationToggle = (await import('./navigation')).default;

    new NavigationToggle(toggleNavigationBtn, navigationEl, navigationHideClass).registerEvents();
  }

  if (toggleSubNavigationBtn) {
    const SubNavigationToggle = (await import('./navigation')).default;
    new SubNavigationToggle(toggleSubNavigationBtn, subNavigationEl, subNavigationHideClass).registerEvents();
  }

  if (toggleSearchBtn) {
    const searchToggle = (await import('./navigation')).default;

    new searchToggle(toggleSearchBtn, searchEl, searchHideClass).registerEvents();
  }
});
