import Modal from '../modal/modal';
import Timeout from '../../js/timeout';

export default class TimeoutModal {
  constructor(context, sessionExpiryEndpoint, initialExpiryTime) {
    this.context = context;
    this.sessionExpiryEndpoint = sessionExpiryEndpoint;
    this.initialExpiryTime = initialExpiryTime;
    this.continueButton = context.querySelector('.ons-js-modal-btn');
    this.modalVisibleInMilliseconds = context.getAttribute('data-show-modal-time') * 1000;
    this.expiryTime = '';
    this.expiryTimeInMilliseconds = 0;
    this.shouldRestartCheck = false;

    // Create modal instance
    this.modal = new Modal(this.context);

    // Create timeout instance
    this.timeout = new Timeout(this.context, this.sessionExpiryEndpoint, this.initialExpiryTime, true);

    this.bindEventListeners();
  }

  bindEventListeners() {
    window.onload = this.startTimeout();
    window.addEventListener('keydown', this.escToClose.bind(this));
    this.continueButton.addEventListener('click', this.closeModalAndRestartTimeout.bind(this));
  }

  startTimeout() {
    clearTimeout(this.showModalTimeout);
    if (this.initialExpiryTime) {
      this.expiryTime = this.timeout.expiryTime;
      this.expiryTimeInMilliseconds = this.timeout.convertTimeToMilliSeconds(this.expiryTime);
    } else {
      // For demo purposes
      this.expiryTimeInMilliseconds = 60000;
    }
    this.showModalTimeout = setTimeout(
      this.openModalAndStartCountdown.bind(this),
      this.expiryTimeInMilliseconds - this.modalVisibleInMilliseconds,
    );
  }

  async openModalAndStartCountdown() {
    const modalWillOpen = await this.hasExpiryTimeResetInAnotherTab();
    if (modalWillOpen && !this.modal.isDialogOpen()) {
      this.modal.openDialog();
      this.timeout.startUiCountdown();

      this.shouldRestartCheck = setInterval(async () => {
        await this.hasExpiryTimeResetInAnotherTab();
      }, 20000);
    }
  }

  async hasExpiryTimeResetInAnotherTab() {
    const checkExpiryTime = await this.timeout.getExpiryTime();
    if (checkExpiryTime.substring(0, 19) != this.timeout.expiryTime.substring(0, 19)) {
      // Substring is required as endpoint can at random return milliseconds with expiry time
      this.expiryTime = checkExpiryTime;
      this.expiryTimeInMilliseconds = this.timeout.convertTimeToMilliSeconds(checkExpiryTime);
      this.closeModalAndRestartTimeout(this.expiryTimeInMilliseconds);
    } else {
      return true;
    }
  }

  async closeModalAndRestartTimeout(time) {
    clearInterval(this.shouldRestartCheck);

    if (typeof timeInMilliSeconds !== 'string') {
      time = false;
    }
    if (this.modal.isDialogOpen()) {
      this.modal.closeDialog(event);
    }
    await this.timeout.restartTimeout(time);
    this.startTimeout();
  }

  escToClose(event) {
    if (this.modal.isDialogOpen() && event.keyCode === 27) {
      this.closeModalAndRestartTimeout();
    }
  }
}
