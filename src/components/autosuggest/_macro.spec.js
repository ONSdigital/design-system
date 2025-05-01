/** @jest-environment jsdom */

import * as cheerio from 'cheerio';

import axe from '../../tests/helpers/axe';
import { renderComponent, templateFaker } from '../../tests/helpers/rendering';

import { EXAMPLE_AUTOSUGGEST } from './_test-examples';

describe('FOR: Macro: Autosuggest', () => {
    describe('GIVEN: Params: Required', () => {
        describe('WHEN: required params are provided', () => {
            const $ = cheerio.load(renderComponent('autosuggest', EXAMPLE_AUTOSUGGEST));

            test('THEN: it passes jest-axe checks', async () => {
                const results = await axe($.html());
                expect(results).toHaveNoViolations();
            });

            test('THEN: it has a special class that indicates the component should initialise itself', () => {
                expect($('.ons-autosuggest').hasClass('ons-js-autosuggest')).toBe(true);
            });

            test('THEN: it has expected id on container element', () => {
                expect($('.ons-autosuggest').attr('id')).toBe('country-of-birth-container');
            });

            test('THEN: it has data-aria-limited-results with expected message', () => {
                expect($('.ons-autosuggest').attr('data-aria-limited-results')).toBe('Type more characters to improve your search');
            });

            test('THEN: it has data-aria-min-chars with expected message', () => {
                expect($('.ons-autosuggest').attr('data-aria-min-chars')).toBe('Enter 3 or more characters for suggestions.');
            });

            test('THEN: it has data-aria-n-results with expected message', () => {
                expect($('.ons-autosuggest').attr('data-aria-n-results')).toBe('There are {n} suggestions available.');
            });

            test('THEN: it has data-aria-one-result with expected message', () => {
                expect($('.ons-autosuggest').attr('data-aria-one-result')).toBe('There is one suggestion available.');
            });

            test('THEN: it has data-aria-you-have-selected with expected message', () => {
                expect($('.ons-autosuggest').attr('data-aria-you-have-selected')).toBe('You have selected');
            });

            test('THEN: it has data-autosuggest-data pointing to correct URL', () => {
                expect($('.ons-autosuggest').attr('data-autosuggest-data')).toBe('/examples/data/country-of-birth.json');
            });

            test('THEN: it has data-instructions with expected instructions', () => {
                expect($('.ons-autosuggest').attr('data-instructions')).toBe('Use up and down keys to navigate.');
            });

            test('THEN: it has data-more-results with expected message', () => {
                expect($('.ons-autosuggest').attr('data-more-results')).toBe('Continue entering to improve suggestions');
            });

            test('THEN: it has data-no-results with expected message', () => {
                expect($('.ons-autosuggest').attr('data-no-results')).toBe('No suggestions found. You can enter your own answer');
            });

            test('THEN: it has data-results-title with expected title', () => {
                expect($('.ons-autosuggest').attr('data-results-title')).toBe('Suggestions');
            });

            test('THEN: it has data-type-more with expected message', () => {
                expect($('.ons-autosuggest').attr('data-type-more')).toBe('Continue entering to get suggestions');
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

            test('THEN: it renders the instructions with the provided instructions text', () => {
                expect($('.ons-autosuggest__instructions').text().trim()).toBe('Use up and down keys to navigate.');
            });

            test('THEN: the aria-atomic attribute is set to true on the status container', () => {
                expect($('.ons-autosuggest__status').attr('aria-atomic')).toBe('true');
            });

            test('THEN: it has no value set for data-min-chars', () => {
                expect($('.ons-autosuggest').attr('data-min-chars')).toBe('');
            });

            test('THEN: it has no value set for data-result-threshold"', () => {
                expect($('.ons-autosuggest').attr('data-result-threshold')).toBeUndefined();
            });
        });
    });

    describe('GIVEN: Params: minChars', () => {
        describe('WHEN: minChars is provided', () => {
            const $ = cheerio.load(
                renderComponent('autosuggest', {
                    ...EXAMPLE_AUTOSUGGEST,
                    minChars: 2,
                }),
            );

            test('THEN: it has data-min-chars set to "2"', () => {
                expect($('.ons-autosuggest').attr('data-min-chars')).toBe('2');
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

        describe('WHEN: allowMultiple is not set', () => {
            const $ = cheerio.load(
                renderComponent('autosuggest', {
                    ...EXAMPLE_AUTOSUGGEST,
                }),
            );
            test('THEN: it does not have the data-allow-multiple attribute', () => {
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

        describe('WHEN: isEditable is true', () => {
            const $ = cheerio.load(
                renderComponent('autosuggest', {
                    ...EXAMPLE_AUTOSUGGEST,
                    isEditable: true,
                }),
            );

            test('THEN: it has the ons-js-address-not-editable class to indicate that component is not editable', () => {
                expect($('.ons-autosuggest').hasClass('ons-js-address-not-editable')).toBe(false);
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

        describe('WHEN: mandatory is false', () => {
            const $ = cheerio.load(
                renderComponent('autosuggest', {
                    ...EXAMPLE_AUTOSUGGEST,
                    mandatory: false,
                }),
            );

            test('THEN: it has the ons-js-address-mandatory class to indicate that component input is mandatory', () => {
                expect($('.ons-autosuggest').hasClass('ons-js-address-mandatory')).toBe(false);
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

    describe('GIVEN: Params: resultsThreshold', () => {
        describe('WHEN: resultsThreshold is provided', () => {
            const $ = cheerio.load(
                renderComponent('autosuggest', {
                    ...EXAMPLE_AUTOSUGGEST,
                    resultsThreshold: 0.5,
                }),
            );

            test('THEN: it has data-result-threshold set to "0.5"', () => {
                expect($('.ons-autosuggest').attr('data-result-threshold')).toBe('0.5');
            });
        });
    });

    describe('GIVEN: Params: language', () => {
        describe('WHEN: language is provided', () => {
            const $ = cheerio.load(
                renderComponent('autosuggest', {
                    ...EXAMPLE_AUTOSUGGEST,
                    language: 'en-gb',
                }),
            );

            test('THEN: it has language set to "en-gb"', () => {
                expect($('.ons-autosuggest').attr('data-lang')).toBe('en-gb');
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

            test('THEN: id is passed through to the input component', () => {
                expect(inputSpy.occurrences[0]).toHaveProperty('id', 'country-of-birth');
            });

            test('THEN: type is passed through to the input component', () => {
                expect(inputSpy.occurrences[0]).toHaveProperty('type', 'text');
            });

            test('THEN: classes are passed through to the input component', () => {
                expect(inputSpy.occurrences[0]).toHaveProperty('classes', 'ons-js-autosuggest-input extra-class another-extra-class');
            });

            test('THEN: width is passed through to the input component', () => {
                expect(inputSpy.occurrences[0]).toHaveProperty('width', '7');
            });

            test('THEN: label is passed through to the input component', () => {
                expect(inputSpy.occurrences[0]).toHaveProperty('label.text', 'Current name of country');
                expect(inputSpy.occurrences[0]).toHaveProperty('label.description', 'Enter your own answer or select from suggestions');
                expect(inputSpy.occurrences[0]).toHaveProperty('label.id', 'country-of-birth-label');
                expect(inputSpy.occurrences[0]).toHaveProperty('label.classes', 'extra-label-class');
            });

            test('THEN: autocomplete is passed through to the input component', () => {
                expect(inputSpy.occurrences[0]).toHaveProperty('autocomplete', 'off');
            });

            test('THEN: legend is passed through to the input component', () => {
                expect(inputSpy.occurrences[0]).toHaveProperty('legend', 'this is a legend');
                expect(inputSpy.occurrences[0]).toHaveProperty('legendClasses', 'legend-extra-class');
            });

            test('THEN: value is passed through to the input component', () => {
                expect(inputSpy.occurrences[0]).toHaveProperty('value', 'abc');
            });

            test('THEN: custom attribute "a" is passed through to the input component', () => {
                expect(inputSpy.occurrences[0]).toHaveProperty('attributes.a', 42);
            });

            test('THEN: error is passed through to the input component', () => {
                expect(inputSpy.occurrences[0]).toHaveProperty('error.id', 'error-id');
                expect(inputSpy.occurrences[0]).toHaveProperty('error.text', 'An error occurred.');
            });

            test('THEN: mutuallyExclusive is passed as null to the input component', () => {
                expect(inputSpy.occurrences[0]).toHaveProperty('mutuallyExclusive', null);
            });

            test('THEN: accessiblePlaceholder is passed as true to the input component', () => {
                expect(inputSpy.occurrences[0]).toHaveProperty('accessiblePlaceholder', true);
            });

            test('THEN: name is passed through to the input component', () => {
                expect(inputSpy.occurrences[0]).toHaveProperty('name', 'test-params');
            });

            test('THEN: autosuggestResults type is string', () => {
                expect(typeof inputSpy.occurrences[0].autosuggestResults).toBe('string');
            });

            test('THEN: minLength is passed through to the input component', () => {
                expect(inputSpy.occurrences[0]).toHaveProperty('minLength', 1);
            });

            test('THEN: maxLength is passed through to the input component', () => {
                expect(inputSpy.occurrences[0]).toHaveProperty('maxLength', 10);
            });

            test('THEN: prefix is passed through to the input component', () => {
                expect(inputSpy.occurrences[0]).toHaveProperty('prefix.title', 'Great British Pounds');
                expect(inputSpy.occurrences[0]).toHaveProperty('prefix.text', '£');
                expect(inputSpy.occurrences[0]).toHaveProperty('prefix.id', 'gbp-prefix');
            });

            test('THEN: suffix is passed through to the input component', () => {
                expect(inputSpy.occurrences[0]).toHaveProperty('suffix.title', 'Percentage of total');
                expect(inputSpy.occurrences[0]).toHaveProperty('suffix.text', '%');
                expect(inputSpy.occurrences[0]).toHaveProperty('suffix.id', 'percentage-suffix');
            });

            test('THEN: field is passed through to the input component', () => {
                expect(inputSpy.occurrences[0]).toHaveProperty('fieldId', 'field-id-test');
                expect(inputSpy.occurrences[0]).toHaveProperty('fieldClasses', 'field-class-test');
            });

            test('THEN: dontWrap is passed as true to the input component', () => {
                expect(inputSpy.occurrences[0]).toHaveProperty('dontWrap', true);
            });

            test('THEN: charCheckLimit is passed through to the input component', () => {
                expect(inputSpy.occurrences[0]).toHaveProperty('charCheckLimit.limit', 200);
                expect(inputSpy.occurrences[0]).toHaveProperty('charCheckLimit.charCountSingular', 'You have {x} character remaining');
                expect(inputSpy.occurrences[0]).toHaveProperty('charCheckLimit.charCountPlural', 'You have {x} characters remaining');
                expect(inputSpy.occurrences[0]).toHaveProperty('charCheckLimit.charCountOverLimitSingular', '{x} character too many');
                expect(inputSpy.occurrences[0]).toHaveProperty('charCheckLimit.charCountOverLimitPlural', '{x} characters too many');
            });

            test('THEN: searchButton text is passed through to the input component', () => {
                expect(inputSpy.occurrences[0]).toHaveProperty('searchButton.text', 'Search');
            });

            test('THEN: postTextboxLinkText is passed through to the input component', () => {
                expect(inputSpy.occurrences[0]).toHaveProperty('postTextboxLinkText', 'Post textbox link text');
                expect(inputSpy.occurrences[0]).toHaveProperty('postTextboxLinkUrl', 'https://www.ons.gov.uk');
            });

            test('THEN: click listener is correctly assigned', () => {
                expect(inputSpy.occurrences[0]).toHaveProperty('listeners.click', "function() { console.log('click'); }");
            });
        });
    });

    describe('GIVEN: Params: mutuallyExclusive', () => {
        describe('WHEN: mutuallyExclusive parameter is not defined', () => {
            const $ = cheerio.load(renderComponent('autosuggest', EXAMPLE_AUTOSUGGEST));

            test('THEN: autosuggest results are rendered', () => {
                expect($('.ons-autosuggest__results').length).toBe(1);
            });
        });

        describe('WHEN: mutuallyExclusive parameter is defined', () => {
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
