module.exports = async (page) => {
    const selector = '.ons-chart__iframe';
    await page.waitFor(selector);
    await page.evaluate((selector) => {
        document.querySelector(selector).scrollIntoView();
    }, selector);
};
