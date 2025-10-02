/** @jest-environment jsdom */

import * as cheerio from 'cheerio';
import axe from '../../tests/helpers/axe';
import { renderComponent, templateFaker } from '../../tests/helpers/rendering';
import { EXAMPLE_FIELDSET, EXAMPLE_FIELDSET_NO_ID, EXAMPLE_FIELDSET_NO_LEGEND } from './_test_examples';

describe('FOR: Macro: Fieldset', () => {
    describe('GIVEN: Params: id', () => {
        describe('WHEN: id is provided', () => {
            const $ = cheerio.load(renderComponent('fieldset', EXAMPLE_FIELDSET));

            test('THEN: renders fieldset with provided id', () => {
                expect($('.ons-fieldset').attr('id')).toBe('example-fieldset');
            });

            test('THEN: legend has correct aria-describedby attribute', () => {
                const ariaDescByVal = $('.ons-fieldset__legend').attr('aria-describedby');
                expect(ariaDescByVal).toBe('example-fieldset-legend-description');
            });
        });

        describe('WHEN: id is not provided', () => {
            const $ = cheerio.load(renderComponent('fieldset', EXAMPLE_FIELDSET_NO_ID));

            test('THEN: description has default id', () => {
                const id = $('.ons-fieldset__description').attr('id');
                expect(id).toBe('legend-description');
            });

            test('THEN: legend has correct aria-describedby attribute', () => {
                const ariaDescByVal = $('.ons-fieldset__legend').attr('aria-describedby');
                expect(ariaDescByVal).toBe('legend-description');
            });
        });
    });

    describe('GIVEN: Params: legend', () => {
        describe('WHEN: legend is provided', () => {
            const $ = cheerio.load(renderComponent('fieldset', EXAMPLE_FIELDSET));

            test('THEN: jest-axe checks pass', async () => {
                const results = await axe($.html());
                expect(results).toHaveNoViolations();
            });

            test('THEN: renders legend with provided text', () => {
                const title = $('.ons-fieldset__legend-title').text().trim();
                expect(title).toBe('Fieldset legend');
            });

            test('THEN: legend has correct aria-describedby attribute', () => {
                const ariaDescByVal = $('.ons-fieldset__legend').attr('aria-describedby');
                expect(ariaDescByVal).toBe('example-fieldset-legend-description');
            });

            test('THEN: legend has the legend with description class', () => {
                expect($('.ons-fieldset__legend').hasClass('ons-fieldset__legend--with-description')).toBe(true);
            });
        });

        describe('WHEN: legend is not provided and legendIsQuestionTitle is not set', () => {
            const $ = cheerio.load(renderComponent('fieldset', EXAMPLE_FIELDSET_NO_LEGEND));

            test('THEN: does not render fieldset or legend', () => {
                expect($('.ons-fieldset').length).toBe(0);
                expect($('.ons-fieldset__legend').length).toBe(0);
            });
        });
    });

    describe('GIVEN: Params: classes', () => {
        describe('WHEN: classes are provided', () => {
            const $ = cheerio.load(
                renderComponent('fieldset', {
                    ...EXAMPLE_FIELDSET,
                    classes: 'extra-class another-extra-class',
                }),
            );

            test('THEN: renders fieldset with provided classes', () => {
                expect($('.ons-fieldset').hasClass('extra-class')).toBe(true);
                expect($('.ons-fieldset').hasClass('another-extra-class')).toBe(true);
            });
        });
    });

    describe('GIVEN: Params: legendClasses', () => {
        describe('WHEN: legendClasses are provided', () => {
            const $ = cheerio.load(
                renderComponent('fieldset', {
                    ...EXAMPLE_FIELDSET,
                    legendClasses: 'extra-class another-extra-class',
                }),
            );

            test('THEN: renders legend with provided classes', () => {
                expect($('.ons-fieldset__legend').hasClass('extra-class')).toBe(true);
                expect($('.ons-fieldset__legend').hasClass('another-extra-class')).toBe(true);
            });
        });
    });

    describe('GIVEN: Params: attributes', () => {
        describe('WHEN: attributes are provided', () => {
            const $ = cheerio.load(
                renderComponent('fieldset', {
                    ...EXAMPLE_FIELDSET,
                    attributes: {
                        a: 123,
                        b: 456,
                    },
                }),
            );

            test('THEN: renders fieldset with provided attributes', () => {
                expect($('.ons-fieldset').attr('a')).toBe('123');
                expect($('.ons-fieldset').attr('b')).toBe('456');
            });
        });
    });

    describe('GIVEN: Params: dontWrap', () => {
        describe('WHEN: dontWrap is set to true', () => {
            const $ = cheerio.load(
                renderComponent(
                    'fieldset',
                    {
                        ...EXAMPLE_FIELDSET,
                        dontWrap: true,
                    },
                    'Example content...',
                ),
            );

            test('THEN: renders without fieldset wrapper', () => {
                expect($('.ons-fieldset').length).toBe(0);
                expect($('.ons-input-items').length).toBe(1);
            });

            test('THEN: renders content inside ons-input-items div', () => {
                expect($('.ons-input-items').html()).toBe('Example content...');
            });
        });

        describe('WHEN: dontWrap is set to true and legend is not provided', () => {
            const $ = cheerio.load(renderComponent('fieldset', { ...EXAMPLE_FIELDSET_NO_LEGEND, dontWrap: true }));

            test('THEN: renders ons-input-items div without fieldset or legend', () => {
                expect($('.ons-fieldset').length).toBe(0);
                expect($('.ons-fieldset__legend').length).toBe(0);
                expect($('.ons-input-items').length).toBe(1);
            });
        });
    });

    describe('GIVEN: Content', () => {
        describe('WHEN: content is provided', () => {
            const $ = cheerio.load(renderComponent('fieldset', EXAMPLE_FIELDSET, 'Example content...'));

            test('THEN: renders fieldset with provided content', () => {
                const content = $('.ons-fieldset').html();
                expect(content).toContain('Example content...');
            });
        });
    });

    describe('GIVEN: Params: error', () => {
        describe('WHEN: error is provided', () => {
            const faker = templateFaker();
            const errorSpy = faker.spy('error');

            faker.renderComponent('fieldset', {
                ...EXAMPLE_FIELDSET,
                error: { text: 'Error message' },
            });

            test('THEN: wraps fieldset with error component', () => {
                expect(errorSpy.occurrences.length).toBe(1);
                expect(errorSpy.occurrences[0]).toEqual({ text: 'Error message' });
            });
        });
    });

    describe('GIVEN: Params: legendIsQuestionTitle', () => {
        describe('WHEN: legendIsQuestionTitle is set to true and legend is provided', () => {
            const $ = cheerio.load(
                renderComponent('fieldset', {
                    ...EXAMPLE_FIELDSET,
                    legendIsQuestionTitle: true,
                }),
            );

            test('THEN: jest-axe checks pass', async () => {
                const results = await axe($.html());
                expect(results).toHaveNoViolations();
            });

            test('THEN: description has correct classes', () => {
                expect($('.ons-fieldset__description').hasClass('ons-fieldset__description--title')).toBe(true);
                expect($('.ons-fieldset__description').hasClass('ons-u-mb-l')).toBe(true);
            });
        });

        describe('WHEN: legendIsQuestionTitle is not set and legend is provided', () => {
            const $ = cheerio.load(renderComponent('fieldset', EXAMPLE_FIELDSET));

            test('THEN: renders legend title in a span', () => {
                const titleTag = $('.ons-fieldset__legend-title')[0].tagName;
                expect(titleTag).toBe('span');
            });
        });
    });

    describe('GIVEN: Params: legendTitleClasses', () => {
        describe('WHEN: legendTitleClasses are provided with legendIsQuestionTitle set to true', () => {
            const $ = cheerio.load(
                renderComponent('fieldset', {
                    ...EXAMPLE_FIELDSET,
                    legendIsQuestionTitle: true,
                    legendTitleClasses: 'extra-class another-extra-class',
                }),
            );

            test('THEN: renders legend title with provided classes', () => {
                expect($('.ons-fieldset__legend-title').hasClass('extra-class')).toBe(true);
                expect($('.ons-fieldset__legend-title').hasClass('another-extra-class')).toBe(true);
            });
        });

        describe('WHEN: legendTitleClasses are provided without legendIsQuestionTitle', () => {
            const $ = cheerio.load(
                renderComponent('fieldset', {
                    ...EXAMPLE_FIELDSET,
                    legendTitleClasses: 'extra-class another-extra-class',
                }),
            );

            test('THEN: legend title does not have additional classes', () => {
                expect($('.ons-fieldset__legend-title').hasClass('extra-class')).toBe(false);
                expect($('.ons-fieldset__legend-title').hasClass('another-extra-class')).toBe(false);
            });
        });
    });

    describe('GIVEN: Params: description', () => {
        describe('WHEN: description is not provided', () => {
            const $ = cheerio.load(
                renderComponent('fieldset', {
                    ...EXAMPLE_FIELDSET,
                    description: undefined,
                }),
            );

            test('THEN: fieldset renders without description', () => {
                expect($('.ons-fieldset__description').length).toBe(0);
            });

            test('THEN: legend does not have aria-describedby attribute', () => {
                const ariaDescByVal = $('.ons-fieldset__legend').attr('aria-describedby');
                expect(ariaDescByVal).toBeUndefined();
            });

            test('THEN: legend does not have ons-fieldset__legend--with-description class', () => {
                expect($('.ons-fieldset__legend').hasClass('ons-fieldset__legend--with-description')).toBe(false);
            });
        });
    });
});
