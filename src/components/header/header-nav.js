import domReady from 'js/domready';

const attrExpanded = 'aria-expanded';
const attrHidden = 'aria-hidden';
const hideClass = 'u-d-no@xs@m';

export default class NavToggle {
  constructor(toggle, nav) {
    this.toggle = toggle;
    this.nav = nav;
    this.toggle.classList.remove('u-d-no');

    this.closeNav();
  }

  registerEvents() {
    this.toggle.addEventListener('click', this.toggleNav.bind(this));
  }

  toggleNav() {
    const isHidden = this.nav.getAttribute(attrHidden);
    isHidden === 'false' ? this.closeNav() : this.openNav();
  }

  openNav() {
    this.toggle.setAttribute(attrExpanded, 'true');
    this.nav.setAttribute(attrHidden, 'false');
    this.nav.classList.remove(hideClass);
  }

  closeNav() {
    this.toggle.setAttribute(attrExpanded, 'false');
    this.nav.setAttribute(attrHidden, 'true');
    this.nav.classList.add(hideClass);
  }
}

export function mobileNav() {
  const toggleMainBtn = document.querySelector('.js-toggle-main');
  const mainNavList = document.querySelector('.js-header-nav');

  if (toggleMainBtn) {
    new NavToggle(toggleMainBtn, mainNavList).registerEvents();
  }
}

domReady(mobileNav);
