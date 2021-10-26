export default class Modal {
  constructor(component) {
    this.component = component;
    this.launcher = document.querySelector(`[data-modal-id=${component.id}]`);
    this.closeButton = component.querySelector('.ons-js-modal-btn');
    this.overLayClass = 'ons-modal-overlay';
    this.lastFocusedEl = null;

    this.initialise();
  }

  initialise() {
    if (!this.component) {
      return;
    }

    if (!this.dialogSupported()) {
      return;
    }

    if (this.launcher) {
      this.launcher.addEventListener('click', this.openDialog.bind(this));
    }

    if (this.closeButton) {
      this.closeButton.addEventListener('click', this.closeDialog.bind(this));
    }
  }

  dialogSupported() {
    if (typeof HTMLDialogElement === 'function') {
      return true;
    } else {
      try {
        window.dialogPolyfill.registerDialog(this.component);
        return true;
      } catch (error) {
        return false;
      }
    }
  }

  openDialog(event) {
    if (!this.isDialogOpen()) {
      document.querySelector('body').classList.add(this.overLayClass);
      this.saveLastFocusedEl();
      this.makePageContentInert();

      if (event) {
        const modal = document.getElementById(event.target.getAttribute('data-modal-id'));
        modal.showModal();
      } else {
        this.component.showModal();
      }
    }
  }

  saveLastFocusedEl() {
    this.lastFocusedEl = document.activeElement;
    if (!this.lastFocusedEl || this.lastFocusedEl === document.body) {
      this.lastFocusedEl = null;
    } else if (document.querySelector) {
      this.lastFocusedEl = document.querySelector(':focus');
    }
  }

  setFocusOnLastFocusedEl() {
    if (this.lastFocusedEl) {
      this.lastFocusedEl.focus();
    }
  }

  makePageContentInert() {
    if (document.querySelector('.ons-page')) {
      document.querySelector('.ons-page').inert = true;
      document.querySelector('.ons-page').setAttribute('aria-hidden', 'true');
    }
  }

  removeInertFromPageContent() {
    if (document.querySelector('.ons-page')) {
      document.querySelector('.ons-page').inert = false;
      document.querySelector('.ons-page').setAttribute('aria-hidden', 'false');
    }
  }

  isDialogOpen() {
    return this.component['open'];
  }

  closeDialog() {
    if (this.isDialogOpen()) {
      document.querySelector('body').classList.remove(this.overLayClass);
      this.component.close();
      this.setFocusOnLastFocusedEl();
      this.removeInertFromPageContent();
    }
  }
}
