import { renderComponent, setTestPage } from '../../tests/helpers/rendering';

const EXAMPLE_COOKIES_BANNER_PAGE = renderComponent('cookies-banner', {
  statementTitle: 'Tell us whether you accept cookies',
  statementText: 'We use <a href="#0">cookies to collect information</a> about how you use census.gov.uk.',
  confirmationText: 'You’ve accepted all cookies. You can <a href="#0">change your cookie preferences</a> at any time.',
});

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

  it('sets all cookies to true when accepting cookies', async () => {
    await setTestPage('/test', EXAMPLE_COOKIES_BANNER_PAGE);

    await page.click('.ons-js-accept-cookies');

    const cookies = await page.cookies();
    const ons_cookie_policy = cookies.find(cookie => cookie.name === 'ons_cookie_policy');
    const policy = JSON.parse(ons_cookie_policy.value.replace(/'/g, '"'));

    expect(policy).toEqual({
      essential: true,
      settings: true,
      usage: true,
      campaigns: true,
    });
  });

  it('sets seen cookie message when accepting cookies', async () => {
    await setTestPage('/test', EXAMPLE_COOKIES_BANNER_PAGE);

    await page.click('.ons-js-accept-cookies');

    const cookies = await page.cookies();
    const ons_cookie_message_displayed = cookies.find(cookie => cookie.name === 'ons_cookie_message_displayed');

    expect(ons_cookie_message_displayed.value).toBe('true');
  });

  it('should hide the primary message when pressing the accept button', async () => {
    await setTestPage('/test', EXAMPLE_COOKIES_BANNER_PAGE);

    await page.click('.ons-js-accept-cookies');

    const displayStyle = await page.$eval('.ons-cookies-banner__primary', node =>
      window.getComputedStyle(node).getPropertyValue('display'),
    );
    expect(displayStyle).toBe('none');
  });

  it('should show the secondary message when pressing the accept button', async () => {
    await setTestPage('/test', EXAMPLE_COOKIES_BANNER_PAGE);

    await page.click('.ons-js-accept-cookies');

    const displayStyle = await page.$eval('.ons-cookies-banner__confirmation', node =>
      window.getComputedStyle(node).getPropertyValue('display'),
    );
    expect(displayStyle).not.toBe('none');
  });
  //...
  it('should hide the secondary message when pressing the hide button', async () => {
    await setTestPage('/test', EXAMPLE_COOKIES_BANNER_PAGE);

    await page.click('.ons-js-accept-cookies');
    await page.click('.ons-js-hide-button');

    const displayStyle = await page.$eval('.ons-cookies-banner', node => window.getComputedStyle(node).getPropertyValue('display'));
    expect(displayStyle).toBe('none');
  });

  it('does not show the banner if user has acknowledged the banner previously and consent cookie is present', async () => {
    await page.setCookie({ name: 'ons_cookie_message_displayed', value: 'true' });

    await setTestPage('/test', EXAMPLE_COOKIES_BANNER_PAGE);

    const displayStyle = await page.$eval('.ons-cookies-banner', node => window.getComputedStyle(node).getPropertyValue('display'));
    expect(displayStyle).toBe('none');
  });
});
