import { GetViewportDetails } from 'viewport-details';

import onViewportChange from '../../js/utils/viewport-change';

const attrExpanded = 'aria-expanded';
const attrHidden = 'aria-hidden';

export default class NavigationToggle {
  constructor(toggle, navigation, hideClass) {
    this.toggle = toggle;
    this.navigation = navigation;
    this.hideClass = hideClass;
    this.toggle.classList.remove('ons-u-d-no');
    this.setAria();
    onViewportChange(this.setAria.bind(this));
  }

  registerEvents() {
    this.toggle.addEventListener('click', this.toggleNav.bind(this));
  }

  toggleNav() {
    const isHidden = this.navigation.getAttribute(attrHidden);
    isHidden === 'false' ? this.closeNav() : this.openNav();
  }

  openNav() {
    const input = [...this.navigation.getElementsByTagName('INPUT')][0];

    this.toggle.setAttribute(attrExpanded, 'true');
    this.toggle.classList.add('active');
    this.navigation.setAttribute(attrHidden, 'false');
    this.navigation.classList.remove(this.hideClass);

    if (input) {
      input.focus();
    }
  }

  closeNav() {
    this.toggle.setAttribute(attrExpanded, 'false');
    this.toggle.classList.remove('active');
    this.navigation.setAttribute(attrHidden, 'true');
    this.navigation.classList.add(this.hideClass);
  }

  setAria() {
    const viewportDetails = GetViewportDetails();
    const hasAria = this.navigation.hasAttribute(attrHidden);

    if (viewportDetails.width < 980) {
      if (!hasAria) {
        this.closeNav();
      }
    } else if (hasAria) {
      this.toggle.removeAttribute(attrExpanded);
      this.navigation.removeAttribute(attrHidden);
      if (this.hideClass !== 'ons-u-d-no') {
        this.navigation.classList.remove(this.hideClass);
      } else {
        this.closeNav();
      }
    }
  }
}
