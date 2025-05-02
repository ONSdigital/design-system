/** @jest-environment jsdom */

import * as cheerio from 'cheerio';

import axe from '../../tests/helpers/axe';
import { renderComponent, templateFaker } from '../../tests/helpers/rendering';
import { EXAMPLE_AUTOSUGGEST_ADDRESS_MINIMAL, EXAMPLE_MANUAL_INPUT_FIELDS } from './_test-examples';

describe('FOR: Macro: Address-input', () => {
    describe('GIVEN: Params: required', () => {
        describe('WHEN: required params are provided', () => {
            const $ = cheerio.load(renderComponent('address-input', EXAMPLE_AUTOSUGGEST_ADDRESS_MINIMAL));

            test('THEN: jest-axe tests pass', async () => {
                const results = await axe($.html());
                expect(results).toHaveNoViolations();
            });
        });
    });

    describe('GIVEN: Params: manualEntry', () => {
        describe('WHEN: manualEntry is set to false', () => {
            const $ = cheerio.load(
                renderComponent('address-input', {
                    ...EXAMPLE_AUTOSUGGEST_ADDRESS_MINIMAL,
                    isEditable: true,
                    manualEntry: false,
                }),
            );

            test('THEN: it renders with class to hide manual input fields', () => {
                expect($('.ons-js-address-input__manual').hasClass('ons-u-db-no-js_enabled')).toBe(true);
            });
        });

        describe('WHEN: manualEntry is set to true', () => {
            const faker = templateFaker();
            const autosuggestSpy = faker.spy('autosuggest', { suppressOutput: true });

            const $ = cheerio.load(
                renderComponent('address-input', {
                    ...EXAMPLE_AUTOSUGGEST_ADDRESS_MINIMAL,
                    isEditable: true,
                    manualEntry: true,
                }),
            );

            test('THEN: it renders with class to show manual input fields', () => {
                expect($('.ons-js-address-input__manual').hasClass('ons-u-db-no-js_enabled')).toBe(false);
            });

            test('THEN: autosuggest search field is not shown', () => {
                expect(autosuggestSpy.occurrences.length).toBe(0);
            });
        });

        describe('WHEN: manualEntry is not set', () => {
            const faker = templateFaker();
            const autosuggestSpy = faker.spy('autosuggest', { suppressOutput: true });

            // Since autosuggestSpy suppresses output the values being tested below do not
            // need to represent real values. This test is only interested in verifying that
            // the provided values are being passed through to the autosuggest component.
            faker.renderComponent('address-input', {
                ...EXAMPLE_AUTOSUGGEST_ADDRESS_MINIMAL,
                label: {
                    text: '[params.label.text]',
                    id: '[params.label.id]',
                },
                value: '[params.value]',
                attributes: '[params.attributes]',
                error: '[params.error]',
                name: '[params.name]',
                mutuallyExclusive: '[params.mutuallyExclusive]',
                apiDomain: '[params.apiDomain]',
                apiDomainBearerToken: '[params.apiDomainBearerToken]',
                apiManualQueryParams: '[params.apiManualQueryParams]',
                allowMultiple: '[params.allowMultiple]',
                mandatory: '[params.mandatory]',
                instructions: '[params.instructions]',
                autocomplete: '[params.autocomplete]',
                isEditable: '[params.isEditable]',
                ariaYouHaveSelected: '[params.ariaYouHaveSelected]',
                ariaMinChars: '[params.ariaMinChars]',
                minChars: '[params.minChars]',
                ariaOneResult: '[params.ariaOneResult]',
                ariaNResults: '[params.ariaNResults]',
                ariaLimitedResults: '[params.ariaLimitedResults]',
                ariaGroupedResults: '[params.ariaGroupedResults]',
                groupCount: '[params.groupCount]',
                moreResults: '[params.moreResults]',
                tooManyResults: '[params.tooManyResults]',
                resultsTitle: '[params.resultsTitle]',
                resultsTitleId: '[params.resultsTitleId]',
                noResults: '[params.noResults]',
                typeMore: '[params.typeMore]',
                errorTitle: '[params.errorTitle]',
                errorMessageEnter: '[params.errorMessageEnter]',
                errorMessageSelect: '[params.errorMessageSelect]',
                errorMessageApi: '[params.errorMessageApi]',
                errorMessageApiLinkText: '[params.errorMessageApiLinkText]',
                options: '[params.options]',
                manualLinkUrl: '[params.manualLinkUrl]',
                manualLinkText: '[params.manualLinkText]',
            });

            test('THEN: the provided attributes are passed through to the autosuggest component', () => {
                expect(autosuggestSpy.occurrences[0]).toEqual({
                    id: 'address-input-example-id-autosuggest',
                    classes: 'ons-address-input__autosuggest ons-u-mb-no',
                    input: {
                        width: '50',
                        label: {
                            text: '[params.label.text]',
                            id: '[params.label.id]',
                            classes: 'ons-js-autosuggest-label',
                        },
                        value: '[params.value]',
                        attributes: '[params.attributes]',
                        error: '[params.error]',
                        name: '[params.name]',
                        mutuallyExclusive: '[params.mutuallyExclusive]',
                    },
                    externalInitialiser: true,
                    apiDomain: '[params.apiDomain]',
                    apiDomainBearerToken: '[params.apiDomainBearerToken]',
                    apiManualQueryParams: '[params.apiManualQueryParams]',
                    allowMultiple: '[params.allowMultiple]',
                    mandatory: '[params.mandatory]',
                    instructions: '[params.instructions]',
                    autocomplete: '[params.autocomplete]',
                    isEditable: '[params.isEditable]',
                    ariaYouHaveSelected: '[params.ariaYouHaveSelected]',
                    ariaMinChars: '[params.ariaMinChars]',
                    minChars: '[params.minChars]',
                    ariaOneResult: '[params.ariaOneResult]',
                    ariaNResults: '[params.ariaNResults]',
                    ariaLimitedResults: '[params.ariaLimitedResults]',
                    ariaGroupedResults: '[params.ariaGroupedResults]',
                    groupCount: '[params.groupCount]',
                    moreResults: '[params.moreResults]',
                    tooManyResults: '[params.tooManyResults]',
                    resultsTitle: '[params.resultsTitle]',
                    resultsTitleId: '[params.resultsTitleId]',
                    noResults: '[params.noResults]',
                    typeMore: '[params.typeMore]',
                    errorTitle: '[params.errorTitle]',
                    errorMessageEnter: '[params.errorMessageEnter]',
                    errorMessageSelect: '[params.errorMessageSelect]',
                    errorMessageApi: '[params.errorMessageApi]',
                    errorMessageApiLinkText: '[params.errorMessageApiLinkText]',
                    options: '[params.options]',
                    manualLinkUrl: '[params.manualLinkUrl]',
                    manualLinkText: '[params.manualLinkText]',
                });
            });
        });
    });

    describe('GIVEN: Params: AddressField object', () => {
        const faker = templateFaker();
        const inputSpy = faker.spy('input', { suppressOutput: true });

        faker.renderComponent('address-input', {
            ...EXAMPLE_AUTOSUGGEST_ADDRESS_MINIMAL,
            ...EXAMPLE_MANUAL_INPUT_FIELDS,
            isEditable: true,
        });
        describe('WHEN: organisation is provided', () => {
            test('THEN: it renders "organisation" input field with expected parameters', () => {
                expect(inputSpy.occurrences).toContainEqual({
                    id: 'address-input-example-id-organisation',
                    name: 'address-input-example-id-organisation',
                    classes: 'ons-js-address-organisation',
                    label: {
                        text: 'Organisation name',
                    },
                    value: 'Example Organisation',
                    width: '20@m',
                    error: { text: 'Server error: organisation name' },
                });
            });
        });
        describe('WHEN: line1 is provided', () => {
            test('THEN: it renders "address line 1" input field with expected parameters', () => {
                expect(inputSpy.occurrences).toContainEqual({
                    id: 'address-input-example-id-line1',
                    name: 'address-input-example-id-line1',
                    classes: 'ons-js-address-line1',
                    label: {
                        text: 'Address line 1',
                    },
                    value: 'Flat 12345',
                    width: '20@m',
                    error: { text: 'Server error: address line 1' },
                });
            });
        });

        describe('WHEN: line2 is provided', () => {
            test('THEN: it renders "address line 2" input field with expected parameters', () => {
                expect(inputSpy.occurrences).toContainEqual({
                    id: 'address-input-example-id-line2',
                    name: 'address-input-example-id-line2',
                    classes: 'ons-js-address-line2',
                    label: {
                        text: 'Address line 2',
                    },
                    value: '12345 The Road',
                    width: '20@m',
                    error: { text: 'Server error: address line 2' },
                });
            });
        });

        describe('WHEN: town is provided', () => {
            test('THEN: it renders "town or city" input field with expected parameters', () => {
                expect(inputSpy.occurrences).toContainEqual({
                    id: 'address-input-example-id-town',
                    name: 'address-input-example-id-town',
                    classes: 'ons-js-address-town',
                    label: {
                        text: 'Town or city',
                    },
                    value: 'The Town',
                    error: { text: 'Server error: town or city' },
                });
            });
        });

        describe('WHEN: postcode is provided', () => {
            test('THEN: it renders "postcode" input field with expected parameters', () => {
                expect(inputSpy.occurrences).toContainEqual({
                    id: 'address-input-example-id-postcode',
                    name: 'address-input-example-id-postcode',
                    classes: 'ons-js-address-postcode',
                    label: {
                        text: 'Postcode',
                    },
                    value: 'PO57 6ODE',
                    width: '7',
                    error: { text: 'Server error: postcode' },
                });
            });
        });
    });

    describe('GIVEN: Params: searchButton for no-js', () => {
        describe('WHEN: manualEntry parameter is set to true', () => {
            const $ = cheerio.load(
                renderComponent('address-input', {
                    ...EXAMPLE_AUTOSUGGEST_ADDRESS_MINIMAL,
                    isEditable: true,
                    manualEntry: true,
                    searchButton: 'Search for address',
                }),
            );
            test('THEN: search button does not render', () => {
                expect($('.ons-js-address-search-btn').length).toBe(0);
            });
        });

        describe('WHEN: manualEntry parameter is not set', () => {
            const $ = cheerio.load(
                renderComponent('address-input', {
                    ...EXAMPLE_AUTOSUGGEST_ADDRESS_MINIMAL,
                    isEditable: true,
                    searchButton: 'Search for address',
                }),
            );

            test('THEN: search button is displayed', () => {
                expect($('.ons-js-address-search-btn').hasClass('ons-u-db-no-js_disabled')).toBe(true);
            });

            test('THEN: it renders search button with provided text', () => {
                expect($('.ons-js-address-search-btn').text().trim()).toBe('Search for address');
            });
        });
    });

    describe('GIVEN: Params: uprn', () => {
        describe('WHEN: uprn.value is not provided', () => {
            const faker = templateFaker();
            const inputSpy = faker.spy('input', { suppressOutput: true });

            faker.renderComponent('address-input', EXAMPLE_AUTOSUGGEST_ADDRESS_MINIMAL);

            test('THEN: it renders hidden input component with expected parameters', () => {
                expect(inputSpy.occurrences).toContainEqual({
                    id: 'address-input-example-id-uprn',
                    classes: 'ons-js-hidden-uprn ons-u-d-no',
                    type: 'hidden',
                    name: 'address-input-example-id-uprn',
                    value: '',
                });
            });
        });

        describe('WHEN: uprn.value is provided', () => {
            const faker = templateFaker();
            const inputSpy = faker.spy('input', { suppressOutput: true });

            faker.renderComponent('address-input', {
                ...EXAMPLE_AUTOSUGGEST_ADDRESS_MINIMAL,
                uprn: {
                    value: '[params.uprn.value]',
                },
            });

            test('THEN: it renders hidden input component with expected parameters', () => {
                expect(inputSpy.occurrences).toContainEqual({
                    id: 'address-input-example-id-uprn',
                    classes: 'ons-js-hidden-uprn ons-u-d-no',
                    type: 'hidden',
                    name: 'address-input-example-id-uprn',
                    value: '[params.uprn.value]',
                });
            });
        });
    });

    describe('GIVEN: Params: manualLink', () => {
        describe('WHEN: provided with a default value for manualLink', () => {
            const $ = cheerio.load(
                renderComponent('address-input', {
                    ...EXAMPLE_AUTOSUGGEST_ADDRESS_MINIMAL,
                    manualLinkUrl: '#0',
                    manualLinkText: 'Manually enter address',
                }),
            );

            test('THEN: it renders the manual link with the provided url', () => {
                expect($('.ons-js-address-manual-btn').attr('href')).toBe('#0');
            });

            test('THEN: it renders the manual link with the provided text', () => {
                expect($('.ons-js-address-manual-btn').text().trim()).toBe('Manually enter address');
            });
        });
    });

    describe('GIVEN: Params: dontWrap', () => {
        describe('WHEN: dontWrap is true', () => {
            const faker = templateFaker();
            const fieldsetSpy = faker.spy('fieldset', { suppressOutput: true });

            faker.renderComponent('address-input', {
                ...EXAMPLE_AUTOSUGGEST_ADDRESS_MINIMAL,
                dontWrap: true,
            });

            test('THEN: it does not render fieldset component', () => {
                expect(fieldsetSpy.occurrences.length).toBe(0);
            });
        });

        describe('WHEN: dontWrap is not set', () => {
            const faker = templateFaker();
            const fieldsetSpy = faker.spy('fieldset', { suppressOutput: true });

            faker.renderComponent('address-input', {
                ...EXAMPLE_AUTOSUGGEST_ADDRESS_MINIMAL,
                classes: 'extra-field-class',
                legendClasses: 'extra-legend-class',
            });

            test('THEN: it renders the fieldset component with expected parameters', () => {
                expect(fieldsetSpy.occurrences[0]).toEqual({
                    id: 'address-input-example-id',
                    classes: 'extra-field-class',
                    legend: 'What is the address?',
                    legendClasses: 'extra-legend-class',
                });
            });
        });
    });
});
