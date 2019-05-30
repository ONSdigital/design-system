import AbstractComponent from 'js/component';

export const scopeClass = 'js-collapsible-group';

export default class CollapsibleGroup extends AbstractComponent {
  static create({ scopeEl, props = {} }) {
    if (!scopeEl || !props.collapsibles) {
      throw TypeError('scopeEl and collapsibles properties must be defined');
    }

    if (!props.collapsibles.length) {
      console.log('collapsibles array is empty');
    }

    return new CollapsibleGroup(scopeEl, props);
  }

  init() {
    this.openCollapsibles = 0;

    this.button = this.getFirstElement('js-collapsible-all');
    this.buttonText = this.getFirstElement(`${scopeClass}-button-text`);
    this.totalCollapsibles = this.collapsibles.length;
    this.buttonOpenContent = this.buttonText.innerHTML.trim();
    this.buttonCloseContent = this.button.getAttribute('data-close-all');

    this.collapsibles.forEach(collapsible => {
      collapsible.onOpen = this.onOpen.bind(this);
      collapsible.onClose = this.onClose.bind(this);
    });

    this.button.classList.remove('u-d-no');
  }

  registerEvents() {
    this.button.addEventListener('click', e => {
      e.preventDefault();
      this.buttonClicked();
    });
  }

  buttonClicked() {
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
    const ableToClose = this.canClose();

    this.buttonText.innerHTML = ableToClose ? this.buttonCloseContent : this.buttonOpenContent;
    this.button.setAttribute('data-ga-label', ableToClose ? this.buttonOpenContent : this.buttonCloseContent);
  }
}
