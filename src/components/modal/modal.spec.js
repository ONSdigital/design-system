import { renderComponent, setTestPage } from '../../tests/helpers/rendering';

const EXAMPLE_MODAL = {
  title: 'Modal title',
  body: 'Modal body text',
  btnText: 'Modal button',
};

describe('script: modal', () => {
  beforeEach(async () => {
    const component = renderComponent('modal', EXAMPLE_MODAL);
    const template = `
      <div class="ons-page">
        <button id="launcher" data-modal-id="dialog">Launcher</button> 
        ${component}
      </div>
  `;
    await setTestPage('/test', template);
  });

  describe('when the modal launcher is clicked', () => {
    beforeEach(async () => {
      await page.focus('#launcher');
      await page.keyboard.press('Enter');
    });

    it('displays the modal', async () => {
      const modalIsVisible = await page.$eval('.ons-modal', node => node.classList.contains('ons-u-db'));
      expect(modalIsVisible).toBe(true);
    });

    it('has the correct body class added', async () => {
      const bodyClassAddition = await page.$eval('body', node => node.classList.contains('ons-modal-overlay'));
      expect(bodyClassAddition).toBe(true);
    });

    describe('when the modal close button is clicked', () => {
      beforeEach(async () => {
        await page.focus('.ons-js-modal-btn');
        await page.keyboard.press('Enter');
      });

      it('hides the modal', async () => {
        const modalIsVisible = await page.$eval('.ons-modal', node => node.classList.contains('ons-u-db'));
        expect(modalIsVisible).toBe(false);
      });

      it('has the body class removed', async () => {
        const bodyClassAddition = await page.$eval('body', node => node.classList.contains('ons-modal-overlay'));
        expect(bodyClassAddition).toBe(false);
      });

      it('focuses the last active element', async () => {
        const activeElementId = await page.evaluate(() => document.activeElement.id);
        expect(activeElementId).toBe('launcher');
      });
    });

    describe('when the `esc` key is pressed', () => {
      beforeEach(async () => {
        await page.focus('.ons-js-modal-btn');
        await page.keyboard.press('Enter');
        await page.keyboard.press('Escape');
      });

      it('closes the modal', async () => {
        const modalIsVisible = await page.$eval('.ons-modal', node => node.classList.contains('ons-u-db'));
        expect(modalIsVisible).toBe(false);
      });
    });
  });
});
