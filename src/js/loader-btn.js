const loadingClass = 'is-loading';

export default class LoaderBtn {
  constructor(selector, scopeEl) {
    const targetEl = scopeEl || document;

    this.element = targetEl.querySelector(selector);
    if (!this.element) {
      return;
    }
    this.defaultLabel = this.element.innerHTML;
    this.element && this.enable();
  }

  onClick() {
    const loadingMsg = this.element.getAttribute('data-loading-msg');
    this.element.classList.add(loadingClass);
    this.element.setAttribute('aria-busy', 'true');
    if (loadingMsg) {
      this.element.innerHTML = loadingMsg;
    }
  }

  reset() {
    this.element.classList.remove(loadingClass);
    this.element.setAttribute('aria-busy', 'false');
    this.element.innerHTML = this.defaultLabel;
  }

  disable() {
    setTimeout(() => {
      this.removeEventListener('click', this.onClick.bind(this));
      this.element.setAttribute('disabled', 'true');
    });
  }

  enable() {
    this.addEventListener('click', this.onClick.bind(this), false);
    this.element.removeAttribute('disabled');
  }

  addEventListener(...args) {
    this.element && this.element.addEventListener(...args);
  }

  removeEventListener(...args) {
    this.element && this.element.removeEventListener(...args);
  }
}
