/** @jest-environment jsdom */

import * as cheerio from 'cheerio';

import axe from '../../tests/helpers/axe';
import { renderComponent } from '../../tests/helpers/rendering';

const EXAMPLE_VIDEO_YOUTUBE = {
  youtubeUrl: 'https://www.youtube.com/embed/_EGJlvkgbPo',
  title: 'Census 2021 promotional TV advert',
};

describe('macro: video', () => {
  describe('mode: YouTube', () => {
    it('passes jest-axe checks', async () => {
      const $ = cheerio.load(renderComponent('video', EXAMPLE_VIDEO_YOUTUBE));

      const results = await axe($.html());
      expect(results).toHaveNoViolations();
    });

    it('outputs an <iframe> element with the provided `title`', () => {
      const $ = cheerio.load(renderComponent('video', EXAMPLE_VIDEO_YOUTUBE));

      expect($('iframe').attr('title')).toBe('Census 2021 promotional TV advert');
    });

    it('outputs an <iframe> element with the provided `youtubeUrl`', () => {
      const $ = cheerio.load(renderComponent('video', EXAMPLE_VIDEO_YOUTUBE));

      expect($('iframe').attr('src')).toBe('https://www.youtube.com/embed/_EGJlvkgbPo');
    });
  });
});
