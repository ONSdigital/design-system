export const EXAMPLE_AUTOSUGGEST_ADDRESS_MINIMAL = {
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

export const EXAMPLE_MANUAL_INPUT_FIELDS = {
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

const EXAMPLE_ADDRESS_INPUT = {
    id: 'address',
    autocomplete: 'off',
    label: {
        text: 'Enter address or postcode and select from results',
    },
    legend: 'What is the address?',
    isEditable: true,
    mandatory: true,
    dontWrap: true,
    instructions: 'Use up and down keys to navigate.',
    ariaYouHaveSelected: 'You have selected',
    ariaMinChars: 'Enter 3 or more characters for suggestions.',
    minChars: 3,
    ariaResultsLabel: 'Country suggestions',
    ariaOneResult: 'There is one suggestion available.',
    ariaNResults: 'There are {n} suggestions available.',
    ariaLimitedResults: 'Type more characters to improve your search',
    ariaGroupedResults: 'There are {n} for {x}',
    groupCount: '{n} addresses',
    moreResults: 'Continue entering to improve suggestions',
    resultsTitle: 'Suggestions',
    resultsTitleId: 'country-of-birth-suggestions',
    noResults: 'No suggestions found.',
    tooManyResults: '{n} results found. Enter more of the address to improve results',
    typeMore: 'Continue entering to get suggestions',
    errorTitle: 'There is a problem with your answer',
    errorMessageEnter: 'Enter an address',
    errorMessageSelect: 'Select an address',
    errorMessageAPI: 'Sorry, there is a problem loading addresses',
    errorMessageAPILinkText: 'Enter address manually',
    options: {
        regionCode: 'gb-eng',
        addressType: 'residential',
    },
    organisation: {
        label: 'Organisation',
    },
    line1: {
        label: 'Address line 1',
    },
    line2: {
        label: 'Address line 2',
    },
    town: {
        label: 'Town or city',
    },
    postcode: {
        label: 'Postcode',
    },
    searchButton: 'Search for an address',
    manualLinkText: 'Manually enter address',
};

export const EXAMPLE_ADDRESS_INPUT_WITH_API = {
    ...EXAMPLE_ADDRESS_INPUT,
    APIDomain: '/fake/api',
    APIDomainBearerToken: 'someToken',
    externalInitialiser: true,
};
