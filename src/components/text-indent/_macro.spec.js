/** @jest-environment jsdom */

import * as cheerio from 'cheerio';

import axe from '../../tests/helpers/axe';
import { renderComponent } from '../../tests/helpers/rendering';

describe('macro: text-indent', () => {
  describe('mode: text parameter', () => {
    it('passes jest-axe checks', async () => {
      const $ = cheerio.load(
        renderComponent('text-indent', {
          text: 'Example text...',
        }),
      );

      const results = await axe($.html());
      expect(results).toHaveNoViolations();
    });

    it('has expected text', async () => {
      const $ = cheerio.load(
        renderComponent('text-indent', {
          text: 'Example text...',
        }),
      );

      const content = $('.ons-text-indent')
        .text()
        .trim();
      expect(content).toBe('Example text...');
    });
  });

  describe('mode: called with content', () => {
    it('passes jest-axe checks', async () => {
      const $ = cheerio.load(renderComponent('text-indent', {}, 'Example content...'));

      const results = await axe($.html());
      expect(results).toHaveNoViolations();
    });

    it('has expected text', async () => {
      const $ = cheerio.load(renderComponent('text-indent', {}, 'Example content...'));

      const content = $('.ons-text-indent')
        .text()
        .trim();
      expect(content).toBe('Example content...');
    });
  });
});
