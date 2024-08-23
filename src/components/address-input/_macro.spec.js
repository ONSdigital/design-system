/** @jest-environment jsdom */

import * as cheerio from 'cheerio';

import axe from '../../tests/helpers/axe';
import { renderComponent, templateFaker } from '../../tests/helpers/rendering';

const EXAMPLE_AUTOSUGGEST_ADDRESS_MINIMAL = {
    id: 'address-input-example-id',
    legend: 'What is the address?',
    label: {
        text: 'Enter address or postcode and select from results',
        id: 'address-input-example-label-id',
    },
    isEditable: false,
    instructions: 'Use up and down keys to navigate suggestions.',
    ariaYouHaveSelected: 'You have selected',
    ariaMinChars: 'Enter 3 or more characters for suggestions.',
    ariaOneResult: 'There is one suggestion available.',
    ariaNResults: 'There are {n} suggestions available.',
    ariaLimitedResults: 'Results have been limited to 10 suggestions. Type more characters to improve your search',
    ariaGroupedResults: 'There are {n} for {x}',
    groupCount: '{n} addresses',
    moreResults: 'Enter more of the address to improve results',
    noResults: 'No results found. Try entering a different part of the address',
    tooManyResults: '{n} results found. Enter more of the address to improve results',
    typeMore: 'Enter more of the address to get results',
    resultsTitle: 'Select an address',
    resultsTitleId: 'address-suggestions',
};

const EXAMPLE_MANUAL_INPUT_FIELDS = {
    organisation: {
        label: 'Organisation name',
        value: 'Example Organisation',
        error: { text: 'Server error: organisation name' },
    },
    line1: {
        label: 'Address line 1',
        value: 'Flat 12345',
        error: { text: 'Server error: address line 1' },
    },
    line2: {
        label: 'Address line 2',
        value: '12345 The Road',
        error: { text: 'Server error: address line 2' },
    },
    town: {
        label: 'Town or city',
        value: 'The Town',
        error: { text: 'Server error: town or city' },
    },
    postcode: {
        label: 'Postcode',
        value: 'PO57 6ODE',
        error: { text: 'Server error: postcode' },
    },
};

