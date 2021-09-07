import { GetViewportDetails } from 'viewport-details';

import onViewportChange from '../../js/utils/viewport-change';

const attrExpanded = 'aria-expanded';
const attrHidden = 'aria-hidden';

export default class NavToggle {
  constructor(toggle, nav, hideClass) {
    this.toggle = toggle;
    this.nav = nav;
    this.hideClass = hideClass;
    this.toggle.classList.remove('u-d-no');

    this.setAria();
    onViewportChange(this.setAria.bind(this));
  }

  registerEvents() {
    this.toggle.addEventListener('click', this.toggleNav.bind(this));
  }

  toggleNav() {
    const isHidden = this.nav.getAttribute(attrHidden);
    isHidden === 'false' ? this.closeNav() : this.openNav();
  }

  openNav() {
    const input = [...this.nav.getElementsByTagName('INPUT')][0];

    this.toggle.setAttribute(attrExpanded, 'true');
    this.toggle.classList.add('active');
    this.nav.setAttribute(attrHidden, 'false');
    this.nav.classList.remove(this.hideClass);

    if (input) {
      input.focus();
    }
  }

  closeNav() {
    this.toggle.setAttribute(attrExpanded, 'false');
    this.toggle.classList.remove('active');
    this.nav.setAttribute(attrHidden, 'true');
    this.nav.classList.add(this.hideClass);
  }

  setAria() {
    const viewportDetails = GetViewportDetails();
    const hasAria = this.nav.hasAttribute(attrHidden);

    if (viewportDetails.width < 740) {
      if (!hasAria) {
        this.closeNav();
      }
    } else if (hasAria) {
      this.toggle.removeAttribute(attrExpanded);
      this.nav.removeAttribute(attrHidden);
      this.nav.classList.remove(this.hideClass);
    }
  }
}
