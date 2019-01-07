import { objHasInterface, getTimeNow } from 'js/utils';
import { Countable } from 'components/countdown/src/countdown';
import LoaderBtn from 'js/loader-btn';
import dialog from 'js/dialog';
import fetch from 'js/fetch';

export default class SessionTimeoutUI {
  static timeLimit = 0;
  static sessionExpiredUrl = '/session-expired';
  static expireSessionUrl = '/expire-session';
  static sessionContinueUrl = '/timeout-continue';
  static timeStartCountdown = getTimeNow();

  constructor({ scopeEl, continueRetryLimit = 5, animation, handleSave, continueSuccessCallback }) {
    if (!objHasInterface(animation, Countable)) {
      throw Error('Invalid "animation" object supplied');
    }

    this.continueBtn = new LoaderBtn('.js-timeout-continue', scopeEl);
    this.saveBtn = scopeEl.querySelector('.js-timeout-save');

    this.continueRetryCount = this.continueRetryLimit = continueRetryLimit;
    this.animation = animation;
    this.continueSuccessCallback = continueSuccessCallback;

    // intercept and override ESC key closing dialog
    document.addEventListener(
      'keydown',
      e => {
        if (e.which === 27) {
          // ESC Key
          e.preventDefault();
          e.stopImmediatePropagation();
          this.handleContinue(e);
        }
      },
      false
    );

    this.continueBtn.addEventListener('click', this.handleContinue.bind(this));
    this.saveBtn.addEventListener('click', handleSave);

    dialog.init();
    dialog.show();
  }

  handleContinue(e) {
    if (e) {
      e.preventDefault();
    }

    fetch(SessionTimeoutUI.sessionContinueUrl)
      .then(this.continueSuccess.bind(this))
      .catch(this.continueFail.bind(this));
  }

  continueSuccess() {
    dialog.hide();
    this.continueBtn.reset();
    this.continueRetryCount = this.continueRetryLimit;
    this.animation.reset();
    SessionTimeoutUI.reset();
    this.continueSuccessCallback();
  }

  continueFail() {
    // if error retry 5 times
    if (this.continueRetryCount-- > 0) {
      window.setTimeout(() => {
        this.handleContinue();
      }, 1000);
    } else {
      this.continueBtn.reset();
      this.continueRetryCount = this.continueRetryLimit;
    }
  }

  static reset() {
    SessionTimeoutUI.timeStartCountdown = getTimeNow();
  }

  static onTick() {
    return SessionTimeoutUI.timeLimit - (getTimeNow() - SessionTimeoutUI.timeStartCountdown);
  }

  static create(opts) {
    const instance = new SessionTimeoutUI({
      scopeEl: opts.scopeEl,
      continueRetryLimit: opts.continueRetryLimit || 5,
      animation: opts.animation,
      handleSave: function saveHandler(e) {
        e.preventDefault();

        document.querySelector('.js-btn-save').click();
        return false;
      },
      continueSuccessCallback: opts.continueSuccessCallback
    });

    instance.animation.draw(opts.countDown || 0);

    return instance;
  }
}
