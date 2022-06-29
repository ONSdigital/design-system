import { renderComponent, setTestPage } from '../../tests/helpers/rendering';

const EXAMPLE_TIMEOUT_PANEL_BASIC = {
  id: 'countdown',
  redirectUrl: '#!',
  minutesTextSingular: 'minute',
  minutesTextPlural: 'minutes',
  secondsTextSingular: 'second',
  secondsTextPlural: 'seconds',
  countdownText: 'For security, your answers will only be available to view for another',
  nojsText: 'For security, your answers will only be available to view for another 1 minute',
  countdownExpiredText: 'You are being signed out',
  endWithFullStop: true,
};

describe('script: timeout panel', () => {
  describe('when the page loads', () => {
    beforeEach(async () => {
      const expiryTime = new Date(Date.now() + 60 * 3000);
      const expiryTimeInISOFormat = new Date(expiryTime).toISOString();

      const component = renderComponent('timeout-panel', {
        ...EXAMPLE_TIMEOUT_PANEL_BASIC,
        sessionExpiresAt: expiryTimeInISOFormat,
      });

      await setTestPage('/test', component);
    });

    it('shows the time counting down', async () => {
      const timeAtStart = await page.$eval('.ons-js-timeout-timer', element => element.innerHTML);
      await page.waitForTimeout(1000);
      const timeAfterOneSecond = await page.$eval('.ons-js-timeout-timer', element => element.innerHTML);
      expect(timeAfterOneSecond).not.toEqual(timeAtStart);
    });
  });

  describe('when there are two minutes or more remaining', () => {
    beforeEach(async () => {
      const expiryTime = new Date(Date.now() + 60 * 3000);
      const expiryTimeInISOFormat = new Date(expiryTime).toISOString();

      const component = renderComponent('timeout-panel', {
        ...EXAMPLE_TIMEOUT_PANEL_BASIC,
        sessionExpiresAt: expiryTimeInISOFormat,
      });

      await setTestPage('/test', component);
    });

    it('displays the `minutes` (plural) string', async () => {
      const timeString = await page.$eval('.ons-js-timeout-timer', element => element.innerHTML);
      expect(timeString).toEqual(expect.stringContaining('minutes'));
    });
  });

  describe('when there are two seconds or more remaining', () => {
    beforeEach(async () => {
      const expiryTime = new Date(Date.now() + 60 * 1000);
      const expiryTimeInISOFormat = new Date(expiryTime).toISOString();

      const component = renderComponent('timeout-panel', {
        ...EXAMPLE_TIMEOUT_PANEL_BASIC,
        sessionExpiresAt: expiryTimeInISOFormat,
      });

      await setTestPage('/test', component);
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

      const component = renderComponent('timeout-panel', {
        ...EXAMPLE_TIMEOUT_PANEL_BASIC,
        sessionExpiresAt: expiryTimeInISOFormat,
      });

      await setTestPage('/test', component);
    });

    it('displays the `minute` (singular) string', async () => {
      const timeString = await page.$eval('.ons-js-timeout-timer', element => element.innerHTML);
      expect(timeString).toEqual(expect.stringContaining('minute'));
    });
  });

  describe('when there is one second remaining', () => {
    beforeEach(async () => {
      const expiryTime = new Date(Date.now() + 3 * 1000);
      const expiryTimeInISOFormat = new Date(expiryTime).toISOString();

      const component = renderComponent('timeout-panel', {
        ...EXAMPLE_TIMEOUT_PANEL_BASIC,
        sessionExpiresAt: expiryTimeInISOFormat,
      });

      await setTestPage('/test', component);
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

      const component = renderComponent('timeout-panel', {
        ...EXAMPLE_TIMEOUT_PANEL_BASIC,
        sessionExpiresAt: expiryTimeInISOFormat,
      });

      await setTestPage('/test', component);
    });

    it('displays the `countdownExpiredText` text', async () => {
      const timeString = await page.$eval('.ons-js-timeout-timer', element => element.innerHTML);
      expect(timeString).toEqual(expect.stringContaining('You are being signed out'));
    });

    it('then redirects to the provided `redirectUrl`', async () => {
      await page.waitForTimeout(2000);
      expect(page.url()).toContain('#!');
    });
  });

  describe('when Javascript is disabled', () => {
    beforeEach(async () => {
      const expiryTime = new Date(Date.now() + 1 * 1000);
      const expiryTimeInISOFormat = new Date(expiryTime).toISOString();

      const component = renderComponent('timeout-panel', {
        ...EXAMPLE_TIMEOUT_PANEL_BASIC,
        sessionExpiresAt: expiryTimeInISOFormat,
      });

      await page.setJavaScriptEnabled(false);
      await setTestPage('/test', component);
    });

    afterEach(async () => {
      await page.setJavaScriptEnabled(true);
    });

    it('displays the `nojsText` text', async () => {
      const nojsText = await page.$eval('.ons-js-nojs-text', element => element.innerHTML);
      expect(nojsText.trim()).toBe('For security, your answers will only be available to view for another 1 minute');
    });
  });
});
