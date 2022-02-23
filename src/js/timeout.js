export default class Timeout {
  constructor(context, sessionExpiryEndpoint, initialExpiryTime, enableTimeoutReset, startOnLoad) {
    this.context = context;
    this.sessionExpiryEndpoint = sessionExpiryEndpoint;
    this.initialExpiryTime = initialExpiryTime;
    this.enableTimeoutReset = enableTimeoutReset || false;
    this.startOnLoad = startOnLoad || false;
    this.countdown = context.querySelector('.ons-js-timeout-timer');
    this.accessibleCountdown = context.querySelector('.ons-js-timeout-timer-acc');
    this.timeOutRedirectUrl = context.getAttribute('data-redirect-url');

    // Language dependent text strings
    this.minutesTextSingular = context.getAttribute('data-minutes-text-singular');
    this.minutesTextPlural = context.getAttribute('data-minutes-text-plural');
    this.secondsTextSingular = context.getAttribute('data-seconds-text-singular');
    this.secondsTextPlural = context.getAttribute('data-seconds-text-plural');
    this.countdownText = context.getAttribute('data-countdown-text');
    this.countdownExpiredText = context.getAttribute('data-countdown-expired-text');

    // Settings
    this.expiryTime = '';
    this.expiryTimeInMilliseconds = 0;
    this.timers = [];
    this.timerRunOnce = false;
    this.countdownStarted = false;

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

    if (this.enableTimeoutReset) {
      this.addThrottledResetEvents();
    }

    if (this.startOnLoad) {
      this.startUiCountdown();
    }

    window.addEventListener('focus', this.handleWindowFocus.bind(this));
  }

  async startUiCountdown() {
    this.clearTimers();
    this.countdownStarted = true;

    if (this.enableTimeoutReset) {
      this.shouldRestartCheck = setInterval(async () => {
        await this.hasExpiryTimeResetInAnotherTab();
      }, 20000);
    }

    let milliseconds = this.convertTimeToMilliSeconds(this.expiryTime);
    let seconds = milliseconds / 1000;
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
        const shouldExpire = this.enableTimeoutReset ? await $this.hasExpiryTimeResetInAnotherTab() : true;

        if (shouldExpire) {
          $this.countdown.innerHTML = '<span class="ons-u-fw-b">' + $this.countdownExpiredText + '</span>';
          $this.accessibleCountdown.innerHTML = $this.countdownExpiredText;
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
      this.restartTimeout(this.expiryTimeInMilliseconds);
    } else {
      return true;
    }
  }

  async restartTimeout(timeInMilliSeconds) {
    this.clearTimers();
    clearInterval(this.shouldRestartCheck);
    this.countdownStarted = false;

    if (timeInMilliSeconds) {
      this.expiryTimeInMilliseconds = timeInMilliSeconds;
    } else {
      const createNewExpiryTime = await this.setNewExpiryTime();
      this.expiryTime = createNewExpiryTime;
      this.expiryTimeInMilliseconds = this.convertTimeToMilliSeconds(createNewExpiryTime);
    }
  }

  async handleWindowFocus() {
    this.expiryTime = await this.getExpiryTime();
    this.clearTimers();
    clearInterval(this.shouldRestartCheck);
    this.startUiCountdown();
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

  addThrottledResetEvents() {
    window.onclick = this.throttle(() => {
      /* istanbul ignore next */
      if (!this.countdownStarted) {
        this.restartTimeout();
      }
    }, 61000);

    window.onmousemove = this.throttle(() => {
      /* istanbul ignore next */
      if (!this.countdownStarted) {
        this.restartTimeout();
      }
    }, 61000);

    window.onmousedown = this.throttle(() => {
      /* istanbul ignore next */
      if (!this.countdownStarted) {
        this.restartTimeout();
      }
    }, 61000);

    window.onscroll = this.throttle(() => {
      /* istanbul ignore next */
      if (!this.countdownStarted) {
        this.restartTimeout();
      }
    }, 61000);

    window.onkeypress = this.throttle(() => {
      /* istanbul ignore next */
      if (!this.countdownStarted) {
        this.restartTimeout();
      }
    }, 61000);

    window.onkeyup = this.throttle(() => {
      /* istanbul ignore next */
      if (!this.countdownStarted) {
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
