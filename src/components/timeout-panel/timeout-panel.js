export default class Timeout {
  constructor(context, time, url) {
    this.context = context;
    this.countDownSeconds = time;
    this.urlOnZero = url;

    this.panelContainer = context.parentElement;
    this.panel = this.panelContainer.querySelector('.ons-js-panel-with-countdown');
    this.countdown = this.panelContainer.querySelector('.ons-js-timeout-timer');
    this.accessibleCountdown = this.panelContainer.querySelector('.ons-js-timeout-timer-acc');

    // Language dependent text strings
    this.minutesTextSingular = context.getAttribute('minutesTextSingular');
    this.minutesTextPlural = context.getAttribute('minutesTextPlural');
    this.secondsTextSingular = context.getAttribute('secondsTextSingular');
    this.secondsTextPlural = context.getAttribute('secondsTextPlural');
    this.countdownText = context.getAttribute('countdownText');
    this.countdownExpiredText = context.getAttribute('countdownExpiredText');

    // Settings
    this.timers = [];
    this.timerRunOnce = false;

    // Start module
    this.initialise();
  }

  async initialise() {
    window.onload = setTimeout(this.startUiCountdown.bind(this), this.expiryTimeInMilliseconds);
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
        ' <span class="ons-u-fw-b ons-panel__timer">' +
        (minutesLeft > 0 ? minutesText : '') +
        (minutesLeft > 0 && secondsLeft > 0 ? ' ' : '') +
        (secondsLeft > 0 ? secondsText : '') +
        '.</span>';

      if (timerExpired) {
        if ($this.panel && $this.countdownExpiredText) {
          $this.countdown.innerHTML = '<span>' + $this.countdownExpiredText + '</span>';
          $this.accessibleCountdown.innerHTML = $this.countdownExpiredText;
        }
        if ($this.urlOnZero) {
          window.location.href = $this.urlOnZero;
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

  clearTimers() {
    for (let i = 0; i < this.timers.length; i++) {
      clearTimeout(this.timers[i]);
    }
  }
}
