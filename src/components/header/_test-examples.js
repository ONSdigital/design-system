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
        id: 'nav-links-external',
        ariaLabel: 'Nav Search',
        toggleSearchButton: {
            text: 'Search',
            ariaLabel: 'Toggle search',
        },
        popularSearches: [
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
                external: true,
            },
        ],
    },
};
