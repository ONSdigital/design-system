import dialogPolyfill from 'dialog-polyfill';

const overLayClass = 'ons-modal-overlay';

export default class Modal {
  constructor(component) {
    this.component = component;
    this.launcher = document.querySelector(`[data-modal-id=${component.id}]`);
    this.closeButton = component.querySelector('.ons-js-modal-btn');
    this.lastFocusedEl = null;

    this.initialise();
  }

  initialise() {
    if (!this.dialogSupported()) {
      /* istanbul ignore next */
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
        dialogPolyfill.registerDialog(this.component);
        return true;
      } catch (error) {
        /* istanbul ignore next */
        return false;
      }
    }
  }

  openDialog(event) {
    if (!this.isDialogOpen()) {
      this.component.classList.add('ons-u-db');
      document.querySelector('body').className += ' ' + overLayClass;
      this.makePageContentInert();
      this.saveLastFocusedEl();
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

  setFocusOnLastFocusedEl(lastFocusedEl) {
    if (lastFocusedEl) {
      lastFocusedEl.focus();
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

  closeDialog(event) {
    if (this.isDialogOpen()) {
      if (event) {
        event.preventDefault();
      }
      this.component.classList.remove('ons-u-db');
      document.querySelector('body').classList.remove(overLayClass);
      this.component.close();
      this.setFocusOnLastFocusedEl(this.lastFocusedEl);
      this.removeInertFromPageContent();
    }
  }
}
