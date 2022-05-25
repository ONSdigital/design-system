import { renderComponent, setTestPage } from '../../tests/helpers/rendering';

const SCREEN_READER_TIMEOUT_DELAY = 300;

const EXAMPLE_MUTUALLY_EXCLUSIVE_EMAIL_INPUT_PARAMS = {
  id: 'email',
  type: 'email',
  legend: 'Get a confirmation email',
  label: {
    text: 'Enter an email',
  },
  mutuallyExclusive: {
    or: 'Or',
    deselectMessage: 'Selecting this will clear your email',
    deselectGroupAdjective: 'cleared',
    deselectExclusiveOptionAdjective: 'deselected',
    exclusiveOptions: [
      {
        id: 'email-exclusive-option',
        name: 'no-email',
        value: 'no-email',
        label: {
          text: 'I dont want to receive a confirmation email',
        },
      },
    ],
  },
};

describe('script: mutually-exclusive', () => {
  describe('email input', () => {
    beforeEach(async () => {
      await setTestPage('/test', renderComponent('input', EXAMPLE_MUTUALLY_EXCLUSIVE_EMAIL_INPUT_PARAMS));
    });

    describe('Given the user populated the email input', () => {
      beforeEach(async () => {
        await page.type('#email', 'email@email.com');
      });

      describe('when the user clicks the mutually exclusive option', () => {
        beforeEach(async () => {
          await page.click('#email-exclusive-option');
        });

        it('then the mutually exclusive option should be checked', async () => {
          const isChecked = await page.$eval('#email-exclusive-option', node => node.checked);
          expect(isChecked).toBe(true);
        });

        it('then the email input should be cleared', async () => {
          const inputValue = await page.$eval('#email', node => node.value);
          expect(inputValue).toBe('');
        });

        it('then the aria alert should tell the user that the email input has been cleared', async () => {
          await page.waitForTimeout(SCREEN_READER_TIMEOUT_DELAY);

          const alertText = await page.$eval('.ons-js-exclusive-alert', node => node.textContent);
          expect(alertText).toBe('Enter an email cleared.');
        });
      });
    });

    describe('Given the user has checked the mutually exclusive exclusive option', () => {
      beforeEach(async () => {
        await page.click('#email-exclusive-option');
      });

      describe('when the user populates the email input', () => {
        beforeEach(async () => {
          await page.type('#email', 'email@email.com');
        });

        it('then the exclusive option should be unchecked', async () => {
          const isChecked = await page.$eval('#email-exclusive-option', node => node.checked);
          expect(isChecked).toBe(false);
        });

        it('then the aria alert should tell the user that the exclusive option has been unchecked', async () => {
          await page.waitForTimeout(SCREEN_READER_TIMEOUT_DELAY);

          const alertText = await page.$eval('.ons-js-exclusive-alert', node => node.textContent);
          expect(alertText).toBe('I dont want to receive a confirmation email deselected.');
        });
      });
    });

    describe('Given the user has not populated the email input or checked the exclusive option', () => {
      describe('when the user populates the email input', () => {
        beforeEach(async () => {
          await page.type('#email', 'email@email.com');
        });

        it('then the aria alert shouldnt say anything', async () => {
          await page.waitForTimeout(SCREEN_READER_TIMEOUT_DELAY);

          const alertText = await page.$eval('.ons-js-exclusive-alert', node => node.textContent);
          expect(alertText).toBe('');
        });
      });

      describe('when the user clicks the mutually exclusive option', () => {
        beforeEach(async () => {
          await page.click('#email-exclusive-option');
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
