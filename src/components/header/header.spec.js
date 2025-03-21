import { renderComponent, setTestPage } from '../../tests/helpers/rendering';
import { EXAMPLE_HEADER_SEARCH_AND_MENU_LINKS } from './_test-examples';
import { getNodeAttributes } from '../../tests/helpers/puppeteer';

describe('script: header', () => {
    beforeEach(async () => {
        await setTestPage('/test', renderComponent('header', { ...EXAMPLE_HEADER_SEARCH_AND_MENU_LINKS, variants: 'basic' }));
    });

    describe('WHEN: the search button is clicked', () => {
        beforeEach(async () => {
            await page.click('.ons-js-toggle-header-search');
        });

        it('THEN: the search input form is visible and does not have the ons-u-d-no class', async () => {
            await page.waitForSelector('.ons-header-nav-search');
            const isSearchNavVisible = await page.$eval('.ons-header-nav-search', (el) => !el.classList.contains('ons-u-d-no'));
            expect(isSearchNavVisible).toBe(true);
        });

        it('THEN: the button switches to the close icon', async () => {
            const hasCloseIcon = await page.$eval('.ons-js-toggle-header-search svg', (el) => el.classList.contains('ons-icon--close'));
            expect(hasCloseIcon).toBe(true);
        });

        it('THEN: the button has aria-expanded="true"', async () => {
            const attributes = await getNodeAttributes(page, '.ons-js-toggle-header-search');
            expect(attributes['aria-expanded']).toBe('true');
        });

        it('THEN: the button has aria-hidden="false"', async () => {
            const attributes = await getNodeAttributes(page, '.ons-js-header-search');
            expect(attributes['aria-hidden']).toBe('false');
        });

        it('THEN: the search field has full width', async () => {
            await page.waitForSelector('.ons-header-nav-search__input .ons-input');
            const isFullWidth = await page.$eval('.ons-header-nav-search__input .ons-input', (el) =>
                el.classList.contains('ons-input--w-full'),
            );
            expect(isFullWidth).toBe(true);
        });
    });

    describe('WHEN: the search button is not clicked', () => {
        it('THEN: the search form is hidden', async () => {
            const isSearchNavHidden = await page.$eval('.ons-header-nav-search', (el) => el.classList.contains('ons-u-d-no'));
            expect(isSearchNavHidden).toBe(true);
        });

        it('THEN: the button displays the search icon', async () => {
            const hasSearchIcon = await page.$eval('.ons-js-toggle-header-search svg', (el) => el.classList.contains('ons-icon--search'));
            expect(hasSearchIcon).toBe(true);
        });

        it('THEN: the button has aria-expanded="false"', async () => {
            const attributes = await getNodeAttributes(page, '.ons-js-toggle-header-search');
            expect(attributes['aria-expanded']).toBe('false');
        });

        it('THEN: the button has aria-hidden="true"', async () => {
            const attributes = await getNodeAttributes(page, '.ons-js-header-search');
            expect(attributes['aria-hidden']).toBe('true');
        });
    });

    describe('WHEN: the search button is clicked again (to close)', () => {
        beforeEach(async () => {
            await page.click('.ons-js-toggle-header-search'); // Open
            await page.waitForSelector('.ons-header-nav-search');
            await page.click('.ons-js-toggle-header-search'); // Close
        });

        it('THEN: the search form is hidden', async () => {
            const isSearchNavHidden = await page.$eval('.ons-header-nav-search', (el) => el.classList.contains('ons-u-d-no'));
            expect(isSearchNavHidden).toBe(true);
        });

        it('THEN: the button switches back to the search icon', async () => {
            const hasSearchIcon = await page.$eval('.ons-js-toggle-header-search svg', (el) => el.classList.contains('ons-icon--search'));
            expect(hasSearchIcon).toBe(true);
        });

        it('THEN: the button has aria-expanded="false"', async () => {
            const attributes = await getNodeAttributes(page, '.ons-js-toggle-header-search');
            expect(attributes['aria-expanded']).toBe('false');
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

    describe('WHEN: the menu button is not clicked', () => {
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
