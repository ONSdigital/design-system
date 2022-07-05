/** @jest-environment jsdom */

import * as cheerio from 'cheerio';

import axe from '../../tests/helpers/axe';
import { renderComponent } from '../../tests/helpers/rendering';

const EXAMPLE_RELATED_SECTION_CONTENT = {
  title: 'Related information',
  id: 'related-general-content',
};

describe('macro: related-content/section', () => {
  it('passes jest-axe checks', async () => {
    const $ = cheerio.load(renderComponent('related-content/section', EXAMPLE_RELATED_SECTION_CONTENT));

    const results = await axe($.html());
    expect(results).toHaveNoViolations();
  });

  it('has the provided `title` text', () => {
    const $ = cheerio.load(renderComponent('related-content/section', EXAMPLE_RELATED_SECTION_CONTENT));
    expect(
      $('.ons-related-content__title')
        .text()
        .trim(),
    ).toEqual('Related information');
  });

  it('has the `id` attribute for the title', () => {
    const $ = cheerio.load(renderComponent('related-content/section', EXAMPLE_RELATED_SECTION_CONTENT));
    expect($('#related-general-content').length).toBe(1);
  });

  it('has the provided content', () => {
    const $ = cheerio.load(renderComponent('related-content/section', { EXAMPLE_RELATED_SECTION_CONTENT }, 'Example content...'));

    const content = $('.ons-related-content__content')
      .text()
      .trim();
    expect(content).toEqual(expect.stringContaining('Example content...'));
  });
});
