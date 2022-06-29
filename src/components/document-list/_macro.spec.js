/** @jest-environment jsdom */

import * as cheerio from 'cheerio';

import axe from '../../tests/helpers/axe';
import { renderComponent } from '../../tests/helpers/rendering';

const EXAMPLE_DOCUMENT_LIST_BASIC = {
  url: '#0',
  title: 'Crime and justice',
  description: 'Some description',
};

const EXAMPLE_DOCUMENT_LIST_WITH_THUMBNAIL = {
  ...EXAMPLE_DOCUMENT_LIST_BASIC,
  thumbnail: {
    smallSrc: '/example-small.png',
    largeSrc: '/example-large.png',
  },
};

const EXAMPLE_DOCUMENT_LIST_WITH_METADATA_FILE = {
  ...EXAMPLE_DOCUMENT_LIST_BASIC,
  metadata: {
    file: {
      fileType: 'PDF',
      fileSize: '499KB',
      filePages: '1 page',
    },
  },
};

const EXAMPLE_DOCUMENT_LIST_WITH_METADATA_TYPE = {
  ...EXAMPLE_DOCUMENT_LIST_BASIC,
  metadata: {
    type: {
      text: 'Poster',
      url: '#0',
      ref: 'some ref',
    },
  },
};

const EXAMPLE_DOCUMENT_LIST_WITH_MULTIPLE = {
  ...EXAMPLE_DOCUMENT_LIST_BASIC,
  id: 'some-id',
  thumbnail: {
    smallSrc: '/example-small.png',
    largeSrc: '/example-large.png',
  },
  metadata: {
    type: {
      text: 'Poster',
      url: '#0',
      ref: 'some ref',
    },
    file: {
      fileType: 'PDF',
      fileSize: '499KB',
      filePages: '1 page',
    },
    date: {
      iso: '2022-01-01',
      short: '1 January 2022',
      showPrefix: true,
      prefix: 'Released',
    },
  },
};

