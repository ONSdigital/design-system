import { renderComponent, setTestPage } from '../../tests/helpers/rendering';

const { setTimeout } = require('node:timers/promises');

const EXAMPLE_VIDEO_YOUTUBE = {
    videoEmbedUrl: 'https://www.youtube.com/embed/_EGJlvkgbPo',
    title: 'Census 2021 promotional TV advert',
    videoLinkText: 'Example link text',
};

const EXAMPLE_VIDEO_VIMEO = {
    videoEmbedUrl: 'https://player.vimeo.com/video/838454524?h=24551a3754',
    title: 'Vimeo Video',
    videoLinkText: 'Example link text',
};

const EXAMPLE_APPROVED_COOKIE = JSON.stringify({ campaigns: true }).replace(/"/g, "'");

describe('script: video', () => {
    describe('YouTube videos', () => {
        beforeEach(async () => {
            const client = await page.createCDPSession();
            await client.send('Network.clearBrowserCookies');
        });

        it('should show the placeholder content', async () => {
            await setTestPage('/test', renderComponent('video', EXAMPLE_VIDEO_YOUTUBE));

            const displayStyle = await page.$eval('.ons-js-video-placeholder', (node) =>
                window.getComputedStyle(node).getPropertyValue('display'),
            );
            expect(displayStyle).toBe('block');
        });

        it('should not show the iframe', async () => {
            await setTestPage('/test', renderComponent('video', EXAMPLE_VIDEO_YOUTUBE));

            const displayStyle = await page.$eval('.ons-js-video-iframe', (node) =>
                window.getComputedStyle(node).getPropertyValue('display'),
            );
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
                const displayStyle = await page.$eval('.ons-js-video-placeholder', (node) =>
                    window.getComputedStyle(node).getPropertyValue('display'),
                );
                expect(displayStyle).toBe('none');
            }, 10000);

            it('should show the iframe', async () => {
                const displayStyle = await page.$eval('.ons-js-video-iframe', (node) =>
                    window.getComputedStyle(node).getPropertyValue('display'),
                );
                expect(displayStyle).toBe('block');
            }, 10000);

            it('should add the correct modifier class', async () => {
                const hasClass = await page.$eval('.ons-js-video', (node) => node.classList.contains('ons-video--hasIframe'));
                expect(hasClass).toBe(true);
            }, 10000);

            it('should not add dnt', async () => {
                const src = await page.$eval('.ons-js-video-iframe', (node) => node.getAttribute('src'));
                expect(src.includes('?dnt=1')).toBe(false);
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
                const displayStyle = await page.$eval('.ons-js-video-placeholder', (node) =>
                    window.getComputedStyle(node).getPropertyValue('display'),
                );
                expect(displayStyle).toBe('none');
            });

            it('should show the iframe', async () => {
                const displayStyle = await page.$eval('.ons-js-video-iframe', (node) =>
                    window.getComputedStyle(node).getPropertyValue('display'),
                );
                expect(displayStyle).toBe('block');
            });

            it('should add the correct modifier class', async () => {
                const hasClass = await page.$eval('.ons-js-video', (node) => node.classList.contains('ons-video--hasIframe'));
                expect(hasClass).toBe(true);
            }, 10000);

            it('should not add dnt', async () => {
                const src = await page.$eval('.ons-js-video-iframe', (node) => node.getAttribute('src'));
                expect(src.includes('?dnt=1')).toBe(false);
            }, 10000);
        });
    });

    describe('Vimeo videos', () => {
        describe('when cookies are accepted on page load', () => {
            it('should add dnt', async () => {
                await page.setCookie({
                    name: 'ons_cookie_policy',
                    value: EXAMPLE_APPROVED_COOKIE,
                });
                await setTestPage('/test', renderComponent('video', EXAMPLE_VIDEO_VIMEO));

                const src = await page.$eval('.ons-js-video-iframe', (node) => node.getAttribute('src'));

                await setTimeout(100);

                expect(src.includes('?dnt=1')).toBe(true);
            }, 10000);
        });

        describe('when cookies are accepted on page load', () => {
            it('when cookies are accepted via banner, should add dnt', async () => {
                await setTestPage(
                    '/test',
                    `${renderComponent('video', EXAMPLE_VIDEO_VIMEO)}
                    <div class="ons-cookies-banner ons-u-db"><button class="ons-js-accept-cookies">Accept</button></div>`,
                );
                await page.click('.ons-js-accept-cookies');

                const src = await page.$eval('.ons-js-video-iframe', (node) => node.getAttribute('src'));

                await setTimeout(100);

                expect(src.includes('?dnt=1')).toBe(true);
            }, 10000);
        });
    });
});
