/** @jest-environment jsdom */

import * as cheerio from 'cheerio';

import axe from '../../tests/helpers/axe';
import { renderComponent } from '../../tests/helpers/rendering';
import {
    EXAMPLE_DOCUMENT_LIST_BASIC,
    EXAMPLE_DOCUMENT_LIST_WITH_THUMBNAIL,
    EXAMPLE_DOCUMENT_LIST_WITH_METADATA_FILE,
    EXAMPLE_DOCUMENT_LIST_WITH_METADATA_OBJECT,
    EXAMPLE_DOCUMENT_LIST_WITH_METADATA_DATE,
    EXAMPLE_DOCUMENT_LIST_WITH_MULTIPLE,
} from './_test-examples';

describe('FOR: Macro: Document list', () => {
    describe('GIVEN: Params: basic', () => {
        describe('WHEN: basic parameters are provided within a document', () => {
            test('passes jest-axe checks', async () => {
                const $ = cheerio.load(
                    renderComponent('document-list', {
                        documents: [EXAMPLE_DOCUMENT_LIST_BASIC, EXAMPLE_DOCUMENT_LIST_BASIC, EXAMPLE_DOCUMENT_LIST_BASIC],
                    }),
                );

                const results = await axe($.html());
                expect(results).toHaveNoViolations();
            });

            test('outputs the correct number of document items', () => {
                const $ = cheerio.load(
                    renderComponent('document-list', {
                        documents: [EXAMPLE_DOCUMENT_LIST_BASIC, EXAMPLE_DOCUMENT_LIST_BASIC, EXAMPLE_DOCUMENT_LIST_BASIC],
                    }),
                );

                expect($('.ons-document-list__item').length).toBe(3);
            });
            test('has expected url for the title', () => {
                const $ = cheerio.load(renderComponent('document-list', { documents: [EXAMPLE_DOCUMENT_LIST_BASIC] }));
                expect($('.ons-document-list__item-title a').attr('href')).toBe('#0');
            });

            test('has expected description', () => {
                const $ = cheerio.load(renderComponent('document-list', { documents: [EXAMPLE_DOCUMENT_LIST_BASIC] }));
                const title = $('.ons-document-list__item-description').html().trim();
                expect(title).toBe('Some description');
            });
        });
    });

    describe('GIVEN: Params: id', () => {
        describe('WHEN: id is provied', () => {
            test('has the provided id attribute', () => {
                const $ = cheerio.load(
                    renderComponent('document-list', {
                        id: 'some-id',
                        documents: [EXAMPLE_DOCUMENT_LIST_BASIC, EXAMPLE_DOCUMENT_LIST_BASIC, EXAMPLE_DOCUMENT_LIST_BASIC],
                    }),
                );
                expect($('#some-id').length).toBe(1);
            });
        });
    });

    describe('GIVEN: Params: custom-class', () => {
        describe('WHEN: custom class is provided', () => {
            test('applies the right custom classes', () => {
                const $ = cheerio.load(
                    renderComponent('document-list', {
                        classes: 'custom-class',
                        documents: [EXAMPLE_DOCUMENT_LIST_BASIC, EXAMPLE_DOCUMENT_LIST_BASIC, EXAMPLE_DOCUMENT_LIST_BASIC],
                    }),
                );
                expect($('.ons-document-list').hasClass('custom-class')).toBe(true);
            });
        });
    });

    describe('GIVEN: Params: featured', () => {
        describe('WHEN: featured is set for a document', () => {
            test('has the correct container class', () => {
                const $ = cheerio.load(
                    renderComponent('document-list', {
                        documents: [{ ...EXAMPLE_DOCUMENT_LIST_BASIC, featured: true }],
                    }),
                );

                expect($('.ons-document-list__item--featured').length).toBe(1);
            });
        });
    });

    describe('GIVEN: Params: fullWidth', () => {
        describe('WHEN: fullWidth is set for a document with basic parameters', () => {
            test('does not apply container class', () => {
                const $ = cheerio.load(
                    renderComponent('document-list', {
                        documents: [{ ...EXAMPLE_DOCUMENT_LIST_BASIC, fullWidth: true }],
                    }),
                );

                expect($('.ons-container').length).toBe(0);
            });
        });

        describe('WHEN: fullWidth is set for a featured document', () => {
            test('THEN: renders with the container class', () => {
                const $ = cheerio.load(
                    renderComponent('document-list', {
                        documents: [{ ...EXAMPLE_DOCUMENT_LIST_BASIC, featured: true, fullWidth: true }],
                    }),
                );

                expect($('.ons-container').length).toBe(1);
            });
        });
    });

    describe('GIVEN: Params: wide', () => {
        describe('WHEN: wide is set for a document with basic parameters', () => {
            test('does not apply container class ', () => {
                const $ = cheerio.load(
                    renderComponent('document-list', {
                        documents: [{ ...EXAMPLE_DOCUMENT_LIST_BASIC, wide: true }],
                    }),
                );

                expect($('.ons-container--wide').length).toBe(0);
            });
        });
        describe('WHEN: wide is set for a featured document with fullWidth', () => {
            test('has the correct container class', () => {
                const $ = cheerio.load(
                    renderComponent('document-list', {
                        documents: [{ ...EXAMPLE_DOCUMENT_LIST_BASIC, featured: true, fullWidth: true, wide: true }],
                    }),
                );

                expect($('.ons-container--wide').length).toBe(1);
            });
        });
    });

    describe('GIVEN: Params: showMetadataFirst', () => {
        describe('WHEN: showMetadataFirst is set for a document', () => {
            test('has the correct class', () => {
                const $ = cheerio.load(
                    renderComponent('document-list', {
                        documents: [{ ...EXAMPLE_DOCUMENT_LIST_BASIC, showMetadataFirst: true }],
                    }),
                );
                expect($('.ons-document-list__item-header--reverse').length).toBe(1);
            });
        });
    });

    describe('GIVEN: Params: headingLevel', () => {
        describe('WHEN: headingLevel is provided', () => {
            test('overrides the heading title tag', () => {
                const $ = cheerio.load(
                    renderComponent('document-list', {
                        headingLevel: 1,
                        documents: [EXAMPLE_DOCUMENT_LIST_BASIC],
                    }),
                );
                const headingLevel = $('.ons-document-list__item-title')[0].tagName;
                expect(headingLevel).toBe('h1');
            });
        });
    });

    describe('GIVEN: Params: thumbnail', () => {
        describe('WHEN: thumbnail is provided for a document', () => {
            test('passes jest-axe checks', async () => {
                const $ = cheerio.load(
                    renderComponent('document-list', {
                        id: 'some-id',
                        documents: [EXAMPLE_DOCUMENT_LIST_WITH_THUMBNAIL],
                    }),
                );

                const results = await axe($.html());
                expect(results).toHaveNoViolations();
            });

            test('has expected srcset attribute', () => {
                const $ = cheerio.load(renderComponent('document-list', { documents: [EXAMPLE_DOCUMENT_LIST_WITH_THUMBNAIL] }));

                const srcset = $('.ons-document-list__image-link img').attr('srcset');
                expect(srcset).toBe('/example-small.png 1x, /example-large.png 2x');
            });

            test('has expected src attribute', () => {
                const $ = cheerio.load(renderComponent('document-list', { documents: [EXAMPLE_DOCUMENT_LIST_WITH_THUMBNAIL] }));

                const src = $('.ons-document-list__image-link img').attr('src');
                expect(src).toBe('/example-small.png');
            });

            test('has the right placeholder class', () => {
                const $ = cheerio.load(
                    renderComponent('document-list', {
                        documents: [{ ...EXAMPLE_DOCUMENT_LIST_BASIC, thumbnail: true }],
                    }),
                );
                expect($('.ons-document-list__image-link').hasClass('ons-document-list__image-link--placeholder')).toBe(true);
            });
        });
    });

    describe('GIVEN: Params: file', () => {
        describe('WHEN: file configuration is provided within a document metadata', () => {
            test('passes jest-axe checks', async () => {
                const $ = cheerio.load(
                    renderComponent('document-list', {
                        documents: [EXAMPLE_DOCUMENT_LIST_WITH_METADATA_FILE],
                    }),
                );

                const results = await axe($.html());
                expect(results).toHaveNoViolations();
            });

            test('has visually hidden file information after the title', () => {
                const $ = cheerio.load(
                    renderComponent('document-list', {
                        documents: [EXAMPLE_DOCUMENT_LIST_WITH_METADATA_FILE],
                    }),
                );

                const hiddenText = $('.ons-document-list__item-title a .ons-u-vh').text().trim();
                expect(hiddenText).toBe(', PDF document download, 499KB, 1 page');
            });

            test('has file information displayed', () => {
                const $ = cheerio.load(
                    renderComponent('document-list', {
                        documents: [EXAMPLE_DOCUMENT_LIST_WITH_METADATA_FILE],
                    }),
                );

                const hiddenText = $('.ons-document-list__item-attribute').text().trim();
                expect(hiddenText).toBe('PDF, 499KB, 1 page');
            });
        });
    });

    describe('GIVEN: Params: object', () => {
        describe('WHEN: object configuration is provided within a document metadata', () => {
            test('passes jest-axe checks', async () => {
                const $ = cheerio.load(
                    renderComponent('document-list', {
                        documents: [EXAMPLE_DOCUMENT_LIST_WITH_METADATA_OBJECT],
                    }),
                );

                const results = await axe($.html());
                expect(results).toHaveNoViolations();
            });

            test('has the provided url', () => {
                const $ = cheerio.load(
                    renderComponent('document-list', {
                        documents: [EXAMPLE_DOCUMENT_LIST_WITH_METADATA_OBJECT],
                    }),
                );

                const url = $('.ons-document-list__attribute-link').attr('href');
                expect(url).toBe('#0');
            });

            test('has expected text', () => {
                const $ = cheerio.load(renderComponent('document-list', { documents: [EXAMPLE_DOCUMENT_LIST_WITH_METADATA_OBJECT] }));
                const text = $('.ons-document-list__attribute-link > span').text().trim();
                expect(text).toBe('Poster:');
            });

            test('has expected ref', () => {
                const $ = cheerio.load(renderComponent('document-list', { documents: [EXAMPLE_DOCUMENT_LIST_WITH_METADATA_OBJECT] }));
                const text = $('.ons-document-list__attribute-link + span').text().trim();
                expect(text).toBe('some ref');
            });
        });
    });

    describe('GIVEN: Params: date', () => {
        describe('WHEN: date configuration is provided within a document metadata', () => {
            test('passes jest-axe checks', async () => {
                const $ = cheerio.load(
                    renderComponent('document-list', {
                        documents: [EXAMPLE_DOCUMENT_LIST_WITH_METADATA_DATE],
                    }),
                );

                const results = await axe($.html());
                expect(results).toHaveNoViolations();
            });

            test('has the default prefix text', () => {
                const $ = cheerio.load(
                    renderComponent('document-list', {
                        documents: [EXAMPLE_DOCUMENT_LIST_WITH_METADATA_DATE],
                    }),
                );

                const text = $('.ons-document-list__item-attribute > span').text().trim();
                expect(text).toBe('Published:');
            });

            test('has the visually hidden class for prefix text', () => {
                const $ = cheerio.load(
                    renderComponent('document-list', {
                        documents: [EXAMPLE_DOCUMENT_LIST_WITH_METADATA_DATE],
                    }),
                );
                expect($('.ons-document-list__item-attribute > span').hasClass('ons-u-vh')).toBe(true);
            });

            test('has the correct datetime attribute value', () => {
                const $ = cheerio.load(
                    renderComponent('document-list', {
                        documents: [EXAMPLE_DOCUMENT_LIST_WITH_METADATA_DATE],
                    }),
                );
                expect($('time').attr('datetime')).toBe('2022-01-01');
            });

            test('has the correct time value', () => {
                const $ = cheerio.load(
                    renderComponent('document-list', {
                        documents: [EXAMPLE_DOCUMENT_LIST_WITH_METADATA_DATE],
                    }),
                );

                const time = $('.ons-document-list__item-attribute time').text().trim();
                expect(time).toBe('1 January 2022');
            });
        });
    });

    describe('GIVEN: Params: prefix', () => {
        describe('WHEN: prefix is provided in the date metadata configuration for a document', () => {
            test('has the provided prefix text', () => {
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
                const text = $('.ons-document-list__item-attribute > span').text().trim();
                expect(text).toBe('Released:');
            });
        });
    });

    describe('GIVEN: Params: showprefix', () => {
        describe('WHEN: showprefix is set in the date metadata configuration for a document', () => {
            test('has the correct class', () => {
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
        });
    });

    describe('GIVEN: Params: multiple', () => {
        describe('WHEN: when multiple configurations are provided in the document metadata', () => {
            test('passes jest-axe checks', async () => {
                const $ = cheerio.load(
                    renderComponent('document-list', {
                        documents: [EXAMPLE_DOCUMENT_LIST_WITH_MULTIPLE],
                    }),
                );

                const results = await axe($.html());
                expect(results).toHaveNoViolations();
            });

            test('has the correct document thumbnail class', async () => {
                const $ = cheerio.load(
                    renderComponent('document-list', {
                        documents: [EXAMPLE_DOCUMENT_LIST_WITH_MULTIPLE],
                    }),
                );

                expect($('.ons-document-list__item-image').hasClass('ons-document-list__item-image--file')).toBe(true);
            });

            test('has the correct document list class', async () => {
                const $ = cheerio.load(
                    renderComponent('document-list', {
                        documents: [EXAMPLE_DOCUMENT_LIST_WITH_MULTIPLE],
                    }),
                );

                expect($('.ons-document-list__item-attribute').hasClass('ons-u-mr-no')).toBe(true);
            });
        });
    });
});
