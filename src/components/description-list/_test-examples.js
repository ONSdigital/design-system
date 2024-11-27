export const EXAMPLE_DESCRIPTION_LIST_FULL = {
    id: 'example-id',
    classes: 'ons-u-mb-no',
    descriptionListLabel: 'This is an example of the description list component',
    termCol: 2,
    descriptionCol: 10,
    itemsList: [
        {
            term: 'Survey:',
            descriptions: [
                {
                    id: 'description-1',
                    description: 'Bricks & Blocks',
                },
            ],
        },
        {
            term: 'RU Refs:',
            descriptions: [
                {
                    id: 'description-2',
                    description: '49900000118',
                },
                {
                    id: 'description-3',
                    description: '49300005832',
                },
            ],
        },
    ],
};

export const EXAMPLE_DESCRIPTION_LIST_MINIMAL = {
    termCol: 2,
    descriptionCol: 10,
    itemsList: [
        {
            term: 'Survey:',
            descriptions: [
                {
                    description: 'Bricks & Blocks',
                },
            ],
        },
        {
            term: 'RU Refs:',
            descriptions: [
                {
                    description: '49900000118',
                },
                {
                    description: '49300005832',
                },
            ],
        },
    ],
};
