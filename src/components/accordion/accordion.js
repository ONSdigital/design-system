export default class Accordion {
  constructor(button, detailsEls) {
    this.openDetailsEls = 0;

    this.button = button;
    this.buttonInner = button.querySelector('.ons-js-accordion-all-inner');
    this.group = button.getAttribute('data-group');
    this.detailsEls = detailsEls.filter(details => details.group === this.group);
    this.totalDetailsEls = this.detailsEls.length;
    this.buttonOpenEl = this.buttonInner.querySelector('.ons-btn__text');
    this.buttonOpen = this.buttonOpenEl.innerHTML.trim();
    this.closeButton = button.getAttribute('data-close-all');
    this.open = this.detailsEls.find(details => details.open === true);

    this.detailsEls.forEach(details => {
      details.onOpen = this.onOpen.bind(this);
      details.onClose = this.onClose.bind(this);
    });

    if (this.open) {
      this.openDetailsEls = this.totalDetailsEls;
    }

    this.button.addEventListener('click', this.handleButtonClick.bind(this));
    this.setButton();
    this.button.classList.remove('ons-u-d-no');
  }

  handleButtonClick(event) {
    event.preventDefault();

    const open = !this.canClose();

    this.detailsEls.forEach(details => {
      details.setOpen(open);
    });
  }

  onOpen() {
    this.openDetailsEls++;
    this.setButton();
  }

  onClose() {
    this.openDetailsEls--;
    this.setButton();
  }

  canClose() {
    return this.openDetailsEls === this.totalDetailsEls;
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
