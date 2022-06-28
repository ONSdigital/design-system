import { renderComponent, setTestPage } from '../../tests/helpers/rendering';

const EXAMPLE_INPUT_WITH_CHARACTER_CHECK = {
  id: 'search-field',
  type: 'number',
  width: '6',
  label: {
    text: 'Filter results',
  },
  searchButton: {
    text: 'Filter',
  },
  charCheckLimit: {
    charcheckCountdown: true,
    limit: 11,
    charCountOverLimitSingular: '{x} number too many',
    charCountOverLimitPlural: '{x} numbers too many',
    charCountSingular: 'You have {x} character remaining',
    charCountPlural: 'You have {x} characters remaining',
  },
};

const EXAMPLE_CHARACTER_CHECK_WITH_MUTUALLY_EXCLUSIVE = {
  id: 'feedback',
  name: 'feedback',
  width: '30',
  legend: 'Feeback legend',
  label: {
    text: 'Enter your feedback',
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
        id: 'feedback-checkbox',
        name: 'no-feedback',
        value: 'no-feedback',
        label: {
          text: 'I dont want to provide feedback',
        },
      },
    ],
  },
};

describe('script: character-check', () => {
  describe('mode: basic', () => {
    beforeEach(async () => {
      await setTestPage('/test', renderComponent('input', EXAMPLE_INPUT_WITH_CHARACTER_CHECK));
    });

    describe('Given that the char check helper has initialised correctly', () => {
      it('the char check readout should be invisible', async () => {
        const hasClass = await page.$eval('#search-field-check-remaining', element => element.classList.contains('ons-u-d-no'));
        expect(hasClass).toBe(true);
      });

      it('then the character limit readout should reflect the number of characters remaining', async () => {
        const innerHtml = await page.$eval('#search-field-check-remaining', element => element.innerHTML);
        expect(innerHtml.trim()).toBe('You have 11 characters remaining');
      });
    });

    describe('Given that the user has not typed into the search input', () => {
      describe('when the user types into the search input', () => {
        beforeEach(async () => {
          await page.type('#search-field', '1', { delay: 20 });
        });

        it('then the characters remaining readout reflect the number of characters remaining', async () => {
          const innerHtml = await page.$eval('#search-field-check-remaining', element => element.innerHTML);
          expect(innerHtml.trim()).toBe('You have 10 characters remaining');
        });

        it('the char check readout should be visible', async () => {
          const hasClass = await page.$eval('#search-field-check-remaining', element => element.classList.contains('ons-u-d-no'));
          expect(hasClass).toBe(false);
        });

        it('then aria-live should be set to polite', async () => {
          const ariaLiveAttribute = await page.$eval('#search-field-check-remaining', element => element.getAttribute('aria-live'));
          expect(ariaLiveAttribute).toBe('polite');
        });
      });

      describe('when the user reaches the charcheck limit of the input', () => {
        beforeEach(async () => {
          await page.type('#search-field', '11111111111', { delay: 20 });
        });

        it('the char check readout should be invisible', async () => {
          const hasClass = await page.$eval('#search-field-check-remaining', element => element.classList.contains('ons-u-d-no'));
          expect(hasClass).toBe(true);
        });
      });

      describe('when the user has 1 character remaining before the limit is reached', () => {
        beforeEach(async () => {
          await page.type('#search-field', '1111111111', { delay: 20 });
        });

        it('then the characters remaining readout reflect the number of characters remaining', async () => {
          const innerHtml = await page.$eval('#search-field-check-remaining', element => element.innerHTML);
          expect(innerHtml.trim()).toBe('You have 1 character remaining');
        });
      });
    });

    describe('Given that the user has exceeded the charcheck limit of the input by 1', () => {
      beforeEach(async () => {
        await page.type('#search-field', '111111111111', { delay: 20 });
      });

      it('the char check readout should be visible', async () => {
        const hasClass = await page.$eval('#search-field-check-remaining', element => element.classList.contains('ons-u-d-no'));
        expect(hasClass).toBe(false);
      });

      it('then the characters remaining readout reflect the number of characters exceeded', async () => {
        const innerHtml = await page.$eval('#search-field-check-remaining', element => element.innerHTML);
        expect(innerHtml.trim()).toBe('1 number too many');
      });

      it('then aria-live should be set to assertive', async () => {
        const ariaLiveAttribute = await page.$eval('#search-field-check-remaining', element => element.getAttribute('aria-live'));
        expect(ariaLiveAttribute).toBe('assertive');
      });

      it('then the input and readout should be given limit reached classes', async () => {
        const hasClassOnSearchInput = await page.$eval('#search-field', element => element.classList.contains('ons-input--limit-reached'));
        expect(hasClassOnSearchInput).toBe(true);
        const hasClassOnLimitReadout = await page.$eval('#search-field-check-remaining', element =>
          element.classList.contains('ons-input__limit--reached'),
        );
        expect(hasClassOnLimitReadout).toBe(true);
      });
    });

    describe('Given that the user has exceeded the charcheck limit of the input by more than 1', () => {
      beforeEach(async () => {
        await page.type('#search-field', '1111111111111', { delay: 20 });
      });

      it('the char check readout should be visible', async () => {
        const hasClass = await page.$eval('#search-field-check-remaining', element => element.classList.contains('ons-u-d-no'));
        expect(hasClass).toBe(false);
      });

      it('then the characters remaining readout reflect the number of characters exceeded', async () => {
        const innerHtml = await page.$eval('#search-field-check-remaining', element => element.innerHTML);
        expect(innerHtml.trim()).toBe('2 numbers too many');
      });

      it('then aria-live should be set to assertive', async () => {
        const ariaLiveAttribute = await page.$eval('#search-field-check-remaining', element => element.getAttribute('aria-live'));
        expect(ariaLiveAttribute).toBe('assertive');
      });

      it('then the input and readout should be given limit reached classes', async () => {
        const hasClassOnSearchInput = await page.$eval('#search-field', element => element.classList.contains('ons-input--limit-reached'));
        expect(hasClassOnSearchInput).toBe(true);
        const hasClassOnLimitReadout = await page.$eval('#search-field-check-remaining', element =>
          element.classList.contains('ons-input__limit--reached'),
        );
        expect(hasClassOnLimitReadout).toBe(true);
      });
    });
  });

  describe('mode: mutually exclusive', () => {
    beforeEach(async () => {
      await setTestPage('/test', renderComponent('textarea', EXAMPLE_CHARACTER_CHECK_WITH_MUTUALLY_EXCLUSIVE));
    });

    describe('Given that the input value is cleared programatically via mutually exclusive option', () => {
      beforeEach(async () => {
        await page.type('#feedback', '1', { delay: 20 });
        await page.focus('#feedback-checkbox');
        await page.keyboard.press('Space');
      });

      it('then aria-live attribute should removed', async () => {
        const hasAriaLiveAttribute = await page.$eval('#feedback-lim-remaining', element => element.hasAttribute('aria-live'));
        expect(hasAriaLiveAttribute).toBe(false);
      });
    });
  });
});
