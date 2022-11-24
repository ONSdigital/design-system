/** @jest-environment jsdom */

import * as cheerio from 'cheerio';

import axe from '../../tests/helpers/axe';
import { renderComponent, templateFaker } from '../../tests/helpers/rendering';

const EXAMPLE_INPUT_MINIMAL = {
  id: 'example-id',
  name: 'example-name',
};

const EXAMPLE_INPUT_WITH_LABEL = {
  ...EXAMPLE_INPUT_MINIMAL,
  label: {
    id: 'example-input-label',
    text: 'Example input label',
    classes: 'extra-label-class',
    description: 'Example input label description',
    attributes: { a: 42 },
    inline: false,
  },
  accessiblePlaceholder: true,
};

const EXAMPLE_INPUT_WITH_ERROR = {
  ...EXAMPLE_INPUT_WITH_LABEL,
  error: {
    id: 'feedback-error',
    text: 'Enter your feedback',
  },
};

const EXAMPLE_WITH_SEARCH = {
  ...EXAMPLE_INPUT_MINIMAL,
  accessiblePlaceholder: true,
  searchButton: {
    type: 'button',
    text: 'Search for address',
    id: 'search-for-address',
    attributes: { a: 42 },
    classes: 'extra-search-button-class',
    iconType: 'search',
    visuallyHideButtonText: true,
  },
};

const EXAMPLE_INPUT_WITH_CHARACTER_LIMIT = {
  ...EXAMPLE_INPUT_MINIMAL,
  minLength: 10,
  maxLength: 200,
  charCheckLimit: {
    limit: 200,
    charCountSingular: 'You have {x} character remaining',
    charCountPlural: 'You have {x} characters remaining',
    charCountOverLimitSingular: '{x} character too many',
    charCountOverLimitPlural: '{x} characters too many',
  },
};

