module.exports = async (page, scenario) => {
    await require('./clickAndHoverHelper')(page, scenario);
    const selector = '.ons-chart__iframe';
    await page.waitFor(selector);
    await page.evaluate((selector) => {
        document.querySelector(selector).scrollIntoView();
    }, selector);
};
