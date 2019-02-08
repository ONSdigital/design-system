import domReady from 'js/domready';

export const attrExpanded = 'aria-expanded';
export const attrHidden = 'aria-hidden';
export const hideClass = 'nav--h-m';
export const openClass = 'open';

class NavToggle {
  constructor(toggle, nav) {
    this.toggle = toggle;
    this.nav = nav;
    this.toggleNavBinding = this.toggleNav.bind(this);
  }

  registerEvents() {
    this.toggle.addEventListener('click', this.toggleNavBinding, true);
  }

  unregisterEvents() {
    this.toggle.removeEventListener('click', this.toggleNavBinding, true);
  }

  setupViewportChecks() {
    this.viewport = utilsModule.matchMedia('(max-width: 46.3rem)');
    this.viewport.addListener(this.checkViewport.bind(this));
    this.checkViewport();
  }

  checkViewport() {
    if (this.viewport.matches) {
      this.registerEvents();
      this.setAttributes();
    } else {
      this.unregisterEvents();
      this.unsetAttributes();
    }
  }

  toggleNav(e) {
    e.preventDefault();
    const isHidden = this.nav.getAttribute(attrHidden);
    isHidden === 'false' ? this.closeNav(this.toggle, this.nav) : this.openNav(this.toggle, this.nav);
  }

  openNav(toggleEl, navEl) {
    this.closeAllChildNavItems();
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

  closeAllChildNavItems() {
    const toggleChildrenBtn = [...document.getElementsByClassName('js-toggle-childList')];
    toggleChildrenBtn.forEach(btn => {
      const childNavList = btn.nextElementSibling;
      this.closeNav(btn, childNavList);
    });
  }

  setAttributes() {
    this.nav.setAttribute('id', this.getHref(this.toggle));
    this.nav.setAttribute('role', 'tabpanel');
    this.toggle.setAttribute('role', 'tab');
    this.toggle.setAttribute('aria-controls', this.nav.id);
  }

  unsetAttributes() {
    this.nav.removeAttribute('id', this.getHref(this.toggle));
    this.toggle.removeAttribute('role', 'tab');
    this.toggle.removeAttribute('aria-controls', this.nav.id);
    this.nav.removeAttribute('role', 'tabpanel');
  }

  getHref(el) {
    const href = el.getAttribute('href');
    return href;
  }
}

export default function mobileNav() {
  const toggleMainBtn = document.getElementsByClassName('js-toggle-main')[0];
  const mainNavList = document.getElementsByClassName('js-main-nav')[0];
  const toggleChildrenBtn = [...document.getElementsByClassName('js-toggle-childList')];

  if (!toggleMainBtn) return;

  new NavToggle(toggleMainBtn, mainNavList).registerEvents();

  if (!toggleChildrenBtn) return;

  toggleChildrenBtn.forEach(btn => {
    const childNavList = btn.nextElementSibling;
    new NavToggle(btn, childNavList).setupViewportChecks();
  });
}

domReady(mobileNav);
