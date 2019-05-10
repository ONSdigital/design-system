import domReady from 'js/domready';

const attrExpanded = 'aria-expanded';
const attrHidden = 'aria-hidden';
const hideClass = 'header-nav--mobile';

export default class NavToggle {
  constructor(toggle, nav) {
    this.toggle = toggle;
    this.nav = nav;
    this.toggleNavBinding = this.toggleNav.bind(this);
    this.toggle.classList.remove('u-d-no');
  }

  registerEvents() {
    this.toggle.addEventListener('click', this.toggleNavBinding, true);
  }

  toggleNav() {
    const isHidden = this.nav.getAttribute(attrHidden);
    isHidden === 'false' ? this.closeNav(this.toggle, this.nav) : this.openNav(this.toggle, this.nav);
  }

  openNav(toggleEl, navEl) {
    toggleEl.setAttribute(attrExpanded, 'true');
    navEl.setAttribute(attrHidden, 'false');
    navEl.classList.remove(hideClass);
  }

  closeNav(toggleEl, navEl) {
    toggleEl.setAttribute(attrExpanded, 'false');
    navEl.setAttribute(attrHidden, 'true');
    navEl.classList.add(hideClass);
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
