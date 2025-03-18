import { renderComponent, setTestPage } from '../../tests/helpers/rendering';
import { EXAMPLE_HEADER_SEARCH_AND_MENU_LINKS } from './_test-examples';
import { getNodeAttributes } from '../../tests/helpers/puppeteer';

describe('script: header', () => {
    beforeEach(async () => {
        await setTestPage('/test', renderComponent('header', { ...EXAMPLE_HEADER_SEARCH_AND_MENU_LINKS, variants: 'basic' }));
    });

    describe('WHEN: the search button is clicked', () => {
        beforeEach(async () => {
            await page.click('.ons-btn--search');
        });

        it('THEN: the search input form is displayed', async () => {
            await page.waitForSelector('.ons-header-nav-search');
            const isSearchNavVisible = await page.$eval('.ons-header-nav-search', (el) => !el.classList.contains('ons-u-d-no'));
            expect(isSearchNavVisible).toBe(true);
        });

        it('THEN: the search button is hidden', async () => {
            const isSearchButtonHidden = await page.$eval('.ons-btn--search', (el) => el.classList.contains('ons-u-vh'));
            expect(isSearchButtonHidden).toBe(true);
        });

        it('THEN: the close button appears and is visible', async () => {
            await page.waitForSelector('.ons-btn--close');
            const attributes = await getNodeAttributes(page, '.ons-btn--close');
            expect(attributes['aria-expanded']).toBe('true');

            const isCloseBtnVisible = await page.$eval('.ons-btn--close', (el) => !el.classList.contains('ons-u-vh'));
            expect(isCloseBtnVisible).toBe(true);
        });

        it('THEN: the search field has full width', async () => {
            await page.waitForSelector('.ons-header-nav-search__input .ons-input');
            const isFullWidth = await page.$eval('.ons-header-nav-search__input .ons-input', (el) =>
                el.classList.contains('ons-input--w-full'),
            );
            expect(isFullWidth).toBe(true);
        });
    });

    describe('WHEN: the search button is NOT clicked', () => {
        it('THEN: the search form is hidden', async () => {
            const isSearchNavHidden = await page.$eval('.ons-header-nav-search', (el) => el.classList.contains('ons-u-d-no'));
            expect(isSearchNavHidden).toBe(true);
        });

        it('THEN: the close button is hidden', async () => {
            const isCloseButtonHidden = await page.$eval('.ons-btn--close', (el) => el.classList.contains('ons-u-vh'));
            expect(isCloseButtonHidden).toBe(true);
        });
    });

    describe('WHEN: the close button is clicked', () => {
        beforeEach(async () => {
            await page.click('.ons-btn--search');
            await page.waitForSelector('.ons-btn--close');
            await page.click('.ons-btn--close');
        });

        it('THEN: the search form is hidden', async () => {
            const isSearchNavHidden = await page.$eval('.ons-header-nav-search', (el) => el.classList.contains('ons-u-d-no'));
            expect(isSearchNavHidden).toBe(true);
        });

        it('THEN: the close button is hidden', async () => {
            const isCloseButtonHidden = await page.$eval('.ons-btn--close', (el) => el.classList.contains('ons-u-vh'));
            expect(isCloseButtonHidden).toBe(true);
        });

        it('THEN: the search button is visible again', async () => {
            const isSearchButtonVisible = await page.$eval('.ons-btn--search', (el) => !el.classList.contains('ons-u-vh'));
            expect(isSearchButtonVisible).toBe(true);
        });
    });

    describe('WHEN: the menu button is clicked', () => {
        beforeEach(async () => {
            await page.click('.ons-btn--menu');
        });

        it('THEN: the navigation menu is displayed', async () => {
            await page.waitForSelector('.ons-header-nav-menu');
            const isMenuNavVisible = await page.$eval('.ons-header-nav-menu', (el) => !el.classList.contains('ons-u-d-no'));
            expect(isMenuNavVisible).toBe(true);
        });

        it('THEN: the menu button is marked as expanded', async () => {
            const menuButtonAriaExpanded = await page.$eval('.ons-btn--menu', (el) => el.getAttribute('aria-expanded'));
            expect(menuButtonAriaExpanded).toBe('true');
        });

        it('THEN: the navigation menu aria-hidden attribute is set to false', async () => {
            const isAriaHiddenFalse = await page.$eval('.ons-header-nav-menu', (el) => el.getAttribute('aria-hidden') === 'false');
            expect(isAriaHiddenFalse).toBe(true);
        });
    });

    describe('WHEN: the menu button is NOT clicked', () => {
        it('THEN: the navigation menu is hidden', async () => {
            const isMenuNavHidden = await page.$eval('.ons-header-nav-menu', (el) => el.classList.contains('ons-u-d-no'));
            expect(isMenuNavHidden).toBe(true);
        });

        it('THEN: the menu button is marked as not expanded', async () => {
            const menuButtonAriaExpanded = await page.$eval('.ons-btn--menu', (el) => el.getAttribute('aria-expanded'));
            expect(menuButtonAriaExpanded).toBe('false');
        });

        it('THEN: the navigation menu aria-hidden attribute is set to true', async () => {
            const isAriaHiddenTrue = await page.$eval('.ons-header-nav-menu', (el) => el.getAttribute('aria-hidden') === 'true');
            expect(isAriaHiddenTrue).toBe(true);
        });
    });
});
