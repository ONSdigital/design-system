import { renderComponent, setTestPage } from '../../tests/helpers/rendering';

const SCREEN_READER_TIMEOUT_DELAY = 300;

const EXAMPLE_MUTUALLY_EXCLUSIVE_DURATION_PARAMS = {
  id: 'address-duration',
  legendOrLabel: 'How long have you lived at this address?',
  description: 'If you have lived at this address for less than a year then enter 0 into the year input.',
  field1: {
    id: 'address-duration-years',
    name: 'address-duration-years',
    suffix: {
      text: 'Years',
      id: 'address-duration-years-suffix',
    },
    attributes: {
      min: 0,
      max: 100,
    },
  },
  field2: {
    id: 'address-duration-months',
    name: 'address-duration-months',
    suffix: {
      text: 'Months',
      id: 'address-duration-months-suffix',
    },
    attributes: {
      min: 0,
      max: 11,
    },
  },
  mutuallyExclusive: {
    or: 'Or',
    deselectMessage: 'Selecting this will clear the date if one has been inputted',
    deselectGroupAdjective: 'cleared',
    deselectExclusiveOptionAdjective: 'deselected',
    exclusiveOptions: [
      {
        id: 'duration-exclusive-option',
        name: 'no-duration',
        value: 'no-duration',
        label: {
          text: 'I have not moved in to this address yet',
        },
      },
    ],
  },
};

describe('script: mutually-exclusive', () => {
  describe('duration', () => {
    beforeEach(async () => {
      await setTestPage('/test', renderComponent('duration', EXAMPLE_MUTUALLY_EXCLUSIVE_DURATION_PARAMS));
    });

    describe('Given the user populated the duration', () => {
      beforeEach(async () => {
        await page.type('#address-duration-years', '2');
        await page.type('#address-duration-months', '4');
      });

      describe('when the user clicks the mutually exclusive option', () => {
        beforeEach(async () => {
          await page.click('#duration-exclusive-option');
        });

        it('then the mutually exclusive option should be checked', async () => {
          const isChecked = await page.$eval('#duration-exclusive-option', node => node.checked);
          expect(isChecked).toBe(true);
        });

        it('then the inputs should be cleared', async () => {
          const yearsValue = await page.$eval('#address-duration-years', node => node.value);
          expect(yearsValue).toBe('');
          const monthsValue = await page.$eval('#address-duration-months', node => node.value);
          expect(monthsValue).toBe('');
        });

        it('then the aria alert should tell the user that the inputs have been cleared', async () => {
          await page.waitForTimeout(SCREEN_READER_TIMEOUT_DELAY);

          const alertText = await page.$eval('.ons-js-exclusive-alert', node => node.textContent);
          expect(alertText).toBe('Years cleared. Months cleared.');
        });
      });
    });

    describe('Given the user has checked the mutually exclusive exclusive option', () => {
      beforeEach(async () => {
        await page.click('#duration-exclusive-option');
      });

      describe('when the user populates the duration fields', () => {
        beforeEach(async () => {
          await page.type('#address-duration-years', '2');
          await page.type('#address-duration-months', '4');
        });

        it('then the exclusive option should be unchecked', async () => {
          const isChecked = await page.$eval('#duration-exclusive-option', node => node.checked);
          expect(isChecked).toBe(false);
        });

        it('then the aria alert should tell the user that the exclusive option has been unchecked', async () => {
          await page.waitForTimeout(SCREEN_READER_TIMEOUT_DELAY);

          const alertText = await page.$eval('.ons-js-exclusive-alert', node => node.textContent);
          expect(alertText).toBe('I have not moved in to this address yet deselected.');
        });
      });
    });

    describe('Given the user has not populated the duration inputs or checked the exclusive option', () => {
      describe('when the user populates the duration inputs', () => {
        beforeEach(async () => {
          await page.type('#address-duration-years', '2');
          await page.type('#address-duration-months', '4');
        });

        it('then the aria alert shouldnt say anything', async () => {
          await page.waitForTimeout(SCREEN_READER_TIMEOUT_DELAY);

          const alertText = await page.$eval('.ons-js-exclusive-alert', node => node.textContent);
          expect(alertText).toBe('');
        });
      });

      describe('when the user clicks the mutually exclusive option', () => {
        beforeEach(async () => {
          await page.click('#duration-exclusive-option');
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