describe('FOR: address-input', () => {
    describe('GIVEN: Params: none', () => {
        describe('WHEN: All params are at default state', () => {
            const $ = cheerio.load(renderComponent('address-input', EXAMPLE_AUTOSUGGEST_ADDRESS_MINIMAL));

            test('THEN: jest-axe tests pass', async () => {
                const results = await axe($.html());
                expect(results).toHaveNoViolations();
            });
        });
    });

    describe('GIVEN: manual entry of address', () => {
        describe('WHEN: automatic search is enabled', () => {
            const $ = cheerio.load(
                renderComponent('address-input', {
                    ...EXAMPLE_AUTOSUGGEST_ADDRESS_MINIMAL,
                    isEditable: true,
                    manualEntry: false,
                }),
            );

            test('THEN: it has class to hide input fields', () => {
                expect($('.ons-js-address-input__manual').hasClass('ons-u-db-no-js_enabled')).toBe(true);
            });
        });

        describe('WHEN: automatic search is disabled', () => {
            const $ = cheerio.load(
                renderComponent('address-input', {
                    ...EXAMPLE_AUTOSUGGEST_ADDRESS_MINIMAL,
                    isEditable: true,
                    manualEntry: true,
                }),
            );

            test('THEN: does not have class to hide input fields', () => {
                expect($('.ons-js-address-input__manual').hasClass('ons-u-db-no-js_enabled')).toBe(false);
            });
        });

        describe('WHEN: manual fields are provided', () => {
            const faker = templateFaker();
            const inputSpy = faker.spy('input', { suppressOutput: true });

            faker.renderComponent('address-input', {
                ...EXAMPLE_AUTOSUGGEST_ADDRESS_MINIMAL,
                ...EXAMPLE_MANUAL_INPUT_FIELDS,
                isEditable: true,
            });

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

    describe('GIVEN: search button for no-js', () => {
        describe('WHEN: automatic search is disabled', () => {
            const $ = cheerio.load(
                renderComponent('address-input', {
                    ...EXAMPLE_AUTOSUGGEST_ADDRESS_MINIMAL,
                    isEditable: true,
                    manualEntry: true,
                    searchButton: 'Search for address',
                }),
            );
            test('THEN: it does not render', () => {
                expect($('.ons-js-address-search-btn').length).toBe(0);
            });
        });

        describe('WHEN: there is no javascript', () => {
            const $ = cheerio.load(
                renderComponent('address-input', {
                    ...EXAMPLE_AUTOSUGGEST_ADDRESS_MINIMAL,
                    isEditable: true,
                    searchButton: 'Search for address',
                }),
            );

            test('THEN: it marks field so that it is displayed', () => {
                expect($('.ons-js-address-search-btn').hasClass('ons-u-db-no-js_disabled')).toBe(true);
            });

            test('THEN: it renders provided text for search button', () => {
                expect($('.ons-js-address-search-btn').text().trim()).toBe('Search for address');
            });
        });
    });

    describe('GIVEN: hidden field for uprn', () => {
        describe('WHEN: `uprn.value` is not provided', () => {
            const faker = templateFaker();
            const inputSpy = faker.spy('input', { suppressOutput: true });

            faker.renderComponent('address-input', EXAMPLE_AUTOSUGGEST_ADDRESS_MINIMAL);

            test('THEN: it renders hidden `input` component with expected parameters', () => {
                expect(inputSpy.occurrences).toContainEqual({
                    id: 'address-input-example-id-uprn',
                    classes: 'ons-js-hidden-uprn ons-u-d-no',
                    type: 'hidden',
                    name: 'address-input-example-id-uprn',
                    value: '',
                });
            });
        });

        describe('WHEN: `uprn.value` is provided', () => {
            const faker = templateFaker();
            const inputSpy = faker.spy('input', { suppressOutput: true });

            faker.renderComponent('address-input', {
                ...EXAMPLE_AUTOSUGGEST_ADDRESS_MINIMAL,
                uprn: {
                    value: '[params.uprn.value]',
                },
            });

            test('THEN: it renders hidden `input` component with expected parameters', () => {
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

    describe('GIVEN: autosuggest search field', () => {
        describe('WHEN: `manualEntry` is `true`', () => {
            const faker = templateFaker();
            const autosuggestSpy = faker.spy('autosuggest', { suppressOutput: true });

            faker.renderComponent('address-input', {
                ...EXAMPLE_AUTOSUGGEST_ADDRESS_MINIMAL,
                manualEntry: true,
            });

            test('THEN: it is not shown', () => {
                expect(autosuggestSpy.occurrences.length).toBe(0);
            });
        });

        describe('WHEN: `manualEntry` is not set', () => {
            const faker = templateFaker();
            const autosuggestSpy = faker.spy('autosuggest', { suppressOutput: true });

            // Since `autosuggestSpy` suppresses output the values being tested below do not
            // need to represent real values. This test is only interested in verifying that
            // the provided values are being passed through to the `autosuggest` component.
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
                APIDomain: '[params.APIDomain]',
                APIDomainBearerToken: '[params.APIDomainBearerToken]',
                APIManualQueryParams: '[params.APIManualQueryParams]',
                allowMultiple: '[params.allowMultiple]',
                mandatory: '[params.mandatory]',
                instructions: '[params.instructions]',
                autocomplete: '[params.autocomplete]',
                isEditable: '[params.isEditable]',
                ariaYouHaveSelected: '[params.ariaYouHaveSelected]',
                ariaMinChars: '[params.ariaMinChars]',
                minChars: '[params.minChars]',
                ariaResultsLabel: '[params.ariaResultsLabel]',
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
                errorMessageAPI: '[params.errorMessageAPI]',
                errorMessageAPILinkText: '[params.errorMessageAPILinkText]',
                options: '[params.options]',
                manualLink: '[params.manualLink]',
                manualLinkText: '[params.manualLinkText]',
            });

            test('THEN: it renders `autosuggest` component with expected parameters', () => {
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
                    APIDomain: '[params.APIDomain]',
                    APIDomainBearerToken: '[params.APIDomainBearerToken]',
                    APIManualQueryParams: '[params.APIManualQueryParams]',
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
                    errorMessageAPI: '[params.errorMessageAPI]',
                    errorMessageAPILinkText: '[params.errorMessageAPILinkText]',
                    options: '[params.options]',
                    manualLink: '[params.manualLink]',
                    manualLinkText: '[params.manualLinkText]',
                });
            });
        });

        describe('WHEN: provided with a default value for `manualLink`', () => {
            const $ = cheerio.load(
                renderComponent('address-input', {
                    ...EXAMPLE_AUTOSUGGEST_ADDRESS_MINIMAL,
                    manualLinkText: 'Manually enter address',
                }),
            );

            test('THEN: it renders manualLinkText', () => {
                expect($('.ons-js-address-manual-btn').attr('href')).toBe('#0');
                expect($('.ons-js-address-manual-btn').text().trim()).toBe('Manually enter address');
            });
        });

        describe('WHEN: a value for `manualLink` is provided', () => {
            const $ = cheerio.load(
                renderComponent('address-input', {
                    ...EXAMPLE_AUTOSUGGEST_ADDRESS_MINIMAL,
                    manualLink: 'https://example.com/edit-address',
                    manualLinkText: 'Manually enter address',
                }),
            );

            test('THEN: renders `manualLinkText` with `manualLink`', () => {
                expect($('.ons-js-address-manual-btn').attr('href')).toBe('https://example.com/edit-address');
                expect($('.ons-js-address-manual-btn').text().trim()).toBe('Manually enter address');
            });
        });
    });

    describe('GIVEN: fieldset', () => {
        describe('WHEN: `dontWrap` is `true`', () => {
            const faker = templateFaker();
            const fieldsetSpy = faker.spy('fieldset', { suppressOutput: true });

            faker.renderComponent('address-input', {
                ...EXAMPLE_AUTOSUGGEST_ADDRESS_MINIMAL,
                dontWrap: true,
            });

            test('THEN: it does not render `fieldset` component`', () => {
                expect(fieldsetSpy.occurrences.length).toBe(0);
            });
        });

        describe('WHEN: `dontWrap` is not set', () => {
            const faker = templateFaker();
            const fieldsetSpy = faker.spy('fieldset', { suppressOutput: true });

            faker.renderComponent('address-input', {
                ...EXAMPLE_AUTOSUGGEST_ADDRESS_MINIMAL,
                classes: 'extra-field-class',
                legendClasses: 'extra-legend-class',
            });

            test('THEN: it renders `fieldset` component with expected parameters', () => {
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
