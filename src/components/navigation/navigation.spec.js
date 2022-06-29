import { setViewport } from '../../tests/helpers/puppeteer';
import { renderComponent, setTestPage } from '../../tests/helpers/rendering';

const EXAMPLE_NAVIGATION = {
  navigation: {
    id: 'main-nav',
    ariaLabel: 'Main menu',
    currentPath: '#0',
    itemsList: [
      {
        title: 'Main nav item 1',
        url: '#0',
        classes: 'custom-class-main-item-1',
        id: 'main-item-1',
      },
      {
        title: 'Main nav item 2',
        url: '#1',
        classes: 'custom-class-main-item-2',
        id: 'main-item-2',
      },
    ],
    toggleNavigationButton: {
      text: 'Menu',
      ariaLabel: 'Toggle main navigation',
    },
  },
};

const EXAMPLE_NAVIGATION_WITH_SUBNAVIGATION = {
  navigation: {
    id: 'main-nav',
    ariaLabel: 'Main menu',
    currentPath: '#1',
    currentPageTitle: 'Main nav item 2',
    itemsList: [
      {
        title: 'Main nav item 1',
        url: '#0',
        classes: 'custom-class-main-item-1',
        id: 'main-item-1',
      },
      {
        title: 'Main nav item 2',
        url: '#1',
        classes: 'custom-class-main-item-2',
        id: 'main-item-2',
      },
    ],
    subNavigation: {
      id: 'sub-nav',
      overviewURL: '#overview',
      overviewText: 'Overview',
      ariaLabel: 'Section menu',
      currentPath: '#1',
      itemsList: [
        {
          title: 'Sub nav item 1',
          url: '#0',
          classes: 'custom-class-sub-item-1',
          id: 'sub-item-1',
        },
        {
          title: 'Sub nav item 2',
          url: '#1',
          classes: 'custom-class-sub-item-2',
          id: 'sub-item-2',
          sections: [
            {
              sectionTitle: 'Section 1',
              children: [
                {
                  title: 'Child item 1',
                  url: '#0',
                },
                {
                  title: 'Child item 2',
                  url: '#1',
                },
              ],
            },
          ],
        },
      ],
    },
  },
};

