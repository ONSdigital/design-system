/** @jest-environment jsdom */

import * as cheerio from 'cheerio';

import axe from '../../tests/helpers/axe';
import { renderComponent } from '../../tests/helpers/rendering';

const EXAMPLE_METADATA_FULL = {
  id: 'example-id',
  classes: 'ons-u-mb-no',
  metadataLabel: 'This is an example of the metadata component',
  termCol: 2,
  descriptionCol: 10,
  itemsList: [
    {
      term: 'Survey:',
      descriptions: [
        {
          id: 'description-1',
          description: 'Bricks & Blocks',
        },
      ],
    },
    {
      term: 'RU Refs:',
      descriptions: [
        {
          id: 'description-2',
          description: '49900000118',
        },
        {
          id: 'description-3',
          description: '49300005832',
        },
      ],
    },
  ],
};

const EXAMPLE_METADATA_MINIMAL = {
  itemsList: [
    {
      term: 'Survey:',
      descriptions: [
        {
          description: 'Bricks & Blocks',
        },
      ],
    },
    {
      term: 'RU Refs:',
      descriptions: [
        {
          description: '49900000118',
        },
        {
          description: '49300005832',
        },
      ],
    },
  ],
};

describe('macro: metadata', () => {
  it('passes jest-axe checks when all parameters are provided', async () => {
    const $ = cheerio.load(renderComponent('metadata', EXAMPLE_METADATA_FULL));

    const results = await axe($.html());
    expect(results).toHaveNoViolations();
  });

  it('passes jest-axe checks when minimal parameters are provided', async () => {
    const $ = cheerio.load(renderComponent('metadata', EXAMPLE_METADATA_MINIMAL));

    const results = await axe($.html());
    expect(results).toHaveNoViolations();
  });

  it('has the provided `id` attribute', () => {
    const $ = cheerio.load(
      renderComponent('metadata', {
        ...EXAMPLE_METADATA_MINIMAL,
        id: 'example-id',
      }),
    );

    expect($('#example-id').length).toBe(1);
  });

  it('has additionally provided style classes', () => {
    const $ = cheerio.load(
      renderComponent('metadata', {
        ...EXAMPLE_METADATA_MINIMAL,
        classes: 'extra-class another-extra-class',
      }),
    );

    expect($('.ons-metadata').hasClass('extra-class')).toBe(true);
    expect($('.ons-metadata').hasClass('another-extra-class')).toBe(true);
  });

  it('outputs `title` and `aria-label` attributes when `metadataLabel` is provided', () => {
    const $ = cheerio.load(
      renderComponent('metadata', {
        ...EXAMPLE_METADATA_MINIMAL,
        metadataLabel: 'This is an example of the metadata component',
      }),
    );

    expect($('.ons-metadata').attr('title')).toBe('This is an example of the metadata component');
    expect($('.ons-metadata').attr('aria-label')).toBe('This is an example of the metadata component');
  });

  it('outputs list items as expected', () => {
    const $ = cheerio.load(renderComponent('metadata', EXAMPLE_METADATA_FULL));

    const $listElements = $('.ons-metadata__term, .ons-metadata__value');

    expect($listElements[0].tagName).toBe('dt');
    expect($($listElements[0]).text()).toBe('Survey:');

    expect($listElements[1].tagName).toBe('dd');
    expect($($listElements[1]).attr('id')).toBe('description-1');
    expect($($listElements[1]).text()).toBe('Bricks & Blocks');

    expect($listElements[2].tagName).toBe('dt');
    expect($($listElements[2]).text()).toBe('RU Refs:');

    expect($listElements[3].tagName).toBe('dd');
    expect($($listElements[3]).attr('id')).toBe('description-2');
    expect($($listElements[3]).text()).toBe('49900000118');

    expect($listElements[4].tagName).toBe('dd');
    expect($($listElements[4]).attr('id')).toBe('description-3');
    expect($($listElements[4]).text()).toBe('49300005832');
  });

  it.each([
    [1, 'ons-col-1\\@m'],
    [4, 'ons-col-4\\@m'],
  ])('applies class for the provided `termCol` (%i -> %s)', (termCol, expectedClass) => {
    const $ = cheerio.load(
      renderComponent('metadata', {
        ...EXAMPLE_METADATA_MINIMAL,
        termCol,
      }),
    );

    const $termElements = $(`.ons-metadata__term.${expectedClass}`);
    expect($termElements.length).toBe(2);
  });

  it.each([
    [1, 'ons-col-1\\@m'],
    [4, 'ons-col-4\\@m'],
  ])('applies class for the provided `descriptionCol` (%i -> %s)', (descriptionCol, expectedClass) => {
    const $ = cheerio.load(
      renderComponent('metadata', {
        ...EXAMPLE_METADATA_MINIMAL,
        descriptionCol,
      }),
    );

    const $valueElements = $(`.ons-metadata__value.${expectedClass}`);
    expect($valueElements.length).toBe(3);
  });
});
