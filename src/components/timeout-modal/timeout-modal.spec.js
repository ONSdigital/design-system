import { renderComponent, setTestPage } from '../../tests/helpers/rendering';

const EXAMPLE_TIMEOUT_MODAL_BASIC = {
  redirectUrl: '#!',
  title: 'You will be signed out soon',
  textFirstLine: 'It appears you have been inactive for a while.',
  countdownText: 'To protect your information, your progress will be saved and you will be signed out in',
  countdownExpiredText: 'You are being signed out.',
  btnText: 'Continue survey',
  minutesTextSingular: 'minute',
  minutesTextPlural: 'minutes',
  secondsTextSingular: 'second',
  secondsTextPlural: 'seconds',
  endWithFullStop: true,
};

describe('script: timeout modal', () => {
  describe('when the page loads', () => {
    beforeEach(async () => {
      const component = renderComponent('timeout-modal', { ...EXAMPLE_TIMEOUT_MODAL_BASIC, showModalTimeInSeconds: 58 });
      const template = `
        <div class="ons-page">
          ${component}
        </div>
      `;
      await setTestPage('/test', template);
    });

    it('displays the modal after the correct number of seconds', async () => {
      await page.waitForTimeout(2000);
      const modalIsVisible = await page.$eval('.ons-modal', node => node.classList.contains('ons-u-db'));
      expect(modalIsVisible).toBe(true);
    });
  });

  describe('when the modal first opens', () => {
    describe('when the countdown starts', () => {
      beforeEach(async () => {
        const component = renderComponent('timeout-modal', {
          ...EXAMPLE_TIMEOUT_MODAL_BASIC,
          showModalTimeInSeconds: 60,
        });

        const template = `
          <div class="ons-page">
            ${component}
          </div>
        `;

        await setTestPage('/test', template);
      });

      it('shows the time counting down', async () => {
        const timeAtStart = await page.$eval('.ons-js-timeout-timer span', element => element.innerHTML);
        await page.waitForTimeout(1000);
        const timeAfterOneSecond = await page.$eval('.ons-js-timeout-timer span', element => element.innerHTML);
        expect(timeAfterOneSecond).not.toEqual(timeAtStart);
      });
    });

    describe('when there are two minutes or more remaining', () => {
      beforeEach(async () => {
        const expiryTime = new Date(Date.now() + 60 * 3000);
        const expiryTimeInISOFormat = new Date(expiryTime).toISOString();

        const component = renderComponent('timeout-modal', {
          ...EXAMPLE_TIMEOUT_MODAL_BASIC,
          showModalTimeInSeconds: 180,
          sessionExpiresAt: expiryTimeInISOFormat,
        });

        const template = `
          <div class="ons-page">
            ${component}
          </div>
        `;
        await setTestPage('/test', template);
      });

      it('displays the `minutes` (plural) string', async () => {
        const timeString = await page.$eval('.ons-js-timeout-timer span', element => element.innerHTML);
        expect(timeString).toEqual(expect.stringContaining('minutes'));
      });
    });

    describe('when there are two seconds or more remaining', () => {
      beforeEach(async () => {
        const expiryTime = new Date(Date.now() + 60 * 1000);
        const expiryTimeInISOFormat = new Date(expiryTime).toISOString();

        const component = renderComponent('timeout-modal', {
          ...EXAMPLE_TIMEOUT_MODAL_BASIC,
          showModalTimeInSeconds: 60,
          sessionExpiresAt: expiryTimeInISOFormat,
        });

        const template = `
          <div class="ons-page">
            ${component}
          </div>
        `;
        await setTestPage('/test', template);
      });

      it('displays the `seconds` (plural) string', async () => {
        const timeString = await page.$eval('.ons-js-timeout-timer span', element => element.innerHTML);
        expect(timeString).toEqual(expect.stringContaining('seconds'));
      });
    });

    describe('when there is one minute remaining', () => {
      beforeEach(async () => {
        const expiryTime = new Date(Date.now() + 60 * 1500);
        const expiryTimeInISOFormat = new Date(expiryTime).toISOString();

        const component = renderComponent('timeout-modal', {
          ...EXAMPLE_TIMEOUT_MODAL_BASIC,
          showModalTimeInSeconds: 90,
          sessionExpiresAt: expiryTimeInISOFormat,
        });

        const template = `
          <div class="ons-page">
            ${component}
          </div>
        `;
        await setTestPage('/test', template);
      });

      it('displays the `minute` (singular) string', async () => {
        const timeString = await page.$eval('.ons-js-timeout-timer span', element => element.innerHTML);
        expect(timeString).toEqual(expect.stringContaining('minute'));
      });
    });

    describe('when there is one second remaining', () => {
      beforeEach(async () => {
        const expiryTime = new Date(Date.now() + 3 * 1000);
        const expiryTimeInISOFormat = new Date(expiryTime).toISOString();

        const component = renderComponent('timeout-modal', {
          ...EXAMPLE_TIMEOUT_MODAL_BASIC,
          showModalTimeInSeconds: 3,
          sessionExpiresAt: expiryTimeInISOFormat,
        });

        const template = `
          <div class="ons-page">
            ${component}
          </div>
        `;
        await setTestPage('/test', template);
      });

      it('displays the `second` (singular) string', async () => {
        const timeString = await page.$eval('.ons-js-timeout-timer span', element => element.innerHTML);
        expect(timeString).toEqual(expect.stringContaining('second'));
      });
    });

    describe('when the timer runs to zero', () => {
      beforeEach(async () => {
        const expiryTime = new Date(Date.now() + 1 * 1000);
        const expiryTimeInISOFormat = new Date(expiryTime).toISOString();

        const component = renderComponent('timeout-modal', {
          ...EXAMPLE_TIMEOUT_MODAL_BASIC,
          showModalTimeInSeconds: 1,
          sessionExpiresAt: expiryTimeInISOFormat,
        });

        const template = `
          <div class="ons-page">
            ${component}
          </div>
        `;
        await setTestPage('/test', template);
      });

      it('displays the `countdownExpiredText` text', async () => {
        const timeString = await page.$eval('.ons-js-timeout-timer span', element => element.innerHTML);
        expect(timeString).toEqual(expect.stringContaining('You are being signed out'));
      });

      it('then redirects to the provided `redirectUrl`', async () => {
        await page.waitForTimeout(2000);
        expect(page.url()).toContain('#!');
      });
    });
  });

  describe('when the modal is open', () => {
    beforeEach(async () => {
      const component = renderComponent('timeout-modal', {
        ...EXAMPLE_TIMEOUT_MODAL_BASIC,
        showModalTimeInSeconds: 59,
      });

      const template = `
        <div class="ons-page">
          ${component}
        </div>
      `;

      await setTestPage('/test', template);
    });

    describe('when the `esc` key is pressed', () => {
      beforeEach(async () => {
        await page.waitForSelector('.ons-modal');
        await page.keyboard.press('Escape');
      });

      it('closes the modal', async () => {
        const modalIsVisible = await page.$eval('.ons-modal', node => node.classList.contains('ons-u-db'));
        expect(modalIsVisible).toBe(false);
      });

      it('restarts the timer and displays the modal after the correct number of seconds', async () => {
        await page.waitForTimeout(2000);
        const modalIsVisible = await page.$eval('.ons-modal', node => node.classList.contains('ons-u-db'));
        expect(modalIsVisible).toBe(true);
      });
    });
  });
});
