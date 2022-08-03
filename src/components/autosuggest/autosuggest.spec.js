import { getNodeAttributes, PuppeteerEndpointFaker } from '../../tests/helpers/puppeteer';
import { renderComponent, setTestPage } from '../../tests/helpers/rendering';

const EXAMPLE_AUTOSUGGEST = {
  id: 'country-of-birth',
  label: {
    text: 'Current name of country',
    description: 'Enter your own answer or select from suggestions',
    id: 'country-of-birth-label',
    classes: 'extra-label-class',
  },
  autocomplete: 'off',
  instructions: 'Use up and down keys to navigate.',
  ariaYouHaveSelected: 'You have selected',
  ariaMinChars: 'Enter 3 or more characters for suggestions.',
  minChars: 3,
  ariaResultsLabel: 'Country suggestions',
  ariaOneResult: 'There is one suggestion available.',
  ariaNResults: 'There are {n} suggestions available.',
  ariaLimitedResults: 'Type more characters to improve your search',
  moreResults: 'Continue entering to improve suggestions',
  resultsTitle: 'Suggestions',
  resultsTitleId: 'country-of-birth-suggestions',
  noResults: 'No suggestions found.',
  typeMore: 'Continue entering to get suggestions',
  autosuggestData: '/test/fake/api/countries',
};

