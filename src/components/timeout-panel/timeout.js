import Panel from '../panel/panel';

export default class Timeout {
  constructor(context, url, time) {
    this.context = context;
    this.sessionExpiryEndpoint = url;
    this.initialExpiryTime = time;
    this.continueButton = context.querySelector('.ons-js-panel-btn');
    this.countdown = context.querySelector('.ons-js-timeout-timer');
    this.accessibleCountdown = context.querySelector('.ons-js-timeout-timer-acc');
    this.timeOutRedirectUrl = context.getAttribute('data-redirect-url');
    this.panelVisibleInMilliseconds = context.getAttribute('data-show-panel-time') * 1000;

    // Language dependent text strings
    this.minutesTextSingular = context.getAttribute('data-minutes-text-singular');
    this.minutesTextPlural = context.getAttribute('data-minutes-text-plural');
    this.secondsTextSingular = context.getAttribute('data-seconds-text-singular');
    this.secondsTextPlural = context.getAttribute('data-seconds-text-plural');
    this.countdownText = context.getAttribute('data-countdown-text');
    this.redirectingText = context.getAttribute('data-redirecting-text');

    // Settings
    this.expiryTimeInMilliseconds = 0;
    this.expiryTime = '';
    this.showpanelTimeout = null;
    this.timers = [];
    this.timerRunOnce = false;

    // Create panel instance
    this.panel = new panel(this.context);

    // Start module
    this.initialise();
  }

  async initialise() {
    if (this.initialExpiryTime && this.sessionExpiryEndpoint) {
      this.expiryTime = this.initialExpiryTime;
    } else {
      this.expiryTime = await this.setNewExpiryTime();
    }

    this.expiryTimeInMilliseconds = this.convertTimeToMilliSeconds(this.expiryTime);

    this.bindEventListeners();
  }

  bindEventListeners() {
    window.onload = this.startTimeout();
    window.addEventListener('focus', this.handleWindowFocus.bind(this));
    window.addEventListener('keydown', this.escToClose.bind(this));
    this.continueButton.addEventListener('click', this.closepanelAndRestartTimeout.bind(this));
    this.addThrottledEvents();
  }

  startTimeout() {
    clearTimeout(this.showpanelTimeout);
    this.showpanelTimeout = setTimeout(this.openpanel.bind(this), this.expiryTimeInMilliseconds - this.panelVisibleInMilliseconds);
  }

  async openpanel() {
    const panelWillOpen = await this.hasExpiryTimeResetInAnotherTab();
    if (panelWillOpen && !this.panel.isDialogOpen()) {
      this.panel.openDialog();
      this.startUiCountdown();
    }
  }

  async startUiCountdown() {
    this.clearTimers();
    clearInterval(this.shouldpanelCloseCheck);

    this.shouldpanelCloseCheck = setInterval(async () => {
      await this.hasExpiryTimeResetInAnotherTab();
    }, 20000);

    let millseconds = this.panelVisibleInMilliseconds;
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
        const shouldExpire = await $this.hasExpiryTimeResetInAnotherTab();

        if (shouldExpire) {
          $this.countdown.innerHTML = '<span class="ons-u-fw-b">' + $this.redirectingText + '</span>';
          $this.accessibleCountdown.innerHTML = $this.redirectingText;
          setTimeout($this.redirect.bind($this), 2000);
        }
      } else {
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

  async hasExpiryTimeResetInAnotherTab() {
    const checkExpiryTime = await this.getExpiryTime();

    if (checkExpiryTime != this.expiryTime) {
      this.expiryTime = checkExpiryTime;
      this.expiryTimeInMilliseconds = this.convertTimeToMilliSeconds(checkExpiryTime);
      this.closepanelAndRestartTimeout(this.expiryTimeInMilliseconds);
    } else {
      return true;
    }
  }

  closepanelAndRestartTimeout(timeInMilliSeconds) {
    if (typeof timeInMilliSeconds !== 'string') {
      timeInMilliSeconds = false;
    }
    if (this.panel.isDialogOpen()) {
      this.panel.closeDialog();
    }
    this.restartTimeout(timeInMilliSeconds);
  }

  async restartTimeout(timeInMilliSeconds) {
    this.clearTimers();
    clearInterval(this.shouldpanelCloseCheck);

    if (timeInMilliSeconds) {
      this.expiryTimeInMilliseconds = timeInMilliSeconds;
    } else {
      const createNewExpiryTime = await this.setNewExpiryTime();
      this.expiryTime = createNewExpiryTime;
      this.expiryTimeInMilliseconds = this.convertTimeToMilliSeconds(createNewExpiryTime);
    }

    this.startTimeout();
  }

  async handleWindowFocus() {
    if (this.sessionExpiryEndpoint) {
      const canSetNewExpiry = await this.setNewExpiryTime();
      if (!canSetNewExpiry) {
        this.redirect();
      } else {
        const newExpiryTimeInMilliseconds = this.convertTimeToMilliSeconds(canSetNewExpiry).toString();
        this.closepanelAndRestartTimeout(newExpiryTimeInMilliseconds);
      }
    }
  }

  escToClose(event) {
    if (this.panel.isDialogOpen() && event.keyCode === 27) {
      this.closepanelAndRestartTimeout();
    }
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

  async getExpiryTime() {
    if (this.sessionExpiryEndpoint) {
      const currentExpiryTime = await this.fetchExpiryTime('GET');
      return currentExpiryTime;
    } else {
      // For demo purposes
      return this.expiryTime;
    }
  }

  async fetchExpiryTime(fetchMethod) {
    let response = await fetch(this.sessionExpiryEndpoint, {
      method: fetchMethod,
      headers: { 'Cache-Control': 'no-cache', 'Content-type': 'application/json; charset=UTF-8' },
    });
    if (response.status === 401) {
      this.redirect();
      return false;
    }

    let json = await response.json();

    return json.expires_at;
  }

  convertTimeToMilliSeconds(expiryTime) {
    const time = new Date(expiryTime);
    const calculateTimeInMilliSeconds = Math.abs(time - new Date());

    return calculateTimeInMilliSeconds;
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
    window.onclick = this.throttle(() => {
      /* istanbul ignore next */
      if (!this.panel.isDialogOpen()) {
        this.restartTimeout();
      }
    }, 61000);

    window.onmousemove = this.throttle(() => {
      /* istanbul ignore next */
      if (!this.panel.isDialogOpen()) {
        this.restartTimeout();
      }
    }, 61000);

    window.onmousedown = this.throttle(() => {
      /* istanbul ignore next */
      if (!this.panel.isDialogOpen()) {
        this.restartTimeout();
      }
    }, 61000);

    window.onscroll = this.throttle(() => {
      /* istanbul ignore next */
      if (!this.panel.isDialogOpen()) {
        this.restartTimeout();
      }
    }, 61000);

    window.onkeypress = this.throttle(() => {
      /* istanbul ignore next */
      if (!this.panel.isDialogOpen()) {
        this.restartTimeout();
      }
    }, 61000);

    window.onkeyup = this.throttle(() => {
      /* istanbul ignore next */
      if (!this.panel.isDialogOpen()) {
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
