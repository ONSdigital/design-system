/** @jest-environment jsdom */

import * as cheerio from 'cheerio';

import axe from '../../tests/helpers/axe';
import { renderComponent } from '../../tests/helpers/rendering';

const EXAMPLE_TABS = {
  title: 'Example tabs',
  tabs: [
    {
      title: 'Tab 1',
      content: 'Example content...',
    },
    {
      title: 'Tab 2',
      content: 'Some nested <strong>strong element</strong>...',
    },
  ],
};

describe('macro: tabs', () => {
  it('passes jest-axe checks', async () => {
    const $ = cheerio.load(renderComponent('tabs', EXAMPLE_TABS));

    const results = await axe($.html());
    expect(results).toHaveNoViolations();
  });

  it('has the provided `title`', () => {
    const $ = cheerio.load(renderComponent('tabs', EXAMPLE_TABS));

    expect(
      $('.ons-tabs__title')
        .text()
        .trim(),
    ).toBe('Example tabs');
  });

  it('has expected label text in tab links', () => {
    const $ = cheerio.load(renderComponent('tabs', EXAMPLE_TABS));

    expect(
      $('.ons-tab:first')
        .text()
        .trim(),
    ).toBe('Tab 1');
    expect(
      $('.ons-tab:last')
        .text()
        .trim(),
    ).toBe('Tab 2');
  });

  it('has Google Analytics integration on tab links', () => {
    const $ = cheerio.load(renderComponent('tabs', EXAMPLE_TABS));

    const tabItem = $('.ons-tab');
    expect(tabItem.attr('data-ga')).toBe('click');
    expect(tabItem.attr('data-ga-category')).toBe('tabs');
    expect(tabItem.attr('data-ga-action')).toBe('Show: Tab 1');
    expect(tabItem.attr('data-ga-label')).toBe('Show: Tab 1');
  });

  it('has expected content in tab panels', () => {
    const $ = cheerio.load(renderComponent('tabs', EXAMPLE_TABS));

    expect(
      $('.ons-tabs__panel:first')
        .html()
        .trim(),
    ).toBe('Example content...');
    expect(
      $('.ons-tabs__panel:last')
        .html()
        .trim(),
    ).toBe('Some nested <strong>strong element</strong>...');
  });
});
