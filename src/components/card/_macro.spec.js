/** @jest-environment jsdom */

import * as cheerio from 'cheerio';

import axe from '../../tests/helpers/axe';
import { renderComponent, templateFaker } from '../../tests/helpers/rendering';

const EXAMPLE_CARD_WITHOUT_IMAGE = {
    title: {
        text: 'Example card title',
    },
    body: {
        text: 'Example card text.',
        id: 'example-text-id',
    },
};

const EXAMPLE_CARD_WITH_IMAGE = {
    ...EXAMPLE_CARD_WITHOUT_IMAGE,
    image: {
        smallSrc: 'example-small.png',
        largeSrc: 'example-large.png',
        alt: 'Example alt text',
    },
};

const EXAMPLE_CARD_WITH_PLACEHOLDER_IMAGE = {
    ...EXAMPLE_CARD_WITHOUT_IMAGE,
    image: true,
};

const EXAMPLE_CARD_WITH_PLACEHOLDER_IMAGE_WITH_PATH = {
    ...EXAMPLE_CARD_WITHOUT_IMAGE,
    image: {
        placeholderUrl: '/placeholder-image-url',
    },
};

const EXAMPLE_CARD_FEATURE_VARIANT = {
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

describe('macro: card', () => {
    describe('mode: without image', () => {
        it('passes jest-axe checks', async () => {
            const $ = cheerio.load(renderComponent('card', EXAMPLE_CARD_WITHOUT_IMAGE));

            const results = await axe($.html());
            expect(results).toHaveNoViolations();
        });

        it('has the provided `title` text', () => {
            const $ = cheerio.load(renderComponent('card', EXAMPLE_CARD_WITHOUT_IMAGE));

            expect($('.ons-card__title').text().trim()).toBe('Example card title');
        });

        it.each([
            [1, 'h1'],
            [4, 'h4'],
        ])('has the correct element type for the provided `headingLevel` (%i -> %s)', (headingLevel, expectedTitleTag) => {
            const $ = cheerio.load(
                renderComponent('card', {
                    title: {
                        text: 'Example card title',
                        headingLevel: headingLevel,
                    },
                    body: {
                        text: 'Example card text.',
                        id: 'example-text-id',
                    },
                }),
            );

            expect($(`${expectedTitleTag}.ons-card__title`).text().trim()).toBe('Example card title');
        });

        it('has the provided `text` accessible via the `textId` identifier', () => {
            const $ = cheerio.load(renderComponent('card', EXAMPLE_CARD_WITHOUT_IMAGE));

            expect($('#example-text-id').text().trim()).toBe('Example card text.');
        });

        it('renders the provided `itemsList` using the `list` component', () => {
            const faker = templateFaker();
            const listsSpy = faker.spy('list');

            faker.renderComponent('card', {
                title: {
                    text: 'Example card title',
                },
                body: {
                    text: 'Example card text.',
                    id: 'example-text-id',
                    itemsList: [{ text: 'Test item 1' }, { text: 'Test item 2' }],
                },
            });

            expect(listsSpy.occurrences[0]).toEqual({
                variants: 'dashed',
                itemsList: [{ text: 'Test item 1' }, { text: 'Test item 2' }],
            });
        });

        it('outputs a hyperlink with the provided `url`', () => {
            const $ = cheerio.load(
                renderComponent('card', {
                    title: {
                        text: 'Example card title',
                        url: 'https://example.com',
                    },
                    body: {
                        text: 'Example card text.',
                        id: 'example-text-id',
                    },
                }),
            );

            expect($('.ons-card__link').attr('href')).toBe('https://example.com');
        });
    });

    describe('mode: with image', () => {
        it('passes jest-axe checks', async () => {
            const $ = cheerio.load(renderComponent('card', EXAMPLE_CARD_WITH_IMAGE));

            const results = await axe($.html());
            expect(results).toHaveNoViolations();
        });

        it('has the provided `title` text', () => {
            const $ = cheerio.load(renderComponent('card', EXAMPLE_CARD_WITH_IMAGE));

            expect($('.ons-card__title').text().trim()).toBe('Example card title');
        });

        it.each([
            [1, 'h1'],
            [4, 'h4'],
        ])('has the correct element type for the provided `headingLevel` (%i -> %s)', (headingLevel, expectedTitleTag) => {
            const $ = cheerio.load(
                renderComponent('card', {
                    title: {
                        text: 'Example card title',
                        headingLevel: headingLevel,
                    },
                    body: {
                        text: 'Example card text.',
                        id: 'example-text-id',
                    },
                    image: {
                        smallSrc: 'example-small.png',
                        largeSrc: 'example-large.png',
                        alt: 'Example alt text',
                    },
                }),
            );

            expect($(`${expectedTitleTag}.ons-card__title`).text().trim()).toBe('Example card title');
        });

        it('has the provided `text`', () => {
            const $ = cheerio.load(
                renderComponent('card', {
                    ...EXAMPLE_CARD_WITH_IMAGE,
                }),
            );

            expect($('#example-text-id').text().trim()).toBe('Example card text.');
        });

        it('outputs a hyperlink with the provided `url`', () => {
            const $ = cheerio.load(
                renderComponent('card', {
                    title: {
                        text: 'Example card title',
                        url: 'https://example.com',
                    },
                    body: {
                        text: 'Example card text.',
                        id: 'example-text-id',
                    },
                }),
            );

            expect($('.ons-card__link').attr('href')).toBe('https://example.com');
        });

        describe('with a custom image', () => {
            it('outputs an `img` element', () => {
                const $ = cheerio.load(renderComponent('card', EXAMPLE_CARD_WITH_IMAGE));

                expect($('.ons-card__image')[0].tagName).toBe('img');
            });

            it('outputs an `img` element with the expected `srcset`', () => {
                const $ = cheerio.load(renderComponent('card', EXAMPLE_CARD_WITH_IMAGE));

                expect($('.ons-card__image').attr('srcset')).toBe('example-small.png 1x, example-large.png 2x');
            });

            it('outputs an `img` element with the expected `src`', () => {
                const $ = cheerio.load(renderComponent('card', EXAMPLE_CARD_WITH_IMAGE));

                expect($('.ons-card__image').attr('src')).toBe('example-small.png');
            });

            it('outputs an `img` element with the expected alt text', () => {
                const $ = cheerio.load(
                    renderComponent('card', {
                        ...EXAMPLE_CARD_WITH_IMAGE,
                        alt: 'Example alt text',
                    }),
                );

                expect($('.ons-card__image').attr('alt')).toBe('Example alt text');
            });
        });

        describe('with a default placeholder image', () => {
            it('outputs an `img` element', () => {
                const $ = cheerio.load(renderComponent('card', EXAMPLE_CARD_WITH_PLACEHOLDER_IMAGE));

                expect($('.ons-card__image')[0].tagName).toBe('img');
            });

            it('outputs an `img` element with the expected `srcset`', () => {
                const $ = cheerio.load(renderComponent('card', EXAMPLE_CARD_WITH_PLACEHOLDER_IMAGE));

                expect($('.ons-card__image').attr('srcset')).toBe('/img/small/placeholder-card.png 1x, /img/large/placeholder-card.png 2x');
            });

            it('outputs an `img` element with the expected `src`', () => {
                const $ = cheerio.load(renderComponent('card', EXAMPLE_CARD_WITH_PLACEHOLDER_IMAGE));

                expect($('.ons-card__image').attr('src')).toBe('/img/small/placeholder-card.png');
            });

            it('outputs an `img` element with the expected empty alt text', () => {
                const $ = cheerio.load(renderComponent('card', EXAMPLE_CARD_WITH_PLACEHOLDER_IMAGE));

                expect($('.ons-card__image').attr('alt')).toBe('');
            });
        });

        describe('with a default placeholder image with `placeholderUrl`', () => {
            it('outputs an `img` element', () => {
                const $ = cheerio.load(renderComponent('card', EXAMPLE_CARD_WITH_PLACEHOLDER_IMAGE_WITH_PATH));

                expect($('.ons-card__image')[0].tagName).toBe('img');
            });

            it('outputs an `img` element with the expected `srcset`', () => {
                const $ = cheerio.load(renderComponent('card', EXAMPLE_CARD_WITH_PLACEHOLDER_IMAGE_WITH_PATH));

                expect($('.ons-card__image').attr('srcset')).toBe(
                    '/placeholder-image-url/img/small/placeholder-card.png 1x, /placeholder-image-url/img/large/placeholder-card.png 2x',
                );
            });

            it('outputs an `img` element with the expected `src`', () => {
                const $ = cheerio.load(renderComponent('card', EXAMPLE_CARD_WITH_PLACEHOLDER_IMAGE_WITH_PATH));

                expect($('.ons-card__image').attr('src')).toBe('/placeholder-image-url/img/small/placeholder-card.png');
            });

            it('outputs an `img` element with the expected empty alt text', () => {
                const $ = cheerio.load(renderComponent('card', EXAMPLE_CARD_WITH_PLACEHOLDER_IMAGE_WITH_PATH));

                expect($('.ons-card__image').attr('alt')).toBe('');
            });
        });
    });

    describe('variant: feature', () => {
        it('renders the `feature` variant with correct class', () => {
            const $ = cheerio.load(renderComponent('card', EXAMPLE_CARD_FEATURE_VARIANT));
            expect($('.ons-card').hasClass('ons-card--feature')).toBe(true);
        });

        it('has the provided `title` text', () => {
            const $ = cheerio.load(renderComponent('card', EXAMPLE_CARD_FEATURE_VARIANT));

            expect($('.ons-card__title').text().trim()).toBe('Feature card title');
        });

        it('has the provided `subitle` text', () => {
            const $ = cheerio.load(renderComponent('card', EXAMPLE_CARD_FEATURE_VARIANT));

            expect($('.ons-card__subtitle').text().trim()).toBe('Optional subtitle');
        });

        it('outputs a hyperlink with the provided `url`', () => {
            const $ = cheerio.load(renderComponent('card', EXAMPLE_CARD_FEATURE_VARIANT));

            expect($('.ons-card__link').attr('href')).toBe('http://example.com');
        });

        it('has the provided `figure`', () => {
            const $ = cheerio.load(renderComponent('card', EXAMPLE_CARD_FEATURE_VARIANT));

            expect($('.ons-card__figure').text().trim()).toBe('123,456');
        });

        it('has the provided `text` accessible via the `textId` identifier', () => {
            const $ = cheerio.load(renderComponent('card', EXAMPLE_CARD_FEATURE_VARIANT));

            expect($('#example-feature-text-id').text().trim()).toBe('Example feature card text');
        });

        it('passes jest-axe checks', async () => {
            const $ = cheerio.load(renderComponent('card', EXAMPLE_CARD_FEATURE_VARIANT));

            const results = await axe($.html());
            expect(results).toHaveNoViolations();
        });
    });
});
