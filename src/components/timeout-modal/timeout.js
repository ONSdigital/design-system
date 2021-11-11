import Modal from '../modal/modal';

export default class Timeout {
  constructor(context, url) {
    this.context = context;
    this.sessionExpiryEndpoint = url;
    this.continueButton = context.querySelector('.ons-js-modal-btn');
    this.countdown = context.querySelector('.ons-js-timeout-timer');
    this.accessibleCountdown = context.querySelector('.ons-js-timeout-timer-acc');
    this.timeOutRedirectUrl = context.getAttribute('data-redirect-url');
    this.modalVisibleInMilliseconds = context.getAttribute('data-show-modal-time') * 1000;

    // Language dependent text strings
    this.minutesTextSingular = context.getAttribute('data-minutes-text-singular');
    this.minutesTextPlural = context.getAttribute('data-minutes-text-plural');
    this.secondsTextSingular = context.getAttribute('data-seconds-text-singular');
    this.secondsTextPlural = context.getAttribute('data-seconds-text-plural');
    this.countdownText = context.getAttribute('data-countdown-text');
    this.redirectingText = context.getAttribute('data-redirecting-text');

    // Settings
    this.expiryTimeInMilliseconds = 0;
    this.showModalTimeout = null;
    this.timers = [];
    this.timerRunOnce = false;

    // Start module
    this.initialise();
  }

  async initialise() {
    this.expiryTimeInMilliseconds = await this.setNewExpiryTime();
    this.modal = new Modal(this.context);

    this.bindEventListeners();
  }

  bindEventListeners() {
    window.onload = this.startTimeout.bind(this);
    window.addEventListener('focus', this.handleWindowFocus.bind(this));
    window.addEventListener('keydown', this.escToClose.bind(this));
    this.continueButton.addEventListener('click', this.closeModalAndRestartTimeout.bind(this));
    this.addThrottledEvents();
  }

  startTimeout() {
    clearTimeout(this.showModalTimeout);
    this.showModalTimeout = setTimeout(this.openModal.bind(this), this.expiryTimeInMilliseconds - this.modalVisibleInMilliseconds);
  }

  async openModal() {
    const modalWillOpen = await this.shouldContinueOrRestart();
    if (modalWillOpen && !this.modal.isDialogOpen()) {
      this.modal.openDialog();
      this.startUiCountdown();
    }
  }

  async startUiCountdown() {
    this.clearTimers();
    clearInterval(this.shouldModalCloseCheck);

    this.shouldModalCloseCheck = setInterval(async () => {
      await this.shouldContinueOrRestart();
    }, 10000);

    let millseconds = this.modalVisibleInMilliseconds;
    let seconds = millseconds / 1000;
    let timers = this.timers;
    let $this = this;

    (async function runTimer() {
      const minutesLeft = parseInt(seconds / 60, 10);
      const secondsLeft = parseInt(seconds % 60, 10);
      const timerExpired = minutesLeft < 1 && secondsLeft < 1;

      const minutesText =
        minutesLeft + ' ' + (minutesLeft >= 2 ? $this.minutesTextPlural : minutesLeft === 1 ? $this.minutesTextSingular : '');
      const secondsText =
        secondsLeft + ' ' + (secondsLeft >= 2 ? $this.secondsTextPlural : secondsLeft === 1 ? $this.secondsTextSingular : '');

      let timeLeftText =
        $this.countdownText +
        ' <span class="ons-u-fw-b">' +
        (minutesLeft > 0 ? minutesText : '') +
        (minutesLeft > 0 && secondsLeft > 0 ? ' ' : '') +
        (secondsLeft > 0 ? secondsText : '') +
        '</span>.';

      if (timerExpired) {
        const shouldExpire = await $this.shouldContinueOrRestart();

        if (shouldExpire) {
          $this.countdown.innerHTML = '<span class="ons-u-fw-b">' + $this.redirectingText + '</span>';
          $this.accessibleCountdown.innerHTML = $this.redirectingText;
          setTimeout($this.redirect.bind($this), 4000);
        }
      } else {
        seconds--;
        $this.countdown.innerHTML = timeLeftText;

        if (minutesLeft < 1 && secondsLeft < 20) {
          $this.accessibleCountdown.setAttribute('aria-live', 'assertive');
        }

        if (!$this.timerRunOnce) {
          $this.accessibleCountdown.innerHTML = timeLeftText;
          $this.timerRunOnce = true;
        } else if (secondsLeft % 15 === 0) {
          $this.accessibleCountdown.innerHTML = timeLeftText;
        }

        timers.push(setTimeout(runTimer.bind($this), 1000));
      }
    })();
  }

