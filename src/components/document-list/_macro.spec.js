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
    describe('GIVEN: Params: required', () => {
        describe('WHEN: required parameters are provided within a document', () => {
            const $ = cheerio.load(
                renderComponent('document-list', {
                    documents: [EXAMPLE_DOCUMENT_LIST_BASIC, EXAMPLE_DOCUMENT_LIST_BASIC, EXAMPLE_DOCUMENT_LIST_BASIC],
                }),
            );
            test('THEN: passes jest-axe checks', async () => {
                const results = await axe($.html());
                expect(results).toHaveNoViolations();
            });

            test('THEN: renders the same number of documents items as the number passed in', () => {
                expect($('.ons-document-list__item').length).toBe(3);
            });
            test('THEN: has expected url for the title', () => {
                expect($('.ons-document-list__item-title a').attr('href')).toBe('#0');
            });
        });
    });

    describe('GIVEN: Params: description', () => {
        describe('WHEN: description is provided', () => {
            test('THEN: has expected description', () => {
                const $ = cheerio.load(renderComponent('document-list', { documents: [EXAMPLE_DOCUMENT_LIST_BASIC] }));
                const title = $('.ons-document-list__item-description').html().trim();
                expect(title).toBe('Some description');
            });
        });
    });

    describe('GIVEN: Params: id', () => {
        describe('WHEN: id is provided', () => {
            test('THEN: has the provided id attribute', () => {
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

    describe('GIVEN: Params: classes', () => {
        describe('WHEN: additional style classes are provided', () => {
            test('THEN: renders with additional classes provided', () => {
                const $ = cheerio.load(
                    renderComponent('document-list', {
                        classes: 'custom-class',
                        documents: [EXAMPLE_DOCUMENT_LIST_BASIC, EXAMPLE_DOCUMENT_LIST_BASIC, EXAMPLE_DOCUMENT_LIST_BASIC],
                    }),
                );
                expect($('.ons-document-list').hasClass('custom-class')).toBe(true);
            });
        });
        describe('WHEN: addtional style classes are provided within document', () => {
            test('THEN: renders with additional classes provided', () => {
                const $ = cheerio.load(
                    renderComponent('document-list', {
                        documents: [{ ...EXAMPLE_DOCUMENT_LIST_BASIC, classes: 'custom-class' }],
                    }),
                );
                expect($('.ons-document-list__item').hasClass('custom-class')).toBe(true);
            });
        });
    });
    describe('GIVEN: Params: attributes', () => {
        describe('WHEN: attributes are provided', () => {
            test('THEN: renders with provided HTML attributes', () => {
                const $ = cheerio.load(
                    renderComponent('document-list', {
                        documents: [EXAMPLE_DOCUMENT_LIST_BASIC],
                        attributes: {
                            a: 123,
                            b: 456,
                        },
                    }),
                );
                expect($('.ons-document-list').attr('a')).toBe('123');
                expect($('.ons-document-list').attr('b')).toBe('456');
            });
        });
        describe('WHEN: attributes are provided within document', () => {
            test('THEN: renders with provided HTML attributes', () => {
                const $ = cheerio.load(
                    renderComponent('document-list', {
                        documents: [
                            {
                                ...EXAMPLE_DOCUMENT_LIST_BASIC,
                                attributes: {
                                    a: 123,
                                    b: 456,
                                },
                            },
                        ],
                    }),
                );
                expect($('.ons-document-list__item').attr('a')).toBe('123');
                expect($('.ons-document-list__item').attr('b')).toBe('456');
            });
        });
    });

    describe('GIVEN: Params: headingLevel', () => {
        describe('WHEN: headingLevel is provided', () => {
            test('THEN: the heading tag is set to the level provided', () => {
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

    describe('GIVEN: Params: featured', () => {
        describe('WHEN: featured is set for a document', () => {
            test('THEN: applies the featured class to the document item', () => {
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
        describe('WHEN: fullWidth is set for a document', () => {
            test('THEN: document item does not have the container class', () => {
                const $ = cheerio.load(
                    renderComponent('document-list', {
                        documents: [{ ...EXAMPLE_DOCUMENT_LIST_BASIC, fullWidth: true }],
                    }),
                );

                expect($('.ons-document-list__item > .ons-container').length).toBe(0);
            });
        });

        describe('WHEN: fullWidth is set for a featured document', () => {
            const $ = cheerio.load(
                renderComponent('document-list', {
                    documents: [{ ...EXAMPLE_DOCUMENT_LIST_BASIC, featured: true, fullWidth: true }],
                }),
            );
            test('THEN: applies full width class to document item', () => {
                expect($('.ons-document-list__item--full-width').length).toBe(1);
            });

            test('THEN: document item has the container class', () => {
                expect($('.ons-document-list__item > .ons-container').length).toBe(1);
            });
        });
    });

    describe('GIVEN: Params: wide', () => {
        describe('WHEN: wide is set for a document', () => {
            test('THEN: does not render with the wide container class', () => {
                const $ = cheerio.load(
                    renderComponent('document-list', {
                        documents: [{ ...EXAMPLE_DOCUMENT_LIST_BASIC, wide: true }],
                    }),
                );

                expect($('.ons-container--wide').length).toBe(0);
            });
        });
        describe('WHEN: wide is set for a featured document with fullWidth', () => {
            const $ = cheerio.load(
                renderComponent('document-list', {
                    documents: [{ ...EXAMPLE_DOCUMENT_LIST_BASIC, featured: true, fullWidth: true, wide: true }],
                }),
            );
            test('THEN: applies the wide class to the container', () => {
                expect($('.ons-container').hasClass('ons-container--wide')).toBe(true);
            });

            test('THEN: document item has container--wide class', () => {
                expect($('.ons-document-list__item > .ons-container--wide').length).toBe(1);
            });
        });
    });

    describe('GIVEN: Params: showMetadataFirst', () => {
        describe('WHEN: showMetadataFirst is set for a document', () => {
            test('THEN: applies the reverse class to document header to display the metadata before the title', () => {
                const $ = cheerio.load(
                    renderComponent('document-list', {
                        documents: [{ ...EXAMPLE_DOCUMENT_LIST_BASIC, showMetadataFirst: true }],
                    }),
                );
                expect($('.ons-document-list__item-header--reverse').length).toBe(1);
            });
        });
    });

    describe('GIVEN: Params: thumbnail', () => {
        describe('WHEN: thumbnail is provided for a document', () => {
            const $ = cheerio.load(
                renderComponent('document-list', {
                    documents: [EXAMPLE_DOCUMENT_LIST_WITH_THUMBNAIL],
                }),
            );

            test('THEN: passes jest-axe checks', async () => {
                const results = await axe($.html());
                expect(results).toHaveNoViolations();
            });

            test('THEN: has expected srcset attribute', () => {
                const srcset = $('.ons-document-list__image').attr('srcset');
                expect(srcset).toBe('/example-small.png 1x, /example-large.png 2x');
            });

            test('THEN: has expected src attribute', () => {
                const src = $('.ons-document-list__image').attr('src');
                expect(src).toBe('/example-small.png');
            });
        });

        describe('WHEN: thumbnail is not provided but is set to true', () => {
            test('THEN: has a placeholder class', () => {
                const $ = cheerio.load(
                    renderComponent('document-list', {
                        documents: [{ ...EXAMPLE_DOCUMENT_LIST_BASIC, thumbnail: true }],
                    }),
                );
                expect($('.ons-document-list__image').hasClass('ons-document-list__image--placeholder')).toBe(true);
            });
        });
    });

    describe('GIVEN: Params: file', () => {
        describe('WHEN: file configuration is provided within a document metadata', () => {
            const $ = cheerio.load(
                renderComponent('document-list', {
                    documents: [EXAMPLE_DOCUMENT_LIST_WITH_METADATA_FILE],
                }),
            );

            test('THEN: passes jest-axe checks', async () => {
                const results = await axe($.html());
                expect(results).toHaveNoViolations();
            });

            test('THEN: has visually hidden file information after the title', () => {
                const hiddenText = $('.ons-document-list__item-title a .ons-u-vh').text().trim();
                expect(hiddenText).toBe(', PDF document download, 499KB, 1 page');
            });

            test('THEN: has file information', () => {
                const fileInfo = $('.ons-document-list__item-attribute').text().trim();
                expect(fileInfo).toBe('PDF, 499KB, 1 page');
            });
        });
    });

    describe('GIVEN: Params: object', () => {
        describe('WHEN: object configuration is provided within a document metadata', () => {
            const $ = cheerio.load(
                renderComponent('document-list', {
                    documents: [EXAMPLE_DOCUMENT_LIST_WITH_METADATA_OBJECT],
                }),
            );

            test('THEN: passes jest-axe checks', async () => {
                const results = await axe($.html());
                expect(results).toHaveNoViolations();
            });

            test('THEN: has the provided url', () => {
                const url = $('.ons-document-list__attribute-link').attr('href');
                expect(url).toBe('#0');
            });

            test('THEN: has expected text', () => {
                const text = $('.ons-document-list__attribute-link > span').text().trim();
                expect(text).toBe('Poster:');
            });

            test('THEN: has expected ref', () => {
                const text = $('.ons-document-list__attribute-link + span').text().trim();
                expect(text).toBe('some ref');
            });
        });
    });

    describe('GIVEN: Params: date', () => {
        describe('WHEN: date configuration is provided within a document metadata', () => {
            const $ = cheerio.load(
                renderComponent('document-list', {
                    documents: [EXAMPLE_DOCUMENT_LIST_WITH_METADATA_DATE],
                }),
            );

            test('THEN: passes jest-axe checks', async () => {
                const results = await axe($.html());
                expect(results).toHaveNoViolations();
            });

            test('THEN: has the default prefix text', () => {
                const text = $('.ons-document-list__item-attribute > span').text().trim();
                expect(text).toBe('Published:');
            });

            test('THEN: has the visually hidden class for prefix text', () => {
                expect($('.ons-document-list__item-attribute > span').hasClass('ons-u-vh')).toBe(true);
            });

            test('THEN: has the correct datetime attribute value', () => {
                expect($('time').attr('datetime')).toBe('2022-01-01');
            });

            test('THEN: has the correct time value', () => {
                const time = $('.ons-document-list__item-attribute time').text().trim();
                expect(time).toBe('1 January 2022');
            });
        });
    });

    describe('GIVEN: Params: prefix', () => {
        describe('WHEN: prefix is provided in the date metadata configuration for a document', () => {
            test('THEN: has the provided prefix text', () => {
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

            test('THEN: applies bold font class to the prefix text', () => {
                expect($('.ons-document-list__item-attribute > span').hasClass('ons-u-fw-b')).toBe(true);
            });

            test('THEN: does not has the visually hidden class for prefix text', () => {
                expect($('.ons-document-list__item-attribute > span').hasClass('ons-u-vh')).toBe(false);
            });

            test('THEN: has the default prefix text', () => {
                const text = $('.ons-document-list__item-attribute > span').text().trim();
                expect(text).toBe('Published:');
            });
        });
    });

    describe('GIVEN: Params: metadata', () => {
        describe('WHEN: when document has metadata with all available configurations', () => {
            const $ = cheerio.load(
                renderComponent('document-list', {
                    documents: [EXAMPLE_DOCUMENT_LIST_WITH_MULTIPLE],
                }),
            );

            test('THEN: passes jest-axe checks', async () => {
                const results = await axe($.html());
                expect(results).toHaveNoViolations();
            });

            test('THEN: has the correct document thumbnail class', async () => {
                expect($('.ons-document-list__item-image').hasClass('ons-document-list__item-image--file')).toBe(true);
            });

            test('THEN: the document list object item has the utility class that removes the margin between the object and file list items', async () => {
                expect($('.ons-document-list__item-attribute').hasClass('ons-u-mr-no')).toBe(true);
            });
        });
    });
});