describe('macro: document list', () => {
  describe('global configuration', () => {
    it('passes jest-axe checks', async () => {
      const $ = cheerio.load(
        renderComponent('document-list', {
          id: 'some-id',
          documents: [EXAMPLE_DOCUMENT_LIST_BASIC, EXAMPLE_DOCUMENT_LIST_BASIC, EXAMPLE_DOCUMENT_LIST_BASIC],
        }),
      );

      const results = await axe($.html());
      expect(results).toHaveNoViolations();
    });

    it('has the provided `id` attribute', () => {
      const $ = cheerio.load(
        renderComponent('document-list', {
          id: 'some-id',
          documents: [EXAMPLE_DOCUMENT_LIST_BASIC, EXAMPLE_DOCUMENT_LIST_BASIC, EXAMPLE_DOCUMENT_LIST_BASIC],
        }),
      );

      expect($('#some-id').length).toBe(1);
    });

    it('has custom classes applied', () => {
      const $ = cheerio.load(
        renderComponent('document-list', {
          classes: 'custom-class',
          documents: [EXAMPLE_DOCUMENT_LIST_BASIC, EXAMPLE_DOCUMENT_LIST_BASIC, EXAMPLE_DOCUMENT_LIST_BASIC],
        }),
      );

      expect($('.ons-document-list').hasClass('custom-class')).toBe(true);
    });

    it('outputs the correct number of document items', () => {
      const $ = cheerio.load(
        renderComponent('document-list', {
          documents: [EXAMPLE_DOCUMENT_LIST_BASIC, EXAMPLE_DOCUMENT_LIST_BASIC, EXAMPLE_DOCUMENT_LIST_BASIC],
        }),
      );

      expect($('.ons-document-list__item').length).toBe(3);
    });

    it('has the correct container if `fullWidth`', () => {
      const $ = cheerio.load(
        renderComponent('document-list', {
          documents: [{ ...EXAMPLE_DOCUMENT_LIST_BASIC, fullWidth: true }],
        }),
      );

      expect($('.ons-container').length).toBe(1);
    });

    it('has the correct container class if `fullWidth` and `wide`', () => {
      const $ = cheerio.load(
        renderComponent('document-list', {
          documents: [{ ...EXAMPLE_DOCUMENT_LIST_BASIC, fullWidth: true, wide: true }],
        }),
      );

      expect($('.ons-container--wide').length).toBe(1);
    });

    it('has the correct container class if `featured`', () => {
      const $ = cheerio.load(
        renderComponent('document-list', {
          documents: [{ ...EXAMPLE_DOCUMENT_LIST_BASIC, featured: true }],
        }),
      );

      expect($('.ons-document-list__item--featured').length).toBe(1);
    });

    it('has the correct class for `showMetadataFirst`', () => {
      const $ = cheerio.load(
        renderComponent('document-list', {
          documents: [{ ...EXAMPLE_DOCUMENT_LIST_BASIC, showMetadataFirst: true }],
        }),
      );

      expect($('.ons-document-list__item-header--reverse').length).toBe(1);
    });

    it('overrides the heading title tag when `titleTag` is provided', () => {
      const $ = cheerio.load(
        renderComponent('document-list', {
          titleTag: 'h1',
          documents: [EXAMPLE_DOCUMENT_LIST_BASIC],
        }),
      );
      const titleTag = $('.ons-document-list__item-title')[0].tagName;
      expect(titleTag).toBe('h1');
    });

    it('has expected `title`', () => {
      const $ = cheerio.load(renderComponent('document-list', { documents: [EXAMPLE_DOCUMENT_LIST_BASIC] }));
      const title = $('.ons-document-list__item-title a')
        .html()
        .trim();
      expect(title).toBe('Crime and justice');
    });

    it('has expected `url` for the title', () => {
      const $ = cheerio.load(renderComponent('document-list', { documents: [EXAMPLE_DOCUMENT_LIST_BASIC] }));
      expect($('.ons-document-list__item-title a').attr('href')).toBe('#0');
    });

    it('has expected `description`', () => {
      const $ = cheerio.load(renderComponent('document-list', { documents: [EXAMPLE_DOCUMENT_LIST_BASIC] }));
      const title = $('.ons-document-list__item-description')
        .html()
        .trim();
      expect(title).toBe('Some description');
    });
  });

  describe('mode: with thumbnail', () => {
    it('passes jest-axe checks', async () => {
      const $ = cheerio.load(
        renderComponent('document-list', {
          id: 'some-id',
          documents: [EXAMPLE_DOCUMENT_LIST_WITH_THUMBNAIL],
        }),
      );

      const results = await axe($.html());
      expect(results).toHaveNoViolations();
    });

    it('has expected `srcset` attribute', () => {
      const $ = cheerio.load(renderComponent('document-list', { documents: [EXAMPLE_DOCUMENT_LIST_WITH_THUMBNAIL] }));

      const srcset = $('.ons-document-list__image-link img').attr('srcset');
      expect(srcset).toBe('/example-small.png 1x, /example-large.png 2x');
    });

    it('has expected `src` attribute', () => {
      const $ = cheerio.load(renderComponent('document-list', { documents: [EXAMPLE_DOCUMENT_LIST_WITH_THUMBNAIL] }));

      const src = $('.ons-document-list__image-link img').attr('src');
      expect(src).toBe('/example-small.png');
    });

    it('has the placeholder class if `thumbnail` is true', () => {
      const $ = cheerio.load(
        renderComponent('document-list', {
          documents: [{ ...EXAMPLE_DOCUMENT_LIST_BASIC, thumbnail: true }],
        }),
      );

      expect($('.ons-document-list__image-link').hasClass('ons-document-list__image-link--placeholder')).toBe(true);
    });
  });

  describe('mode: with metadata `file` configuration', () => {
    it('passes jest-axe checks', async () => {
      const $ = cheerio.load(
        renderComponent('document-list', {
          documents: [EXAMPLE_DOCUMENT_LIST_WITH_METADATA_FILE],
        }),
      );

      const results = await axe($.html());
      expect(results).toHaveNoViolations();
    });

    it('has visually hidden `file` information after the title', () => {
      const $ = cheerio.load(
        renderComponent('document-list', {
          documents: [EXAMPLE_DOCUMENT_LIST_WITH_METADATA_FILE],
        }),
      );

      const hiddenText = $('.ons-document-list__item-title a .ons-u-vh')
        .text()
        .trim();
      expect(hiddenText).toBe(', PDF document download, 499KB, 1 page');
    });

    it('has `file` information displayed', () => {
      const $ = cheerio.load(
        renderComponent('document-list', {
          documents: [EXAMPLE_DOCUMENT_LIST_WITH_METADATA_FILE],
        }),
      );

      const hiddenText = $('.ons-document-list__item-attribute')
        .text()
        .trim();
      expect(hiddenText).toBe('PDF, 499KB, 1 page');
    });
  });

  describe('mode: with metadata `type` configuration', () => {
    it('passes jest-axe checks', async () => {
      const $ = cheerio.load(
        renderComponent('document-list', {
          documents: [EXAMPLE_DOCUMENT_LIST_WITH_METADATA_TYPE],
        }),
      );

      const results = await axe($.html());
      expect(results).toHaveNoViolations();
    });

    it('has the provided `url`', () => {
      const $ = cheerio.load(
        renderComponent('document-list', {
          documents: [EXAMPLE_DOCUMENT_LIST_WITH_METADATA_TYPE],
        }),
      );

      const url = $('.ons-document-list__attribute-link').attr('href');
      expect(url).toBe('#0');
    });

    it('has expected `text`', () => {
      const $ = cheerio.load(renderComponent('document-list', { documents: [EXAMPLE_DOCUMENT_LIST_WITH_METADATA_TYPE] }));
      const text = $('.ons-document-list__attribute-link > span')
        .text()
        .trim();
      expect(text).toBe('Poster:');
    });

    it('has expected `ref`', () => {
      const $ = cheerio.load(renderComponent('document-list', { documents: [EXAMPLE_DOCUMENT_LIST_WITH_METADATA_TYPE] }));
      const text = $('.ons-document-list__attribute-link + span')
        .text()
        .trim();
      expect(text).toBe('some ref');
    });
  });

  describe('mode: with metadata `date` configuration', () => {
    it('passes jest-axe checks', async () => {
      const $ = cheerio.load(
        renderComponent('document-list', {
          documents: [
            {
              ...EXAMPLE_DOCUMENT_LIST_BASIC,
              metadata: {
                date: {
                  iso: '2022-01-01',
                  short: '1 January 2022',
                },
              },
            },
          ],
        }),
      );

      const results = await axe($.html());
      expect(results).toHaveNoViolations();
    });

    it('has the default `prefix` text', () => {
      const $ = cheerio.load(
        renderComponent('document-list', {
          documents: [
            {
              ...EXAMPLE_DOCUMENT_LIST_BASIC,
              metadata: {
                date: {
                  iso: '2022-01-01',
                  short: '1 January 2022',
                },
              },
            },
          ],
        }),
      );

      const text = $('.ons-document-list__item-attribute > span')
        .text()
        .trim();
      expect(text).toBe('Published:');
    });

    it('has the visually hidden class for `prefix` text', () => {
      const $ = cheerio.load(
        renderComponent('document-list', {
          documents: [
            {
              ...EXAMPLE_DOCUMENT_LIST_BASIC,
              metadata: {
                date: {
                  iso: '2022-01-01',
                  short: '1 January 2022',
                },
              },
            },
          ],
        }),
      );
      expect($('.ons-document-list__item-attribute > span').hasClass('ons-u-vh')).toBe(true);
    });

    it('has the provided `prefix` text', () => {
      const $ = cheerio.load(
        renderComponent('document-list', {
          documents: [
            {
              ...EXAMPLE_DOCUMENT_LIST_BASIC,
              metadata: {
                date: {
                  prefix: 'Released',
                  iso: '2022-01-01',
                  short: '1 January 2022',
                },
              },
            },
          ],
        }),
      );

      const text = $('.ons-document-list__item-attribute > span')
        .text()
        .trim();
      expect(text).toBe('Released:');
    });

    it('has the correct class for `showPrefix`', () => {
      const $ = cheerio.load(
        renderComponent('document-list', {
          documents: [
            {
              ...EXAMPLE_DOCUMENT_LIST_BASIC,
              metadata: {
                date: {
                  showPrefix: true,
                  iso: '2022-01-01',
                  short: '1 January 2022',
                },
              },
            },
          ],
        }),
      );

      expect($('.ons-document-list__item-attribute > span').hasClass('ons-u-fw-b')).toBe(true);
    });

    it('has the correct datetime attribute value', () => {
      const $ = cheerio.load(
        renderComponent('document-list', {
          documents: [
            {
              ...EXAMPLE_DOCUMENT_LIST_BASIC,
              metadata: {
                date: {
                  iso: '2022-01-01',
                  short: '1 January 2022',
                },
              },
            },
          ],
        }),
      );
      expect($('time').attr('datetime')).toBe('2022-01-01');
    });

    it('has the correct `time` value', () => {
      const $ = cheerio.load(
        renderComponent('document-list', {
          documents: [
            {
              ...EXAMPLE_DOCUMENT_LIST_BASIC,
              metadata: {
                date: {
                  iso: '2022-01-01',
                  short: '1 January 2022',
                },
              },
            },
          ],
        }),
      );

      const time = $('.ons-document-list__item-attribute time')
        .text()
        .trim();
      expect(time).toBe('1 January 2022');
    });
  });

  describe('mode: with all parameters', () => {
    it('passes jest-axe checks', async () => {
      const $ = cheerio.load(
        renderComponent('document-list', {
          documents: [EXAMPLE_DOCUMENT_LIST_WITH_MULTIPLE],
        }),
      );

      const results = await axe($.html());
      expect(results).toHaveNoViolations();
    });

    it('has the correct document thumbnail class', async () => {
      const $ = cheerio.load(
        renderComponent('document-list', {
          documents: [EXAMPLE_DOCUMENT_LIST_WITH_MULTIPLE],
        }),
      );

      expect($('.ons-document-list__item-image').hasClass('ons-document-list__item-image--file')).toBe(true);
    });

    it('has the correct document list class', async () => {
      const $ = cheerio.load(
        renderComponent('document-list', {
          documents: [EXAMPLE_DOCUMENT_LIST_WITH_MULTIPLE],
        }),
      );

      expect($('.ons-document-list__item-attribute').hasClass('ons-u-mr-no')).toBe(true);
    });
  });
});
