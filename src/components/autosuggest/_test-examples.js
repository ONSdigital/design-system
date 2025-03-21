export const EXAMPLE_AUTOSUGGEST = {
    id: 'country-of-birth',
    input: {
        label: {
            text: 'Current name of country',
            description: 'Enter your own answer or select from suggestions',
            id: 'country-of-birth-label',
            classes: 'extra-label-class',
        },
        autocomplete: 'off',
    },
    instructions: 'Use up and down keys to navigate.',
    ariaYouHaveSelected: 'You have selected',
    ariaMinChars: 'Enter 3 or more characters for suggestions.',
    ariaOneResult: 'There is one suggestion available.',
    ariaNResults: 'There are {n} suggestions available.',
    ariaLimitedResults: 'Type more characters to improve your search',
    moreResults: 'Continue entering to improve suggestions',
    resultsTitle: 'Suggestions',
    resultsTitleId: 'country-of-birth-suggestions',
    autosuggestData: '/examples/data/country-of-birth.json',
    noResults: 'No suggestions found. You can enter your own answer',
    typeMore: 'Continue entering to get suggestions',
};
