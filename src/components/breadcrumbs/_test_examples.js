export { EXAMPLE_BREADCRUMBS_REQUIRED_PARAMS, EXAMPLE_BREADCRUMBS_ITEM_PARAMS, EXAMPLE_BREADCRUMBS_ALL_PARAMS };

const EXAMPLE_BREADCRUMBS_REQUIRED_PARAMS = {
    itemsList: [
        {
            url: 'https://example.com/',
            text: 'Home',
        },
    ],
};

const EXAMPLE_BREADCRUMBS_ITEM_PARAMS = {
    itemsList: [
        {
            itemClasses: 'item-extra-class item-another-extra-class',
            linkClasses: 'link-extra-class link-another-extra-class',
            url: 'https://example.com/',
            text: 'Home',
            attributes: {
                'data-a': '123',
                'data-b': '456',
            },
            id: 'first-breadcrumb',
        },
    ],
};

const EXAMPLE_BREADCRUMBS_ALL_PARAMS = {
    classes: 'extra-class another-extra-class',
    ariaLabel: 'Breadcrumbs label',
    id: 'example-breadcrumbs',
    itemsList: [
        {
            itemClasses: 'item-extra-class item-another-extra-class',
            linkClasses: 'link-extra-class link-another-extra-class',
            url: 'https://example.com/',
            text: 'Home',
            attributes: {
                'data-a': '123',
                'data-b': '456',
            },
            id: 'first-breadcrumb',
        },
        {
            url: 'https://example.com/guide/',
            text: 'Guide',
            id: 'second-breadcrumb',
            attributes: {
                'data-a': '789',
                'data-b': 'ABC',
            },
        },
    ],
};
