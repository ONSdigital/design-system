export default class Collapsible {
  constructor(collapsibleElement) {
    this.saveState = collapsibleElement.getAttribute('data-save-state') === 'true';
    this.open = collapsibleElement.getAttribute('data-open') === 'true';
    this.group = collapsibleElement.getAttribute('data-group');

    // Elements
    this.collapsible = collapsibleElement;
    this.collapsibleHeader = this.collapsible.querySelector('.ons-js-collapsible-heading');

    // Initialise
    const collapsibleId = collapsibleElement.getAttribute('id');

    if (localStorage.getItem(collapsibleId) || this.open) {
      this.setOpen(true);
      this.collapsible['setAttribute']('open', '');
    }

    this.collapsibleHeader.addEventListener('click', this.toggle.bind(this));
    this.collapsibleHeader.addEventListener('keydown', this.keyboardInteraction.bind(this));
  }

  toggle(event) {
    event.preventDefault();
    this.setOpen(!this.isOpen);
  }

  setOpen(open) {
    if (open !== this.isOpen) {
      const action = open ? 'Open' : 'Close';
      const openAttribute = open ? 'set' : 'remove';

      this.isOpen = open;
      this.collapsible[`${openAttribute}Attribute`]('open', '');
      this.collapsibleHeader.setAttribute('data-ga-action', `${action} panel`);

      if (this.onOpen && this.onClose) {
        if (open) {
          this.onOpen();
        } else {
          this.onClose();
        }
      }
    }

    if (this.saveState === true && open === true) {
      localStorage.setItem(this.collapsible.getAttribute('id'), true);
    } else {
      localStorage.removeItem(this.collapsible.getAttribute('id'));
    }
  }

  keyboardInteraction(event) {
    const keyCode = event.which;
    switch (keyCode) {
      // Enter/Space
      case 13:
      case 32:
        event.preventDefault();
        event.stopPropagation();

        this.toggle(event);
        break;
    }
  }
}
