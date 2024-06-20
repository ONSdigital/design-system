/** @jest-environment jsdom */

import * as cheerio from 'cheerio';

import axe from '../tests/helpers/axe';
import { renderBaseTemplate } from '../tests/helpers/rendering';

const FULL_EXAMPLE = `
{% set pageConfig = {
    "bodyClasses": "custom-class",
    "title": "Social survey",
    "assetsUrl": "/some-path",
    "meta": {
        "description": "Meta description",
        "canonicalUrl": "/some-url",
        "hrefLangs": [
            {
                "lang": "en-US",
                "url": "/some-url-us"
            }
        ]
    },
    "social": {
        "twitterSite": "Twitter",
        "title": "Twitter title",
        "description": "Twitter description",
        "twitterImage": "twitter-image.png"
    },
    "header": {
        "title": 'ONS Service',
        "variants": 'neutral',
        "mastheadLogoUrl": '#0',
        "titleUrl": '#0',
        "phase": {
            "variants": 'neutral',
            "mastheadLogoUrl": '#0',
            "badge": 'BETA',
            "html": 'This is a new service – your <a href="#feedback">feedback</a> will help us improve it.'
        },
        "signoutButton": {
            "text": "Save and sign out",
            "iconType": "exit",
            "iconPosition": "after"
        },
        "language": {
            "languages": [
                {
                    "url": "#0",
                    "isoCode": "en",
                    "text": "English",
                    "current": true
                },
                {
                    "url": "#0",
                    "isoCode": "cy",
                    "text": "Cymraeg",
                    "current": false
                }
            ]
        },
        "serviceLinks": {
            "id": "service-links",
            "ariaLabel": 'Services menu',
            "ariaListLabel": 'Menu',
            "toggleServicesButton": {
                "text": 'Account',
                "ariaLabel": 'Toggle services menu'
            },
            "itemsList": [
                {
                    "title": "Jacky Turner",
                    "iconType": 'person'
                },
                {
                    "title": "Sign out",
                    "url": "#0"
                }
            ]
        },
        "navigation": {
            "id": 'main-nav',
            "ariaLabel": 'Main menu',
            "currentPath": [ '#design-system', '#patterns', '#access-codes' ],
            "currentPageTitle": 'Design system',
            "itemsList": [
                {
                    "title": 'Service standard',
                    "url": '#0'
                },
                {
                    "title": 'Design system',
                    "url": '#design-system'
                },
                {
                    "title": 'Accessibility',
                    "url": '#0'
                },
                {
                    "title": 'Brand guidelines',
                    "url": '#0'
                },
                {
                    "title": 'Content style guide',
                    "url": '#0'
                }
            ],
            "toggleNavigationButton": {
                "text": 'Menu',
                "ariaLabel": 'Toggle main menu'
            },
            "subNavigation": {
                "id": 'sub-nav',
                "overviewUrl": '#0',
                "overviewText": 'Overview',
                "ariaLabel": 'Section menu',
                "itemsList": [
                    {
                        "title": 'Guidance',
                        "url": '#0'
                    },
                    {
                        "title": 'Foundations',
                        "url": '#0'
                    },
                    {
                        "title": 'Components',
                        "url": '#0'
                    },
                    {
                        "title": 'Patterns',
                        "url": '#patterns',
                        "sections": [
                            {
                                "sectionTitle": 'Ask users for...',
                                "children": [
                                    {
                                        "title": 'Access codes',
                                        "url": '#access-codes'
                                    },
                                    {
                                        "title": 'Addresses',
                                        "url": '#0'
                                    },
                                    {
                                        "title": 'Dates',
                                        "url": '#0'
                                    },
                                    {
                                        "title": 'Durations',
                                        "url": '#0'
                                    },
                                    {
                                        "title": 'Email addresses',
                                        "url": '#0'
                                    },
                                    {
                                        "title": 'Numeric values',
                                        "url": '#0'
                                    },
                                    {
                                        "title": 'Phone numbers',
                                        "url": '#0'
                                    }
                                ]
                            },
                            {
                                "sectionTitle": 'Help users to...',
                                "children": [
                                    {
                                        "title": 'Access support in multiple languages',
                                        "url": '#0'
                                    },
                                    {
                                        "title": 'Change language',
                                        "url": '#0'
                                    },
                                    {
                                        "title": 'Check answers',
                                        "url": '#0'
                                    },
                                    {
                                        "title": 'Control cookies',
                                        "url": '#0'
                                    },
                                    {
                                        "title": 'Correct errors',
                                        "url": '#0'
                                    },
                                    {
                                        "title": 'Extend a session',
                                        "url": '#0'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        }
    },
    "breadcrumbs": {
        "ariaLabel": 'Breadcrumbs',
        "itemsList": [
            {
                "url": '/',
                "text": 'Home'
            },
            {
                "url": '/components',
                "text": 'Components'
            }
        ]
    },
    "footer": {
        "cols": [
            {
                "title": 'Business surveys',
                "itemsList": [
                    {
                        "text": 'About our surveys',
                        "url": '#0'
                    },
                    {
                        "text": 'Lists of all surveys',
                        "url": '#0'
                    },
                    {
                        "text": 'Respondent Charter',
                        "url": '#0'
                    }
                ]
            },
            {
                "title": 'About ONS',
                "itemsList": [
                    {
                        "text": 'What we do',
                        "url": '#0'
                    },
                    {
                        "text": 'Transparency and governance',
                        "url": '#0'
                    },
                    {
                        "text": 'Contact us',
                        "url": '#0'
                    }
                ]
            },
            {
                "title": 'Statistics',
                "itemsList": [
                    {
                        "text": 'UK Statistics Authority',
                        "external": true,
                        "url": '#0'
                    },
                    {
                        "text": 'Release calendar',
                        "url": '#0'
                    },
                    {
                        "text": 'News',
                        "url": '#0'
                    }
                ]
            }
        ],
        "legal": [
            {
                "itemsList": [
                    {
                        "text": 'Cookies',
                        "url": '#0'
                    },
                    {
                        "text": 'Accessibility statement',
                        "url": '#0'
                    },
                    {
                        "text": 'Privacy and data protection',
                        "url": '#0'
                    },
                    {
                        "text": 'Terms and conditions',
                        "url": '#0'
                    }
                ]
            }
        ],
        "oglLink": true
    }
} %}

{% block bodyStart %}
    <form class="form-class" method="POST" autocomplete="off" novalidate>
{% endblock %}

{% block main %}
    <h1>Page Title</h1>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
    <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
    <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
{% endblock %}

{% block bodyEnd %}
    </form>
{% endblock %}

{% block head %}Some head content{% endblock %}
{% block preHeader %}Some preHeader content{% endblock %}
{% block preFooter %}Some preFooter content{% endblock %}
{% block scripts %}<script src="random-script.js"></script>{% endblock %}
`;

