import { renderComponent, setTestPage } from '../../tests/helpers/rendering';

const EXAMPLE_REPLY = {
  textarea: {
    id: 'reply-textarea',
    name: 'reply',
    label: {
      text: 'Reply',
    },
  },
  button: {
    id: 'reply-button',
    type: 'button',
    text: 'Send message',
    classes: 'u-mb-xs',
  },
  closeLinkText: 'Close conversation',
  closeLinkUrl: '/close-conversation',
};

describe('script: reply', () => {
  describe('scenario: Empty textarea', () => {
    it('the button is disabled', async () => {
      await setTestPage('/test', renderComponent('reply', EXAMPLE_REPLY));

      const disabledButton = await page.evaluate(() => document.querySelector('#reply-button').disabled);
      expect(disabledButton).toBe(true);
    });

    it('the button has classes applied', async () => {
      await setTestPage('/test', renderComponent('reply', EXAMPLE_REPLY));
      const disabledButton = await page.$eval('#reply-button', element => element.classList.contains('ons-btn--disabled'));
      expect(disabledButton).toBe(true);
    });
  });

  describe('scenario: Filled textarea', () => {
    it('the button is enabled', async () => {
      await setTestPage('/test', renderComponent('reply', EXAMPLE_REPLY));
      await page.focus('#reply-textarea');
      await page.keyboard.type('Sausages');

      const disabledButton = await page.evaluate(() => document.querySelector('#reply-button').disabled);
      expect(disabledButton).toBe(false);
    });

    it('the button has classes removed', async () => {
      await setTestPage('/test', renderComponent('reply', EXAMPLE_REPLY));
      await page.focus('#reply-textarea');
      await page.keyboard.type('Sausages');

      const disabledButton = await page.$eval('#reply-button', element => element.classList.contains('ons-btn--disabled'));
      expect(disabledButton).toBe(false);
    });
  });

  describe('scenario: Filled then emptied textarea', () => {
    it('the button is disabled', async () => {
      await setTestPage('/test', renderComponent('reply', EXAMPLE_REPLY));
      await page.focus('#reply-textarea');
      await page.keyboard.type('s');
      await page.keyboard.press('Backspace');

      const disabledButton = await page.evaluate(() => document.querySelector('#reply-button').disabled);
      expect(disabledButton).toBe(true);
    });

    it('the button has classes applied', async () => {
      await setTestPage('/test', renderComponent('reply', EXAMPLE_REPLY));
      await page.focus('#reply-textarea');
      await page.keyboard.type('s');
      await page.keyboard.press('Backspace');

      const disabledButton = await page.$eval('#reply-button', element => element.classList.contains('ons-btn--disabled'));
      expect(disabledButton).toBe(true);
    });
  });
});
