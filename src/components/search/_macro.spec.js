/** @jest-environment jsdom */

import * as cheerio from 'cheerio';

import axe from '../../tests/helpers/axe';
import { renderComponent, templateFaker } from '../../tests/helpers/rendering';

const EXAMPLE_SEARCH = {
  searchButton: {
    id: 'search-button-id',
    type: 'button',
    text: 'Search for address',
    iconType: 'search',
    classes: 'extra-search-button-class',
    attributes: { a: 42 },
  },
};

const FAKE_NESTED_CONTENT = '<span class="test--nested">Nested content...</span>';

describe('macro: search', () => {
  it('renders expected nested content', () => {
    const $ = cheerio.load(renderComponent('search', EXAMPLE_SEARCH, FAKE_NESTED_CONTENT));

    expect($('.ons-search-component .test--nested').text()).toBe('Nested content...');
  });

  it('renders button component', () => {
    const faker = templateFaker();
    const buttonSpy = faker.spy('button');

    faker.renderComponent('input', EXAMPLE_SEARCH);

    expect(buttonSpy.occurrences[0]).toEqual({
      id: 'search-button-id',
      type: 'button',
      text: 'Search for address',
      variants: 'small',
      classes: 'ons-search__btn ons-u-mt-xs@xxs@s extra-search-button-class',
      attributes: EXAMPLE_SEARCH.searchButton.attributes,
      iconType: 'search',
    });
  });
});
