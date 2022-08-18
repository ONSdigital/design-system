import { renderComponent, setTestPage } from '../../tests/helpers/rendering';

const SCREEN_READER_TIMEOUT_DELAY = 300;

const EXAMPLE_MUTUALLY_EXCLUSIVE_NUMBER_INPUT_PARAMS = {
  id: 'currency',
  type: 'number',
  legend: 'What is your annual income before tax in 2018/19?',
  width: '5',
  attributes: {
    min: 0,
  },
  label: {
    text: 'Gross annual income',
  },
  prefix: {
    title: 'Pounds',
    text: '£',
    id: 'currency-prefix',
  },
  mutuallyExclusive: {
    or: 'Or',
    deselectMessage: 'Selecting this will clear your inputted annual income',
    deselectGroupAdjective: 'cleared',
    deselectExclusiveOptionAdjective: 'deselected',
    exclusiveOptions: [
      {
        id: 'currency-exclusive-option',
        name: 'no-currency',
        value: 'no-currency',
        label: {
          text: 'I prefer not to say',
        },
      },
    ],
  },
};

describe('script: mutually-exclusive', () => {
  describe('number input', () => {
    beforeEach(async () => {
      await setTestPage('/test', renderComponent('input', EXAMPLE_MUTUALLY_EXCLUSIVE_NUMBER_INPUT_PARAMS));
    });

    describe('Given the user populated the number input', () => {
      beforeEach(async () => {
        await page.type('#currency', '25000');
      });

      describe('when the user clicks the mutually exclusive option', () => {
        beforeEach(async () => {
          await page.click('#currency-exclusive-option');
        });

        it('then the mutually exclusive option should be checked', async () => {
          const isChecked = await page.$eval('#currency-exclusive-option', node => node.checked);
          expect(isChecked).toBe(true);
        });

        it('then the number input should be cleared', async () => {
          const inputValue = await page.$eval('#currency', node => node.value);
          expect(inputValue).toBe('');
        });

        it('then the aria alert should tell the user that the number input has been cleared', async () => {
          await page.waitForTimeout(SCREEN_READER_TIMEOUT_DELAY);

          const alertText = await page.$eval('.ons-js-exclusive-alert', node => node.textContent);
          expect(alertText).toBe('Gross annual income cleared.');
        });
      });
    });

    describe('Given the user has checked the mutually exclusive exclusive option', () => {
      beforeEach(async () => {
        await page.click('#currency-exclusive-option');
      });

      describe('when the user populates the number input', () => {
        beforeEach(async () => {
          await page.type('#currency', '25000');
        });

        it('then the exclusive option should be unchecked', async () => {
          const isChecked = await page.$eval('#currency-exclusive-option', node => node.checked);
          expect(isChecked).toBe(false);
        });

        it('then the aria alert should tell the user that the exclusive option has been unchecked', async () => {
          await page.waitForTimeout(SCREEN_READER_TIMEOUT_DELAY);

          const alertText = await page.$eval('.ons-js-exclusive-alert', node => node.textContent);
          expect(alertText).toBe('I prefer not to say deselected.');
        });
      });
    });

    describe('Given the user has not populated the number input or checked the exclusive option', () => {
      describe('when the user populates the number input', () => {
        beforeEach(async () => {
          await page.type('#currency', '25000');
        });

        it('then the aria alert shouldnt say anything', async () => {
          await page.waitForTimeout(SCREEN_READER_TIMEOUT_DELAY);

          const alertText = await page.$eval('.ons-js-exclusive-alert', node => node.textContent);
          expect(alertText).toBe('');
        });
      });

      describe('when the user clicks the mutually exclusive option', () => {
        beforeEach(async () => {
          await page.click('#currency-exclusive-option');
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
