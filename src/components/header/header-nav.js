import domReady from 'js/domready';

export const attrExpanded = 'aria-expanded';
export const attrHidden = 'aria-hidden';
export const hideClass = 'header-nav--mobile';
export const openClass = 'open';

export default class NavToggle {
  constructor(toggle, nav) {
    this.toggle = toggle;
    this.nav = nav;
    this.toggleNavBinding = this.toggleNav.bind(this);
  }

  registerEvents() {
    this.toggle.addEventListener('click', this.toggleNavBinding, true);
  }

  toggleNav() {
    const isHidden = this.nav.getAttribute(attrHidden);
    isHidden === 'false' ? this.closeNav(this.toggle, this.nav) : this.openNav(this.toggle, this.nav);
  }

  openNav(toggleEl, navEl) {
    toggleEl.parentNode.classList.add(openClass);
    toggleEl.setAttribute(attrExpanded, 'true');
    navEl.setAttribute(attrHidden, 'false');
    navEl.classList.remove(hideClass);
  }

  closeNav(toggleEl, navEl) {
    toggleEl.parentNode.classList.remove(openClass);
    toggleEl.setAttribute(attrExpanded, 'false');
    navEl.setAttribute(attrHidden, 'true');
    navEl.classList.add(hideClass);
  }
}

export function mobileNav() {
  const toggleMainBtn = document.getElementsByClassName('js-toggle-main')[0];
  const mainNavList = document.getElementsByClassName('js-header-nav')[0];

  if (!toggleMainBtn) return;

  new NavToggle(toggleMainBtn, mainNavList).registerEvents();
}

domReady(mobileNav);