  async shouldContinueOrRestart() {
    const checkExpiryTime = await this.getExpiryTime();
    if (this.expiryTimeInMilliseconds < checkExpiryTime) {
      this.expiryTimeInMilliseconds = checkExpiryTime;
      this.closeModalAndRestartTimeout(this.expiryTimeInMilliseconds);
    } else {
      return true;
    }
  }

  closeModalAndRestartTimeout(time) {
    if (typeof time !== 'string') {
      time = false;
    }
    if (this.modal.isDialogOpen()) {
      this.modal.closeDialog();
    }
    this.restartTimeout(time);
  }

  async restartTimeout(time) {
    this.clearTimers();
    clearInterval(this.shouldModalCloseCheck);
    this.expiryTimeInMilliseconds = time ? time : await this.setNewExpiryTime();
    this.startTimeout();
  }

  async handleWindowFocus() {
    if (this.sessionExpiryEndpoint) {
      const canSetNewExpiry = await this.setNewExpiryTime();
      if (!canSetNewExpiry) {
        this.redirect();
      } else {
        this.closeModalAndRestartTimeout();
      }
    }
  }

  escToClose(event) {
    if (this.modal.isDialogOpen() && event.keyCode === 27) {
      this.closeModalAndRestartTimeout();
    }
  }

  async setNewExpiryTime() {
    let newExpiryTime;
    if (!this.sessionExpiryEndpoint) {
      // For demo purposes
      const currentTimePlusSixtySeconds = new Date(Date.now() + 60 * 1000);
      newExpiryTime = this.convertTimeToMilliSeconds(new Date(currentTimePlusSixtySeconds).toISOString());
    } else {
      newExpiryTime = await this.fetchExpiryTime('PATCH');
    }
    return newExpiryTime;
  }

  async getExpiryTime() {
    if (this.sessionExpiryEndpoint) {
      currentExpiryTime = await this.fetchExpiryTime('GET');
      this.expiryTimeInMilliseconds = currentExpiryTime;
    }
    return this.expiryTimeInMilliseconds;
  }

  async fetchExpiryTime(fetchMethod) {
    let response = await fetch(this.sessionExpiryEndpoint, {
      method: fetchMethod,
      headers: { 'Cache-Control': 'no-cache', 'Content-type': 'application/json; charset=UTF-8' },
    });

    if (!response.ok) {
      this.redirect();
      return false;
    }

    let json = await response.json();
    let expiryTime = this.convertTimeToMilliSeconds(json.expires_at);
    return expiryTime;
  }

  convertTimeToMilliSeconds(expiryTime) {
    const time = new Date(expiryTime);
    const timeInMilliSeconds = Math.abs(time - new Date());

    return timeInMilliSeconds;
  }

  redirect() {
    window.location.replace(this.timeOutRedirectUrl);
  }

  clearTimers() {
    for (let i = 0; i < this.timers.length; i++) {
      clearTimeout(this.timers[i]);
    }
  }

  addThrottledEvents() {
    window.onmousemove = this.throttle(() => {
      if (!this.modal.isDialogOpen()) {
        this.restartTimeout();
      }
    }, 61000);

    window.onmousedown = this.throttle(() => {
      if (!this.modal.isDialogOpen()) {
        this.restartTimeout();
      }
    }, 61000);

    window.onclick = this.throttle(() => {
      if (!this.modal.isDialogOpen()) {
        this.restartTimeout();
      }
    }, 61000);

    window.onscroll = this.throttle(() => {
      if (!this.modal.isDialogOpen()) {
        this.restartTimeout();
      }
    }, 61000);

    window.onkeypress = this.throttle(() => {
      if (!this.modal.isDialogOpen()) {
        this.restartTimeout();
      }
    }, 61000);

    window.onkeyup = this.throttle(() => {
      if (!this.modal.isDialogOpen()) {
        this.restartTimeout();
      }
    }, 61000);
  }

  throttle(func, wait) {
    let waiting = false;
    return function() {
      if (waiting) {
        return;
      }
      waiting = true;
      setTimeout(async () => {
        func.apply(this, arguments);
        waiting = false;
      }, wait);
    };
  }
}
