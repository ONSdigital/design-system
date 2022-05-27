import { renderComponent, setTestPage } from '../../tests/helpers/rendering';

describe('script: textarea', () => {
  describe('character limit', () => {
    beforeEach(async () => {
      await setTestPage(
        '/test',
        renderComponent('textarea', {
          id: 'example-textarea',
          name: 'feedback-limited',
          width: '30',
          label: {
            text: 'Please provide some feedback',
            description: 'For example describe any difficulties you experienced in the use of this service',
          },
          charCheckLimit: {
            limit: 50,
            charCountSingular: 'You have {x} character remaining',
            charCountPlural: 'You have {x} characters remaining',
          },
        }),
      );
    });

    describe('Given that the char limit helper has initialised correctly', () => {
      it('the char limit readout should be visible', async () => {
        const hasClass = await page.$eval('#example-textarea-lim-remaining', node => node.classList.contains('ons-u-d-no'));
        expect(hasClass).toBe(false);
      });
    });

    describe('Given that the user has not typed into the textarea', () => {
      describe('when the user types into the textarea', () => {
        beforeEach(async () => {
          await page.type('#example-textarea', 'Lorem ipsum dolor.\nMorbi rhoncus amet.');
        });

        it('then the characters remaining readout reflect the number of characters remaining', async () => {
          const readout = await page.$eval('#example-textarea-lim-remaining', node => node.textContent);
          expect(readout).toBe('You have 12 characters remaining');
        });
      });

      describe('when the user reaches/exceeds the maxlength of the textarea', () => {
        beforeEach(async () => {
          await page.type('#example-textarea', 'Lorem ipsum dolor sit amet, consectetur porttitor.');
        });

        it('then the characters remaining readout reflect the number of characters remaining', async () => {
          const readout = await page.$eval('#example-textarea-lim-remaining', node => node.textContent);
          expect(readout).toBe('You have 0 characters remaining');
        });

        it('then the textarea should be given limit reached classes', async () => {
          const hasClass = await page.$eval('#example-textarea', node => node.classList.contains('ons-input--limit-reached'));
          expect(hasClass).toBe(true);
        });

        it('then the readout should be given limit reached classes', async () => {
          const hasClass = await page.$eval('#example-textarea-lim-remaining', node =>
            node.classList.contains('ons-input__limit--reached'),
          );
          expect(hasClass).toBe(true);
        });
      });
    });

    describe('Given that the user has reached/exceeded the maxlength of the textarea', () => {
      beforeEach(async () => {
        await page.type('#example-textarea', 'Lorem ipsum dolor sit amet, consectetur porttitor.');
      });

      describe('when the user removes a character', () => {
        beforeEach(async () => {
          await page.focus('#example-textarea');
          await page.keyboard.press('Backspace');
        });

        it('then the characters remaining readout reflect the number of characters remaining', async () => {
          const readout = await page.$eval('#example-textarea-lim-remaining', node => node.textContent);
          expect(readout).toBe('You have 1 character remaining');
        });

        it('then the textarea should not be given limit reached classes', async () => {
          const hasClass = await page.$eval('#example-textarea', node => node.classList.contains('ons-input--limit-reached'));
          expect(hasClass).toBe(false);
        });

        it('then the readout should not be given limit reached classes', async () => {
          const hasClass = await page.$eval('#example-textarea-lim-remaining', node =>
            node.classList.contains('ons-input__limit--reached'),
          );
          expect(hasClass).toBe(false);
        });
      });
    });
  });
});
