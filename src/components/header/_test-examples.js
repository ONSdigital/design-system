export const EXAMPLE_HEADER_BASIC = {
    title: 'Header title',
};

export const EXAMPLE_SERVICE_LINKS_CONFIG = {
    id: 'service-links',
    ariaLabel: 'Services menu',
    classes: 'custom-class',
    toggleServicesButton: {
        text: 'Menu',
        ariaLabel: 'Toggle services menu',
    },
};

export const EXAMPLE_HEADER_SERVICE_LINKS_MULTIPLE = {
    ...EXAMPLE_HEADER_BASIC,
    serviceLinks: {
        ...EXAMPLE_SERVICE_LINKS_CONFIG,
        itemsList: [
            {
                title: 'Title 1',
                url: '#1',
            },
            {
                title: 'Title 2',
                url: '#2',
            },
            {
                title: 'Title 3',
                url: '#3',
            },
        ],
    },
};

export const EXAMPLE_HEADER_SERVICE_LINKS_SINGLE = {
    ...EXAMPLE_HEADER_BASIC,
    serviceLinks: {
        ...EXAMPLE_SERVICE_LINKS_CONFIG,
        itemsList: [
            {
                title: 'Title',
                url: '#0',
            },
        ],
    },
};

export const EXAMPLE_HEADER_LANGUAGE_CONFIG = {
    language: {
        languages: [
            {
                url: '#0',
                ISOCode: 'en',
                text: 'English',
                buttonAriaLabel: 'Language selector. Current language: English',
                chooseLanguage: 'Choose language',
                current: true,
            },
            {
                url: '#0',
                ISOCode: 'cy',
                text: 'Cymraeg',
                buttonAriaLabel: 'Dewisydd iaith. Iaith gyfredol: Cymraeg',
                chooseLanguage: 'Dewiswch iaith',
                current: false,
            },
        ],
    },
};

export const EXAMPLE_HEADER_NAVIGATION_WITH_SUBNAVIGATION_CONFIG = {
    navigation: {
        id: 'main-nav',
        ariaLabel: 'Main menu',
        currentPath: '#1',
        currentPageTitle: 'Guidance',
        itemsList: [
            {
                title: 'Home',
                url: '#0',
            },
            {
                title: 'Guidance',
                url: '#1',
            },
        ],
        toggleNavigationButton: {
            text: 'Menu',
            ariaLabel: 'Toggle main menu',
        },
        subNavigation: {
            id: 'sub-nav',
            overviewURL: '#overview',
            overviewText: 'Overview',
            ariaLabel: 'Section menu',
            currentPath: '#1',
            itemsList: [
                {
                    title: 'Sub nav item 1',
                    url: '#0',
                    classes: 'custom-class-sub-item-1',
                    id: 'sub-item-1',
                },
                {
                    title: 'Sub nav item 2',
                    url: '#1',
                    classes: 'custom-class-sub-item-2',
                    id: 'sub-item-2',
                },
            ],
        },
    },
};

export const EXAMPLE_HEADER_NAVIGATION_WITH_SITESEARCHAUTOSUGGEST = {
    navigation: {
        id: 'main-nav',
        ariaLabel: 'Main menu',
        currentPath: '#home',
        itemsList: [
            {
                title: 'Home',
                url: '#home',
            },
            {
                title: 'Guidance',
                url: '#0',
            },
        ],
        toggleNavigationButton: {
            text: 'Menu',
            ariaLabel: 'Toggle main menu',
        },
    },
    siteSearchAutosuggest: {
        label: 'label',
        instructions: 'Use up and down keys to navigate.',
        ariaYouHaveSelected: 'You have selected',
        ariaMinChars: 'Enter 3 or more characters for suggestions.',
        minChars: 3,
        ariaOneResult: 'There is one suggestion available.',
        ariaNResults: 'There are {n} suggestions available.',
        ariaLimitedResults: 'Type more characters to improve your search',
        moreResults: 'Continue entering to improve suggestions',
        resultsTitle: 'Suggestions',
        resultsTitleId: 'country-of-birth-suggestions',
        noResults: 'No suggestions found.',
        typeMore: 'Continue entering to get suggestions',
        language: 'en-gb',
    },
};

export const EXAMPLE_HEADER_SEARCH_LINKS = {
    searchLinks: {
        id: 'search-links-id',
        searchNavigationAriaLabel: 'Header Search',
        searchButtonAriaLabel: 'Example aria label',
        classes: 'custom-class',
        heading: 'Header Search',
        itemsList: [
            {
                url: '#1',
                text: 'Popular Search 1',
            },
            {
                url: '#2',
                text: 'Popular Search 2',
            },
            {
                url: '#3',
                text: 'Popular Search 3',
            },
        ],
    },
};

export const EXAMPLE_HEADER_SEARCH_AND_MENU_LINKS = {
    ...EXAMPLE_HEADER_SEARCH_LINKS,
    menuLinks: {
        keyLinks: [
            {
                heading: 'Taking part in a survey?',
                description: 'It’s never been more important.',
            },
            {
                heading: 'Release calendar',
                description: 'View our latest and upcoming releases.',
            },
            {
                heading: 'Explore local statistics',
                url: '#0',
                description: 'Explore statistics across the UK.',
            },
        ],
        columns: [
            {
                groups: [
                    {
                        heading: 'People, population and community',
                        groupItems: [
                            {
                                text: 'Armed forces community',
                            },
                            {
                                text: 'Births, deaths and marriages',
                            },
                            {
                                text: 'Crime and justice',
                            },
                            {
                                text: 'Cultural identity',
                            },
                            {
                                text: 'Education and childcare',
                            },
                        ],
                    },
                ],
            },
            {
                groups: [
                    {
                        heading: 'Business, industry and trade',
                        groupItems: [
                            {
                                text: 'International trade',
                            },
                            {
                                text: 'IT and internet industry',
                            },
                            {
                                text: 'Manufacturing and production industry',
                            },
                            {
                                text: 'Retail industry',
                                url: '#0',
                            },
                            {
                                text: 'Tourism industry',
                            },
                        ],
                    },
                    {
                        heading: 'Employment and labour market',
                        url: '#0',
                        groupItems: [
                            {
                                text: 'People in work',
                            },
                            {
                                text: 'People not in work',
                            },
                        ],
                    },
                ],
            },
            {
                groups: [
                    {
                        heading: 'Economy',
                        groupItems: [
                            {
                                text: 'Environmental accounts',
                            },
                            {
                                text: 'Gross Domestic Product (GDP)',
                            },
                            {
                                text: 'Inflation and price indices',
                            },
                            {
                                text: 'National accounts',
                            },
                        ],
                    },
                ],
            },
        ],
    },
};
