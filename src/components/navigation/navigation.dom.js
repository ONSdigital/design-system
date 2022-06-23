import domready from '../../js/domready';

domready(async () => {
  const toggleNavigationBtn = document.querySelector('.ons-js-navigation-button');
  const navigationEl = document.querySelector('.ons-js-navigation');
  const navigationHideClass = 'ons-u-d-no@xxs@l';
  const toggleSubNavigationBtn = document.querySelector('.ons-js-sub-navigation-button');
  const subNavigationEl = document.querySelector('.ons-js-secondary-nav');
  const subNavigationHideClass = 'ons-u-d-no';
  const toggleSearchBtn = document.querySelector('.ons-js-toggle-search');
  const searchEl = document.querySelector('.ons-js-navigation-search');
  const searchHideClass = 'ons-u-d-no@xs@l';
  const toggleServicesBtn = document.querySelector('.ons-js-toggle-services');
  const servicesEl = document.querySelector('.ons-js-services-mobile-nav');
  const servicesHideClass = 'ons-u-d-no';

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

  if (toggleServicesBtn) {
    const servicesToggle = (await import('./navigation')).default;

    new servicesToggle(toggleServicesBtn, servicesEl, servicesHideClass).registerEvents();
  }
});
