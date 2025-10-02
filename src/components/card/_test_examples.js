export const EXAMPLE_CARD = {
    title: {
        text: 'Example card title',
    },
    body: {
        text: 'Example card text',
        id: 'example-text-id',
    },
};

export const EXAMPLE_CARD_FULL_EXAMPLE = {
    title: {
        text: 'Example card title',
        url: 'http://example.com',
        subtitle: 'Optional subtitle',
    },
    body: {
        figure: '123,456',
        text: 'Example card text',
        id: 'example-text-id',
    },
};

export const EXAMPLE_CARD_WITH_LIST = {
    title: {
        text: 'Example card title',
    },
    body: {
        text: 'Example card text.',
        id: 'example-text-id',
        itemsList: [{ text: 'Test item 1' }, { text: 'Test item 2' }],
    },
};

export const EXAMPLE_CARD_WITH_IMAGE = {
    ...EXAMPLE_CARD,
    image: {
        smallSrc: 'example-small.png',
        largeSrc: 'example-large.png',
        alt: 'Example alt text',
    },
};

export const EXAMPLE_CARD_FEATURE_VARIANT = {
    variant: 'feature',
    title: {
        text: 'Feature card title',
        url: 'http://example.com',
        subtitle: 'Optional subtitle',
    },
    body: {
        figure: '123,456',
        text: 'Example feature card text',
        id: 'example-feature-text-id',
    },
};
