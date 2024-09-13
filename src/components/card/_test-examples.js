export const EXAMPLE_CARD_WITHOUT_IMAGE = {
    title: 'Example card title',
    text: 'Example card text.',
    textId: 'example-text-id',
};

export const EXAMPLE_CARD_WITH_IMAGE = {
    title: 'Example card title',
    text: 'Example card text.',
    textId: 'example-text-id',
    image: {
        smallSrc: 'example-small.png',
        largeSrc: 'example-large.png',
        alt: 'Example alt text',
    },
};

export const EXAMPLE_CARD_WITH_PLACEHOLDER_IMAGE = {
    title: 'Example card title',
    text: 'Example card text.',
    textId: 'example-text-id',
    image: true,
};

export const EXAMPLE_CARD_WITH_PLACEHOLDER_IMAGE_WITH_PATH = {
    title: 'Example card title',
    text: 'Example card text.',
    textId: 'example-text-id',
    image: {
        placeholderURL: '/placeholder-image-url',
    },
};
