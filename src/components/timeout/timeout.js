import Modal from '../modal/modal';

export default class Timeout {
  constructor(context) {
    this.context = context;
    this.continueButton = context.querySelector('.ons-js-modal-btn');
    this.timers = [];
    this.countdown = context.querySelector('.ons-js-timeout-timer');
    this.accessibleCountdown = context.querySelector('.ons-js-timeout-timer-acc');

    this.idleMinutesBeforeTimeOut = context.getAttribute('data-timeout-time') ? context.getAttribute('data-timeout-time') : 1;
    this.secondsTimeOutDialogVisible = context.getAttribute('data-show-modal-time') ? context.getAttribute('data-show-modal-time') : 20;
    this.timeOutRedirectUrl = context.getAttribute('data-redirect-url');
    this.text = context.getAttribute('data-text');
    this.timeUserLastInteractedWithPage = '';
    this.idleTime = null;
    this.secondsOfIdleTime = this.idleMinutesBeforeTimeOut * 60;
    this.milliSecondsBeforeTimeOut = this.idleMinutesBeforeTimeOut * 60000;
    this.milliSecondsTimeOutDialogVisible = this.secondsTimeOutDialogVisible * 1000;

    this.modal = new Modal(context);
    this.initialise();
  }

  initialise() {
    this.countIdleTime();

    this.continueButton.addEventListener('click', this.closeModal.bind(this));
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
    this.idleTime = setTimeout(this.openModal.bind(this), this.milliSecondsBeforeTimeOut - this.milliSecondsTimeOutDialogVisible);

    if (!this.modal.isDialogOpen()) {
      this.setLastInteractiveTime();
    }
  }

  openModal() {
    const shouldDialogOpen = this.getLastInteractiveTime(true) >= this.idleMinutesBeforeTimeOut * 60 - this.secondsTimeOutDialogVisible;
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
    const module = this;
    const countdown = this.countdown;
    const accessibleCountdown = this.accessibleCountdown;
    const minutes = this.secondsTimeOutDialogVisible / 60;

    let seconds = this.secondsTimeOutDialogVisible;
    let timerRunOnce = false;
    let timers = this.timers;
    countdown.innerHTML = minutes >= 1 ? minutes + ' minute' + (minutes > 1 ? 's ' : ' ') : seconds + ' second' + (seconds > 1 ? 's' : '');

    (function runTimer() {
      const minutesLeft = parseInt(seconds / 60, 10);
      const secondsLeft = parseInt(seconds % 60, 10);
      const timerExpired = minutesLeft < 1 && secondsLeft < 1;

      const minutesText = minutesLeft > 0 ? minutesLeft + ' minute' + (minutesLeft > 1 ? 's ' : ' ') : '';
      const secondsText = secondsLeft >= 1 ? secondsLeft + ' second' + (secondsLeft > 1 ? 's' : '') : '';
      let atMinutesNumberAsText = '';
      let atSecondsNumberAsText = '';

      try {
        atMinutesNumberAsText = this.numberToWords(minutesLeft);
        atSecondsNumberAsText = this.numberToWords(secondsLeft);
      } catch (e) {
        atMinutesNumberAsText = minutesLeft;
        atSecondsNumberAsText = secondsLeft;
      }

      const atMinutesText = minutesLeft > 0 ? atMinutesNumberAsText + ' minute' + (minutesLeft > 1 ? 's' : '') + '' : '';
      const atSecondsText = secondsLeft >= 1 ? ' ' + atSecondsNumberAsText + ' second' + (secondsLeft > 1 ? 's' : '') + '' : '';

      let text = module.text + ' <span class="u-fw-b">' + minutesText + secondsText + '</span>.';
      let atText = module.text + ' ' + atMinutesText;
      if (atSecondsText) {
        if (minutesLeft > 0) {
          atText += ' and';
        }
        atText += atSecondsText + '.';
      } else {
        atText += '.';
      }

      if (timerExpired && module.getLastInteractiveTime(module.convertToSeconds) > module.secondsOfIdleTime) {
        module.redirect();
      } else {
        seconds--;
        countdown.innerHTML = text;

        if (minutesLeft < 1 && secondsLeft < 20) {
          accessibleCountdown.setAttribute('aria-live', 'assertive');
        }

        if (!timerRunOnce) {
          accessibleCountdown.innerHTML = atText;
          timerRunOnce = true;
        } else if (secondsLeft % 15 === 0) {
          accessibleCountdown.innerHTML = atText;
        }

        timers.push(setTimeout(runTimer, 1000));
      }
    })();
  }

