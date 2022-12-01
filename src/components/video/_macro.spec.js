/** @jest-environment jsdom */

import * as cheerio from 'cheerio';

import axe from '../../tests/helpers/axe';
import { renderComponent } from '../../tests/helpers/rendering';

const EXAMPLE_VIDEO_YOUTUBE = {
  videoEmbedUrl: 'https://www.youtube.com/embed/_EGJlvkgbPo',
  videoLinkURL: 'https://www.youtube.com/watch?v=_EGJlvkgbPo',
  title: 'Census 2021 promotional TV advert',
  linkText: 'Example link text',
  image: {
    smallSrc: 'example-small.png',
    largeSrc: 'example-large.png',
    alt: 'Example alt text',
  },
};

describe('macro: video', () => {
  it('passes jest-axe checks', async () => {
    const $ = cheerio.load(renderComponent('video', EXAMPLE_VIDEO_YOUTUBE));

    const results = await axe($.html());
    expect(results).toHaveNoViolations();
  });

  it('outputs an `img` element with the expected `srcset`', () => {
    const $ = cheerio.load(renderComponent('video', EXAMPLE_VIDEO_YOUTUBE));

    expect($('.ons-video__img').attr('srcset')).toBe('example-small.png 1x, example-large.png 2x');
  });

  it('outputs an `img` element with the expected `src`', () => {
    const $ = cheerio.load(renderComponent('video', EXAMPLE_VIDEO_YOUTUBE));

    expect($('.ons-video__img').attr('src')).toBe('example-small.png');
  });

  it('outputs an `img` element with the expected alt text', () => {
    const $ = cheerio.load(renderComponent('video', EXAMPLE_VIDEO_YOUTUBE));

    expect($('.ons-video__img').attr('alt')).toBe('Example alt text');
  });

  it('outputs the provided link text', () => {
    const $ = cheerio.load(renderComponent('video', EXAMPLE_VIDEO_YOUTUBE));

    expect(
      $('.ons-video__link-text')
        .text()
        .trim(),
    ).toBe('Example link text');
  });

  it('outputs a hyperlink with the provided `url`', () => {
    const $ = cheerio.load(renderComponent('video', EXAMPLE_VIDEO_YOUTUBE));

    expect($('.ons-video__link').attr('href')).toBe('https://www.youtube.com/watch?v=_EGJlvkgbPo');
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
