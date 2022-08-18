import { renderComponent, setTestPage } from '../../tests/helpers/rendering';

const EXAMPLE_COOKIES_BANNER_PAGE = renderComponent('cookies-banner', {});

describe('script: cookies-banner', () => {
  beforeEach(async () => {
    const client = await page.target().createCDPSession();
    await client.send('Network.clearBrowserCookies');
  });

  it('should show the cookie banner', async () => {
    await setTestPage('/test', EXAMPLE_COOKIES_BANNER_PAGE);

    const displayStyle = await page.$eval('.ons-cookies-banner', node => window.getComputedStyle(node).getPropertyValue('display'));
    expect(displayStyle).toBe('block');
  });
  describe.each([
    ['accepting cookies', 'accept', true],
    ['rejecting cookies', 'reject', false],
  ])('action: %s', (_, action, value) => {
    it(`sets all cookies to ${value} when ${_}`, async () => {
      await setTestPage('/test', EXAMPLE_COOKIES_BANNER_PAGE);

      await page.click(`.ons-js-${action}-cookies`);

      const cookies = await page.cookies();
      const ons_cookie_policy = cookies.find(cookie => cookie.name === 'ons_cookie_policy');
      const policy = JSON.parse(ons_cookie_policy.value.replace(/'/g, '"'));

      expect(policy).toEqual({
        essential: true,
        settings: value,
        usage: value,
        campaigns: value,
      });
    });

    it(`sets seen cookie message when ${_}`, async () => {
      await setTestPage('/test', EXAMPLE_COOKIES_BANNER_PAGE);

      await page.click(`.ons-js-${action}-cookies`);

      const cookies = await page.cookies();
      const ons_cookie_message_displayed = cookies.find(cookie => cookie.name === 'ons_cookie_message_displayed');

      expect(ons_cookie_message_displayed.value).toBe('true');
    });

    it(`should hide the primary message when pressing the ${action} button`, async () => {
      await setTestPage('/test', EXAMPLE_COOKIES_BANNER_PAGE);

      await page.click(`.ons-js-${action}-cookies`);

      const displayStyle = await page.$eval('.ons-cookies-banner__primary', node =>
        window.getComputedStyle(node).getPropertyValue('display'),
      );
      expect(displayStyle).toBe('none');
    });

    it(`should show the secondary message when pressing the ${action} button`, async () => {
      await setTestPage('/test', EXAMPLE_COOKIES_BANNER_PAGE);

      await page.click(`.ons-js-${action}-cookies`);

      const displayStyle = await page.$eval('.ons-cookies-banner__confirmation', node =>
        window.getComputedStyle(node).getPropertyValue('display'),
      );
      expect(displayStyle).not.toBe('none');
    });
  });

  describe('confirmation banner', () => {
    it('should hide the confirmation message when pressing the hide button', async () => {
      await setTestPage('/test', EXAMPLE_COOKIES_BANNER_PAGE);

      await page.click('.ons-js-accept-cookies');
      await page.click('.ons-js-hide-button');

      const displayStyle = await page.$eval('.ons-cookies-banner', node => window.getComputedStyle(node).getPropertyValue('display'));
      expect(displayStyle).toBe('none');
    });
  });

  describe('cookie preferences confirmed', () => {
    it('does not show the banner if user has acknowledged the banner previously and consent cookie is present', async () => {
      await page.setCookie({ name: 'ons_cookie_message_displayed', value: 'true' });

      await setTestPage('/test', EXAMPLE_COOKIES_BANNER_PAGE);

      const displayStyle = await page.$eval('.ons-cookies-banner', node => window.getComputedStyle(node).getPropertyValue('display'));
      expect(displayStyle).toBe('none');
    });
  });
});
