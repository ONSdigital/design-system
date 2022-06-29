export default class Collapsible {
  constructor(collapsibleElement) {
    this.saveState = collapsibleElement.getAttribute('data-save-state') === 'true';
    this.open = collapsibleElement.getAttribute('data-open') === 'true';

    // State
    this.group = collapsibleElement.getAttribute('data-group');

    // Elements
    this.collapsible = collapsibleElement;
    this.collapsibleHeader = this.collapsible.querySelector('.ons-js-collapsible-heading');
    this.content = this.collapsible.querySelector('.ons-js-collapsible-content');

    // Initialise
    const collapsibleId = collapsibleElement.getAttribute('id');

    if (localStorage.getItem(collapsibleId) || this.open) {
      this.setOpen(true);
    } else {
      this.setOpen(false);
    }
  }

  setOpen(open) {
    if (open !== this.isOpen) {
      const action = open ? 'Open' : 'Close';
      this.isOpen = open;
      this.collapsibleHeader.setAttribute('data-ga-action', `${action} panel`);
    }

    if (this.saveState === true && open === true) {
      localStorage.setItem(this.collapsible.getAttribute('id'), true);
    } else {
      localStorage.removeItem(this.collapsible.getAttribute('id'));
    }
  }
}
