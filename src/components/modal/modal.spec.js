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

  describe('when GA tracking is enabled', () => {
    beforeEach(async () => {
      const component = renderComponent('modal', { ...EXAMPLE_MODAL, enableGA: true });
      const template = `
        <div class="ons-page">
          <button id="launcher" data-modal-id="dialog">Launcher</button> 
          ${component}
        </div>
    `;
      await setTestPage('/test', template);
    });

    describe('when the page has been loaded but the modal has not been opened yet', () => {
      it('has the correct attributes set on the modal', async () => {
        const gaLabel = await page.$eval('.ons-modal', node => node.getAttribute('data-ga-label'));
        const gaAction = await page.$eval('.ons-modal', node => node.getAttribute('data-ga-action'));
        const gaCategory = await page.$eval('.ons-modal', node => node.getAttribute('data-ga-category'));
        expect(gaLabel).toBe('Generic modal initialised');
        expect(gaAction).toBe('Modal initialised');
        expect(gaCategory).toBe('Generic modal');
      });
    });

    describe('when the modal is launched by a click event', () => {
      beforeEach(async () => {
        await page.focus('#launcher');
        await page.keyboard.press('Enter');
      });

      it('has the correct attributes set on the modal', async () => {
        const gaLabel = await page.$eval('.ons-modal', node => node.getAttribute('data-ga-label'));
        const gaAction = await page.$eval('.ons-modal', node => node.getAttribute('data-ga-action'));
        const gaCategory = await page.$eval('.ons-modal', node => node.getAttribute('data-ga-category'));
        expect(gaLabel).toBe('Generic modal opened');
        expect(gaAction).toBe('Modal opened by click event');
        expect(gaCategory).toBe('Generic modal');
      });
    });

    describe('when the modal is closed by a click event', () => {
      beforeEach(async () => {
        await page.focus('#launcher');
        await page.keyboard.press('Enter');
        await page.click('.ons-js-modal-btn');
      });

      it('has the correct attributes set on the modal', async () => {
        const gaLabel = await page.$eval('.ons-modal', node => node.getAttribute('data-ga-label'));
        const gaAction = await page.$eval('.ons-modal', node => node.getAttribute('data-ga-action'));
        const gaCategory = await page.$eval('.ons-modal', node => node.getAttribute('data-ga-category'));
        expect(gaLabel).toBe('Generic modal closed');
        expect(gaAction).toBe('Modal closed by click event');
        expect(gaCategory).toBe('Generic modal');
      });
    });

    describe('when the modal is closed by `escape` keypress event', () => {
      beforeEach(async () => {
        await page.focus('#launcher');
        await page.keyboard.press('Enter');
        await page.keyboard.press('Escape');
      });

      it('has the correct attributes set on the modal', async () => {
        const gaLabel = await page.$eval('.ons-modal', node => node.getAttribute('data-ga-label'));
        const gaAction = await page.$eval('.ons-modal', node => node.getAttribute('data-ga-action'));
        const gaCategory = await page.$eval('.ons-modal', node => node.getAttribute('data-ga-category'));
        expect(gaLabel).toBe('Generic modal closed');
        expect(gaAction).toBe('Modal closed by keydown event');
        expect(gaCategory).toBe('Generic modal');
      });
    });
  });
});
