/** @jest-environment jsdom */

import * as cheerio from 'cheerio';

import axe from '../../tests/helpers/axe';
import { renderComponent } from '../../tests/helpers/rendering';

const EXAMPLE_VIDEO_YOUTUBE = {
  videoEmbedUrl: 'https://www.youtube.com/embed/_EGJlvkgbPo',
  title: 'Census 2021 promotional TV advert',
};

const EXAMPLE_VIDEO_VIMEO = {
  videoEmbedUrl: 'https://player.vimeo.com/video/508878572',
  title: 'A message from National Statistician Ian Diamond for National Apprenticeship Week 2021',
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

    it('outputs an <iframe> element with the provided `videoEmbedUrl`', () => {
      const $ = cheerio.load(renderComponent('video', EXAMPLE_VIDEO_YOUTUBE));

      expect($('iframe').attr('src')).toBe('https://www.youtube.com/embed/_EGJlvkgbPo');
    });
  });

  describe('mode: Vimeo', () => {
    it('passes jest-axe checks', async () => {
      const $ = cheerio.load(renderComponent('video', EXAMPLE_VIDEO_VIMEO));

      const results = await axe($.html());
      expect(results).toHaveNoViolations();
    });

    it('outputs an <iframe> element with the provided `title`', () => {
      const $ = cheerio.load(renderComponent('video', EXAMPLE_VIDEO_VIMEO));

      expect($('iframe').attr('title')).toBe('A message from National Statistician Ian Diamond for National Apprenticeship Week 2021');
    });

    it('outputs an <iframe> element with the provided `videoEmbedUrl`', () => {
      const $ = cheerio.load(renderComponent('video', EXAMPLE_VIDEO_VIMEO));

      expect($('iframe').attr('src')).toBe('https://player.vimeo.com/video/508878572');
    });
  });
});
