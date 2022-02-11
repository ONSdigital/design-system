export default class Timeout {
  constructor(context, time) {
    this.context = context;
    this.countDownSeconds = time;
    this.countdown = context.querySelector('.ons-js-timeout-timer');
    this.accessibleCountdown = context.querySelector('.ons-js-timeout-timer-acc');
    // this.panelText = context.querySelector('.ons-js-statictext');

    // Language dependent text strings
    this.minutesTextSingular = context.getAttribute('minutesTextSingular');
    this.minutesTextPlural = context.getAttribute('minutesTextPlural');
    this.secondsTextSingular = context.getAttribute('secondsTextSingular');
    this.secondsTextPlural = context.getAttribute('secondsTextPlural');
    this.countdownText = context.getAttribute('countdownText');
    this.redirectingText = context.getAttribute('countdownExpiredText');

    // Settings
    // this.expiryTimeInMilliseconds = time;
    this.expiryTime = '';
    this.showPanelTimeout = null;
    this.timers = [];
    this.timerRunOnce = false;

    // Start module
    this.initialise();
  }

  async initialise() {
    this.panelText.addClass('ons-u-vh');
    window.onload = this.startTimeout();
  }

  convertTimeToMilliSeconds(expiryTime) {
    const time = new Date(expiryTime);
    const calculateTimeInMilliSeconds = Math.abs(time - new Date());

    return calculateTimeInMilliSeconds;
  }

  async openPanel() {
    const modalWillOpen = await this.hasExpiryTimeResetInAnotherTab();
    if (modalWillOpen) {
      this.startUiCountdown();
    }
  }

  async hasExpiryTimeResetInAnotherTab() {
    const checkExpiryTime = await this.getExpiryTime();

    if (checkExpiryTime != this.expiryTime) {
      this.expiryTime = checkExpiryTime;
      this.expiryTimeInMilliseconds = this.convertTimeToMilliSeconds(checkExpiryTime);
      this.closeModalAndRestartTimeout(this.expiryTimeInMilliseconds);
    } else {
      return true;
    }
  }

  async getExpiryTime() {
    if (this.sessionExpiryEndpoint) {
      const currentExpiryTime = await this.fetchExpiryTime('GET');
      return currentExpiryTime;
    } else {
      // For demo purposes
      return this.expiryTime;
    }
  }

  async startUiCountdown() {
    this.clearTimers();

    let seconds = this.countDownSeconds;
    let timers = this.timers;
    let $this = this;

    await (async function runTimer() {
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
        const shouldExpire = await $this.hasExpiryTimeResetInAnotherTab();

        if (shouldExpire) {
          $this.countdown.innerHTML = '<span class="ons-u-fw-b">' + $this.redirectingText + '</span>';

          $this.accessibleCountdown.innerHTML = $this.redirectingText;
        }
      } else {
        this.panelText.addClass('ons-u-vh');
        seconds--;
        $this.expiryTimeInMilliseconds = seconds * 1000;
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

  async setNewExpiryTime() {
    let newExpiryTime;
    if (!this.sessionExpiryEndpoint) {
      // For demo purposes
      const demoTime = new Date(this.initialExpiryTime ? this.initialExpiryTime : Date.now() + 60 * 1000);
      newExpiryTime = new Date(demoTime).toISOString();
    } else {
      newExpiryTime = await this.fetchExpiryTime('PATCH');
    }
    return newExpiryTime;
  }

  startTimeout() {
    this.showPanelTimeout = setTimeout(this.openPanel.bind(this), this.expiryTimeInMilliseconds);
  }

  clearTimers() {
    for (let i = 0; i < this.timers.length; i++) {
      clearTimeout(this.timers[i]);
    }
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
