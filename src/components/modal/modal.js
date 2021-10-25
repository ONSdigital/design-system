export default class Modal {
  constructor(context) {
    this.context = context;
    this.lastFocusedEl = null;
    this.closeButton = context.querySelector('.ons-js-close-modal');
    this.overLayClass = 'ons-modal-overlay';

    this.initialise();
  }

  initialise() {
    if (!this.context) {
      return;
    }

    if (!this.dialogSupported()) {
      return;
    }

    this.openDialog();

    if (this.closeButton) {
      this.closeButton.addEventListener('click', this.closeDialog.bind(this));
    }
  }

  dialogSupported() {
    if (typeof HTMLDialogElement === 'function') {
      return true;
    } else {
      try {
        window.dialogPolyfill.registerDialog(this.context);
        return true;
      } catch (error) {
        return false;
      }
    }
  }

  openDialog() {
    if (!this.isDialogOpen()) {
      document.querySelector('body').classList.add(this.overLayClass);
      this.saveLastFocusedEl();
      this.makePageContentInert();
      this.context.showModal();
    } else {
      this.resetIdleTime();
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
    return this.context['open'];
  }

  closeDialog() {
    if (this.isDialogOpen()) {
      document.querySelector('body').classList.remove(this.overLayClass);
      this.context.close();
      this.setFocusOnLastFocusedEl();
      this.removeInertFromPageContent();
    }
  }
}
