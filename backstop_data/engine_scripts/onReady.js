module.exports = async (page) => {
    await page.evaluate(async () => {
        document.querySelectorAll('[loading="lazy"]').forEach((element) => {
            element.loading = 'eager';
        });

        document.querySelectorAll('[decoding="async"]').forEach((element) => {
            element.decoding = 'sync';
        });
    });
    const iframeSelector = '.ons-chart__iframe-wrapper iframe';

    // Helper to wait and scroll iframe into view
    async function waitForVisibleIframe(page, selector) {
        await page.waitForSelector(selector);
        await page.evaluate((sel) => {
            const iframe = document.querySelector(sel);
            if (iframe) {
                iframe.scrollIntoView();
            }
        }, selector);
        await new Promise((resolve) => setTimeout(resolve, 3000));
    }

    await waitForVisibleIframe(page, iframeSelector);
};
