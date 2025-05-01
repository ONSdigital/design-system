export const EXAMPLE_CARD_WITHOUT_IMAGE = {
    title: {
        text: 'Example card title',
    },
    body: {
        text: 'Example card text.',
        id: 'example-text-id',
    },
};

export const EXAMPLE_CARD_WITH_IMAGE = {
    ...EXAMPLE_CARD_WITHOUT_IMAGE,
    image: {
        smallSrc: 'example-small.png',
        largeSrc: 'example-large.png',
        alt: 'Example alt text',
    },
};

export const EXAMPLE_CARD_WITH_PLACEHOLDER_IMAGE = {
    ...EXAMPLE_CARD_WITHOUT_IMAGE,
    image: true,
};

export const EXAMPLE_CARD_WITH_PLACEHOLDER_IMAGE_WITH_PATH = {
    ...EXAMPLE_CARD_WITHOUT_IMAGE,
    image: {
        placeholderUrl: '/placeholder-image-url',
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