describe('script: navigation', () => {
  afterEach(async () => {
    // Clear viewport size and browser emulation after each test.
    await jestPuppeteer.resetPage();
  });

  describe.each([
    ['main', EXAMPLE_NAVIGATION, '.ons-navigation--main', '.ons-js-navigation-button', false],
    ['sub', EXAMPLE_NAVIGATION_WITH_SUBNAVIGATION, '.ons-navigation--sub-mobile', '.ons-js-sub-navigation-button', true],
  ])('level: %s navigation', (_, params, navEl, buttonEl, ariaStatus) => {
    describe('when the component initialises', () => {
      beforeEach(async () => {
        await setTestPage('/test', renderComponent('header', params));
      });

      it('has removed the display class from the menu toggle button', async () => {
        const hasClass = await page.$eval(buttonEl, node => node.classList.contains('ons-u-d-no'));
        expect(hasClass).toBe(false);
      });
    });

    describe('when the viewport is large', () => {
      beforeEach(async () => {
        await setViewport(page, { width: 1650, height: 1050 });
        await setTestPage('/test', renderComponent('header', params));
      });

      it('has the correct aria hidden attribute on the navigation list', async () => {
        const nav = await page.$(navEl);
        const hasAriaAttribute = await nav.evaluate(node => node.getAttribute('aria-hidden') !== null);
        expect(hasAriaAttribute).toBe(ariaStatus);
      });

      it('has aria-expanded set as `false` on the navigation toggle button', async () => {
        const button = await page.$(buttonEl);
        const ariaExpandedIsFalse = await button.evaluate(node => node.getAttribute('aria-expanded') === 'false');
        expect(ariaExpandedIsFalse).toBe(true);
      });
    });

    describe('when the viewport is small', () => {
      beforeEach(async () => {
        await setViewport(page, { width: 600, height: 1050 });
        await setTestPage('/test', renderComponent('header', params));
      });

      it('has aria-hidden set as `true` on the navigation list', async () => {
        const nav = await page.$(navEl);
        const hasAriaAttribute = await nav.evaluate(node => node.getAttribute('aria-hidden') === 'true');
        expect(hasAriaAttribute).toBe(true);
      });

      describe('when the toggle button is clicked to open the navigation list', () => {
        beforeEach(async () => {
          await page.focus(buttonEl);
          await page.keyboard.press('Enter');
        });

        it('has aria-hidden set as `false` on the navigation list', async () => {
          const nav = await page.$(navEl);
          const hasAriaAttribute = await nav.evaluate(node => node.getAttribute('aria-hidden') === 'false');
          expect(hasAriaAttribute).toBe(true);
        });

        it('has the hide class removed from the navigation list', async () => {
          const hasClass = await page.$eval(navEl, node =>
            node.classList.contains('ons-u-d-no@xxs@l' || 'ons-u-d-no' || 'ons-u-d-no@xs@l'),
          );
          expect(hasClass).toBe(false);
        });

        it('has aria-expanded set as `true` on the navigation toggle button', async () => {
          const button = await page.$(buttonEl);
          const ariaExpandedIsTrue = await button.evaluate(node => node.getAttribute('aria-expanded') === 'true');
          expect(ariaExpandedIsTrue).toBe(true);
        });

        it('has the correct class applied to the navigation toggle button', async () => {
          const hasClass = await page.$eval(buttonEl, node => node.classList.contains('active'));
          expect(hasClass).toBe(true);
        });
      });

      describe('when the toggle button is clicked to close the navigation list', () => {
        beforeEach(async () => {
          await page.focus(buttonEl);
          await page.keyboard.press('Enter');
          await page.waitForTimeout(100);
          await page.keyboard.press('Enter');
          await page.waitForTimeout(100);
        });

        it('has aria-hidden set as `true` on the navigation list', async () => {
          const nav = await page.$(navEl);
          const hasAriaAttribute = await nav.evaluate(node => node.getAttribute('aria-hidden') === 'true');
          expect(hasAriaAttribute).toBe(true);
        });

        it('has aria-expanded set as `false` on the navigation toggle button', async () => {
          const button = await page.$(buttonEl);
          const ariaExpandedIsTrue = await button.evaluate(node => node.getAttribute('aria-expanded') === 'false');
          expect(ariaExpandedIsTrue).toBe(true);
        });

        it('has the active class removed from the navigation toggle button', async () => {
          const hasClass = await page.$eval(buttonEl, node => node.classList.contains('active'));
          expect(hasClass).toBe(false);
        });
      });
    });
  });

  describe.each([['main', EXAMPLE_NAVIGATION, '.ons-navigation--main', '.ons-js-navigation-button']])(
    'level: %s navigation',
    (_, params, navEl, buttonEl) => {
      describe('when the viewport is small and manually made wider', () => {
        beforeEach(async () => {
          await setViewport(page, { width: 600, height: 1050 });
          await setTestPage('/test', renderComponent('header', params));
          await setViewport(page, { width: 1200, height: 1050 });
        });

        it('has the aria-hidden attribute removed from the navigation list', async () => {
          const nav = await page.$(navEl);
          const hasAriaAttribute = await nav.evaluate(node => node.getAttribute('aria-hidden') !== null);
          expect(hasAriaAttribute).toBe(false);
        });

        it('has aria-expanded removed from the navigation toggle button', async () => {
          const button = await page.$(buttonEl);
          const hasAriaExpanded = await button.evaluate(node => node.getAttribute('aria-expanded') !== null);
          expect(hasAriaExpanded).toBe(false);
        });

        it('has the hide class removed from the navigation list', async () => {
          const hasClass = await page.$eval(navEl, node =>
            node.classList.contains('ons-u-d-no@xxs@l' || 'ons-u-d-no' || 'ons-u-d-no@xs@l'),
          );
          expect(hasClass).toBe(false);
        });
      });
    },
  );
});
