export default class Accordion {
  constructor(button, collapsibles) {
    this.openCollapsibles = 0;

    this.button = button;
    this.buttonInner = button.querySelector('.ons-js-accordion-all-inner');
    this.group = button.getAttribute('data-group');
    this.collapsibles = collapsibles.filter(collapsible => collapsible.group === this.group);
    this.totalCollapsibles = this.collapsibles.length;
    this.buttonOpenEl = this.buttonInner.querySelector('.ons-btn__text');
    this.buttonOpen = this.buttonOpenEl.innerHTML.trim();
    this.closeButton = button.getAttribute('data-close-all');
    this.open = this.collapsibles.find(collapsible => collapsible.open === true);

    this.collapsibles.forEach(collapsible => {
      collapsible.onOpen = this.onOpen.bind(this);
      collapsible.onClose = this.onClose.bind(this);
    });

    if (this.open) {
      this.openCollapsibles = this.totalCollapsibles;
    }

    this.button.addEventListener('click', this.handleButtonClick.bind(this));
    this.setButton();
    this.button.classList.remove('ons-u-d-no');
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
      this.buttonInner.innerHTML = this.closeButton;
      this.button.setAttribute('data-ga-label', this.buttonOpen);
      this.button.setAttribute('aria-expanded', 'true');
    } else {
      this.buttonInner.innerHTML = this.buttonOpen;
      this.button.setAttribute('data-ga-label', this.closeButton);
      this.button.setAttribute('aria-expanded', 'false');
    }
  }
}
