/** @jest-environment jsdom */

import * as cheerio from 'cheerio';
import axe from '../../tests/helpers/axe';
import { renderComponent, templateFaker } from '../../tests/helpers/rendering';

import {
    EXAMPLE_CARD_WITHOUT_IMAGE,
    EXAMPLE_CARD_WITH_IMAGE,
    EXAMPLE_CARD_WITH_PLACEHOLDER_IMAGE,
    EXAMPLE_CARD_WITH_PLACEHOLDER_IMAGE_WITH_PATH,
} from './_test_examples';
describe('FOR: Macro: Card', () => {
    describe('GIVEN: a card config WITHOUT an image', () => {
        describe('WHEN: the card is rendered', () => {
            let $;

            beforeEach(() => {
                const html = renderComponent('card', EXAMPLE_CARD_WITHOUT_IMAGE);
                $ = cheerio.load(html);
            });

            test('THEN: it passes jest-axe checks', async () => {
                const results = await axe($.html());
                expect(results).toHaveNoViolations();
            });

            test('THEN: it has the provided `title` text', () => {
                expect($('.ons-card__title').text().trim()).toBe('Example card title');
            });

            test('THEN: the provided `text` is accessible via the `textId` identifier', () => {
                expect($('#example-text-id').text().trim()).toBe('Example card text.');
            });
        });

        describe('WHEN: heading levels are tested', () => {
            it.each([
                [1, 'h1'],
                [4, 'h4'],
            ])('THEN: it has the correct element headingLevel tag %i outputs <%s> tags', (headingLevel, expectedTag) => {
                const $ = cheerio.load(
                    renderComponent('card', {
                        title: {
                            text: 'Example card title',
                            headingLevel,
                        },
                        body: {
                            text: 'Example card text.',
                            id: 'example-text-id',
                        },
                    }),
                );
                expect($(`${expectedTag}.ons-card__title`).text().trim()).toBe('Example card title');
            });
        });

        describe('WHEN: `itemsList` is provided in `body`', () => {
            test('THEN: the `list` component is rendered with the provided items', () => {
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
        });

        describe('WHEN: `title.url` is provided', () => {
            test('THEN: a hyperlink is created with the correct href', () => {
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
    });

    describe('GIVEN: a card config with an image', () => {
        describe('WHEN: the card is rendered', () => {
            let $;

            beforeEach(() => {
                const html = renderComponent('card', EXAMPLE_CARD_WITH_IMAGE);
                $ = cheerio.load(html);
            });

            test('THEN: it passes jest-axe checks', async () => {
                const results = await axe($.html());
                expect(results).toHaveNoViolations();
            });

            test('THEN: it has the provided `title` text', () => {
                expect($('.ons-card__title').text().trim()).toBe('Example card title');
            });

            test('THEN: the provided `text` is correctly rendered', () => {
                expect($('#example-text-id').text().trim()).toBe('Example card text.');
            });
        });

        describe('WHEN: heading levels are tested', () => {
            it.each([
                [1, 'h1'],
                [4, 'h4'],
            ])('THEN: headingLevel %i outputs <%s> tags', (headingLevel, expectedTag) => {
                const $ = cheerio.load(
                    renderComponent('card', {
                        title: {
                            text: 'Example card title',
                            headingLevel,
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
                expect($(`${expectedTag}.ons-card__title`).text().trim()).toBe('Example card title');
            });
        });

        describe('WHEN: `title.url` is provided', () => {
            test('THEN: a hyperlink is created with the provided URL', () => {
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

        describe('WHEN: custom image params are provided', () => {
            let $;

            beforeEach(() => {
                const html = renderComponent('card', EXAMPLE_CARD_WITH_IMAGE);
                $ = cheerio.load(html);
            });

            test('THEN: it outputs an `img` element', () => {
                expect($('.ons-card__image')[0].tagName).toBe('img');
            });

            test('THEN: the `img` has the expected `srcset`', () => {
                expect($('.ons-card__image').attr('srcset')).toBe('example-small.png 1x, example-large.png 2x');
            });

            test('THEN: the `img` has the expected `src`', () => {
                expect($('.ons-card__image').attr('src')).toBe('example-small.png');
            });

            test('THEN: the `img` has the expected `alt` text', () => {
                // In the original example, alt is pulled from `image.alt`
                expect($('.ons-card__image').attr('alt')).toBe('Example alt text');
            });
        });
    });

    describe('GIVEN: a card config with a default placeholder image', () => {
        describe('WHEN: `image` is set to true (default placeholder)', () => {
            let $;

            beforeEach(() => {
                const html = renderComponent('card', EXAMPLE_CARD_WITH_PLACEHOLDER_IMAGE);
                $ = cheerio.load(html);
            });

            test('THEN: it outputs an `img` element', () => {
                expect($('.ons-card__image')[0].tagName).toBe('img');
            });

            test('THEN: the `img` has the expected `srcset`', () => {
                expect($('.ons-card__image').attr('srcset')).toBe('/img/small/placeholder-card.png 1x, /img/large/placeholder-card.png 2x');
            });

            test('THEN: the `img` has the expected `src`', () => {
                expect($('.ons-card__image').attr('src')).toBe('/img/small/placeholder-card.png');
            });

            test('THEN: the `img` has an empty alt attribute', () => {
                expect($('.ons-card__image').attr('alt')).toBe('');
            });
        });

        describe('WHEN: `image.placeholderUrl` is provided', () => {
            let $;

            beforeEach(() => {
                const html = renderComponent('card', EXAMPLE_CARD_WITH_PLACEHOLDER_IMAGE_WITH_PATH);
                $ = cheerio.load(html);
            });

            test('THEN: it outputs an `img` element', () => {
                expect($('.ons-card__image')[0].tagName).toBe('img');
            });

            test('THEN: the `img` has the expected `srcset` with the custom path', () => {
                expect($('.ons-card__image').attr('srcset')).toBe(
                    '/placeholder-image-url/img/small/placeholder-card.png 1x, /placeholder-image-url/img/large/placeholder-card.png 2x',
                );
            });

            test('THEN: the `img` has the expected `src` with the custom path', () => {
                expect($('.ons-card__image').attr('src')).toBe('/placeholder-image-url/img/small/placeholder-card.png');
            });

            test('THEN: the `img` has an empty alt attribute', () => {
                expect($('.ons-card__image').attr('alt')).toBe('');
            });
        });
    });
});
