import AbstractComponent from 'js/component';

export const scopeClass = 'js-collapsible';

export default class Collapsible extends AbstractComponent {
  static create({ scopeEl }) {
    if (!scopeEl) {
      throw TypeError('scopeEl property must be defined');
    }

    return new Collapsible(scopeEl);
  }

  init() {
    // State
    this.isOpen = true;
    this.group = this.scopeEl.getAttribute('data-group');
    this.isAccordion = this.scopeEl.classList.contains('details--accordion');

    // Elements
    this.details = this.scopeEl;
    this.summary = this.details.querySelector(`.${scopeClass}-summary`);
    this.content = this.details.querySelector(`.${scopeClass}-content`);
    this.button = this.details.querySelector(`.${scopeClass}-button`);

    // Initialise
    const contentId = this.content.getAttribute('id');

    if (this.button) {
      this.button.setAttribute('aria-controls', contentId);
      this.button.classList.remove('u-d-no');
      this.buttonOpen = this.button.innerHTML.trim();
      this.closeButton =
        this.details.getAttribute('data-btn-close') || this.buttonOpen;
    }

    this.summary.setAttribute('aria-controls', contentId);

    if (!this.isAccordion) {
      this.summary.setAttribute('tabindex', 0);
    }

    this.setOpen(false);

    this.details.classList.add('details--initialised');
  }

  registerEvents() {
    if (this.button) {
      this.button.addEventListener('click', this.toggle.bind(this));
    }

    this.summary.addEventListener('click', this.toggle.bind(this));
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
      this.details.setAttribute('aria-expanded', open);
      this.details.setAttribute('aria-selected', open);
      this.content.setAttribute('aria-hidden', !open);

      this.summary.setAttribute('data-ga-action', `${action} panel`);

      if (this.button) {
        this.button.setAttribute('data-ga-action', `${action} panel`);
        this.button.innerHTML = open ? this.closeButton : this.buttonOpen;
      }

      if (this.onOpen && this.onClose) {
        if (open) {
          this.onOpen();
        } else {
          this.onClose();
        }
      }
    }
  }
}

Collapsible.instances = [];