describe('script: autosuggest', () => {
  const apiFaker = new PuppeteerEndpointFaker('/test/fake/api');

  apiFaker.setOverride('/countries', {
    data: [
      { en: 'England' },
      { en: 'Wales' },
      { en: 'Scotland' },
      { en: 'United States of America' },
      { en: 'United States Virgin Islands' },
      { en: 'Åland Islands' },
    ],
  });

  beforeAll(async () => {
    await apiFaker.setup(page);
  });

  beforeEach(async () => {
    await apiFaker.reset();
  });

  describe('when the component initialises', () => {
    it('the input should be given the correct aria attributes', async () => {
      await setTestPage('/test', renderComponent('autosuggest', EXAMPLE_AUTOSUGGEST));

      const attributes = await getNodeAttributes(page, '.ons-js-autosuggest-input');
      expect(attributes['aria-autocomplete']).toBe('list');
      expect(attributes['aria-controls']).toBe('country-of-birth-listbox');
      expect(attributes['aria-describedby']).toBe('country-of-birth-instructions');
      expect(attributes['aria-haspopup']).toBe('true');
      expect(attributes['aria-owns']).toBe('country-of-birth-listbox');
      expect(attributes['aria-expanded']).toBe('false');
      expect(attributes['role']).toBe('combobox');
    });

    it('the autocomplete attribute be set to be not set to on', async () => {
      await setTestPage('/test', renderComponent('autosuggest', EXAMPLE_AUTOSUGGEST));

      const attributes = await getNodeAttributes(page, '.ons-js-autosuggest-input');
      expect(attributes['autocomplete']).not.toBe('on');
    });

    it('the instructions, listbox, and status should become visible', async () => {
      await setTestPage('/test', renderComponent('autosuggest', EXAMPLE_AUTOSUGGEST));

      const instructionsDisplayStyle = await page.$eval('.ons-js-autosuggest-instructions', node => getComputedStyle(node).display);
      expect(instructionsDisplayStyle).toBe('block');
      const listboxDisplayStyle = await page.$eval('.ons-js-autosuggest-listbox', node => getComputedStyle(node).display);
      expect(listboxDisplayStyle).toBe('block');
      const statusDisplayStyle = await page.$eval('.ons-js-autosuggest-aria-status', node => getComputedStyle(node).display);
      expect(statusDisplayStyle).toBe('block');
    });
  });

  describe('when the user presses the "Down" arrow key', () => {
    it('navigates to the first suggestion initially', async () => {
      await setTestPage('/test', renderComponent('autosuggest', EXAMPLE_AUTOSUGGEST));

      await page.type('.ons-js-autosuggest-input', 'Unite', { delay: 20 });
      await page.keyboard.press('ArrowDown');

      const selectedOption = await page.$eval('.ons-autosuggest-input__option--focused', node => node.textContent);
      expect(selectedOption.trim()).toBe('United States of America');
    });

    it('navigates to the suggestion below the current suggestion', async () => {
      await setTestPage('/test', renderComponent('autosuggest', EXAMPLE_AUTOSUGGEST));

      await page.type('.ons-js-autosuggest-input', 'Unite', { delay: 20 });
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('ArrowDown');

      const selectedOption = await page.$eval('.ons-autosuggest-input__option--focused', node => node.textContent);
      expect(selectedOption.trim()).toBe('United States Virgin Islands');
    });

    it('marks suggestion as being selected', async () => {
      await setTestPage('/test', renderComponent('autosuggest', EXAMPLE_AUTOSUGGEST));

      await page.type('.ons-js-autosuggest-input', 'Unite', { delay: 20 });
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('ArrowDown');

      const ariaSelectedValue = await page.$eval('.ons-autosuggest-input__option--focused', node => node.getAttribute('aria-selected'));
      expect(ariaSelectedValue).toBe('true');

      const selectedOptionId = await page.$eval('.ons-autosuggest-input__option--focused', node => node.getAttribute('id'));
      const ariaActiveDescendant = await page.$eval('.ons-js-autosuggest-input', node => node.getAttribute('aria-activedescendant'));
      expect(ariaActiveDescendant).toBe(selectedOptionId);
    });

    it('sets aria status to a message showing the selected result', async () => {
      await setTestPage('/test', renderComponent('autosuggest', EXAMPLE_AUTOSUGGEST));

      await page.type('.ons-js-autosuggest-input', 'Eng', { delay: 20 });
      await page.keyboard.press('ArrowDown');

      const statusMessage = await page.$eval('.ons-js-autosuggest-aria-status', node => node.textContent);
      expect(statusMessage.trim()).toBe('England');
    });

    it('does not mark other suggestions as being selected', async () => {
      await setTestPage('/test', renderComponent('autosuggest', EXAMPLE_AUTOSUGGEST));

      await page.type('.ons-js-autosuggest-input', 'Unite', { delay: 20 });
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('ArrowDown');

      const selectedSuggestionCount = await page.$$eval('.ons-autosuggest-input__option[aria-selected=true]', nodes => nodes.length);
      expect(selectedSuggestionCount).toBe(1);
    });

    it('does not affect suggestion selection when already on last item', async () => {
      await setTestPage('/test', renderComponent('autosuggest', EXAMPLE_AUTOSUGGEST));

      await page.type('.ons-js-autosuggest-input', 'Unite', { delay: 20 });
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('ArrowDown');

      const selectedOption = await page.$eval('.ons-autosuggest-input__option--focused', node => node.textContent);
      expect(selectedOption.trim()).toBe('United States Virgin Islands');
    });

    // The down arrow will typically move caret to the end of an input field. This should
    // not occur when suggestions are presented.
    it('does not interfere with text input', async () => {
      await setTestPage('/test', renderComponent('autosuggest', EXAMPLE_AUTOSUGGEST));

      await page.type('.ons-js-autosuggest-input', 'nited', { delay: 20 });
      // Move to start of input to verify if the down arrow moves the caret to the end.
      await page.keyboard.press('Home');
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('U');

      const inputValue = await page.$eval('.ons-js-autosuggest-input', node => node.value);
      expect(inputValue).toBe('United');
    });
  });

  describe('when the user presses the "Up" arrow key', () => {
    it('navigates to the first suggestion initially', async () => {
      await setTestPage('/test', renderComponent('autosuggest', EXAMPLE_AUTOSUGGEST));

      await page.type('.ons-js-autosuggest-input', 'Unite', { delay: 20 });
      await page.keyboard.press('ArrowUp');

      const selectedOption = await page.$eval('.ons-autosuggest-input__option--focused', node => node.textContent);
      expect(selectedOption.trim()).toBe('United States of America');
    });

    it('navigates to the suggestion above the current suggestion', async () => {
      await setTestPage('/test', renderComponent('autosuggest', EXAMPLE_AUTOSUGGEST));

      await page.type('.ons-js-autosuggest-input', 'Unite', { delay: 20 });
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('ArrowUp');

      const selectedOption = await page.$eval('.ons-autosuggest-input__option--focused', node => node.textContent);
      expect(selectedOption.trim()).toBe('United States of America');
    });

    it('marks suggestion as being selected', async () => {
      await setTestPage('/test', renderComponent('autosuggest', EXAMPLE_AUTOSUGGEST));

      await page.type('.ons-js-autosuggest-input', 'Unite', { delay: 20 });
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('ArrowUp');

      const ariaSelectedValue = await page.$eval('.ons-autosuggest-input__option--focused', node => node.getAttribute('aria-selected'));
      expect(ariaSelectedValue).toBe('true');

      const selectedOptionId = await page.$eval('.ons-autosuggest-input__option--focused', node => node.getAttribute('id'));
      const ariaActiveDescendant = await page.$eval('.ons-js-autosuggest-input', node => node.getAttribute('aria-activedescendant'));
      expect(ariaActiveDescendant).toBe(selectedOptionId);
    });

    it('does not mark other suggestions as being selected', async () => {
      await setTestPage('/test', renderComponent('autosuggest', EXAMPLE_AUTOSUGGEST));

      await page.type('.ons-js-autosuggest-input', 'Unite', { delay: 20 });
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('ArrowUp');

      const selectedSuggestionCount = await page.$$eval('.ons-autosuggest-input__option[aria-selected=true]', nodes => nodes.length);
      expect(selectedSuggestionCount).toBe(1);
    });

    it('does not affect suggestion selection when already on first item', async () => {
      await setTestPage('/test', renderComponent('autosuggest', EXAMPLE_AUTOSUGGEST));

      await page.type('.ons-js-autosuggest-input', 'Unite', { delay: 20 });
      await page.keyboard.press('ArrowUp');
      await page.keyboard.press('ArrowUp');

      const selectedOption = await page.$eval('.ons-autosuggest-input__option--focused', node => node.textContent);
      expect(selectedOption.trim()).toBe('United States of America');
    });

    // The down arrow will typically move caret to the start of an input field. This
    // should not occur when suggestions are presented.
    it('does not interfere with text input', async () => {
      await setTestPage('/test', renderComponent('autosuggest', EXAMPLE_AUTOSUGGEST));

      await page.type('.ons-js-autosuggest-input', 'Unite', { delay: 20 });
      await page.keyboard.press('ArrowUp');
      await page.keyboard.press('d');

      const inputValue = await page.$eval('.ons-js-autosuggest-input', node => node.value);
      expect(inputValue).toBe('United');
    });
  });

  describe('when the user presses the "Enter" key', () => {
    it('accepts the selected suggestion', async () => {
      await setTestPage('/test', renderComponent('autosuggest', EXAMPLE_AUTOSUGGEST));

      await page.type('.ons-js-autosuggest-input', 'Unite', { delay: 20 });
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('Enter');

      const inputValue = await page.$eval('.ons-js-autosuggest-input', node => node.value);
      expect(inputValue).toBe('United States Virgin Islands');
    });
  });

  describe('when the user blurs the input', () => {
    it('suggestions should remain visible for 300ms', async () => {
      await setTestPage('/test', renderComponent('autosuggest', EXAMPLE_AUTOSUGGEST));

      await page.type('.ons-js-autosuggest-input', 'Unite', { delay: 20 });
      await page.keyboard.press('Tab');

      const suggestionCountSample1 = await page.$$eval('.ons-autosuggest-input__option', nodes => nodes.length);
      expect(suggestionCountSample1).toBe(2);

      await page.waitForTimeout(200);
      const suggestionCountSample2 = await page.$$eval('.ons-autosuggest-input__option', nodes => nodes.length);
      expect(suggestionCountSample2).toBe(2);

      await page.waitForTimeout(320);
      const suggestionCountSample3 = await page.$$eval('.ons-autosuggest-input__option', nodes => nodes.length);
      expect(suggestionCountSample3).toBe(0);
    });

    it('clears innerHTML of listbox', async () => {
      await setTestPage('/test', renderComponent('autosuggest', EXAMPLE_AUTOSUGGEST));

      await page.type('.ons-js-autosuggest-input', 'Unite', { delay: 20 });
      await page.keyboard.press('Tab');
      await page.waitForTimeout(320);

      const listboxInnerHTML = await page.$eval('.ons-js-autosuggest-listbox', node => node.innerHTML);
      expect(listboxInnerHTML).toBe('');
    });

    it('clears `has-results` modifier of autosuggest component', async () => {
      await setTestPage('/test', renderComponent('autosuggest', EXAMPLE_AUTOSUGGEST));

      await page.type('.ons-js-autosuggest-input', 'Unite', { delay: 20 });
      await page.keyboard.press('Tab');
      await page.waitForTimeout(320);

      const hasClass = await page.$eval('.ons-autosuggest-input', node => node.classList.contains('ons-autosuggest-input--has-results'));
      expect(hasClass).toBe(false);
    });

    it('clears aria attributes of input element', async () => {
      await setTestPage('/test', renderComponent('autosuggest', EXAMPLE_AUTOSUGGEST));

      await page.type('.ons-js-autosuggest-input', 'Unite', { delay: 20 });
      await page.keyboard.press('Tab');
      await page.waitForTimeout(320);

      const attributes = await getNodeAttributes(page, '.ons-js-autosuggest-input');
      expect(attributes['aria-activedescendant']).toBeUndefined();
      expect(attributes['aria-expanded']).toBe('false');
    });
  });

  describe('when the user clicks on a result', () => {
    it('accepts the suggestion', async () => {
      await setTestPage('/test', renderComponent('autosuggest', EXAMPLE_AUTOSUGGEST));

      await page.type('.ons-js-autosuggest-input', 'Unite', { delay: 20 });
      await page.click('.ons-autosuggest-input__option:nth-child(2)');

      const inputValue = await page.$eval('.ons-js-autosuggest-input', node => node.value);
      expect(inputValue).toBe('United States Virgin Islands');
    });
  });

  describe('when the user inputs text', () => {
    it('does not show suggestions when input length < minimum characters', async () => {
      await setTestPage('/test', renderComponent('autosuggest', EXAMPLE_AUTOSUGGEST));

      await page.type('.ons-js-autosuggest-input', 'En', { delay: 20 });

      const suggestionCount = await page.$$eval('.ons-autosuggest-input__option', nodes => nodes.length);
      expect(suggestionCount).toBe(0);
    });

    it('shows suggestions when input length >= minimum characters', async () => {
      await setTestPage('/test', renderComponent('autosuggest', EXAMPLE_AUTOSUGGEST));

      await page.type('.ons-js-autosuggest-input', 'Eng', { delay: 20 });

      const suggestionCount = await page.$$eval('.ons-autosuggest-input__option', nodes => nodes.length);
      expect(suggestionCount).toBe(1);
    });
  });

  describe('when the mouse moves over a result and a suggestion is focused', () => {
    it('removes the focused class', async () => {
      await setTestPage('/test', renderComponent('autosuggest', EXAMPLE_AUTOSUGGEST));

      await page.type('.ons-js-autosuggest-input', 'state', { delay: 20 });
      await page.keyboard.press('ArrowDown');
      await page.hover('.ons-autosuggest-input__option:nth-child(2)');

      const focusedClassCount = await page.$$eval('.ons-autosuggest-input__option--focused', nodes => nodes.length);
      expect(focusedClassCount).toBe(0);
    });
  });

  describe('when the mouse moves off a result and a suggestion was focused', () => {
    it('restores the focused class', async () => {
      await setTestPage(
        '/test',
        `
        ${renderComponent('autosuggest', EXAMPLE_AUTOSUGGEST)}
        <a id="dummy">Dummy</a>
      `,
      );

      await page.type('.ons-js-autosuggest-input', 'state', { delay: 20 });
      await page.keyboard.press('ArrowDown');
      await page.hover('.ons-autosuggest-input__option:nth-child(2)');
      await page.hover('#dummy');

      const focusedClassCount = await page.$$eval('.ons-autosuggest-input__option--focused', nodes => nodes.length);
      expect(focusedClassCount).toBe(1);
    });
  });

  describe('when there are results', () => {
    it('un-highlights a previously highlighted suggestion', async () => {
      await setTestPage('/test', renderComponent('autosuggest', EXAMPLE_AUTOSUGGEST));

      await page.type('.ons-js-autosuggest-input', 'Unite', { delay: 20 });
      await page.keyboard.press('ArrowDown');
      await page.type('.ons-js-autosuggest-input', 'd', { delay: 20 });

      const focusedNodeCount = await page.$$eval('.ons-autosuggest-input__option--focused', nodes => nodes.length);
      expect(focusedNodeCount).toBe(0);
    });

    it('decorates input element with `aria-expanded` attribute', async () => {
      await setTestPage('/test', renderComponent('autosuggest', EXAMPLE_AUTOSUGGEST));

      await page.type('.ons-js-autosuggest-input', 'Unite', { delay: 20 });

      const ariaExpandedValue = await page.$eval('.ons-js-autosuggest-input', node => node.getAttribute('aria-expanded'));
      expect(ariaExpandedValue).toBe('true');
    });

    it('emboldens matched suggestion text', async () => {
      await setTestPage('/test', renderComponent('autosuggest', EXAMPLE_AUTOSUGGEST));

      await page.type('.ons-js-autosuggest-input', 'Unite', { delay: 20 });

      const emboldened = await page.$$eval('.ons-autosuggest-input__option strong', nodes => nodes.map(node => node.textContent));
      expect(emboldened).toEqual(['Unite', 'Unite']);
    });

    it('does not embolden anything when suggestion does not contain query text', async () => {
      await setTestPage('/test', renderComponent('autosuggest', EXAMPLE_AUTOSUGGEST));

      await page.type('.ons-js-autosuggest-input', 'tland', { delay: 20 });

      const matchCount = await page.$$eval('.ons-autosuggest-input__option', nodes => nodes.length);
      expect(matchCount).toBe(2);
      const emboldened = await page.$$eval('.ons-autosuggest-input__option strong', nodes => nodes.map(node => node.textContent));
      expect(emboldened).toEqual(['tland']);
    });

    it('sets aria status to a message asking for more characters to be input', async () => {
      await setTestPage('/test', renderComponent('autosuggest', EXAMPLE_AUTOSUGGEST));

      await page.type('.ons-js-autosuggest-input', 'st', { delay: 20 });

      const statusMessage = await page.$eval('.ons-js-autosuggest-aria-status', node => node.textContent);
      expect(statusMessage.trim()).toBe('Enter 3 or more characters for suggestions.');
    });

    it('sets aria status to a message indicating a count of one suggestion', async () => {
      await setTestPage('/test', renderComponent('autosuggest', EXAMPLE_AUTOSUGGEST));

      await page.type('.ons-js-autosuggest-input', 'Engla', { delay: 20 });

      const statusMessage = await page.$eval('.ons-js-autosuggest-aria-status', node => node.textContent);
      expect(statusMessage.trim()).toBe('There is one suggestion available.');
    });

    it('sets aria status to a message indicating the count of suggestions', async () => {
      await setTestPage('/test', renderComponent('autosuggest', EXAMPLE_AUTOSUGGEST));

      await page.type('.ons-js-autosuggest-input', 'sta', { delay: 20 });

      const statusMessage = await page.$eval('.ons-js-autosuggest-aria-status', node => node.textContent);
      expect(statusMessage.trim()).toBe('There are 2 suggestions available.');
    });
  });

  describe('when there are no results', () => {
    describe('where `noResults` content is provided', () => {
      it('outputs `noResults` content', async () => {
        await setTestPage('/test', renderComponent('autosuggest', EXAMPLE_AUTOSUGGEST));

        await page.type('.ons-js-autosuggest-input', 'abc', { delay: 20 });

        const noResultsContent = await page.$eval('.ons-autosuggest-input__option--no-results', node => node.textContent);
        expect(noResultsContent).toBe('No suggestions found.');
      });

      it('decorates input element with `aria-expanded` attribute', async () => {
        await setTestPage('/test', renderComponent('autosuggest', EXAMPLE_AUTOSUGGEST));

        await page.type('.ons-js-autosuggest-input', 'abc', { delay: 20 });

        const ariaExpandedValue = await page.$eval('.ons-js-autosuggest-input', node => node.getAttribute('aria-expanded'));
        expect(ariaExpandedValue).toBe('true');
      });

      it('sets aria status to a message indicating that query is too short for suggestions', async () => {
        await setTestPage('/test', renderComponent('autosuggest', EXAMPLE_AUTOSUGGEST));

        await page.type('.ons-js-autosuggest-input', 'ab', { delay: 20 });

        const statusMessage = await page.$eval('.ons-js-autosuggest-aria-status', node => node.textContent);
        expect(statusMessage.trim()).toBe('Enter 3 or more characters for suggestions.');
      });

      it('sets aria status to a message indicating the zero count of suggestions', async () => {
        await setTestPage('/test', renderComponent('autosuggest', EXAMPLE_AUTOSUGGEST));

        await page.type('.ons-js-autosuggest-input', 'abc', { delay: 20 });

        const statusMessage = await page.$eval('.ons-js-autosuggest-aria-status', node => node.textContent);
        expect(statusMessage.trim()).toBe('No suggestions found.: "abc"');
      });
    });

    describe('where `noResults` content is not provided', () => {
      it('has an empty listbox', async () => {
        await setTestPage(
          '/test',
          renderComponent('autosuggest', {
            ...EXAMPLE_AUTOSUGGEST,
            noResults: undefined,
          }),
        );

        await page.type('.ons-js-autosuggest-input', 'abc', { delay: 20 });

        const matchCount = await page.$$eval('.ons-autosuggest-input__option', nodes => nodes.length);
        expect(matchCount).toBe(0);
      });

      it('decorates input element with `aria-expanded` attribute', async () => {
        await setTestPage(
          '/test',
          renderComponent('autosuggest', {
            ...EXAMPLE_AUTOSUGGEST,
            noResults: undefined,
          }),
        );

        await page.type('.ons-js-autosuggest-input', 'abc', { delay: 20 });

        const ariaExpandedValue = await page.$eval('.ons-js-autosuggest-input', node => node.getAttribute('aria-expanded'));
        expect(ariaExpandedValue).toBe('false');
      });
    });
  });

  describe('when there are no results due to an error', () => {
    describe('when the status code is 400', () => {
      beforeEach(async () => {
        apiFaker.setTemporaryOverride('/countries', {
          status: 400,
          data: {},
        });

        await setTestPage('/test', renderComponent('autosuggest', EXAMPLE_AUTOSUGGEST));

        await page.focus('.ons-js-autosuggest-input');
        await page.type('.ons-js-autosuggest-input', 'tes', { delay: 20 });
      });

      it('shows the type more message', async () => {
        const listItemCount = await page.$$eval('.ons-js-autosuggest-listbox > *', nodes => nodes.length);
        expect(listItemCount).toBe(1);
        const noResultsText = await page.$eval('.ons-autosuggest-input__option--no-results', node => node.innerText);
        expect(noResultsText.trim()).toBe('Continue entering to get suggestions');
      });
    });

    describe.each([
      ['when the status code is greater than 400', {}, 401],
      ['when there is no status code', null, undefined],
    ])('%s', (_, fakeAutosuggestData, fakeStatusCode) => {
      beforeEach(async () => {
        apiFaker.setTemporaryOverride('/countries', {
          status: fakeStatusCode,
          data: fakeAutosuggestData,
        });

        await setTestPage(
          '/test',
          renderComponent('autosuggest', {
            ...EXAMPLE_AUTOSUGGEST,
            errorTitle: 'There is a problem with your answer',
            errorMessage: 'Enter an address ',
            errorMessageAPI: 'Sorry, there is a problem.',
          }),
        );

        await page.type('.ons-js-autosuggest-input', 'tes', { delay: 20 });
      });

      it('shows the API error message', async () => {
        const listItemCount = await page.$$eval('.ons-js-autosuggest-listbox > *', nodes => nodes.length);
        expect(listItemCount).toBe(1);
        const warningText = await page.$eval('.ons-autosuggest-input__warning', node => node.textContent);
        expect(warningText.trim()).toBe('!Sorry, there is a problem.');
      });

      it('the input should be disabled', async () => {
        const hasDisabledAttribute = await page.$eval('.ons-js-autosuggest-input', node => node.hasAttribute('disabled'));
        expect(hasDisabledAttribute).toBe(true);
      });

      it('the input value should be empty', async () => {
        const inputValue = await page.$eval('.ons-js-autosuggest-input', node => node.value);
        expect(inputValue).toBe('');
      });

      it('the label class should be added', async () => {
        const hasClass = await page.$eval('.ons-label', node => node.classList.contains('ons-u-lighter'));
        expect(hasClass).toBe(true);
      });

      it('the aria status should be set', async () => {
        const statusMessage = await page.$eval('.ons-js-autosuggest-aria-status', node => node.textContent);
        expect(statusMessage.trim()).toBe('Sorry, there is a problem.');
      });
    });
  });

  describe('when the component initialises with the allowMultiple parameter', () => {
    describe('when a result is selected', () => {
      it('the input value should contain a comma when focused', async () => {
        await setTestPage(
          '/test',
          renderComponent('autosuggest', {
            ...EXAMPLE_AUTOSUGGEST,
            allowMultiple: true,
          }),
        );

        await page.type('.ons-js-autosuggest-input', 'England', { delay: 20 });
        await page.keyboard.press('ArrowUp');
        await page.keyboard.press('Enter');
        // Defocus the autosuggest input.
        await page.keyboard.press('Tab');
        await page.focus('.ons-js-autosuggest-input');

        const inputValue = await page.$eval('.ons-js-autosuggest-input', node => node.value);
        expect(inputValue).toBe('England, ');
      });
    });

    describe('when the user blurs the input', () => {
      it('the input value should not contain a comma', async () => {
        await setTestPage(
          '/test',
          renderComponent('autosuggest', {
            ...EXAMPLE_AUTOSUGGEST,
            allowMultiple: true,
          }),
        );

        await page.type('.ons-js-autosuggest-input', 'England, ', { delay: 20 });
        await page.keyboard.press('Tab');

        const inputValue = await page.$eval('.ons-js-autosuggest-input', node => node.value);
        expect(inputValue).toBe('England');
      });
    });
  });
});
