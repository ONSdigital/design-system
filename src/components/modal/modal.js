import dialogPolyfill from 'dialog-polyfill';
import initAnalytics from '../../js/analytics';

const overLayClass = 'ons-modal-overlay';
const ie11Class = 'ons-modal-ie11';

export default class Modal {
  constructor(component) {
    this.component = component;
    this.launcher = document.querySelector(`[data-modal-id=${component.id}]`);
    this.closeButton = component.querySelector('.ons-js-modal-btn');
    this.setGAAttributes = component.getAttribute('data-enable-ga');
    this.lastFocusedEl = null;
    this.dialogCSSSupported = true;
    this.modalType = this.component.classList.contains('ons-js-timeout-modal') ? 'Timeout' : 'Generic';

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

    if (this.modalType !== 'Timeout') {
      window.addEventListener('keydown', this.escToClose.bind(this));
    }

    if (this.setGAAttributes) {
      this.component.setAttribute('data-ga', `visible`);
      initAnalytics();
    }
  }

  dialogSupported() {
    if (typeof HTMLDialogElement === 'function') {
      return true;
    } else {
      try {
        dialogPolyfill.registerDialog(this.component);
        this.dialogCSSSupported = false;
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
      document.querySelector('body').classList.add(overLayClass);

      if (!this.dialogCSSSupported) {
        document.querySelector('body').classList.add(ie11Class);
      }

      this.saveLastFocusedEl();

      if (event) {
        const modal = document.getElementById(event.target.getAttribute('data-modal-id'));
        modal.showModal();
      } else {
        this.component.showModal();
      }

      if (this.setGAAttributes) {
        if (event) {
          this.component.setAttribute('data-ga-action', `Modal opened by ${event.type} event`);
        } else {
          this.component.setAttribute('data-ga-action', 'Modal opened by timed event');
        }
        this.component.setAttribute('data-ga-label', `${this.modalType} modal opened`);
        this.component.setAttribute('data-ga-category', `${this.modalType} modal`);
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

      if (!this.dialogCSSSupported) {
        document.querySelector('body').classList.remove(ie11Class);
      }

      this.component.close();
      this.setFocusOnLastFocusedEl(this.lastFocusedEl);

      if (this.setGAAttributes) {
        if (event) {
          this.component.setAttribute('data-ga-action', `Modal closed by ${event.type} event`);
        } else {
          this.component.setAttribute('data-ga-action', 'Modal closed by timed event');
        }
        this.component.setAttribute('data-ga-label', `${this.modalType} modal closed`);
        this.component.setAttribute('data-ga-category', `${this.modalType} modal`);
      }
    }
  }

  escToClose(event) {
    if (this.isDialogOpen() && event.keyCode === 27) {
      this.closeDialog(event);
    }
  }
}