const BODY_OVERRIDE_EXAMPLE = `
{% set pageConfig = {
    "title": "Social survey"
} %}
{% block body %}Content{% endblock %}
`;

const NO_FOOTER_EXAMPLE = `
{% set pageConfig = {
    "title": "Social survey"
} %}
{% block footer %}{% endblock %}
`;

const NO_SOCIAL_EXAMPLE = `
{% set pageConfig = {
    "title": "Social survey"
} %}
{% block social %}{% endblock %}
`;

const NO_META_EXAMPLE = `
{% set pageConfig = {
    "title": "Social survey"
} %}
{% block meta %}{% endblock %}
`;

const NO_FAVICONS_EXAMPLE = `
{% set pageConfig = {
    "title": "Social survey"
} %}
{% block favicons %}{% endblock %}
`;

describe('base page template', () => {
    it('passes jest-axe checks', async () => {
        const $ = cheerio.load(renderBaseTemplate(FULL_EXAMPLE));
        const results = await axe($.html(), {
            rules: {
                // aria-label is duplicated for the desktop and mobile navigation
                // The duplication is not an issue as display and aria-hidden are used
                'landmark-unique': { enabled: false },
            },
        });
        expect(results).toHaveNoViolations();
    });

    it.each([
        ['full configuration', FULL_EXAMPLE],
        ['body block override', BODY_OVERRIDE_EXAMPLE],
        ['footer block override', NO_FOOTER_EXAMPLE],
        ['social block override', NO_SOCIAL_EXAMPLE],
        ['meta block override', NO_META_EXAMPLE],
        ['favicons block override', NO_FAVICONS_EXAMPLE],
    ])('matches the %s snapshot', (_, params) => {
        const $ = cheerio.load(renderBaseTemplate(params));

        expect($.html()).toMatchSnapshot();
    });
});
