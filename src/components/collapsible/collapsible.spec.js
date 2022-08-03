import { renderComponent, setTestPage } from '../../tests/helpers/rendering';

const EXAMPLE_COLLAPSIBLE_BASIC = {
  id: 'collapsible-id',
  title: 'Title for collapsible',
  content: 'Content for collapsible',
};

describe('script: collapsible', () => {
  it('begins open when specified', async () => {
    await setTestPage(
      '/test',
      renderComponent('collapsible', {
        ...EXAMPLE_COLLAPSIBLE_BASIC,
        open: true,
      }),
    );

    const openAttribute = await page.$eval('.ons-js-collapsible', node => node.open !== null);
    expect(openAttribute).toBe(true);
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

    it('sets the `ga` attributes', async () => {
      const gaHeadingAttribute = await page.$eval('.ons-js-collapsible-heading', element => element.getAttribute('data-ga-action'));

      expect(gaHeadingAttribute).toBe('Open panel');
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
        const openAttribute = await page.$eval('.ons-js-collapsible', node => node.open !== null);
        expect(openAttribute).toBe(true);
      });
    });

    describe('when the Enter key is pressed', () => {
      beforeEach(async () => {
        await page.keyboard.press('Enter');
      });

      it('opens the collapsible content', async () => {
        const openAttribute = await page.$eval('.ons-js-collapsible', node => node.open !== null);
        expect(openAttribute).toBe(true);
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
