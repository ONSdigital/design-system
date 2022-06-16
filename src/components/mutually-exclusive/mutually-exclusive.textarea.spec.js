import { renderComponent, setTestPage } from '../../tests/helpers/rendering';

const SCREEN_READER_TIMEOUT_DELAY = 300;

const EXAMPLE_MUTUALLY_EXCLUSIVE_TEXTAREA_PARAMS = {
  id: 'feedback',
  name: 'feedback',
  width: '30',
  legend: 'What do you think of this service?',
  label: {
    text: 'Enter your feedback',
    description: 'For example describe any difficulties you experienced in the use of this service',
  },
  charCheckLimit: {
    limit: 200,
    charCountSingular: 'You have {x} character remaining',
    charCountPlural: 'You have {x} characters remaining',
  },
  mutuallyExclusive: {
    or: 'Or',
    deselectMessage: 'Selecting this will clear your feedback',
    deselectGroupAdjective: 'cleared',
    deselectExclusiveOptionAdjective: 'deselected',
    exclusiveOptions: [
      {
        id: 'feedback-exclusive-option',
        name: 'no-feedback',
        value: 'no-feedback',
        label: {
          text: 'I dont want to provide feedback',
        },
      },
    ],
  },
};

const FAKE_TEXTAREA_INPUT = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';

describe('script: mutually-exclusive', () => {
  describe('textarea', () => {
    beforeEach(async () => {
      await setTestPage('/test', renderComponent('textarea', EXAMPLE_MUTUALLY_EXCLUSIVE_TEXTAREA_PARAMS));
    });

    describe('Given the user populated the textarea', () => {
      beforeEach(async () => {
        await page.type('#feedback', FAKE_TEXTAREA_INPUT);
      });

      describe('when the user clicks the mutually exclusive option', () => {
        beforeEach(async () => {
          await page.click('#feedback-exclusive-option');
        });

        it('then the mutually exclusive option should be checked', async () => {
          const isChecked = await page.$eval('#feedback-exclusive-option', node => node.checked);
          expect(isChecked).toBe(true);
        });

        it('then the textarea should be cleared', async () => {
          const textareaValue = await page.$eval('#feedback', node => node.value);
          expect(textareaValue).toBe('');
        });

        it('then the characters remaining readout should be reset', async () => {
          const limitText = await page.$eval('#feedback-lim-remaining', node => node.textContent);
          expect(limitText).toBe('You have 200 characters remaining');
        });

        it('then the aria alert should tell the user that the textarea has been cleared', async () => {
          await page.waitForTimeout(SCREEN_READER_TIMEOUT_DELAY);

          const alertText = await page.$eval('.ons-js-exclusive-alert', node => node.textContent);
          expect(alertText).toBe('Enter your feedback cleared.');
        });
      });
    });

    describe('Given the user has checked the mutually exclusive exclusiveOption', () => {
      beforeEach(async () => {
        await page.click('#feedback-exclusive-option');
      });

      describe('when the user populates the textarea', () => {
        beforeEach(async () => {
          await page.type('#feedback', FAKE_TEXTAREA_INPUT);
        });

        it('then the exclusive option should be unchecked', async () => {
          const isChecked = await page.$eval('#feedback-exclusive-option', node => node.checked);
          expect(isChecked).toBe(false);
        });

        it('then the aria alert should tell the user that the exclusive option has been unchecked', async () => {
          await page.waitForTimeout(SCREEN_READER_TIMEOUT_DELAY);

          const alertText = await page.$eval('.ons-js-exclusive-alert', node => node.textContent);
          expect(alertText).toBe('I dont want to provide feedback deselected.');
        });
      });
    });

    describe('Given the user has not populated the textarea or checked the exclusive option', () => {
      describe('when the user populates the textarea', () => {
        beforeEach(async () => {
          await page.type('#feedback', FAKE_TEXTAREA_INPUT);
        });

        it('then the aria alert shouldnt say anything', async () => {
          await page.waitForTimeout(SCREEN_READER_TIMEOUT_DELAY);

          const alertText = await page.$eval('.ons-js-exclusive-alert', node => node.textContent);
          expect(alertText).toBe('');
        });
      });

      describe('when the user clicks the mutually exclusive option', () => {
        beforeEach(async () => {
          await page.click('#feedback-exclusive-option');
        });

        it('then the aria alert shouldnt say anything', async () => {
          await page.waitForTimeout(SCREEN_READER_TIMEOUT_DELAY);

          const alertText = await page.$eval('.ons-js-exclusive-alert', node => node.textContent);
          expect(alertText).toBe('');
        });
      });
    });
  });
});
