import { renderComponent, setTestPage } from '../../tests/helpers/rendering';

const EXAMPLE_COLLAPSIBLE_BASIC = {
  id: 'collapsible-id',
  title: 'Title for collapsible',
  content: 'Content for collapsible',
};

describe('script: collapsible', () => {
  it('begins closed', async () => {
    await setTestPage('/test', renderComponent('collapsible', EXAMPLE_COLLAPSIBLE_BASIC));

    const openItemCount = await page.$$eval('.ons-collapsible--open', elements => elements.length);
    expect(openItemCount).toBe(0);
  });

  it('sets the `role` attribute', async () => {
    await setTestPage('/test', renderComponent('collapsible', EXAMPLE_COLLAPSIBLE_BASIC));

    const role = await page.$eval('.ons-collapsible', element => element.getAttribute('role'));
    expect(role).toBe('group');
  });

  it('adds the correct class', async () => {
    await setTestPage('/test', renderComponent('collapsible', EXAMPLE_COLLAPSIBLE_BASIC));

    const className = await page.$eval('.ons-collapsible', element => element.classList.contains('ons-collapsible--initialised'));
    expect(className).toBe(true);
  });

  it('sets attributes on the heading element', async () => {
    await setTestPage('/test', renderComponent('collapsible', EXAMPLE_COLLAPSIBLE_BASIC));

    const role = await page.$eval('.ons-js-collapsible-heading', element => element.getAttribute('role'));
    const ariaControls = await page.$eval('.ons-js-collapsible-heading', element => element.getAttribute('aria-controls'));
    const tabIndex = await page.$eval('.ons-js-collapsible-heading', element => element.getAttribute('tabindex'));

    expect(role).toBe('link');
    expect(ariaControls).toBe('collapsible-id');
    expect(tabIndex).toBe('0');
  });

  it('sets attributes on the button element', async () => {
    await setTestPage('/test', renderComponent('collapsible', EXAMPLE_COLLAPSIBLE_BASIC));

    const ariaControls = await page.$eval('.ons-js-collapsible-button', element => element.getAttribute('aria-controls'));
    expect(ariaControls).toBe('collapsible-id');
  });

  it('sets the button element to be visible', async () => {
    await setTestPage('/test', renderComponent('collapsible', EXAMPLE_COLLAPSIBLE_BASIC));

    const openClass = await page.$eval('.ons-collapsible', element => element.classList.contains('ons-collapsible--open'));
    expect(openClass).toBe(false);
  });

  it('begins open when specified', async () => {
    await setTestPage(
      '/test',
      renderComponent('collapsible', {
        ...EXAMPLE_COLLAPSIBLE_BASIC,
        open: true,
      }),
    );

    const openClass = await page.$eval('.ons-collapsible', element => element.classList.contains('ons-collapsible--open'));
    expect(openClass).toBe(true);
  });

  describe('when the collapsible heading is clicked to open the collapsible', () => {
    beforeEach(async () => {
      await setTestPage('/test', renderComponent('collapsible', EXAMPLE_COLLAPSIBLE_BASIC));
      await page.click('.ons-js-collapsible-heading');
    });

    it('sets the `open` attribute', async () => {
      const openAttribute = await page.$eval('.ons-js-collapsible', node => node.open !== null);
      expect(openAttribute).toBe(true);
    });

    it('sets the open class', async () => {
      const openClass = await page.$eval('.ons-collapsible', element => element.classList.contains('ons-collapsible--open'));
      expect(openClass).toBe(true);
    });

    it('sets the `aria` attributes', async () => {
      const ariaExpanded = await page.$eval('.ons-js-collapsible-heading', element => element.getAttribute('aria-expanded'));
      const ariaHidden = await page.$eval('.ons-js-collapsible-content', element => element.getAttribute('aria-hidden'));

      expect(ariaExpanded).toBe('true');
      expect(ariaHidden).toBe('false');
    });

    it('sets the `ga` attributes', async () => {
      const gaHeadingAttribute = await page.$eval('.ons-js-collapsible-heading', element => element.getAttribute('data-ga-action'));
      const gaButtonAttribute = await page.$eval('.ons-js-collapsible-button', element => element.getAttribute('data-ga-action'));

      expect(gaHeadingAttribute).toBe('Open panel');
      expect(gaButtonAttribute).toBe('Open panel');
    });
  });

  describe('when the collapsible button is clicked to close the collapsible', () => {
    beforeEach(async () => {
      await setTestPage('/test', renderComponent('collapsible', EXAMPLE_COLLAPSIBLE_BASIC));
      await page.click('.ons-js-collapsible-heading');
      await page.click('.ons-js-collapsible-button');
    });

    it('removes the `open` attribute', async () => {
      const openAttribute = await page.$eval('.ons-js-collapsible', node => node.open === true);
      expect(openAttribute).toBe(false);
    });

    it('removes the open class', async () => {
      const openClass = await page.$eval('.ons-collapsible', element => element.classList.contains('ons-collapsible--open'));
      expect(openClass).toBe(false);
    });

    it('sets the `aria` attributes', async () => {
      const ariaExpanded = await page.$eval('.ons-js-collapsible-heading', element => element.getAttribute('aria-expanded'));
      const ariaHidden = await page.$eval('.ons-js-collapsible-content', element => element.getAttribute('aria-hidden'));

      expect(ariaExpanded).toBe('false');
      expect(ariaHidden).toBe('true');
    });

    it('sets the `ga` attributes', async () => {
      const gaHeadingAttribute = await page.$eval('.ons-js-collapsible-heading', element => element.getAttribute('data-ga-action'));
      const gaButtonAttribute = await page.$eval('.ons-js-collapsible-button', element => element.getAttribute('data-ga-action'));

      expect(gaHeadingAttribute).toBe('Close panel');
      expect(gaButtonAttribute).toBe('Close panel');
    });
  });

  describe('when the collapsible heading is focused', () => {
    beforeEach(async () => {
      await setTestPage('/test', renderComponent('collapsible', EXAMPLE_COLLAPSIBLE_BASIC));
      await page.focus('.ons-js-collapsible-heading');
    });

    describe('when the space bar is pressed', () => {
      beforeEach(async () => {
        await page.keyboard.press('Space');
      });

      it('opens the collapsible content', async () => {
        const openClass = await page.$eval('.ons-collapsible', element => element.classList.contains('ons-collapsible--open'));
        expect(openClass).toBe(true);
      });
    });

    describe('when the Enter key is pressed', () => {
      beforeEach(async () => {
        await page.keyboard.press('Enter');
      });

      it('opens the collapsible content', async () => {
        const openClass = await page.$eval('.ons-collapsible', element => element.classList.contains('ons-collapsible--open'));
        expect(openClass).toBe(true);
      });
    });
  });

  describe('when the state is set to save', () => {
    beforeEach(async () => {
      await setTestPage(
        '/test',
        renderComponent('collapsible', {
          ...EXAMPLE_COLLAPSIBLE_BASIC,
          saveState: true,
        }),
      );
    });

    describe('when the collapsible is opened', () => {
      beforeEach(async () => {
        await page.click('.ons-js-collapsible-heading');
      });

      it('sets state in localStorage', async () => {
        const localStorage = await page.evaluate(() => localStorage.getItem('collapsible-id'));
        expect(localStorage).toBe('true');
      });
    });

    describe('when the collapsible is closed', () => {
      beforeEach(async () => {
        await page.click('.ons-js-collapsible-heading');
      });

      it('removes state in localStorage', async () => {
        const localStorage = await page.evaluate(() => localStorage.getItem('collapsible-id'));
        expect(localStorage).toBe(null);
      });
    });
  });
});
