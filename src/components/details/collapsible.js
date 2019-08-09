export default class Collapsible {
  constructor(detailsElement) {
    this.saveState = detailsElement.getAttribute('data-save-state') === 'true';

    // State
    this.group = detailsElement.getAttribute('data-group');
    this.isAccordion = detailsElement.classList.contains('details--accordion');

    // Elements
    this.details = detailsElement;
    this.summary = this.details.querySelector('.js-collapsible-summary');
    this.content = this.details.querySelector('.js-collapsible-content');
    this.button = this.details.querySelector('.js-collapsible-button');
    this.buttonInner = this.details.querySelector('.js-collapsible-button-inner');

    // Initialise
    const detailsId = detailsElement.getAttribute('id');

    if (this.button) {
      this.button.addEventListener('click', this.toggle.bind(this));
      this.button.setAttribute('aria-controls', detailsId);
      this.button.classList.remove('u-d-no');
      this.buttonOpen = this.buttonInner.innerHTML.trim();
      this.closeButton = this.details.getAttribute('data-btn-close') || this.buttonOpen;
    }

    this.details.setAttribute('role', 'group');
    this.summary.setAttribute('role', 'link');
    this.summary.setAttribute('aria-controls', detailsId);

    if (!this.isAccordion) {
      this.summary.setAttribute('tabindex', 0);
    }
    if (localStorage.getItem(detailsId)) {
      this.setOpen(true);
    } else {
      this.setOpen(false);
    }

    this.summary.addEventListener('click', this.toggle.bind(this));

    this.details.classList.add('details--initialised');
  }

  toggle(event) {
    event.preventDefault();

    // Storing previous timestamp and checking against the current event's timestamp prevents event propagation
    // to summary element when the button is in the summary, but does not prevent event propagation to the body for analytics
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
      this.details[`${openAttribute}Attribute`]('open', '');
      this.details.classList[cls]('details--open');
      this.summary.setAttribute('aria-expanded', open);
      this.content.setAttribute('aria-hidden', !open);

      this.summary.setAttribute('data-ga-action', `${action} panel`);

      if (this.button) {
        this.button.setAttribute('data-ga-action', `${action} panel`);
        this.buttonInner.innerHTML = open ? this.closeButton : this.buttonOpen;
      }

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
}
