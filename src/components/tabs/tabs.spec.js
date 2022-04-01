import { _ } from 'core-js';
import puppeteer from 'puppeteer';

import { renderComponent, setTestPage } from '../../tests/helpers/rendering';

const EXAMPLE_TABS = {
  title: 'Example tabs',
  tabs: [
    {
      title: 'Tab 1',
      content: 'First content...',
    },
    {
      title: 'Tab 2',
      content: 'Second content...',
    },
    {
      title: 'Tab 3',
      content: 'Third content...',
    },
  ],
};

describe('script: tabs', () => {
  afterEach(async () => {
    // Clear viewport size and browser emulation after each test.
    await jestPuppeteer.resetPage();
  });

  describe('when the viewport is large', () => {
    beforeEach(async () => {
      await page.setViewport({ width: 1650, height: 1050 });
    });

    it('has the "presentation" role assigned to tab list items', async () => {
      await setTestPage('/test', renderComponent('tabs', EXAMPLE_TABS));

      const role = await page.$eval('.ons-tab__list-item', node => node.getAttribute('role'));
      expect(role).toBe('presentation');
    });

    it('has the "tab" role assigned to each tab', async () => {
      await setTestPage('/test', renderComponent('tabs', EXAMPLE_TABS));

      const tabRoleValues = await page.$$eval('.ons-tab', nodes => nodes.map(node => node.getAttribute('role')));

      expect(tabRoleValues).toEqual(['tab', 'tab', 'tab']);
    });

    it('has "aria-controls" assigned to each tab with the corresponding panel id', async () => {
      await setTestPage('/test', renderComponent('tabs', EXAMPLE_TABS));

      const ariaControlsValues = await page.$$eval('.ons-tab', nodes => nodes.map(node => node.getAttribute('aria-controls')));

      expect(ariaControlsValues).toEqual(['tabId1', 'tabId2', 'tabId3']);
    });

    it('has "aria-selected" assigned to the first tab', async () => {
      await setTestPage('/test', renderComponent('tabs', EXAMPLE_TABS));

      const ariaSelectedValue = await page.$eval('.ons-tab', node => node.getAttribute('aria-selected'));

      expect(ariaSelectedValue).toBe('true');
    });

    it('has the "ons-tab--selected" class assigned to the first tab', async () => {
      await setTestPage('/test', renderComponent('tabs', EXAMPLE_TABS));

      const hasClass = await page.$eval('.ons-tab', node => node.classList.contains('ons-tab--selected'));

      expect(hasClass).toBe(true);
    });

    it('has "tabindex" assigned to each tab', async () => {
      await setTestPage('/test', renderComponent('tabs', EXAMPLE_TABS));

      const tabIndexValues = await page.$$eval('.ons-tab', nodes => nodes.map(node => node.getAttribute('tabindex')));

      expect(tabIndexValues).toEqual(['0', '-1', '-1']);
    });

    it('has only one visible tab panel', async () => {
      await setTestPage('/test', renderComponent('tabs', EXAMPLE_TABS));

      const panelHiddenStates = await page.$$eval('.ons-tabs__panel', nodes =>
        nodes.map(node => node.classList.contains('ons-tabs__panel--hidden')),
      );

      expect(panelHiddenStates).toEqual([false, true, true]);
    });

    describe('when a tab is clicked', () => {
      it('is assigned a "tabindex" value', async () => {
        await setTestPage('/test', renderComponent('tabs', EXAMPLE_TABS));

        await page.focus('#tabId2Item a');
        await page.keyboard.press('Enter');

        const tabIndexValues = await page.$$eval('.ons-tab', nodes => nodes.map(node => node.getAttribute('tabindex')));

        expect(tabIndexValues).toEqual(['-1', '0', '-1']);
      });

      it('has the "aria-selected" attribute', async () => {
        await setTestPage('/test', renderComponent('tabs', EXAMPLE_TABS));

        await page.focus('#tabId2Item a');
        await page.keyboard.press('Enter');

        const ariaSelectedValue = await page.$eval('#tabId2Item a', node => node.getAttribute('aria-selected'));

        expect(ariaSelectedValue).toBe('true');
      });

      it('has the "ons-tab--selected" class assigned', async () => {
        await setTestPage('/test', renderComponent('tabs', EXAMPLE_TABS));

        await page.focus('#tabId2Item a');
        await page.keyboard.press('Enter');

        const hasClass = await page.$eval('#tabId2Item a', node => node.classList.contains('ons-tab--selected'));

        expect(hasClass).toBe(true);
      });

      it('shows the corresponding panel', async () => {
        await setTestPage('/test', renderComponent('tabs', EXAMPLE_TABS));

        await page.focus('#tabId2Item a');
        await page.keyboard.press('Enter');

        const panelHiddenStates = await page.$$eval('.ons-tabs__panel', nodes =>
          nodes.map(node => node.classList.contains('ons-tabs__panel--hidden')),
        );

        expect(panelHiddenStates).toEqual([true, false, true]);
      });
    });

    describe('when the right arrow key is pressed', () => {
      it('focuses the next tab', async () => {
        await setTestPage('/test', renderComponent('tabs', EXAMPLE_TABS));

        await page.focus('#tabId2Item a');
        await page.keyboard.press('ArrowRight');

        const activeElementId = await page.evaluate(() => document.activeElement.parentElement.id);
        expect(activeElementId).toBe('tabId3Item');
      });
    });

    describe('when the left arrow key is pressed', () => {
      it('focuses the previous tab', async () => {
        await setTestPage('/test', renderComponent('tabs', EXAMPLE_TABS));

        await page.focus('#tabId2Item a');
        await page.keyboard.press('ArrowLeft');

        const activeElementId = await page.evaluate(() => document.activeElement.parentElement.id);
        expect(activeElementId).toBe('tabId1Item');
      });
    });
  });

  describe('when the viewport is small', () => {
    beforeEach(async () => {
      await page.emulate(puppeteer.devices['iPhone X']);
    });

    it('has no aria attributes on tabs', async () => {
      await setTestPage('/test', renderComponent('tabs', EXAMPLE_TABS));

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
      await setTestPage('/test', renderComponent('tabs', EXAMPLE_TABS));

      const panelCount = await page.$$eval('.ons-tabs__panel', nodes => nodes.length);
      expect(panelCount).toBe(3);

      const hiddenPanelCount = await page.$$eval('.ons-tabs__panel--hidden', nodes => nodes.length);
      expect(hiddenPanelCount).toBe(0);
    });
  });
});
