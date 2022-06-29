import { renderComponent, setTestPage } from '../../tests/helpers/rendering';

const SCREEN_READER_TIMEOUT_DELAY = 300;

const EXAMPLE_MUTUALLY_EXCLUSIVE_DATE_PARAMS = {
  id: 'date-mutually-exclusive',
  legendOrLabel: 'When did you leave your last paid job?',
  description: 'For example, 31 3 2018',
  day: {
    label: {
      text: 'Day',
    },
    name: 'day-exclusive',
  },
  month: {
    label: {
      text: 'Month',
    },
    name: 'month-exclusive',
  },
  year: {
    label: {
      text: 'Year',
    },
    name: 'year-exclusive',
  },
  mutuallyExclusive: {
    or: 'Or',
    deselectMessage: 'Selecting this will clear the date if one has been inputted',
    deselectGroupAdjective: 'cleared',
    deselectExclusiveOptionAdjective: 'deselected',
    exclusiveOptions: [
      {
        id: 'date-exclusive-exclusive-option',
        name: 'no-paid-job',
        value: 'no-paid-job',
        label: {
          text: 'I have never had a paid job',
        },
      },
    ],
  },
};

describe('script: mutually-exclusive', () => {
  describe('date', () => {
    beforeEach(async () => {
      await setTestPage('/test', renderComponent('date-input', EXAMPLE_MUTUALLY_EXCLUSIVE_DATE_PARAMS));
    });

    describe('Given the user populated the date input', () => {
      beforeEach(async () => {
        await page.type('#date-mutually-exclusive-day', '14');
        await page.type('#date-mutually-exclusive-month', '12');
        await page.type('#date-mutually-exclusive-year', '2018');
      });

      describe('when the user clicks the mutually exclusive option', () => {
        beforeEach(async () => {
          await page.click('#date-exclusive-exclusive-option');
        });

        it('then the mutually exclusive option should be checked', async () => {
          const isChecked = await page.$eval('#date-exclusive-exclusive-option', node => node.checked);
          expect(isChecked).toBe(true);
        });

        it('then the date input should be cleared', async () => {
          const dayValue = await page.$eval('#date-mutually-exclusive-day', node => node.value);
          expect(dayValue).toBe('');
          const monthValue = await page.$eval('#date-mutually-exclusive-month', node => node.value);
          expect(monthValue).toBe('');
          const yearValue = await page.$eval('#date-mutually-exclusive-year', node => node.value);
          expect(yearValue).toBe('');
        });

        it('then the aria alert should tell the user that the date input has been cleared', async () => {
          await page.waitForTimeout(SCREEN_READER_TIMEOUT_DELAY);

          const alertText = await page.$eval('.ons-js-exclusive-alert', node => node.textContent);
          expect(alertText).toBe('Day cleared. Month cleared. Year cleared.');
        });
      });
    });

    describe('Given the user has checked the mutually exclusive exclusive option', () => {
      beforeEach(async () => {
        await page.click('#date-exclusive-exclusive-option');
      });

      describe('when the user populates the dateInput', () => {
        beforeEach(async () => {
          await page.type('#date-mutually-exclusive-day', '14');
          await page.type('#date-mutually-exclusive-month', '12');
          await page.type('#date-mutually-exclusive-year', '2018');
        });

        it('then the mutually exclusive option should be checked', async () => {
          const isChecked = await page.$eval('#date-exclusive-exclusive-option', node => node.checked);
          expect(isChecked).toBe(false);
        });

        it('then the aria alert should tell the user that the exclusive option has been unchecked', async () => {
          await page.waitForTimeout(SCREEN_READER_TIMEOUT_DELAY);

          const alertText = await page.$eval('.ons-js-exclusive-alert', node => node.textContent);
          expect(alertText).toBe('I have never had a paid job deselected.');
        });
      });
    });

    describe('Given the user has not populated the date input or checked the exclusive option', () => {
      describe('when the user populates the date input', () => {
        beforeEach(async () => {
          await page.type('#date-mutually-exclusive-day', '14');
          await page.type('#date-mutually-exclusive-month', '12');
          await page.type('#date-mutually-exclusive-year', '2018');
        });

        it('then the aria alert shouldnt say anything', async () => {
          await page.waitForTimeout(SCREEN_READER_TIMEOUT_DELAY);

          const alertText = await page.$eval('.ons-js-exclusive-alert', node => node.textContent);
          expect(alertText).toBe('');
        });
      });

      describe('when the user clicks the mutually exclusive option', () => {
        beforeEach(async () => {
          await page.click('#date-exclusive-exclusive-option');
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
