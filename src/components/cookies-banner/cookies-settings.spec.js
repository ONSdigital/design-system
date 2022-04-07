import { renderComponent, setTestPage } from '../../tests/helpers/rendering';

const EXAMPLE_COOKIES_SETTINGS_PAGE = `
  ${renderComponent('cookies-banner', {
    statementTitle: 'Tell us whether you accept cookies',
    statementText: 'We use <a href="#0">cookies to collect information</a> about how you use census.gov.uk.',
    confirmationText: 'You’ve accepted all cookies. You can <a href="#0">change your cookie preferences</a> at any time.',
  })}

  <form data-module="cookie-settings">
    <input type="radio" class="ons-js-radio" name="cookies-settings" value="on">
    <input type="radio" class="ons-js-radio" name="cookies-settings" value="off">
    <input type="radio" class="ons-js-radio" name="cookies-usage" value="on">
    <input type="radio" class="ons-js-radio" name="cookies-usage" value="off">
    <input type="radio" class="ons-js-radio" name="cookies-campaigns" value="on">
    <input type="radio" class="ons-js-radio" name="cookies-campaigns" value="off">
    <button id="submit-button" type="submit">Submit</button>
  </form>

  <div class="ons-cookies-confirmation-message ons-u-d-no">
    <a class="ons-js-return-link" href="#0">Return to previous page</a>
  </div>
`;

describe('script: cookies-settings', () => {
  beforeEach(async () => {
    const client = await page.target().createCDPSession();
    await client.send('Network.clearBrowserCookies');
  });

  it('sets a consent cookie by default', async () => {
    await setTestPage('/test', EXAMPLE_COOKIES_SETTINGS_PAGE);

    const cookies = await page.cookies();
    const ons_cookie_policy = cookies.find(cookie => cookie.name === 'ons_cookie_policy');
    const policy = JSON.parse(ons_cookie_policy.value.replace(/'/g, '"'));

    expect(policy).toEqual({
      essential: true,
      settings: false,
      usage: false,
      campaigns: false,
    });
  });

  it('sets all radio buttons to the default values', async () => {
    await setTestPage('/test', EXAMPLE_COOKIES_SETTINGS_PAGE);

    const cookiesSettingsOffRadio = await page.$eval('input[name=cookies-settings][value=off]', node => node.checked);
    const cookiesUsageOffRadio = await page.$eval('input[name=cookies-usage][value=off]', node => node.checked);
    const cookiesCampaignsOffRadio = await page.$eval('input[name=cookies-campaigns][value=off]', node => node.checked);

    expect(cookiesSettingsOffRadio).toBe(true);
    expect(cookiesUsageOffRadio).toBe(true);
    expect(cookiesCampaignsOffRadio).toBe(true);
  });

  it('sets all radios to on from off when accepting cookies', async () => {
    await setTestPage('/test', EXAMPLE_COOKIES_SETTINGS_PAGE);

    await page.click('.ons-js-accept-cookies');

    const cookiesSettingsOnRadio = await page.$eval('input[name=cookies-settings][value=on]', node => node.checked);
    const cookiesUsageOnRadio = await page.$eval('input[name=cookies-usage][value=on]', node => node.checked);
    const cookiesCampaignsOnRadio = await page.$eval('input[name=cookies-campaigns][value=on]', node => node.checked);

    expect(cookiesSettingsOnRadio).toBe(true);
    expect(cookiesUsageOnRadio).toBe(true);
    expect(cookiesCampaignsOnRadio).toBe(true);
  });

  it.each([['settings'], ['usage'], ['campaigns']])('updates consent cookie when "%s" policy is turned on', async policyName => {
    await setTestPage('/test', EXAMPLE_COOKIES_SETTINGS_PAGE);

    await page.click(`input[name=cookies-${policyName}][value=on]`);
    await page.click('#submit-button');

    const cookies = await page.cookies();
    const ons_cookie_policy = cookies.find(cookie => cookie.name === 'ons_cookie_policy');
    const policy = JSON.parse(ons_cookie_policy.value.replace(/'/g, '"'));

    expect(policy).toHaveProperty(policyName, true);
  });

  it.each([['settings'], ['usage'], ['campaigns']])(
    'updates consent cookie when "%s" policy is turned on and then off',
    async policyName => {
      await setTestPage('/test', EXAMPLE_COOKIES_SETTINGS_PAGE);

      await page.click(`input[name=cookies-${policyName}][value=on]`);
      await page.click('#submit-button');

      await page.click(`input[name=cookies-${policyName}][value=off]`);
      await page.click('#submit-button');

      const cookies = await page.cookies();
      const ons_cookie_policy = cookies.find(cookie => cookie.name === 'ons_cookie_policy');
      const policy = JSON.parse(ons_cookie_policy.value.replace(/'/g, '"'));

      expect(policy).toHaveProperty(policyName, false);
    },
  );

  it('sets ons_cookie_message_displayed cookie on form submit', async () => {
    await setTestPage('/test', EXAMPLE_COOKIES_SETTINGS_PAGE);

    const cookiesBefore = await page.cookies();
    const ons_cookie_message_displayed_before = cookiesBefore.find(cookie => cookie.name === 'ons_cookie_message_displayed');
    expect(ons_cookie_message_displayed_before).toBeUndefined();

    await page.click('#submit-button');

    const cookiesAfter = await page.cookies();
    const ons_cookie_message_displayed_after = cookiesAfter.find(cookie => cookie.name === 'ons_cookie_message_displayed');

    expect(ons_cookie_message_displayed_after.value).toBe('true');
  });

  it('does not hide the cookie banner by default', async () => {
    await setTestPage('/test', EXAMPLE_COOKIES_SETTINGS_PAGE);

    const displayStyle = await page.$eval('.ons-cookies-banner', node => window.getComputedStyle(node).getPropertyValue('display'));
    expect(displayStyle).not.toBe('none');
  });

  it('hides the cookie banner on form submit', async () => {
    await setTestPage('/test', EXAMPLE_COOKIES_SETTINGS_PAGE);

    await page.click('#submit-button');

    const displayStyle = await page.$eval('.ons-cookies-banner', node => window.getComputedStyle(node).getPropertyValue('display'));
    expect(displayStyle).toBe('none');
  });

  it('does not show a confirmation message by default', async () => {
    await setTestPage('/test', EXAMPLE_COOKIES_SETTINGS_PAGE);

    const displayStyle = await page.$eval('.ons-cookies-confirmation-message', node =>
      window.getComputedStyle(node).getPropertyValue('display'),
    );
    expect(displayStyle).toBe('none');
  });

  it('shows a confirmation message on form submit', async () => {
    await setTestPage('/test', EXAMPLE_COOKIES_SETTINGS_PAGE);

    await page.click('#submit-button');

    const displayStyle = await page.$eval('.ons-cookies-confirmation-message', node =>
      window.getComputedStyle(node).getPropertyValue('display'),
    );
    expect(displayStyle).not.toBe('none');
  });
});
