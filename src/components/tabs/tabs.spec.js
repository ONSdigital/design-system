import puppeteer from 'puppeteer';

import { setViewport } from '../../tests/helpers/puppeteer';
import { renderComponent, setTestPage } from '../../tests/helpers/rendering';

const EXAMPLE_TABS = {
  title: 'Example tabs',
  tabs: [
    {
      id: 'tab.id.1',
      title: 'Tab 1',
      content: 'First content...',
    },
    {
      id: 'tab.id.2',
      title: 'Tab 2',
      content: 'Second content...',
    },
    {
      id: 'tab.id.3',
      title: 'Tab 3',
      content: 'Third content...',
    },
  ],
};

const EXAMPLE_TABS_WITH_NO_INITIAL_ACTIVE_TAB = {
  ...EXAMPLE_TABS,
  noInitialActiveTab: true,
};

describe('script: tabs', () => {
  afterEach(async () => {
    // Clear viewport size and browser emulation after each test.
    await jestPuppeteer.resetPage();
  });

  describe('when the viewport is large', () => {
    beforeEach(async () => {
      await setViewport(page, { width: 1650, height: 1050 });
      await setTestPage('/test', renderComponent('tabs', EXAMPLE_TABS));
    });

    it('has the "presentation" role assigned to tab list items', async () => {
      const role = await page.$eval('.ons-tab__list-item', node => node.getAttribute('role'));
      expect(role).toBe('presentation');
    });

    it('has the "tab" role assigned to each tab', async () => {
      const tabRoleValues = await page.$$eval('.ons-tab', nodes => nodes.map(node => node.getAttribute('role')));

      expect(tabRoleValues).toEqual(['tab', 'tab', 'tab']);
    });

    it('has "aria-controls" assigned to each tab with the corresponding panel id', async () => {
      const ariaControlsValues = await page.$$eval('.ons-tab', nodes => nodes.map(node => node.getAttribute('aria-controls')));

      expect(ariaControlsValues).toEqual(['tab.id.1', 'tab.id.2', 'tab.id.3']);
    });

    it('has "aria-selected" assigned to the first tab', async () => {
      const ariaSelectedValue = await page.$eval('.ons-tab', node => node.getAttribute('aria-selected'));

      expect(ariaSelectedValue).toBe('true');
    });

    it('has the "ons-tab--selected" class assigned to the first tab', async () => {
      const hasClass = await page.$eval('.ons-tab', node => node.classList.contains('ons-tab--selected'));

      expect(hasClass).toBe(true);
    });

    it('has "tabindex" assigned to each tab', async () => {
      const tabIndexValues = await page.$$eval('.ons-tab', nodes => nodes.map(node => node.getAttribute('tabindex')));

      expect(tabIndexValues).toEqual(['0', '-1', '-1']);
    });

    it('has only one visible tab panel', async () => {
      const panelHiddenStates = await page.$$eval('.ons-tabs__panel', nodes =>
        nodes.map(node => node.classList.contains('ons-tabs__panel--hidden')),
      );

      expect(panelHiddenStates).toEqual([false, true, true]);
    });

    describe('when a tab is clicked', () => {
      beforeEach(async () => {
        await page.focus('a[href="#tab.id.2"]');
        await page.keyboard.press('Enter');
      });

      it('is assigned a "tabindex" value', async () => {
        const tabIndexValues = await page.$$eval('.ons-tab', nodes => nodes.map(node => node.getAttribute('tabindex')));

        expect(tabIndexValues).toEqual(['-1', '0', '-1']);
      });

      it('has the "aria-selected" attribute', async () => {
        const ariaSelectedValue = await page.$eval('a[href="#tab.id.2"]', node => node.getAttribute('aria-selected'));

        expect(ariaSelectedValue).toBe('true');
      });

      it('has the "ons-tab--selected" class assigned', async () => {
        const hasClass = await page.$eval('a[href="#tab.id.2"]', node => node.classList.contains('ons-tab--selected'));

        expect(hasClass).toBe(true);
      });

      it('shows the corresponding panel', async () => {
        const panelHiddenStates = await page.$$eval('.ons-tabs__panel', nodes =>
          nodes.map(node => node.classList.contains('ons-tabs__panel--hidden')),
        );

        expect(panelHiddenStates).toEqual([true, false, true]);
      });
    });

    describe('when the right arrow key is pressed', () => {
      it('focuses the next tab', async () => {
        await page.focus('a[href="#tab.id.2"]');
        await page.keyboard.press('ArrowRight');

        const activeElement = await page.evaluate(() => document.activeElement.innerText);
        expect(activeElement).toBe('Tab 3');
      });
    });

    describe('when the left arrow key is pressed', () => {
      it('focuses the previous tab', async () => {
        await page.focus('a[href="#tab.id.2"]');
        await page.keyboard.press('ArrowLeft');

        const activeElement = await page.evaluate(() => document.activeElement.innerText);
        expect(activeElement).toBe('Tab 1');
      });
    });
  });

  describe('when a hash for a tab is in the url', () => {
    beforeEach(async () => {
      await setViewport(page, { width: 1650, height: 1050 });
      await setTestPage('/test#tab.id.2', renderComponent('tabs', EXAMPLE_TABS));
    });

    it('is assigned a "tabindex" value', async () => {
      const tabIndexValues = await page.$$eval('.ons-tab', nodes => nodes.map(node => node.getAttribute('tabindex')));

      expect(tabIndexValues).toEqual(['-1', '0', '-1']);
    });

    it('has the "aria-selected" attribute', async () => {
      const ariaSelectedValue = await page.$eval('a[href="#tab.id.2"]', node => node.getAttribute('aria-selected'));

      expect(ariaSelectedValue).toBe('true');
    });

    it('has the "ons-tab--selected" class assigned', async () => {
      const hasClass = await page.$eval('a[href="#tab.id.2"]', node => node.classList.contains('ons-tab--selected'));

      expect(hasClass).toBe(true);
    });

    it('shows the corresponding panel', async () => {
      const panelHiddenStates = await page.$$eval('.ons-tabs__panel', nodes =>
        nodes.map(node => node.classList.contains('ons-tabs__panel--hidden')),
      );

      expect(panelHiddenStates).toEqual([true, false, true]);
    });
  });

  describe('when the viewport is small', () => {
    beforeEach(async () => {
      await page.emulate(puppeteer.devices['iPhone X']);

      await setTestPage('/test', renderComponent('tabs', EXAMPLE_TABS));
    });

    it('has no aria attributes on tabs', async () => {
      const tabElements = await page.$$('.ons-tab');
      for (let i = 0; i < 3; ++i) {
        const hasRoleAttribute = await tabElements[i].evaluate(node => node.getAttribute('role') !== null);
        expect(hasRoleAttribute).toBe(false);

        const hasAriaControlsAttribute = await tabElements[i].evaluate(node => node.getAttribute('aria-controls') !== null);
        expect(hasAriaControlsAttribute).toBe(false);

        const hasAriaSelectedAttribute = await tabElements[i].evaluate(node => node.getAttribute('aria-selected') !== null);
        expect(hasAriaSelectedAttribute).toBe(false);
      }
    });

    it('has no hidden tab panels', async () => {
      const panelCount = await page.$$eval('.ons-tabs__panel', nodes => nodes.length);
      expect(panelCount).toBe(3);

      const hiddenPanelCount = await page.$$eval('.ons-tabs__panel--hidden', nodes => nodes.length);
      expect(hiddenPanelCount).toBe(0);
    });
  });

  describe('when `data-no-initial-active-tab` is present', () => {
    beforeEach(async () => {
      await setViewport(page, { width: 1650, height: 1050 });
      await setTestPage('/test', renderComponent('tabs', EXAMPLE_TABS_WITH_NO_INITIAL_ACTIVE_TAB));
    });

    it('does not assign "aria-selected" to the first tab', async () => {
      const ariaSelectedValue = await page.$eval('.ons-tab', node => node.getAttribute('aria-selected'));

      expect(ariaSelectedValue).not.toBe('true');
    });

    it('does not assign the "ons-tab--selected" class to the first tab', async () => {
      const hasClass = await page.$eval('.ons-tab', node => node.classList.contains('ons-tab--selected'));

      expect(hasClass).toBe(false);
    });

    describe('when a tab is clicked', () => {
      beforeEach(async () => {
        await page.focus('a[href="#tab.id.1"]');
        await page.keyboard.press('Enter');
      });

      it('is assigned a "tabindex" value', async () => {
        const tabIndexValues = await page.$$eval('.ons-tab', nodes => nodes.map(node => node.getAttribute('tabindex')));

        expect(tabIndexValues).toEqual(['0', '-1', '-1']);
      });

      it('has the "aria-selected" attribute', async () => {
        const ariaSelectedValue = await page.$eval('a[href="#tab.id.1"]', node => node.getAttribute('aria-selected'));

        expect(ariaSelectedValue).toBe('true');
      });

      it('has the "ons-tab--selected" class assigned', async () => {
        const hasClass = await page.$eval('a[href="#tab.id.1"]', node => node.classList.contains('ons-tab--selected'));

        expect(hasClass).toBe(true);
      });

      it('shows the corresponding panel', async () => {
        const panelHiddenStates = await page.$$eval('.ons-tabs__panel', nodes =>
          nodes.map(node => node.classList.contains('ons-tabs__panel--hidden')),
        );

        expect(panelHiddenStates).toEqual([false, true, true]);
      });
    });

    describe('when a tab is clicked twice', () => {
      beforeEach(async () => {
        await page.focus('a[href="#tab.id.2"]');
        await page.keyboard.press('Enter');
        await page.keyboard.press('Enter');
      });

      it('is assigned a "tabindex" value', async () => {
        const tabIndexValues = await page.$$eval('.ons-tab', nodes => nodes.map(node => node.getAttribute('tabindex')));

        expect(tabIndexValues).toEqual(['0', '-1', '-1']);
      });

      it('does not have the "aria-selected" attribute', async () => {
        const ariaSelectedValue = await page.$eval('a[href="#tab.id.2"]', node => node.getAttribute('aria-selected'));

        expect(ariaSelectedValue).not.toBe('true');
      });

      it('does not have the "ons-tab--selected" class assigned', async () => {
        const hasClass = await page.$eval('a[href="#tab.id.2"]', node => node.classList.contains('ons-tab--selected'));

        expect(hasClass).toBe(false);
      });

      it('hides the corresponding panel', async () => {
        const panelHiddenStates = await page.$$eval('.ons-tabs__panel', nodes =>
          nodes.map(node => node.classList.contains('ons-tabs__panel--hidden')),
        );

        expect(panelHiddenStates).toEqual([true, true, true]);
      });
    });
  });

  describe('when a hash for a tab is in the url and `data-no-initial-active-tab` is present', () => {
    beforeEach(async () => {
      await setViewport(page, { width: 1650, height: 1050 });
      await setTestPage('/test#tab.id.2', renderComponent('tabs', EXAMPLE_TABS_WITH_NO_INITIAL_ACTIVE_TAB));
    });

    it('is assigned a "tabindex" value', async () => {
      const tabIndexValues = await page.$$eval('.ons-tab', nodes => nodes.map(node => node.getAttribute('tabindex')));

      expect(tabIndexValues).toEqual(['-1', '0', '-1']);
    });

    it('has the "aria-selected" attribute', async () => {
      const ariaSelectedValue = await page.$eval('a[href="#tab.id.2"]', node => node.getAttribute('aria-selected'));

      expect(ariaSelectedValue).toBe('true');
    });

    it('has the "ons-tab--selected" class assigned', async () => {
      const hasClass = await page.$eval('a[href="#tab.id.2"]', node => node.classList.contains('ons-tab--selected'));

      expect(hasClass).toBe(true);
    });

    it('shows the corresponding panel', async () => {
      const panelHiddenStates = await page.$$eval('.ons-tabs__panel', nodes =>
        nodes.map(node => node.classList.contains('ons-tabs__panel--hidden')),
      );

      expect(panelHiddenStates).toEqual([true, false, true]);
    });
  });
});
