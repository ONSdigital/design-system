/** @jest-environment jsdom */

import * as cheerio from 'cheerio';

import axe from '../../tests/helpers/axe';
import { renderComponent } from '../../tests/helpers/rendering';
import {
    EXAMPLE_FILE_DOWNLOAD_BASIC,
    EXAMPLE_FILE_DOWNLOAD_CSV,
    EXAMPLE_FILE_DOWNLOAD_XLS,
    EXAMPLE_FILE_DOWNLOAD_NO_FORMAT,
    EXAMPLE_FILE_DOWNLOAD_CUSTOM_LINK_TEXT,
} from './_test-examples';

describe('FOR: Macro: File download', () => {
    describe('GIVEN: Params: required', () => {
        describe('WHEN: required parameters are provided', () => {
            const $ = cheerio.load(renderComponent('file-download', EXAMPLE_FILE_DOWNLOAD_BASIC));

            test('THEN: passes jest-axe checks', async () => {
                const results = await axe($.html());
                expect(results).toHaveNoViolations();
            });

            test('THEN: renders the component container', () => {
                expect($('.ons-file-download').length).toBe(1);
            });

            test('THEN: renders the file name', () => {
                expect($('.ons-file-download__title').text().trim()).toBe('Annual population survey');
            });

            test('THEN: renders the download link with the provided URL', () => {
                expect($('.ons-file-download__link').attr('href')).toBe('/downloads/annual-population-survey.pdf');
            });

            test('THEN: renders the default "Download" link text', () => {
                expect($('.ons-file-download__link').text()).toContain('Download');
            });

            test('THEN: renders the download link icon placeholder', () => {
                expect($('.ons-file-download__link-icon').length).toBe(1);
            });

            test('THEN: renders the supporting information', () => {
                expect($('.ons-file-download__description').text().trim()).toBe(
                    'Estimates of the UK population broken down by age, sex and geography.',
                );
            });

            test('THEN: renders the file format as metadata', () => {
                expect($('.ons-file-download__meta').text().trim()).toBe('PDF');
            });
        });
    });

    describe('GIVEN: Params: id', () => {
        describe('WHEN: id is provided', () => {
            const $ = cheerio.load(
                renderComponent('file-download', { ...EXAMPLE_FILE_DOWNLOAD_BASIC, id: 'test-id' }),
            );

            test('THEN: renders the id attribute on the container', () => {
                expect($('#test-id').length).toBe(1);
            });
        });
    });

    describe('GIVEN: Params: classes', () => {
        describe('WHEN: classes are provided', () => {
            const $ = cheerio.load(
                renderComponent('file-download', { ...EXAMPLE_FILE_DOWNLOAD_BASIC, classes: 'custom-class' }),
            );

            test('THEN: adds the custom class to the container', () => {
                expect($('.ons-file-download').hasClass('custom-class')).toBe(true);
            });
        });
    });

    describe('GIVEN: Params: attributes', () => {
        describe('WHEN: attributes are provided', () => {
            const $ = cheerio.load(
                renderComponent('file-download', {
                    ...EXAMPLE_FILE_DOWNLOAD_BASIC,
                    attributes: { 'data-test': 'value' },
                }),
            );

            test('THEN: renders the attribute on the container', () => {
                expect($('.ons-file-download').attr('data-test')).toBe('value');
            });
        });
    });

    describe('GIVEN: Params: fileFormat', () => {
        describe('WHEN: fileFormat is PDF', () => {
            const $ = cheerio.load(renderComponent('file-download', EXAMPLE_FILE_DOWNLOAD_BASIC));

            test('THEN: renders the file format as metadata', () => {
                expect($('.ons-file-download__meta').text().trim()).toBe('PDF');
            });

            test('THEN: hides the metadata from assistive technology', () => {
                expect($('.ons-file-download__meta').attr('aria-hidden')).toBe('true');
            });
        });

        describe('WHEN: fileFormat is CSV', () => {
            const $ = cheerio.load(renderComponent('file-download', EXAMPLE_FILE_DOWNLOAD_CSV));

            test('THEN: renders the CSV format', () => {
                expect($('.ons-file-download__meta').text().trim()).toBe('CSV');
            });
        });

        describe('WHEN: fileFormat is XLS', () => {
            const $ = cheerio.load(renderComponent('file-download', EXAMPLE_FILE_DOWNLOAD_XLS));

            test('THEN: renders the XLS format', () => {
                expect($('.ons-file-download__meta').text().trim()).toBe('XLS');
            });
        });

        describe('WHEN: fileFormat is not provided', () => {
            const $ = cheerio.load(renderComponent('file-download', EXAMPLE_FILE_DOWNLOAD_NO_FORMAT));

            test('THEN: does not render a file format line', () => {
                expect($('.ons-file-download__meta').length).toBe(0);
            });
        });
    });

    describe('GIVEN: Params: headingLevel', () => {
        describe('WHEN: headingLevel is set to 3', () => {
            const $ = cheerio.load(
                renderComponent('file-download', { ...EXAMPLE_FILE_DOWNLOAD_BASIC, headingLevel: 3 }),
            );

            test('THEN: renders the file name as an h3', () => {
                expect($('h3.ons-file-download__title').length).toBe(1);
            });
        });

        describe('WHEN: headingLevel is not provided', () => {
            const $ = cheerio.load(renderComponent('file-download', EXAMPLE_FILE_DOWNLOAD_BASIC));

            test('THEN: renders the file name as the default h2', () => {
                expect($('h2.ons-file-download__title').length).toBe(1);
            });
        });
    });

    describe('GIVEN: Params: linkText', () => {
        describe('WHEN: linkText is provided', () => {
            const $ = cheerio.load(renderComponent('file-download', EXAMPLE_FILE_DOWNLOAD_CUSTOM_LINK_TEXT));

            test('THEN: renders the custom link text', () => {
                expect($('.ons-file-download__link').text()).toContain('Save');
            });
        });
    });

    describe('GIVEN: Params: newWindow', () => {
        describe('WHEN: newWindow is true', () => {
            const $ = cheerio.load(
                renderComponent('file-download', { ...EXAMPLE_FILE_DOWNLOAD_BASIC, newWindow: true }),
            );

            test('THEN: adds target="_blank" to the download link', () => {
                expect($('.ons-file-download__link').attr('target')).toBe('_blank');
            });

            test('THEN: adds rel="noopener" to the download link', () => {
                expect($('.ons-file-download__link').attr('rel')).toBe('noopener');
            });
        });

        describe('WHEN: newWindow is not set', () => {
            const $ = cheerio.load(renderComponent('file-download', EXAMPLE_FILE_DOWNLOAD_BASIC));

            test('THEN: does not add target="_blank" to the download link', () => {
                expect($('.ons-file-download__link').attr('target')).toBeUndefined();
            });
        });
    });

    describe('GIVEN: Accessibility: icon placeholder', () => {
        describe('WHEN: component is rendered', () => {
            const $ = cheerio.load(renderComponent('file-download', EXAMPLE_FILE_DOWNLOAD_BASIC));

            test('THEN: icon container is hidden from assistive technology', () => {
                expect($('.ons-file-download__icon').attr('aria-hidden')).toBe('true');
            });
        });
    });

    describe('GIVEN: Accessibility: screen reader text', () => {
        describe('WHEN: component is rendered', () => {
            const $ = cheerio.load(renderComponent('file-download', EXAMPLE_FILE_DOWNLOAD_BASIC));

            test('THEN: the download link contains visually hidden text with file name', () => {
                const hiddenText = $('.ons-file-download__link .ons-u-vh').text();
                expect(hiddenText).toContain('Annual population survey');
            });

            test('THEN: the download link contains file format in accessible text', () => {
                const hiddenText = $('.ons-file-download__link .ons-u-vh').text();
                expect(hiddenText).toContain('PDF file');
            });
        });
    });
});
