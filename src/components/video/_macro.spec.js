/** @jest-environment jsdom */

import * as cheerio from 'cheerio';

import axe from '../../tests/helpers/axe';
import { renderComponent } from '../../tests/helpers/rendering';

const EXAMPLE_VIDEO_YOUTUBE = {
  videoEmbedUrl: 'https://www.youtube.com/embed/_EGJlvkgbPo',
  title: 'Census 2021 promotional TV advert',
  linkText: 'Example link text',
};

describe('macro: video', () => {
  it('passes jest-axe checks', async () => {
    const $ = cheerio.load(renderComponent('video', EXAMPLE_VIDEO_YOUTUBE));

    const results = await axe($.html());
    expect(results).toHaveNoViolations();
  });

  it('outputs the default cover image', () => {
    const $ = cheerio.load(renderComponent('video', EXAMPLE_VIDEO_YOUTUBE));

    expect($('.ons-video__img').attr('src')).toBe('/img/placeholder-video.png');
  });

  it('outputs the provided cover image', () => {
    const $ = cheerio.load(renderComponent('video', { ...EXAMPLE_VIDEO_YOUTUBE, coverImage: 'example-cover.png' }));

    expect($('.ons-video__img').attr('src')).toBe('example-cover.png');
  });

  it('outputs the provided link text', () => {
    const $ = cheerio.load(renderComponent('video', { ...EXAMPLE_VIDEO_YOUTUBE, coverImage: 'example-cover.png' }));

    expect(
      $('.ons-video__link-text')
        .text()
        .trim(),
    ).toBe('Example link text');
  });

  it('outputs a hyperlink with the provided `url`', () => {
    const $ = cheerio.load(renderComponent('video', EXAMPLE_VIDEO_YOUTUBE));

    expect($('.ons-video__link').attr('href')).toBe('https://www.youtube.com/embed/_EGJlvkgbPo');
  });

  it('outputs an <iframe> element with the provided `title`', () => {
    const $ = cheerio.load(renderComponent('video', EXAMPLE_VIDEO_YOUTUBE));

    expect($('iframe').attr('title')).toBe('Census 2021 promotional TV advert');
  });

  it('outputs an <iframe> element with the provided `videoEmbedUrl` data attribute', () => {
    const $ = cheerio.load(renderComponent('video', EXAMPLE_VIDEO_YOUTUBE));

    expect($('iframe').attr('data-src')).toBe('https://www.youtube.com/embed/_EGJlvkgbPo');
  });
});
