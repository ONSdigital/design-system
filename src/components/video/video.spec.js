import { renderComponent, setTestPage } from '../../tests/helpers/rendering';

const EXAMPLE_VIDEO_YOUTUBE = {
  videoEmbedUrl: 'https://www.youtube.com/embed/_EGJlvkgbPo',
  title: 'Census 2021 promotional TV advert',
  linkText: 'Example link text',
};

const EXAMPLE_APPROVED_COOKIE = JSON.stringify({ campaigns: true }).replace(/"/g, "'");

describe('script: video', () => {
  beforeEach(async () => {
    const client = await page.target().createCDPSession();
    await client.send('Network.clearBrowserCookies');
  });

  it('should show the placeholder content', async () => {
    await setTestPage('/test', renderComponent('video', EXAMPLE_VIDEO_YOUTUBE));

    const displayStyle = await page.$eval('.ons-js-video-placeholder', node => window.getComputedStyle(node).getPropertyValue('display'));
    expect(displayStyle).toBe('block');
  });

  it('should not show the iframe', async () => {
    await setTestPage('/test', renderComponent('video', EXAMPLE_VIDEO_YOUTUBE));

    const displayStyle = await page.$eval('.ons-js-video-iframe', node => window.getComputedStyle(node).getPropertyValue('display'));
    expect(displayStyle).toBe('none');
  });

  describe('when cookies are accepted on page load', () => {
    beforeEach(async () => {
      await page.setCookie({
        name: 'ons_cookie_policy',
        value: EXAMPLE_APPROVED_COOKIE,
      });

      await setTestPage('/test', renderComponent('video', EXAMPLE_VIDEO_YOUTUBE));
    });

    it('should hide the placeholder content', async () => {
      const displayStyle = await page.$eval('.ons-js-video-placeholder', node => window.getComputedStyle(node).getPropertyValue('display'));
      expect(displayStyle).toBe('none');
    }, 10000);

    it('should show the iframe', async () => {
      const displayStyle = await page.$eval('.ons-js-video-iframe', node => window.getComputedStyle(node).getPropertyValue('display'));
      expect(displayStyle).toBe('block');
    }, 10000);

    it('should add the correct modifier class', async () => {
      const hasClass = await page.$eval('.ons-js-video', node => node.classList.contains('ons-video--hasIframe'));
      expect(hasClass).toBe(true);
    }, 10000);
  });

  describe('when cookies are accepted via banner', () => {
    beforeEach(async () => {
      await setTestPage(
        '/test',
        `${renderComponent('video', EXAMPLE_VIDEO_YOUTUBE)}
        <div class="ons-cookies-banner ons-u-db"><button class="ons-js-accept-cookies">Accept</button></div>`,
      );
      await page.click('.ons-js-accept-cookies');
    });

    it('should hide the placeholder content', async () => {
      const displayStyle = await page.$eval('.ons-js-video-placeholder', node => window.getComputedStyle(node).getPropertyValue('display'));
      expect(displayStyle).toBe('none');
    });

    it('should show the iframe', async () => {
      const displayStyle = await page.$eval('.ons-js-video-iframe', node => window.getComputedStyle(node).getPropertyValue('display'));
      expect(displayStyle).toBe('block');
    });

    it('should add the correct modifier class', async () => {
      const hasClass = await page.$eval('.ons-js-video', node => node.classList.contains('ons-video--hasIframe'));
      expect(hasClass).toBe(true);
    }, 10000);
  });
});
