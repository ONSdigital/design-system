export default class CollapsibleGroup {
  constructor(button, collapsibles) {
    this.openCollapsibles = 0;

    this.button = button;
    this.group = button.getAttribute('data-group');
    this.collapsibles = collapsibles.filter(collapsible => collapsible.group === this.group);

    this.totalCollapsibles = this.collapsibles.length;
    this.buttonOpen = button.innerHTML.trim();
    this.closeButton = button.getAttribute('data-close-all');

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
      this.button.innerHTML = this.closeButton;
      this.button.setAttribute('data-ga-label', this.buttonOpen);
    } else {
      this.button.innerHTML = this.buttonOpen;
      this.button.setAttribute('data-ga-label', this.closeButton);
    }
  }
}
