class Collapsible {
  constructor(detailsElement) {
    // State
    this.isOpen = false;
    this.group = detailsElement.getAttribute('data-group');

    // Elements
    this.details = detailsElement;
    this.summary = this.details.querySelector('.js-collapsible-summary');
    this.content = this.details.querySelector('.js-collapsible-content');
    this.button = this.details.querySelector('.js-collapsible-button');

    // Initialise
    if (this.button) {
      this.button.addEventListener('click', this.toggle.bind(this));
      this.button.classList.remove('u-d-no');
    }

    this.summary.setAttribute('aria-controls', this.content.getAttribute('id'));
    this.summary.setAttribute('tabindex', 0);
    this.setOpen(false);

    this.summary.addEventListener('click', this.toggle.bind(this));

    this.details.classList.add('details--has-js');
  }

  toggle(event) {
    event.preventDefault();

    this.setOpen(!this.isOpen);
  }

  setOpen(open) {
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
  }
}

export default function() {
  [...document.querySelectorAll('.js-collapsible')].forEach(element => new Collapsible(element));
}
