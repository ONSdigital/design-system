module.exports = async (page) => {
    const iframeSelector = '.ons-chart__iframe-wrapper iframe';

    // Helper to wait and scroll iframe into view
    async function waitForVisibleIframe(page, selector) {
        await page.waitForSelector(selector);
        await page.evaluate((sel) => {
            const iframe = document.querySelector(sel);
            if (iframe) {
                console.log('Scrolling iframe into view:', iframe);
                iframe.scrollIntoView({ behavior: 'auto', block: 'center' });
            }
        }, selector);
        await page.waitForTimeout(3000); // Give time for iframe content to load visually
    }

    await waitForVisibleIframe(page, iframeSelector);
};
