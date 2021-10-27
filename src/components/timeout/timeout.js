import Modal from '../modal/modal';

export default class Timeout {
  constructor(context) {
    this.context = context;
    this.continueButton = context.querySelector('.ons-js-modal-btn');
    this.countdown = context.querySelector('.ons-js-timeout-timer');
    this.accessibleCountdown = context.querySelector('.ons-js-timeout-timer-acc');
    this.timeOutRedirectUrl = context.getAttribute('data-redirect-url');
    this.text = context.getAttribute('data-text');
    this.sessionExpiryEnpoint = context.getAttribute('data-session-expiry-enpoint') || '/session/expiry';

    // Timing convertions
    this.secondsTimeOutDialogVisible = context.getAttribute('data-show-modal-time');
    this.milliSecondsTimeOutDialogVisible = this.secondsTimeOutDialogVisible * 1000;
    this.minutesTimeOutDialogVisible = this.secondsTimeOutDialogVisible / 60;

    this.idleMilliSecondsBeforeTimeOut = this.convertTimeToMilliSeconds(
      context.getAttribute('data-timeout-time') || new Date().toISOString(),
    ); // Temporary timestamp added by default (to do - remove ||)
    this.idleSecondsBeforeTimeOut = this.idleMilliSecondsBeforeTimeOut / 1000;

    // Language dependent text strings
    this.minutesTextSingular = 'minute';
    this.minutesTextPlural = 'minutes';
    this.secondsTextSingular = 'second';
    this.secondsTextPlural = 'seconds';

    // States
    this.timeUserLastInteractedWithPage = '';
    this.idleTime = null;
    this.timers = [];
    this.timerRunOnce = false;

    // Start module
    this.modal = new Modal(context);
    this.initialise();
  }

  initialise() {
    this.countIdleTime();

    this.continueButton.addEventListener('click', this.stopTimeout.bind(this));
    window.addEventListener('focus', this.shouldModuleCloseOrRedirect.bind(this));
  }

  countIdleTime() {
    window.onload = this.resetIdleTime.bind(this);
    window.onmousemove = this.resetIdleTime.bind(this);
    window.onmousedown = this.resetIdleTime.bind(this);
    window.onclick = this.resetIdleTime.bind(this);
    window.onscroll = this.resetIdleTime.bind(this);
    window.onkeypress = this.resetIdleTime.bind(this);
    window.onkeyup = this.resetIdleTime.bind(this);
  }

  resetIdleTime() {
    clearTimeout(this.idleTime);
    this.idleTime = setTimeout(this.openModal.bind(this), this.idleMilliSecondsBeforeTimeOut - this.milliSecondsTimeOutDialogVisible);

    // Run every x seconds
    if (!this.modal.isDialogOpen()) {
      this.resetLastInteractiveTime();
    }
  }

  openModal() {
    const shouldDialogOpen = this.getLastInteractiveTime() >= this.idleSecondsBeforeTimeOut - this.secondsTimeOutDialogVisible;
    if (shouldDialogOpen && !this.modal.isDialogOpen()) {
      this.modal.openDialog();
      this.startUiCountdown();

      if (window.history.pushState) {
        window.history.pushState('', '');
      }
    } else {
      this.resetIdleTime();
    }
  }

  startUiCountdown() {
    this.clearTimers();
    this.countdown.innerHTML =
      this.minutesTimeOutDialogVisible >= 1
        ? this.minutesTimeOutDialogVisible + ' minute' + (this.minutesTimeOutDialogVisible > 1 ? 's ' : ' ')
        : this.secondsTimeOutDialogVisible + ' second' + (this.secondsTimeOutDialogVisible > 1 ? 's' : '');

    this.runTimer();
  }

  runTimer() {
    const minutesLeft = parseInt(this.secondsTimeOutDialogVisible / 60, 10);
    const secondsLeft = parseInt(this.secondsTimeOutDialogVisible % 60, 10);
    const timerExpired = minutesLeft < 1 && secondsLeft < 1;

    const minutesText = minutesLeft + ' ' + (minutesLeft >= 2 ? this.minutesTextPlural : minutesLeft === 1 ? this.minutesTextSingular : '');
    const secondsText = secondsLeft + ' ' + (secondsLeft >= 2 ? this.secondsTextPlural : secondsLeft === 1 ? this.secondsTextSingular : '');

    let timeLeftText =
      this.text +
      ' <span class="ons-u-fw-b">' +
      (minutesLeft > 0 ? minutesText : '') +
      (minutesLeft > 0 && secondsLeft > 0 ? ' ' : '') +
      (secondsLeft > 0 ? secondsText : '') +
      '</span>.';

    if (timerExpired && this.getLastInteractiveTime() > this.idleSecondsBeforeTimeOut) {
      this.redirect();
    } else {
      this.secondsTimeOutDialogVisible--;
      this.countdown.innerHTML = timeLeftText;

      if (minutesLeft < 1 && secondsLeft < this.secondsTimeOutDialogVisible) {
        this.accessibleCountdown.setAttribute('aria-live', 'assertive');
      }

      if (!this.timerRunOnce) {
        this.accessibleCountdown.innerHTML = timeLeftText;
        this.timerRunOnce = true;
      } else if (secondsLeft % 15 === 0) {
        this.accessibleCountdown.innerHTML = timeLeftText;
      }
      this.timers.push(setTimeout(this.runTimer.bind(this), 1000));
    }
  }

  stopTimeout() {
    // Modal will close via Modal component
    this.clearTimers();
    this.resetLastInteractiveTime();
  }

  clearTimers() {
    for (let i = 0; i < this.timers.length; i++) {
      clearTimeout(this.timers[i]);
    }
  }

  shouldModuleCloseOrRedirect() {
    const shouldDialogClose = this.getLastInteractiveTime() < this.idleSecondsBeforeTimeOut - this.secondsTimeOutDialogVisible;
    const shouldRedirect = this.getLastInteractiveTime() > this.idleSecondsBeforeTimeOut;

    if (shouldRedirect) {
      this.redirect();
    } else if (shouldDialogClose) {
      this.stopTimeout();
      this.resetIdleTime();
    }
  }

  getLastInteractiveTime() {
    return this.idleSecondsBeforeTimeOut;
  }

  resetLastInteractiveTime() {
    // To do - Convert below with get request to 'session/expiry'. Response will be a json object containing a new time stamp
    // Update variable 'timeUserLastInteractedWithPage'
    this.idleMilliSecondsBeforeTimeOut = this.convertTimeToMilliSeconds(new Date().toISOString());
    this.idleSecondsBeforeTimeOut = this.idleMilliSecondsBeforeTimeOut / 1000;
  }

  convertTimeToMilliSeconds(time) {
    let timeoutTime = new Date(time);

    // Temporary - add one minute 30 to fake time (to do - remove lines 52 + 53)
    const timeoutTimePlusOneMinute30 = timeoutTime.setTime(timeoutTime.getTime() + 1500 * 60);
    timeoutTime = new Date(timeoutTimePlusOneMinute30);

    const timeInMilliSeconds = Math.abs(timeoutTime - new Date());

    return timeInMilliSeconds;
  }

  redirect() {
    window.location.replace(this.timeOutRedirectUrl);
  }
}
