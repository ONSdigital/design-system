import { throttle } from 'throttle-typescript';

export class LanguageSelector {
  constructor(context) {
    this.context = context;
    this.link = context.querySelector('.js-language-switcher-link');
    this.button = context.querySelector('.js-language-switcher-button');
    this.itemsContainer = context.querySelector('.js-language-switcher-items');
    this.items = [...this.itemsContainer.querySelectorAll('.js-language-switcher-item')];

    this.throttledSetOpen = throttle(this.setOpen.bind(this), 200);
    this.setAriaAttributes();
    this.button.addEventListener('mousedown', this.toggle.bind(this));
    this.button.addEventListener('focus', event => this.throttledSetOpen(event, true));
    document.body.addEventListener('mousedown', event => this.throttledSetOpen(event, false));
    this.setDisplay();
  }

  setAriaAttributes() {
    this.button.setAttribute('aria-haspopup', true);
    this.button.setAttribute('aria-expanded', false);
    this.button.setAttribute('aria-controls', this.itemsContainer.getAttribute('id'));

    this.itemsContainer.setAttribute('role', 'menu');
    this.items.forEach(item => item.setAttribute('role', 'menuitem'));
  }

  setDisplay() {
    this.link.classList.add('u-d-no');
    this.button.classList.remove('u-d-no');
    this.itemsContainer.classList.remove('u-d-no');
  }

  toggle(event) {
    event.stopPropagation();
    const isOpen = this.context.classList.contains('language-switcher--open');

    this.throttledSetOpen(event, !isOpen);
  }

  setOpen(event, open) {
    const delay = event.target.classList.contains('js-language-switcher-item') ? 300 : 0;

    setTimeout(() => {
      this.button.setAttribute('aria-expanded', open);

      this.context.classList[open ? 'add' : 'remove']('language-switcher--open');
      this.items.forEach(item => item.setAttribute('tabindex', open ? 0 : -1));
    }, delay);
  }
}

export default function languageSelector() {
  const context = document.querySelector('.js-language-switcher');

  if (context) {
    return new LanguageSelector(context);
  }
}