const EXAMPLE_INPUT_WITH_MUTUALLY_EXCLUSIVE_WITH_ERROR = {
  ...EXAMPLE_INPUT_WITH_ERROR,
  dontWrap: true,
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

describe('macro: input', () => {
  it('passes jest-axe checks', async () => {
    const $ = cheerio.load(renderComponent('input', EXAMPLE_INPUT_WITH_LABEL));

    const results = await axe($.html());
    expect(results).toHaveNoViolations();
  });

  it('has the provided `id` attribute', () => {
    const $ = cheerio.load(renderComponent('input', EXAMPLE_INPUT_MINIMAL));

    expect($('.ons-input').attr('id')).toBe('example-id');
  });

  it('has the provided `name` attribute', () => {
    const $ = cheerio.load(renderComponent('input', EXAMPLE_INPUT_MINIMAL));

    expect($('.ons-input').attr('name')).toBe('example-name');
  });

  it('has additionally provided `attributes`', () => {
    const $ = cheerio.load(
      renderComponent('input', {
        ...EXAMPLE_INPUT_MINIMAL,
        attributes: { a: '123', b: '456' },
      }),
    );

    expect($('.ons-input').attr('a')).toBe('123');
    expect($('.ons-input').attr('b')).toBe('456');
  });

  it('outputs number type in a way that works with more browsers', () => {
    const $ = cheerio.load(
      renderComponent('input', {
        ...EXAMPLE_INPUT_MINIMAL,
        type: 'number',
      }),
    );

    expect($('.ons-input').attr('type')).toBe('text');
    expect($('.ons-input').attr('pattern')).toBe('[0-9]*');
    expect($('.ons-input').attr('inputmode')).toBe('numeric');
  });

  it('has additionally provided style classes', () => {
    const $ = cheerio.load(
      renderComponent('input', {
        ...EXAMPLE_INPUT_MINIMAL,
        classes: 'extra-class another-extra-class',
      }),
    );

    expect($('.ons-input').hasClass('extra-class')).toBe(true);
    expect($('.ons-input').hasClass('another-extra-class')).toBe(true);
  });

  it('does not have "placeholder" modifier', () => {
    const $ = cheerio.load(renderComponent('input', EXAMPLE_INPUT_MINIMAL));

    expect($('.ons-input').hasClass('ons-input--placeholder')).toBe(false);
  });

  it('has "placeholder" modifier when `accessiblePlaceholder` is provided', () => {
    const $ = cheerio.load(renderComponent('input', EXAMPLE_INPUT_WITH_LABEL));

    expect($('.ons-input').hasClass('ons-input--placeholder')).toBe(true);
  });

  it('does not have `placeholder` attribute', () => {
    const $ = cheerio.load(renderComponent('input', EXAMPLE_INPUT_MINIMAL));

    expect($('.ons-input').attr('placeholder')).toBeUndefined();
  });

  it('has `placeholder` attribute when `placeholder` is provided', () => {
    const $ = cheerio.load(renderComponent('input', EXAMPLE_INPUT_WITH_LABEL));

    expect($('.ons-input').attr('placeholder')).toBe('Example input label');
  });

  it('does not have `min` attribute', () => {
    const $ = cheerio.load(renderComponent('input', EXAMPLE_INPUT_MINIMAL));

    expect($('.ons-input').attr('min')).toBeUndefined();
  });

  it('has `min` attribute when `min` is provided', () => {
    const $ = cheerio.load(
      renderComponent('input', {
        ...EXAMPLE_INPUT_MINIMAL,
        min: 10,
      }),
    );

    expect($('.ons-input').attr('min')).toBe('10');
  });

  it('does not have `max` attribute', () => {
    const $ = cheerio.load(renderComponent('input', EXAMPLE_INPUT_MINIMAL));

    expect($('.ons-input').attr('max')).toBeUndefined();
  });

  it('has `max` attribute when `max` is provided', () => {
    const $ = cheerio.load(
      renderComponent('input', {
        ...EXAMPLE_INPUT_MINIMAL,
        max: 100,
      }),
    );

    expect($('.ons-input').attr('max')).toBe('100');
  });

  it('does not have `value` attribute', () => {
    const $ = cheerio.load(renderComponent('input', EXAMPLE_INPUT_MINIMAL));

    expect($('.ons-input').attr('value')).toBeUndefined();
  });

  it('has `value` attribute when `value` is provided', () => {
    const $ = cheerio.load(
      renderComponent('input', {
        ...EXAMPLE_INPUT_MINIMAL,
        value: '100',
      }),
    );

    expect($('.ons-input').attr('value')).toBe('100');
  });

  it('does not have `accept` attribute', () => {
    const $ = cheerio.load(renderComponent('input', EXAMPLE_INPUT_MINIMAL));

    expect($('.ons-input').attr('accept')).toBeUndefined();
  });

  it('has `accept` attribute when `accept` is provided', () => {
    const $ = cheerio.load(
      renderComponent('input', {
        ...EXAMPLE_INPUT_MINIMAL,
        accept: 'image/*',
      }),
    );

    expect($('.ons-input').attr('accept')).toBe('image/*');
  });

  it('does not have `autocomplete` attribute', () => {
    const $ = cheerio.load(renderComponent('input', EXAMPLE_INPUT_MINIMAL));

    expect($('.ons-input').attr('autocomplete')).toBeUndefined();
  });

  it('has `autocomplete` attribute when `autocomplete` is provided', () => {
    const $ = cheerio.load(
      renderComponent('input', {
        ...EXAMPLE_INPUT_MINIMAL,
        autocomplete: 'on',
      }),
    );

    expect($('.ons-input').attr('autocomplete')).toBe('on');
  });

  it.each([['email'], ['tel'], ['text']])('outputs `type` attribute of "%s"', type => {
    const $ = cheerio.load(
      renderComponent('input', {
        ...EXAMPLE_INPUT_MINIMAL,
        type,
      }),
    );

    expect($('.ons-input').attr('type')).toBe(type);
    expect($('.ons-input').attr('pattern')).toBeUndefined();
    expect($('.ons-input').attr('inputmode')).toBeUndefined();
  });

  it.each([
    ['number', 10, 'ons-input-number--w-10'],
    ['tel', 20, 'ons-input-number--w-20'],
  ])('adds class "ons-input-number" when `type` is "%s"', (type, width, expectedClass) => {
    const $ = cheerio.load(
      renderComponent('input', {
        ...EXAMPLE_INPUT_MINIMAL,
        type,
        width,
      }),
    );

    expect($('.ons-input').hasClass(expectedClass)).toBe(true);
  });

  describe('listeners', () => {
    it('renders each listener', () => {
      const $ = cheerio.load(
        renderComponent('input', {
          ...EXAMPLE_INPUT_MINIMAL,
          listeners: {
            click: `alert('Input was clicked')`,
            keypress: `alert('Key was pressed')`,
          },
        }),
      );

      const script = $('script').html();
      expect(script).toContain(
        `document.getElementById("example-id").addEventListener('click', function(){ alert(&#39;Input was clicked&#39;) });`,
      );
      expect(script).toContain(
        `document.getElementById("example-id").addEventListener('keypress', function(){ alert(&#39;Key was pressed&#39;) });`,
      );
    });
  });

  it('renders field component', () => {
    const faker = templateFaker();
    const fieldSpy = faker.spy('field');

    faker.renderComponent('input', {
      ...EXAMPLE_INPUT_WITH_ERROR,
      fieldId: 'example-field-id',
      fieldClasses: 'extra-field-class',
      dontWrap: true,
    });

    expect(fieldSpy.occurrences).toContainEqual({
      id: 'example-field-id',
      classes: 'extra-field-class',
      dontWrap: true,
      error: EXAMPLE_INPUT_WITH_ERROR.error,
      inline: false,
    });
  });

  describe('label', () => {
    it('does not output a label when `label` is not provided', () => {
      const faker = templateFaker();
      const labelSpy = faker.spy('label');

      faker.renderComponent('input', EXAMPLE_INPUT_MINIMAL);

      expect(labelSpy.occurrences.length).toBe(0);
    });

    it('outputs a label when `label` is provided', () => {
      const faker = templateFaker();
      const labelSpy = faker.spy('label');

      faker.renderComponent('input', EXAMPLE_INPUT_WITH_LABEL);

      expect(labelSpy.occurrences).toContainEqual({
        for: 'example-id',
        id: 'example-input-label',
        text: 'Example input label',
        classes: 'extra-label-class',
        description: 'Example input label description',
        attributes: { a: 42 },
        inline: false,
        accessiblePlaceholder: true,
      });
    });

    it('outputs `aria-describedby` attribute referencing the label', () => {
      const $ = cheerio.load(renderComponent('input', EXAMPLE_INPUT_WITH_LABEL));

      expect($('.ons-input').attr('aria-describedby')).toBe('example-input-label-description-hint');
    });

    it('outputs a default `aria-describedby` attribute referencing the label when label does not have an `id`', () => {
      const $ = cheerio.load(
        renderComponent('input', {
          ...EXAMPLE_INPUT_MINIMAL,
          label: {
            text: 'Example input label',
            description: 'Example input label description',
          },
        }),
      );

      expect($('.ons-input').attr('aria-describedby')).toBe('description-hint');
    });
  });

  describe('prefix and suffix', () => {
    it('passes jest-axe checks', async () => {
      const $ = cheerio.load(
        renderComponent('input', {
          ...EXAMPLE_INPUT_MINIMAL,
          prefix: {
            id: 'example-prefix-id',
            title: 'Example prefix title',
          },
        }),
      );

      const results = await axe($.html());
      expect(results).toHaveNoViolations();
    });

    it('adds `aria-labelledby` attribute when `prefix` is provided', () => {
      const $ = cheerio.load(
        renderComponent('input', {
          ...EXAMPLE_INPUT_MINIMAL,
          prefix: {
            id: 'example-prefix-id',
            title: 'Example prefix title',
          },
        }),
      );

      expect($('.ons-input').attr('aria-labelledby')).toBe('example-prefix-id');
    });

    it('renders prefix element from `prefix.text`', () => {
      const $ = cheerio.load(
        renderComponent('input', {
          ...EXAMPLE_INPUT_MINIMAL,
          prefix: {
            id: 'example-prefix-id',
            title: 'Example prefix title',
            text: 'Example prefix text',
          },
        }),
      );

      expect($('.ons-input-type--prefix .ons-js-input-abbr').attr('id')).toBe('example-prefix-id');
      expect($('.ons-input-type--prefix .ons-js-input-abbr').attr('title')).toBe('Example prefix title');
      expect(
        $('.ons-input-type--prefix .ons-js-input-abbr')
          .text()
          .trim(),
      ).toBe('Example prefix text');
    });

    it('does not render prefix element when `prefix.id` not set', () => {
      const $ = cheerio.load(
        renderComponent('input', {
          ...EXAMPLE_INPUT_MINIMAL,
          prefix: {
            title: 'Example prefix title',
            text: 'Example prefix text',
          },
        }),
      );

      expect($('.ons-input-type--prefix').length).toBe(0);
    });

    it('adds `aria-labelledby` attribute when `suffix` is provided', () => {
      const $ = cheerio.load(
        renderComponent('input', {
          ...EXAMPLE_INPUT_MINIMAL,
          suffix: {
            id: 'example-suffix-id',
            title: 'Example suffix title',
          },
        }),
      );

      expect($('.ons-input').attr('aria-labelledby')).toBe('example-suffix-id');
    });

    it('renders suffix element from `suffix.text`', () => {
      const $ = cheerio.load(
        renderComponent('input', {
          ...EXAMPLE_INPUT_MINIMAL,
          suffix: {
            id: 'example-suffix-id',
            title: 'Example suffix title',
            text: 'Example suffix text',
          },
        }),
      );

      expect($('.ons-js-input-abbr').attr('id')).toBe('example-suffix-id');
      expect($('.ons-js-input-abbr').attr('title')).toBe('Example suffix title');
      expect(
        $('.ons-js-input-abbr')
          .text()
          .trim(),
      ).toBe('Example suffix text');
    });

    it('does not render suffix element when `suffix.id` not set', () => {
      const $ = cheerio.load(
        renderComponent('input', {
          ...EXAMPLE_INPUT_MINIMAL,
          suffix: {
            title: 'Example suffix title',
            text: 'Example suffix text',
          },
        }),
      );

      expect($('.ons-input').length).toBe(0);
    });

    it('renders an `abbr` tag when `title` set', () => {
      const $ = cheerio.load(
        renderComponent('input', {
          ...EXAMPLE_INPUT_MINIMAL,
          suffix: {
            text: 'Example suffix text',
            title: 'Example suffix title',
            id: 'example-suffix-id',
          },
        }),
      );

      expect($('.ons-input + abbr').length).toBe(1);
    });

    it('renders a `span` tag when `title` not set', () => {
      const $ = cheerio.load(
        renderComponent('input', {
          ...EXAMPLE_INPUT_MINIMAL,
          suffix: {
            text: 'Example suffix text',
            id: 'example-suffix-id',
          },
        }),
      );

      expect($('.ons-input + span').length).toBe(1);
    });
  });

  describe('search', () => {
    it('renders `search` component', () => {
      const faker = templateFaker();
      const searchSpy = faker.spy('search');

      faker.renderComponent('input', EXAMPLE_WITH_SEARCH);

      expect(searchSpy.occurrences[0]).toEqual({
        accessiblePlaceholder: true,
        searchButton: {
          type: 'button',
          text: 'Search for address',
          id: 'search-for-address',
          attributes: { a: 42 },
          classes: 'extra-search-button-class',
          iconType: 'search',
          visuallyHideButtonText: true,
        },
      });
    });

    it.each('outputs `type` attribute of "search"', () => {
      const $ = cheerio.load(renderComponent('input', EXAMPLE_WITH_SEARCH));

      expect($('.ons-input').attr('type')).toBe('search');
      expect($('.ons-input').attr('pattern')).toBeUndefined();
      expect($('.ons-input').attr('inputmode')).toBeUndefined();
    });

    it('has the "ons-search__input" class', () => {
      const $ = cheerio.load(renderComponent('input', EXAMPLE_WITH_SEARCH));

      expect($('.ons-input').hasClass('ons-search__input')).toBe(true);
    });
  });

  describe('with character limit', () => {
    it('passes jest-axe checks', async () => {
      const $ = cheerio.load(
        renderComponent('input', {
          ...EXAMPLE_INPUT_WITH_CHARACTER_LIMIT,
          label: {
            id: 'example-input-label',
            text: 'Example input label',
          },
        }),
      );

      const results = await axe($.html());
      expect(results).toHaveNoViolations();
    });

    it('has the provided minimum length', () => {
      const $ = cheerio.load(renderComponent('input', EXAMPLE_INPUT_WITH_CHARACTER_LIMIT));

      expect($('.ons-input').attr('minlength')).toBe('10');
    });

    it('has the provided maximum length', () => {
      const $ = cheerio.load(renderComponent('input', EXAMPLE_INPUT_WITH_CHARACTER_LIMIT));

      expect($('.ons-input').attr('maxlength')).toBe('200');
    });

    it('does not have `data-char-check-countdown` attribute when `charcheckCountdown` is not provided', () => {
      const $ = cheerio.load(renderComponent('input', EXAMPLE_INPUT_WITH_CHARACTER_LIMIT));

      expect($('.ons-input').attr('data-char-check-countdown')).toBe(undefined);
    });

    it('has `data-char-check-countdown` attribute when `charcheckCountdown` is true', () => {
      const $ = cheerio.load(
        renderComponent('input', {
          ...EXAMPLE_INPUT_WITH_CHARACTER_LIMIT,
          charCheckLimit: {
            ...EXAMPLE_INPUT_WITH_CHARACTER_LIMIT.charCheckLimit,
            charcheckCountdown: true,
          },
        }),
      );

      expect($('.ons-input').attr('data-char-check-countdown')).toBe('true');
    });

    it('has data attribute which references the character limit component', () => {
      const $ = cheerio.load(renderComponent('input', EXAMPLE_INPUT_WITH_CHARACTER_LIMIT));

      expect($('.ons-input').attr('data-char-check-ref')).toBe('example-id-check-remaining');
    });

    it('has data attribute which defines limit for character check', () => {
      const $ = cheerio.load(renderComponent('input', EXAMPLE_INPUT_WITH_CHARACTER_LIMIT));

      expect($('.ons-input').attr('data-char-check-num')).toBe('200');
    });

    it('has `aria-describedby` attribute which references the character limit component', () => {
      const $ = cheerio.load(renderComponent('input', EXAMPLE_INPUT_WITH_CHARACTER_LIMIT));

      expect($('.ons-input').attr('aria-describedby')).toBe('example-id-check-remaining');
    });

    it('renders character limit component', () => {
      const faker = templateFaker();
      const charCheckLimitSpy = faker.spy('char-check-limit');

      faker.renderComponent('input', EXAMPLE_INPUT_WITH_CHARACTER_LIMIT);

      expect(charCheckLimitSpy.occurrences).toContainEqual({
        id: 'example-id-check',
        limit: 200,
        type: 'check',
        charCountSingular: 'You have {x} character remaining',
        charCountPlural: 'You have {x} characters remaining',
        charCountOverLimitSingular: '{x} character too many',
        charCountOverLimitPlural: '{x} characters too many',
      });
    });
  });

  describe('with error', () => {
    it('has the `error` modifier class', () => {
      const $ = cheerio.load(renderComponent('input', EXAMPLE_INPUT_WITH_ERROR));

      expect($('.ons-input').hasClass('ons-input--error')).toBe(true);
    });
  });

  describe('with post textbox link', () => {
    it('renders the expected link', () => {
      const $ = cheerio.load(
        renderComponent('input', {
          ...EXAMPLE_INPUT_MINIMAL,
          postTextboxLinkUrl: 'https://example.com/link',
          postTextboxLinkText: 'Example link',
        }),
      );

      expect($('a.ons-input__post-link').attr('href')).toBe('https://example.com/link');
      expect(
        $('a.ons-input__post-link')
          .text()
          .trim(),
      ).toBe('Example link');
    });
  });

  describe('mutually exclusive', () => {
    it('passes jest-axe checks', async () => {
      const $ = cheerio.load(renderComponent('input', EXAMPLE_INPUT_WITH_MUTUALLY_EXCLUSIVE_WITH_ERROR));

      const results = await axe($.html());
      expect(results).toHaveNoViolations();
    });

    it('has the `ons-js-exclusive-group-item` class', () => {
      const $ = cheerio.load(renderComponent('input', EXAMPLE_INPUT_WITH_MUTUALLY_EXCLUSIVE_WITH_ERROR));

      expect($('.ons-input').hasClass('ons-js-exclusive-group-item')).toBe(true);
    });

    it('renders mutually exclusive component', () => {
      const faker = templateFaker();
      const mutuallyExclusiveSpy = faker.spy('mutually-exclusive');

      faker.renderComponent('input', {
        ...EXAMPLE_INPUT_WITH_MUTUALLY_EXCLUSIVE_WITH_ERROR,
        fieldId: 'example-field-id',
        fieldClasses: 'extra-field-class',
        legend: 'Legend text',
        legendClasses: 'extra-legend-class',
        description: 'Example description text',
        legendIsQuestionTitle: true,
        autosuggestResults: 'RESULTS',
      });

      expect(mutuallyExclusiveSpy.occurrences).toContainEqual({
        id: 'example-field-id',
        legend: 'Legend text',
        legendClasses: 'extra-legend-class ons-js-input-legend',
        description: 'Example description text',
        dontWrap: true,
        legendIsQuestionTitle: true,
        exclusiveOptions: EXAMPLE_INPUT_WITH_MUTUALLY_EXCLUSIVE_WITH_ERROR.mutuallyExclusive.exclusiveOptions,
        or: 'Or',
        deselectMessage: 'Selecting this will clear your feedback',
        deselectGroupAdjective: 'cleared',
        deselectExclusiveOptionAdjective: 'deselected',
        error: EXAMPLE_INPUT_WITH_MUTUALLY_EXCLUSIVE_WITH_ERROR.error,
        autosuggestResults: 'RESULTS',
      });
    });
  });
});
