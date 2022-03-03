import Modal from '../modal/modal';
import Timeout from '../../js/timeout';

export default class TimeoutModal {
  constructor(context, sessionExpiryEndpoint, initialExpiryTime) {
    this.context = context;
    this.sessionExpiryEndpoint = sessionExpiryEndpoint;
    this.initialExpiryTime = initialExpiryTime;
    this.continueButton = context.querySelector('.ons-js-modal-btn');
    this.modalVisibleInMilliseconds = context.getAttribute('data-show-modal-time') * 1000;

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
      this.totalMilliseconds = this.timeout.expiryTimeInMilliseconds;
    } else {
      // For demo purposes
      this.totalMilliseconds = 60000;
    }
    this.showModalTimeout = setTimeout(
      this.openModalAndStartCountdown.bind(this),
      this.totalMilliseconds - this.modalVisibleInMilliseconds,
    );
  }

  async openModalAndStartCountdown() {
    const modalWillOpen = await this.timeout.hasExpiryTimeResetInAnotherTab();
    if (modalWillOpen && !this.modal.isDialogOpen()) {
      this.modal.openDialog();
      this.timeout.startUiCountdown();
    }
  }

  closeModalAndRestartTimeout() {
    if (this.modal.isDialogOpen()) {
      this.modal.closeDialog();
    }
    this.timeout.restartTimeout();
    this.startTimeout();
  }

  escToClose(event) {
    if (this.modal.isDialogOpen() && event.keyCode === 27) {
      this.closeModalAndRestartTimeout();
    }
  }
}
