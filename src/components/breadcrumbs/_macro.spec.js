/** @jest-environment jsdom */

import * as cheerio from 'cheerio';

import axe from '../../tests/helpers/axe';
import { mapAll } from '../../tests/helpers/cheerio';
import { renderComponent, templateFaker } from '../../tests/helpers/rendering';

const EXAMPLE_BREADCRUMBS_MINIMAL = {
  itemsList: [
    {
      url: 'https://example.com/',
      text: 'Home',
    },
    {
      url: 'https://example.com/guide/',
      text: 'Guide',
    },
  ],
};

const EXAMPLE_BREADCRUMBS = {
  classes: 'extra-class another-extra-class',
  ariaLabel: 'Breadcrumbs label',
  id: 'example-breadcrumbs',
  itemsList: [
    {
      itemClasses: 'item-extra-class item-another-extra-class',
      linkClasses: 'link-extra-class link-another-extra-class',
      url: 'https://example.com/',
      text: 'Home',
      attributes: {
        'data-a': '123',
        'data-b': '456',
      },
      id: 'first-breadcrumb',
    },
    {
      url: 'https://example.com/guide/',
      text: 'Guide',
      id: 'second-breadcrumb',
      attributes: {
        'data-a': '789',
        'data-b': 'ABC',
      },
    },
  ],
};

describe('macro: breadcrumbs', () => {
  it('passes jest-axe checks', async () => {
    const $ = cheerio.load(renderComponent('breadcrumbs', EXAMPLE_BREADCRUMBS));

    const results = await axe($.html());
    expect(results).toHaveNoViolations();
  });

  it('has additionally provided style classes', () => {
    const $ = cheerio.load(renderComponent('breadcrumbs', EXAMPLE_BREADCRUMBS));

    expect($('.ons-breadcrumb').hasClass('extra-class')).toBe(true);
    expect($('.ons-breadcrumb').hasClass('another-extra-class')).toBe(true);
  });

  it('has a default `aria-label` of "Breadcrumbs"', () => {
    const $ = cheerio.load(renderComponent('breadcrumbs', EXAMPLE_BREADCRUMBS_MINIMAL));

    expect($('.ons-breadcrumb').attr('aria-label')).toBe('Breadcrumbs');
  });

  it('has the provided `ariaLabel` for `aria-label`', () => {
    const $ = cheerio.load(renderComponent('breadcrumbs', EXAMPLE_BREADCRUMBS));

    expect($('.ons-breadcrumb').attr('aria-label')).toBe('Breadcrumbs label');
  });

  it('has the provided `id`', () => {
    const $ = cheerio.load(renderComponent('breadcrumbs', EXAMPLE_BREADCRUMBS));

    expect($('.ons-breadcrumb').attr('id')).toBe('example-breadcrumbs');
  });

  it('has additionally provided style classes on `item` element', () => {
    const $ = cheerio.load(renderComponent('breadcrumbs', EXAMPLE_BREADCRUMBS));

    expect($('.ons-breadcrumb__item:first').hasClass('item-extra-class')).toBe(true);
    expect($('.ons-breadcrumb__item:first').hasClass('item-another-extra-class')).toBe(true);
  });

  it('has additionally provided style classes on `link` element', () => {
    const $ = cheerio.load(renderComponent('breadcrumbs', EXAMPLE_BREADCRUMBS));

    expect($('.ons-breadcrumb__link:first').hasClass('link-extra-class')).toBe(true);
    expect($('.ons-breadcrumb__link:first').hasClass('link-another-extra-class')).toBe(true);
  });

  it('has provided `url` on `link` elements', () => {
    const $ = cheerio.load(renderComponent('breadcrumbs', EXAMPLE_BREADCRUMBS));

    const urls = mapAll($('.ons-breadcrumb__link'), node => node.attr('href'));
    expect(urls).toEqual(['https://example.com/', 'https://example.com/guide/']);
  });

  it('has provided `text` on `link` elements', () => {
    const $ = cheerio.load(renderComponent('breadcrumbs', EXAMPLE_BREADCRUMBS));

    const labels = mapAll($('.ons-breadcrumb__link'), node => node.text().trim());
    expect(labels).toEqual(['Home', 'Guide']);
  });

  it('has provided `attributes` on `link` elements', () => {
    const $ = cheerio.load(renderComponent('breadcrumbs', EXAMPLE_BREADCRUMBS));

    const testValuesA = mapAll($('.ons-breadcrumb__link'), node => node.attr('data-a'));
    expect(testValuesA).toEqual(['123', '789']);
    const testValuesB = mapAll($('.ons-breadcrumb__link'), node => node.attr('data-b'));
    expect(testValuesB).toEqual(['456', 'ABC']);
  });

  it('has a "chevron" icon for each breadcrumb item', () => {
    const faker = templateFaker();
    const iconsSpy = faker.spy('icons');

    faker.renderComponent('breadcrumbs', EXAMPLE_BREADCRUMBS_MINIMAL);

    const iconTypes = iconsSpy.occurrences.map(occurrence => occurrence.iconType);
    expect(iconTypes).toEqual(['chevron', 'chevron']);
  });
});