  closeModal() {
    if (this.modal.isDialogOpen()) {
      this.modal.closeDialog();
      this.clearTimers();
      this.setLastInteractiveTime();
    }
  }

  clearTimers() {
    for (let i = 0; i < this.timers.length; i++) {
      clearTimeout(this.timers[i]);
    }
  }

  shouldModuleCloseOrRedirect() {
    const shouldDialogClose = this.getLastInteractiveTime(true) < this.idleMinutesBeforeTimeOut * 60 - this.secondsTimeOutDialogVisible;
    const shouldRedirect = this.getLastInteractiveTime(true) > this.secondsOfIdleTime;

    if (shouldRedirect) {
      this.redirect();
    } else if (shouldDialogClose) {
      this.closeModal();
      this.resetIdleTime();
    }
  }

  getLastInteractiveTime(convertToSeconds) {
    let timeUserLastInteractedWithPage = new Date(window.localStorage.getItem('timeUserLastInteractedWithPage'));
    let time = timeUserLastInteractedWithPage;
    if (convertToSeconds) {
      time = Math.abs((timeUserLastInteractedWithPage - new Date()) / 1000);
    }
    return time;
  }

  setLastInteractiveTime() {
    window.localStorage.setItem('timeUserLastInteractedWithPage', new Date());
  }

  redirect() {
    window.location.replace(this.timeOutRedirectUrl);
  }

  numberToWords() {
    let string = n.toString();
    let units;
    let tens;
    let scales;
    let start;
    let end;
    let chunks;
    let chunksLen;
    let chunk;
    let ints;
    let i;
    let word;
    let words = 'and';

    if (parseInt(string) === 0) {
      return 'zero';
    }

    /* Array of units as words */
    units = [
      '',
      'one',
      'two',
      'three',
      'four',
      'five',
      'six',
      'seven',
      'eight',
      'nine',
      'ten',
      'eleven',
      'twelve',
      'thirteen',
      'fourteen',
      'fifteen',
      'sixteen',
      'seventeen',
      'eighteen',
      'nineteen',
    ];

    /* Array of tens as words */
    tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

    /* Array of scales as words */
    scales = [
      '',
      'thousand',
      'million',
      'billion',
      'trillion',
      'quadrillion',
      'quintillion',
      'sextillion',
      'septillion',
      'octillion',
      'nonillion',
      'decillion',
      'undecillion',
      'duodecillion',
      'tredecillion',
      'quatttuor-decillion',
      'quindecillion',
      'sexdecillion',
      'septen-decillion',
      'octodecillion',
      'novemdecillion',
      'vigintillion',
      'centillion',
    ];

    /* Split user arguemnt into 3 digit chunks from right to left */
    start = string.length;
    chunks = [];
    while (start > 0) {
      end = start;
      chunks.push(string.slice((start = Math.max(0, start - 3)), end));
    }

    /* Check if function has enough scale words to be able to stringify the user argument */
    chunksLen = chunks.length;
    if (chunksLen > scales.length) {
      return '';
    }

    /* Stringify each integer in each chunk */
    words = [];
    for (i = 0; i < chunksLen; i++) {
      chunk = parseInt(chunks[i]);

      if (chunk) {
        /* Split chunk into array of individual integers */
        ints = chunks[i]
          .split('')
          .reverse()
          .map(parseFloat);

        /* If tens integer is 1, i.e. 10, then add 10 to units integer */
        if (ints[1] === 1) {
          ints[0] += 10;
        }

        /* Add scale word if chunk is not zero and array item exists */
        if ((word = scales[i])) {
          words.push(word);
        }

        /* Add unit word if array item exists */
        if ((word = units[ints[0]])) {
          words.push(word);
        }

        /* Add tens word if array item exists */
        if ((word = tens[ints[1]])) {
          words.push(word);
        }

        /* Add hundreds word if array item exists */
        if ((word = units[ints[2]])) {
          words.push(word + ' hundred');
        }
      }
    }
    return words.reverse().join(' ');
  }
}
