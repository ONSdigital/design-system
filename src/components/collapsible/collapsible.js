export default class Collapsible {
  constructor(collapsibleElement) {
    this.saveState = collapsibleElement.getAttribute('data-save-state') === 'true';
    this.open = collapsibleElement.getAttribute('data-open') === 'true';

    // State
    this.group = collapsibleElement.getAttribute('data-group');
    this.isAccordion = collapsibleElement.classList.contains('ons-collapsible--accordion');

    // Elements
    this.collapsible = collapsibleElement;
    this.collapsibleHeader = this.collapsible.querySelector('.ons-js-collapsible-heading');
    this.content = this.collapsible.querySelector('.ons-js-collapsible-content');

    // Initialise
    const collapsibleId = collapsibleElement.getAttribute('id');

    this.collapsible.setAttribute('role', 'group');
    this.collapsibleHeader.setAttribute('aria-controls', collapsibleId);

    if (!this.isAccordion) {
      this.collapsibleHeader.setAttribute('tabindex', 0);
    }
    if (localStorage.getItem(collapsibleId) || this.open) {
      this.setOpen(true);
    } else {
      this.setOpen(false);
    }

    this.collapsibleHeader.addEventListener('click', this.toggle.bind(this));
    this.collapsibleHeader.addEventListener('keydown', this.keyboardInteraction.bind(this));

    this.collapsible.classList.add('ons-collapsible--initialised');
  }

  toggle(event) {
    event.preventDefault();

    // Storing previous timestamp and checking against the current event's timestamp prevents event propagation
    // to collapsibleHeader element when the button is in the collapsibleHeader, but does not prevent event propagation to the body for analytics
    if (this.previousTimestamp !== event.timeStamp) {
      this.previousTimestamp = event.timeStamp;
      this.setOpen(!this.isOpen);
    }
  }

  setOpen(open) {
    if (open !== this.isOpen) {
      const openAttribute = open ? 'set' : 'remove';
      const cls = open ? 'add' : 'remove';
      const action = open ? 'Open' : 'Close';

      this.isOpen = open;
      this.collapsible[`${openAttribute}Attribute`]('open', '');
      this.collapsible.classList[cls]('ons-collapsible--open');
      this.collapsibleHeader.setAttribute('aria-expanded', open);
      this.content.setAttribute('aria-hidden', !open);

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

        // Show answer content
        this.toggle(event);
        break;
    }
  }
}
