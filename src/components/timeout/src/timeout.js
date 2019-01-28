import fetch from 'js/fetch';
import CountdownAnimation from 'components/countdown/src/countdown';
import getTimeNow from 'js/utils/getTimeNow';
import LoaderBtn from 'js/loader-btn';
import Dialog from 'js/dialog';

export default class Timeout {
  constructor() {
    this.promptTime = window.__EQ_SESSION_TIMEOUT_PROMPT__;
    this.timeLimit = window.__EQ_SESSION_TIMEOUT__;
    this.containerScopeEl = document.querySelector('.js-timeout-container');

    this.sessionExpiredUrl = '/session-expired';
    this.expireSessionUrl = '/expire-session';
    this.sessionContinueUrl = '/timeout-continue';
    this.timeStartCountdown = getTimeNow();

    this.continueRetryCount = this.continueRetryLimit = 5;

    if (this.promptTime && this.timeLimit && this.containerScopeEl) {
      this.startTick();
    }
  }

  startTick() {
    this.timeoutInterval = setInterval(() => {
      this.countDown = this.onTick();

      if (this.countDown < 1) {
        clearInterval(this.timeoutInterval);

        fetch(this.expireSessionUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' } }).then(() => {
          window.location = this.sessionExpiredUrl;
        });
      }

      if (this.countDown < this.promptTime) {
        if (this.initialised) {
          this.animation.draw(this.countDown);
        } else {
          this.initialise();
        }
      }
    });
  }

  onTick() {
    return this.timeLimit - (getTimeNow() - this.timeStartCountdown);
  }

  initialise() {
    this.initialised = true;

    this.continueBtn = new LoaderBtn('.js-timeout-continue', this.containerScopeEl);
    this.saveBtn = this.containerScopeEl.querySelector('.js-timeout-save');

    this.animation = new CountdownAnimation(this.containerScopeEl.querySelector('.js-timeout'), this.promptTime, this.timeLimit);

    // intercept and override ESC key closing dialog
    document.addEventListener('keydown', this.handleEsc.bind(this), false);

    this.continueBtn.addEventListener('click', this.handleContinue.bind(this));
    this.saveBtn.addEventListener('click', this.handleSave.bind(this));

    this.dialog = new Dialog();
    this.dialog.show();

    this.animation.draw(this.countDown || 0);
  }

  handleEsc(event) {
    if (event.which === 27) {
      // ESC Key
      event.preventDefault();
      event.stopImmediatePropagation();
      this.handleContinue(event);
    }
  }

  handleContinue(event) {
    if (event) {
      event.preventDefault();
    }

    fetch(this.sessionContinueUrl)
      .then(this.continueSuccess.bind(this))
      .catch(this.continueFail.bind(this));
  }

  continueSuccess() {
    this.dialog.hide();
    this.continueBtn.reset();
    this.continueRetryCount = this.continueRetryLimit;
    this.animation.reset();
    this.reset();
    this.initialised = false;
  }

  continueFail() {
    if (this.continueRetryCount-- > 0) {
      setTimeout(this.handleContinue.bind(this), 1000);
    } else {
      this.continueBtn.reset();
      this.continueRetryCount = this.continueRetryLimit;
    }
  }

  reset() {
    this.timeStartCountdown = getTimeNow();
  }

  handleSave(event) {
    event.preventDefault();

    const saveButton = document.querySelector('.js-btn-save');

    if (saveButton) {
      saveButton.click();
    }
  }
}
