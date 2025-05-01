/** @jest-environment jsdom */

import * as cheerio from 'cheerio';
import axe from '../../tests/helpers/axe';
import { renderComponent, templateFaker } from '../../tests/helpers/rendering';

import {
    EXAMPLE_CARD_WITHOUT_IMAGE,
    EXAMPLE_CARD_WITH_IMAGE,
    EXAMPLE_CARD_WITH_PLACEHOLDER_IMAGE,
    EXAMPLE_CARD_WITH_PLACEHOLDER_IMAGE_WITH_PATH,
    EXAMPLE_CARD_FEATURE_VARIANT,
} from './_test_examples';

describe('FOR: Macro: Card', () => {
    describe('GIVEN: Params: required', () => {
        describe('WHEN: an image is not provided', () => {
            let $;

            beforeEach(() => {
                const html = renderComponent('card', EXAMPLE_CARD_WITHOUT_IMAGE);
                $ = cheerio.load(html);
            });

            test('THEN: jest-axe text pass', async () => {
                const results = await axe($.html());
                expect(results).toHaveNoViolations();
            });

            test('THEN: it has the provided title text', () => {
                expect($('.ons-card__title').text().trim()).toBe('Example card title');
            });

            test('THEN: the provided text has the provided id', () => {
                expect($('#example-text-id').text().trim()).toBe('Example card text.');
            });
        });

        describe('WHEN: headingLevel is provided', () => {
            it.each([
                [1, 'h1'],
                [4, 'h4'],
            ])('THEN: it renders with headings with the correct heading tag (%i -> <%s>)', (headingLevel, expectedTag) => {
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

        describe('WHEN: itemsList is provided in the body', () => {
            test('THEN: renders the list with the provided items', () => {
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

        describe('WHEN: title url is provided', () => {
            test('THEN: renders with the provided href', () => {
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

        describe('WHEN: custom image params are provided', () => {
            let $;

            beforeEach(() => {
                const html = renderComponent('card', EXAMPLE_CARD_WITH_IMAGE);
                $ = cheerio.load(html);
            });

            test('THEN: it outputs an image element', () => {
                expect($('.ons-card__image')[0].tagName).toBe('img');
            });

            test('THEN: the image has the expected large source set', () => {
                expect($('.ons-card__image').attr('srcset')).toBe('example-small.png 1x, example-large.png 2x');
            });

            test('THEN: the image has the expected small source set', () => {
                expect($('.ons-card__image').attr('src')).toBe('example-small.png');
            });

            test('THEN: the image has the expected alt text', () => {
                // In the original example, alt is pulled from `image.alt`
                expect($('.ons-card__image').attr('alt')).toBe('Example alt text');
            });
        });
    });

    describe('GIVEN: a card config with a default placeholder image', () => {
        describe('WHEN: image is set to true (default placeholder)', () => {
            let $;

            beforeEach(() => {
                const html = renderComponent('card', EXAMPLE_CARD_WITH_PLACEHOLDER_IMAGE);
                $ = cheerio.load(html);
            });

            test('THEN: it outputs an image element', () => {
                expect($('.ons-card__image')[0].tagName).toBe('img');
            });

            test('THEN: the image has the expected source set', () => {
                expect($('.ons-card__image').attr('srcset')).toBe('/img/small/placeholder-card.png 1x, /img/large/placeholder-card.png 2x');
            });

            test('THEN: the image has the expected source set', () => {
                expect($('.ons-card__image').attr('src')).toBe('/img/small/placeholder-card.png');
            });

            test('THEN: the image has an empty alt attribute', () => {
                expect($('.ons-card__image').attr('alt')).toBe('');
            });
        });

        describe('WHEN: an image placeholder url is provided', () => {
            let $;

            beforeEach(() => {
                const html = renderComponent('card', EXAMPLE_CARD_WITH_PLACEHOLDER_IMAGE_WITH_PATH);
                $ = cheerio.load(html);
            });

            test('THEN: it outputs an image element', () => {
                expect($('.ons-card__image')[0].tagName).toBe('img');
            });

            test('THEN: the image has the expected source set with the custom path', () => {
                expect($('.ons-card__image').attr('srcset')).toBe(
                    '/placeholder-image-url/img/small/placeholder-card.png 1x, /placeholder-image-url/img/large/placeholder-card.png 2x',
                );
            });

            test('THEN: the image has the expected source with the custom path', () => {
                expect($('.ons-card__image').attr('src')).toBe('/placeholder-image-url/img/small/placeholder-card.png');
            });

            test('THEN: the image has an empty alt attribute', () => {
                expect($('.ons-card__image').attr('alt')).toBe('');
            });
        });
    });

    describe('GIVEN: variant: feature', () => {
        describe('WHEN: a feature card is rendered', () => {
            let $;

            beforeEach(() => {
                const html = renderComponent('card', EXAMPLE_CARD_FEATURE_VARIANT);
                $ = cheerio.load(html);
            });

            test('THEN: it renders the feature variant with the correct modifier class', () => {
                expect($('.ons-card').hasClass('ons-card--feature')).toBe(true);
            });

            test('THEN: it renders the provided title text', () => {
                expect($('.ons-card__title').text().trim()).toBe('Feature card title');
            });

            test('THEN: it renders the provided subtitle text', () => {
                expect($('.ons-card__subtitle').text().trim()).toBe('Optional subtitle');
            });

            test('THEN: it renders a link with the provided URL', () => {
                expect($('.ons-card__link').attr('href')).toBe('http://example.com');
            });

            test('THEN: it renders the provided figure', () => {
                expect($('.ons-card__figure').text().trim()).toBe('123,456');
            });

            test('THEN: it renders the provided body text via the textId', () => {
                expect($('#example-feature-text-id').text().trim()).toBe('Example feature card text');
            });

            test('THEN: it passes jest-axe accessibility checks', async () => {
                const results = await axe($.html());
                expect(results).toHaveNoViolations();
            });
        });
    });
});
