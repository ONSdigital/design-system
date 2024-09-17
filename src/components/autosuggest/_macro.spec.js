/** @jest-environment jsdom */

import * as cheerio from 'cheerio';

import axe from '../../tests/helpers/axe';
import { renderComponent, templateFaker } from '../../tests/helpers/rendering';

import { EXAMPLE_AUTOSUGGEST } from './_test-examples';

describe('FOR: autosuggest', () => {
    describe('GIVEN: Params: none', () => {
        describe('WHEN: All params are at default state', () => {
            const $ = cheerio.load(renderComponent('autosuggest', EXAMPLE_AUTOSUGGEST));

            test('THEN: it passes jest-axe checks', async () => {
                const results = await axe($.html());
                expect(results).toHaveNoViolations();
            });

            test('THEN: it has expected id on container element', () => {
                expect($('.ons-autosuggest').attr('id')).toBe('country-of-birth-container');
            });

            test('THEN: it has a special class that indicates the component should initialise itself', () => {
                const $ = cheerio.load(renderComponent('autosuggest', EXAMPLE_AUTOSUGGEST));

                expect($('.ons-autosuggest').hasClass('ons-js-autosuggest')).toBe(true);
            });

            test('THEN: it has the provided data attributes', () => {
                const $element = $('.ons-autosuggest');
                expect($element.attr('data-allow-multiple')).toBeUndefined();
                expect($element.attr('data-min-chars')).toBe('2');
                expect($element.attr('data-aria-limited-results')).toBe('Type more characters to improve your search');
                expect($element.attr('data-aria-min-chars')).toBe('Enter 3 or more characters for suggestions.');
                expect($element.attr('data-aria-n-results')).toBe('There are {n} suggestions available.');
                expect($element.attr('data-aria-one-result')).toBe('There is one suggestion available.');
                expect($element.attr('data-aria-you-have-selected')).toBe('You have selected');
                expect($element.attr('data-autosuggest-data')).toBe('/examples/data/country-of-birth.json');
                expect($element.attr('data-instructions')).toBe('Use up and down keys to navigate.');
                expect($element.attr('data-more-results')).toBe('Continue entering to improve suggestions');
                expect($element.attr('data-no-results')).toBe('No suggestions found. You can enter your own answer');
                expect($element.attr('data-results-title')).toBe('Suggestions');
                expect($element.attr('data-type-more')).toBe('Continue entering to get suggestions');
            });

            test('THEN: it has the expected id on the results title element', () => {
                expect($('.ons-autosuggest__results-title').attr('id')).toBe('country-of-birth-suggestions');
            });

            test('THEN: it renders the results title div with the provided title text', () => {
                expect($('.ons-autosuggest__results-title').text().trim()).toBe('Suggestions');
            });

            test('THEN: it has the expected id on the results list element', () => {
                expect($('.ons-autosuggest__listbox').attr('id')).toBe('country-of-birth-listbox');
            });

            test('THEN: it renders the results list element with the title attribute set to the provided title text', () => {
                expect($('.ons-autosuggest__listbox').attr('title')).toBe('Suggestions');
            });

            test('THEN: it renders instructions with the expected id', () => {
                expect($('.ons-autosuggest__instructions').attr('id')).toBe('country-of-birth-instructions');
            });

            test('THEN: the aria-atomic attribute is set to true on the status container', () => {
                expect($('.ons-autosuggest__status').attr('aria-atomic')).toBe('true');
            });

            test('THEN: it renders the instructions with the provided instructions text', () => {
                expect($('.ons-autosuggest__instructions').text().trim()).toBe('Use up and down keys to navigate.');
            });
        });
    });

    describe('GIVEN: Params: allowMultiple', () => {
        describe('WHEN: allowMultiple is true', () => {
            const $ = cheerio.load(
                renderComponent('autosuggest', {
                    ...EXAMPLE_AUTOSUGGEST,
                    allowMultiple: true,
                }),
            );
            test('THEN: it has the data-allow-multiple attribute set to true on the container element', () => {
                expect($('.ons-autosuggest').attr('data-allow-multiple')).toBe('true');
            });
        });

        describe('WHEN: allowMultiple is false', () => {
            const $ = cheerio.load(
                renderComponent('autosuggest', {
                    ...EXAMPLE_AUTOSUGGEST,
                    allowMultiple: false,
                }),
            );
            test('THEN: it does not have the data-allow-multiple attribute on the container element', () => {
                expect($('.ons-autosuggest').attr('data-allow-multiple')).toBeUndefined();
            });
        });
    });

    describe('GIVEN: Params: externalInitialiser', () => {
        describe('WHEN: externalInitialiser is true', () => {
            const $ = cheerio.load(
                renderComponent('autosuggest', {
                    ...EXAMPLE_AUTOSUGGEST,
                    externalInitialiser: true,
                }),
            );

            test('THEN: it does not have the ons-js-autosuggest class that indicates the component should initialise itself', () => {
                expect($('.ons-autosuggest').hasClass('ons-js-autosuggest')).toBe(false);
            });
        });

        describe('WHEN: externalInitialiser is false', () => {
            const $ = cheerio.load(
                renderComponent('autosuggest', {
                    ...EXAMPLE_AUTOSUGGEST,
                    externalInitialiser: false,
                }),
            );

            test('THEN: it has the ons-js-autosuggest class that indicates the component should initialise itself', () => {
                expect($('.ons-autosuggest').hasClass('ons-js-autosuggest')).toBe(true);
            });
        });
    });

    describe('GIVEN: Params: isEditable', () => {
        describe('WHEN: isEditable is false', () => {
            const $ = cheerio.load(
                renderComponent('autosuggest', {
                    ...EXAMPLE_AUTOSUGGEST,
                    isEditable: false,
                }),
            );

            test('THEN: it has the ons-js-address-not-editable class to indicate that component is not editable', () => {
                expect($('.ons-autosuggest').hasClass('ons-js-address-not-editable')).toBe(true);
            });
        });
    });

    describe('GIVEN: Params: mandatory', () => {
        describe('WHEN: mandatory is true', () => {
            const $ = cheerio.load(
                renderComponent('autosuggest', {
                    ...EXAMPLE_AUTOSUGGEST,
                    mandatory: true,
                }),
            );

            test('THEN: it has the ons-js-address-mandatory class to indicate that component input is mandatory', () => {
                expect($('.ons-autosuggest').hasClass('ons-js-address-mandatory')).toBe(true);
            });
        });
    });

    describe('GIVEN: Params: containerClasses', () => {
        describe('WHEN: containerClasses is provided', () => {
            const $ = cheerio.load(
                renderComponent('autosuggest', {
                    ...EXAMPLE_AUTOSUGGEST,
                    containerClasses: 'extra-class another-extra-class',
                }),
            );

            test('THEN: it has additionally provided container style classes', () => {
                expect($('.ons-autosuggest').hasClass('extra-class')).toBe(true);
                expect($('.ons-autosuggest').hasClass('another-extra-class')).toBe(true);
            });
        });
    });

    describe('GIVEN: Params: input', () => {
        describe('WHEN: input param is provided', () => {
            const faker = templateFaker();
            const inputSpy = faker.spy('input');

            faker.renderComponent('autosuggest', {
                ...EXAMPLE_AUTOSUGGEST,
                input: {
                    type: 'text',
                    classes: 'extra-class another-extra-class',
                    width: '7',
                    label: {
                        text: 'Current name of country',
                        description: 'Enter your own answer or select from suggestions',
                        id: 'country-of-birth-label',
                        classes: 'extra-label-class',
                    },
                    autocomplete: 'off',
                    legend: 'this is a legend',
                    legendClasses: 'legend-extra-class',
                    value: 'abc',
                    attributes: {
                        a: 42,
                    },
                    error: {
                        id: 'error-id',
                        text: 'An error occurred.',
                    },
                    mutuallyExclusive: null,
                    accessiblePlaceholder: true,
                    name: 'test-params',
                    minLength: 1,
                    maxLength: 10,
                    prefix: {
                        title: 'Great British Pounds',
                        text: '£',
                        id: 'gbp-prefix',
                    },
                    suffix: {
                        title: 'Percentage of total',
                        text: '%',
                        id: 'percentage-suffix',
                    },
                    fieldId: 'field-id-test',
                    fieldClasses: 'field-class-test',
                    dontWrap: true,
                    charCheckLimit: {
                        limit: 200,
                        charCountSingular: 'You have {x} character remaining',
                        charCountPlural: 'You have {x} characters remaining',
                        charCountOverLimitSingular: '{x} character too many',
                        charCountOverLimitPlural: '{x} characters too many',
                    },
                    searchButton: {
                        text: 'Search',
                    },
                    postTextboxLinkText: 'Post textbox link text',
                    postTextboxLinkUrl: 'https://www.ons.gov.uk',
                    listeners: {
                        click: "function() { console.log('click'); }",
                    },
                },
            });
            test('THEN: it renders the input component with the expected parameters', () => {
                expect(inputSpy.occurrences[0]).toHaveProperty('id', 'country-of-birth');
                expect(inputSpy.occurrences[0]).toHaveProperty('type', 'text');
                expect(inputSpy.occurrences[0]).toHaveProperty('classes', 'ons-js-autosuggest-input extra-class another-extra-class');
                expect(inputSpy.occurrences[0]).toHaveProperty('width', '7');
                expect(inputSpy.occurrences[0]).toHaveProperty('label.text', 'Current name of country');
                expect(inputSpy.occurrences[0]).toHaveProperty('label.description', 'Enter your own answer or select from suggestions');
                expect(inputSpy.occurrences[0]).toHaveProperty('label.id', 'country-of-birth-label');
                expect(inputSpy.occurrences[0]).toHaveProperty('label.classes', 'extra-label-class');
                expect(inputSpy.occurrences[0]).toHaveProperty('autocomplete', 'off');
                expect(inputSpy.occurrences[0]).toHaveProperty('legend', 'this is a legend');
                expect(inputSpy.occurrences[0]).toHaveProperty('legendClasses', 'legend-extra-class');
                expect(inputSpy.occurrences[0]).toHaveProperty('value', 'abc');
                expect(inputSpy.occurrences[0]).toHaveProperty('attributes.a', 42);
                expect(inputSpy.occurrences[0]).toHaveProperty('error.id', 'error-id');
                expect(inputSpy.occurrences[0]).toHaveProperty('error.text', 'An error occurred.');
                expect(inputSpy.occurrences[0]).toHaveProperty('mutuallyExclusive', null);
                expect(inputSpy.occurrences[0]).toHaveProperty('accessiblePlaceholder', true);
                expect(inputSpy.occurrences[0]).toHaveProperty('name', 'test-params');
                expect(typeof inputSpy.occurrences[0].autosuggestResults).toBe('string');
                expect(inputSpy.occurrences[0]).toHaveProperty('minLength', 1);
                expect(inputSpy.occurrences[0]).toHaveProperty('maxLength', 10);
                expect(inputSpy.occurrences[0]).toHaveProperty('prefix.title', 'Great British Pounds');
                expect(inputSpy.occurrences[0]).toHaveProperty('prefix.text', '£');
                expect(inputSpy.occurrences[0]).toHaveProperty('prefix.id', 'gbp-prefix');
                expect(inputSpy.occurrences[0]).toHaveProperty('suffix.title', 'Percentage of total');
                expect(inputSpy.occurrences[0]).toHaveProperty('suffix.text', '%');
                expect(inputSpy.occurrences[0]).toHaveProperty('suffix.id', 'percentage-suffix');
                expect(inputSpy.occurrences[0]).toHaveProperty('fieldId', 'field-id-test');
                expect(inputSpy.occurrences[0]).toHaveProperty('fieldClasses', 'field-class-test');
                expect(inputSpy.occurrences[0]).toHaveProperty('dontWrap', true);
                expect(inputSpy.occurrences[0]).toHaveProperty('charCheckLimit.limit', 200);
                expect(inputSpy.occurrences[0]).toHaveProperty('charCheckLimit.charCountSingular', 'You have {x} character remaining');
                expect(inputSpy.occurrences[0]).toHaveProperty('charCheckLimit.charCountPlural', 'You have {x} characters remaining');
                expect(inputSpy.occurrences[0]).toHaveProperty('charCheckLimit.charCountOverLimitSingular', '{x} character too many');
                expect(inputSpy.occurrences[0]).toHaveProperty('charCheckLimit.charCountOverLimitPlural', '{x} characters too many');
                expect(inputSpy.occurrences[0]).toHaveProperty('searchButton.text', 'Search');
                expect(inputSpy.occurrences[0]).toHaveProperty('postTextboxLinkText', 'Post textbox link text');
                expect(inputSpy.occurrences[0]).toHaveProperty('postTextboxLinkUrl', 'https://www.ons.gov.uk');
                expect(inputSpy.occurrences[0]).toHaveProperty('listeners.click', "function() { console.log('click'); }");
            });
        });
    });

    describe('GIVEN: autosuggest results', () => {
        describe('WHEN: mutallyExclusive parameter is not defined', () => {
            const $ = cheerio.load(renderComponent('autosuggest', EXAMPLE_AUTOSUGGEST));

            test('THEN: autosuggest results are rendered', () => {
                expect($('.ons-autosuggest__results').length).toBe(1);
            });
        });

        describe('WHEN: mutallyExclusive parameter is defined', () => {
            const $ = cheerio.load(
                renderComponent('autosuggest', {
                    ...EXAMPLE_AUTOSUGGEST,
                    mutuallyExclusive: { fakeParam: true },
                }),
            );

            test('THEN: autosuggest results are not rendered', () => {
                expect($('.ons-autosuggest__results').length).toBe(0);
            });
        });
    });
});
