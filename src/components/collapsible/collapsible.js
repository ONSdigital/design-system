export default class Collapsible {
  constructor(collapsibleElement) {
    this.saveState = collapsibleElement.getAttribute('data-save-state') === 'true';
    this.open = collapsibleElement.getAttribute('data-open') === 'true';

    // Elements
    this.collapsible = collapsibleElement;
    this.collapsibleHeader = this.collapsible.querySelector('.ons-js-collapsible-heading');

    // Initialise
    const collapsibleId = collapsibleElement.getAttribute('id');

    if (localStorage.getItem(collapsibleId) || this.open) {
      this.setOpen(true);
    } else {
      this.setOpen(false);
    }

    this.collapsibleHeader.addEventListener('click', this.toggle.bind(this));
    this.collapsibleHeader.addEventListener('keydown', this.keyboardInteraction.bind(this));
  }

  toggle(event) {
    // Storing previous timestamp and checking against the current event's timestamp prevents event propagation
    // to collapsibleHeader element when the button is in the collapsibleHeader, but does not prevent event propagation to the body for analytics
    if (this.previousTimestamp !== event.timeStamp) {
      this.previousTimestamp = event.timeStamp;
      this.setOpen(!this.isOpen);
    }
  }

  setOpen(open) {
    if (open !== this.isOpen) {
      const action = open ? 'Open' : 'Close';

      this.isOpen = open;
      this.collapsibleHeader.setAttribute('data-ga-action', `${action} panel`);
      this.collapsible['setAttribute']('open', '');
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
