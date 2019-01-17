class Collapsible {
  constructor(detailsElement) {
    // State
    this.isOpen = true;
    this.group = detailsElement.getAttribute('data-group');
    this.isAccordion = detailsElement.classList.contains('details--accordion');

    // Elements
    this.details = detailsElement;
    this.summary = this.details.querySelector('.js-collapsible-summary');
    this.content = this.details.querySelector('.js-collapsible-content');
    this.button = this.details.querySelector('.js-collapsible-button');

    // Initialise
    const contentId = this.content.getAttribute('id');

    if (this.button) {
      this.button.addEventListener('click', this.toggle.bind(this));
      this.button.setAttribute('aria-controls', contentId);
      this.button.classList.remove('u-d-no');
      this.buttonOpen = this.button.innerHTML.trim();
      this.buttonClose = this.details.getAttribute('data-btn-close') || this.buttonOpen;
    }

    this.summary.setAttribute('aria-controls', contentId);

    if (!this.isAccordion) {
      this.summary.setAttribute('tabindex', 0);
    }

    this.setOpen(false);

    this.summary.addEventListener('click', this.toggle.bind(this));

    this.details.classList.add('details--has-js');
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
        this.button.innerHTML = open ? this.buttonClose : this.buttonOpen;
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

class CollapsibleGroup {
  constructor(button, collapsibles) {
    this.openCollapsibles = 0;

    this.button = button;
    this.group = button.getAttribute('data-group');
    this.collapsibles = collapsibles.filter(collapsible => collapsible.group === this.group);

    this.totalCollapsibles = this.collapsibles.length;
    this.buttonOpen = button.innerHTML.trim();
    this.buttonClose = button.getAttribute('data-close-all');

    this.collapsibles.forEach(collapsible => {
      collapsible.onOpen = this.onOpen.bind(this);
      collapsible.onClose = this.onClose.bind(this);
    });

    this.button.addEventListener('click', this.handleButtonClick.bind(this));

    this.button.classList.remove('u-d-no');
  }

  handleButtonClick(event) {
    event.preventDefault();

    const open = !this.canClose();

    this.collapsibles.forEach(collapsible => {
      collapsible.setOpen(open);
    });
  }

  onOpen() {
    this.openCollapsibles++;
    this.setButton();
  }

  onClose() {
    this.openCollapsibles--;
    this.setButton();
  }

  canClose() {
    return this.openCollapsibles === this.totalCollapsibles;
  }

  setButton() {
    if (this.canClose()) {
      this.button.innerHTML = this.buttonClose;
      this.button.setAttribute('data-ga-label', this.buttonOpen);
    } else {
      this.button.innerHTML = this.buttonOpen;
      this.button.setAttribute('data-ga-label', this.buttonClose);
    }
  }
}

export default function() {
  const collapsibles = [...document.querySelectorAll('.js-collapsible')].map(element => new Collapsible(element));
  const toggleAllButtons = [...document.querySelectorAll('.js-collapsible-all')];

  toggleAllButtons.forEach(button => {
    new CollapsibleGroup(button, collapsibles);
  });
}
