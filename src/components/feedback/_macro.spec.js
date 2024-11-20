/** @jest-environment jsdom */

import * as cheerio from 'cheerio';

import axe from '../../tests/helpers/axe';
import { renderComponent } from '../../tests/helpers/rendering';
import { EXAMPLE_FEEDBACK, EXAMPLE_FEEDBACK_ALL_PARAMS } from './_test_examples';

describe('FOR: Macro: Feedback', () => {
    describe('GIVEN: Params: required', () => {
        describe('WHEN: all required params are provided', () => {
            const $ = cheerio.load(renderComponent('feedback', EXAMPLE_FEEDBACK));
            test('THEN: jest-axe checks pass', async () => {
                const results = await axe($.html());
                expect(results).toHaveNoViolations();
            });

            test('THEN: the title has a default headingLevel of 2', () => {
                expect($(`h2.ons-feedback__heading`).text().trim()).toBe('Feedback heading');
            });
        });
    });

    describe('GIVEN: Params: all', () => {
        describe('WHEN: all params are provided', () => {
            const $ = cheerio.load(renderComponent('feedback', EXAMPLE_FEEDBACK_ALL_PARAMS));
            test('THEN: jest-axe checks pass', async () => {
                const results = await axe($.html());
                expect(results).toHaveNoViolations();
            });
        });
    });

    describe('GIVEN: Params: id', () => {
        describe('WHEN: id is provided', () => {
            const $ = cheerio.load(
                renderComponent('feedback', {
                    ...EXAMPLE_FEEDBACK,
                    id: 'example-id',
                }),
            );
            test('THEN: renders with provided id', () => {
                expect($('#example-id').length).toBe(1);
            });
        });
    });

    describe('GIVEN: Params: classes', () => {
        describe('WHEN: additional style classes are provided', () => {
            const $ = cheerio.load(
                renderComponent('feedback', {
                    ...EXAMPLE_FEEDBACK,
                    classes: 'extra-class another-extra-class',
                }),
            );
            test('THEN: renders with provided classes', () => {
                expect($('.ons-feedback').hasClass('extra-class')).toBe(true);
                expect($('.ons-feedback').hasClass('another-extra-class')).toBe(true);
            });
        });
    });

    describe('GIVEN: Params: heading', () => {
        describe('WHEN: heading is provided', () => {
            const $ = cheerio.load(
                renderComponent('feedback', {
                    ...EXAMPLE_FEEDBACK,
                }),
            );
            test('THEN: renders with provided heading text', () => {
                expect($('.ons-feedback__heading').text().trim()).toBe('Feedback heading');
            });
        });
    });

    describe('GIVEN: Params: headingLevel', () => {
        describe('WHEN: headingLevel is provided', () => {
            test.each([
                [1, 'h1'],
                [4, 'h4'],
            ])('THEN: has the correct heading element type for the provided headingLevel (%i -> %s)', (headingLevel, expectedTitleTag) => {
                const $ = cheerio.load(
                    renderComponent('feedback', {
                        ...EXAMPLE_FEEDBACK,
                        headingLevel,
                    }),
                );
                const titleTag = $(`${expectedTitleTag}.ons-feedback__heading`)[0].tagName;
                expect(titleTag).toBe(expectedTitleTag);
            });
        });
    });

    describe('GIVEN: Params: headingClasses', () => {
        describe('WHEN: additional heading style classes are provided', () => {
            const $ = cheerio.load(
                renderComponent('feedback', {
                    ...EXAMPLE_FEEDBACK,
                    headingClasses: 'extra-heading-class another-extra-heading-class',
                }),
            );
            test('THEN: renders with provided classes', () => {
                expect($('.ons-feedback__heading').hasClass('extra-heading-class')).toBe(true);
                expect($('.ons-feedback__heading').hasClass('another-extra-heading-class')).toBe(true);
            });
        });
    });

    describe('GIVEN: Params: content', () => {
        describe('WHEN: content is provided', () => {
            const $ = cheerio.load(renderComponent('feedback', EXAMPLE_FEEDBACK));
            test('THEN: renders paragraph with the provided content', () => {
                expect($('p').text().trim()).toBe('Feedback content...');
            });
        });
    });

    describe('GIVEN: Params: linkUrl', () => {
        describe('WHEN: linkUrl is provided', () => {
            const $ = cheerio.load(renderComponent('feedback', EXAMPLE_FEEDBACK));
            test('THEN: renders a link with the provided linkUrl', () => {
                expect($('.ons-feedback__link').attr('href')).toBe('http://example.com');
            });
        });
    });

    describe('GIVEN: Params: linkText', () => {
        describe('WHEN: linkText is provided', () => {
            const $ = cheerio.load(renderComponent('feedback', EXAMPLE_FEEDBACK));
            test('THEN: renders a link with the provided linkText', () => {
                expect($('.ons-feedback__link').text().trim()).toBe('Feedback link text');
            });
        });
    });
});
