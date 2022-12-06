export default class Details {
  constructor(detailsElement) {
    this.saveState = detailsElement.getAttribute('data-save-state') === 'true';
    this.open = detailsElement.getAttribute('data-open') === 'true';
    this.group = detailsElement.getAttribute('data-group');

    // Elements
    this.details = detailsElement;
    this.detailsHeader = this.details.querySelector('.ons-js-details-heading');

    // Initialise
    const detailsId = detailsElement.getAttribute('id');

    if (localStorage.getItem(detailsId) || this.open) {
      this.setOpen(true);
      this.details['setAttribute']('open', '');
    }

    this.detailsHeader.addEventListener('click', this.toggle.bind(this));
    this.detailsHeader.addEventListener('keydown', this.keyboardInteraction.bind(this));
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
      this.details[`${openAttribute}Attribute`]('open', '');
      this.detailsHeader.setAttribute('data-ga-action', `${action} panel`);

      if (this.onOpen && this.onClose) {
        if (open) {
          this.onOpen();
        } else {
          this.onClose();
        }
      }
    }

    if (this.saveState === true && open === true) {
      localStorage.setItem(this.details.getAttribute('id'), true);
    } else {
      localStorage.removeItem(this.details.getAttribute('id'));
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
