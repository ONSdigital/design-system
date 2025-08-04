module.exports = async (page) => {
    const iframeSelector = '.ons-chart__iframe-wrapper iframe';

    // Helper to wait and scroll iframe into view
    async function waitForVisibleIframe(page, selector) {
        await page.waitForSelector(selector);
        await page.evaluate((sel) => {
            const iframe = document.querySelector(sel);
            if (iframe) {
                iframe.scrollIntoView({ behavior: 'auto', block: 'center' });
            }
        }, selector);
    }

    await waitForVisibleIframe(page, iframeSelector);
};
