/** @jest-environment jsdom */

import * as cheerio from 'cheerio';
import axe from '../../tests/helpers/axe';
import { renderComponent, templateFaker } from '../../tests/helpers/rendering';

import {
    EXAMPLE_CARD,
    EXAMPLE_CARD_WITH_IMAGE,
    EXAMPLE_CARD_WITH_LIST,
    EXAMPLE_CARD_FULL_EXAMPLE,
    EXAMPLE_CARD_FEATURE_VARIANT,
} from './_test_examples';

describe('FOR: Macro: Card', () => {
    describe('GIVEN: Params: required', () => {
        describe('WHEN: all required params are provided', () => {
            const $ = cheerio.load(renderComponent('card', EXAMPLE_CARD));

            test('THEN: jest-axe text pass', async () => {
                const results = await axe($.html());
                expect(results).toHaveNoViolations();
            });

            test('THEN: renders the title with the provided text', () => {
                expect($('.ons-card__title').text().trim()).toBe('Example card title');
            });

            test('THEN: renders the body with the provided id', () => {
                expect($('.ons-card__body').attr('id')).toBe('example-text-id');
            });

            test('THEN: renders the body with the provided text', () => {
                expect($('.ons-card__body').text().trim()).toBe('Example card text');
            });
        });
    });

    describe('GIVEN: Params: figure', () => {
        describe('WHEN: figure is provided', () => {
            const $ = cheerio.load(renderComponent('card', EXAMPLE_CARD_FULL_EXAMPLE));

            test('THEN: it renders the provided figure', () => {
                expect($('.ons-card__figure').text().trim()).toBe('123,456');
            });
        });
    });

    describe('GIVEN: Params: headingLevel', () => {
        describe('WHEN: headingLevel is provided', () => {
            it.each([
                [1, 'h1'],
                [4, 'h4'],
            ])('THEN: it renders headings with the correct heading tag (%i -> <%s>)', (headingLevel, expectedTag) => {
                const $ = cheerio.load(
                    renderComponent('card', {
                        ...EXAMPLE_CARD,
                        title: {
                            text: 'Example card title',
                            headingLevel,
                        },
                    }),
                );
                const titleTag = $('.ons-card__title')[0].tagName;
                expect(titleTag).toBe(expectedTag);
            });
        });
    });

    describe('GIVEN: Params: itemsList', () => {
        describe('WHEN: itemsList is provided in the body', () => {
            test('THEN: renders the list with the provided items', () => {
                const faker = templateFaker();
                const listsSpy = faker.spy('list');

                faker.renderComponent('card', EXAMPLE_CARD_WITH_LIST);

                expect(listsSpy.occurrences[0]).toEqual({
                    variants: 'dashed',
                    itemsList: [{ text: 'Test item 1' }, { text: 'Test item 2' }],
                });
            });
        });
    });

    describe('GIVEN: Params: title', () => {
        const $ = cheerio.load(renderComponent('card', EXAMPLE_CARD_FULL_EXAMPLE));
        describe('WHEN: url is provided', () => {
            test('THEN: renders the title with the provided url', () => {
                expect($('.ons-card__link').attr('href')).toBe('http://example.com');
            });
        });
        describe('WHEN: subtitle is provided', () => {
            test('THEN: it renders the subtitle with the provided text', () => {
                expect($('.ons-card__subtitle').text().trim()).toBe('Optional subtitle');
            });
        });
    });

    describe('GIVEN: Params: image', () => {
        describe('WHEN: an image is provided', () => {
            const $ = cheerio.load(renderComponent('card', EXAMPLE_CARD_WITH_IMAGE));

            test('THEN: jest-axe checks pass', async () => {
                const results = await axe($.html());
                expect(results).toHaveNoViolations();
            });

            test('THEN: it renders an image element', () => {
                expect($('.ons-card__image')[0].tagName).toBe('img');
            });

            test('THEN: the image has the expected srcset attribute set', () => {
                expect($('.ons-card__image').attr('srcset')).toBe('example-small.png 1x, example-large.png 2x');
            });

            test('THEN: the image has the expected src attribute source set', () => {
                expect($('.ons-card__image').attr('src')).toBe('example-small.png');
            });

            test('THEN: the image has the expected alt text', () => {
                expect($('.ons-card__image').attr('alt')).toBe('Example alt text');
            });
        });

        describe('WHEN: image is set to true', () => {
            const $ = cheerio.load(renderComponent('card', { ...EXAMPLE_CARD, image: true }));

            test('THEN: it outputs an image element', () => {
                expect($('.ons-card__image')[0].tagName).toBe('img');
            });

            test('THEN: the card is rendered with the srcset attribute set to the placeholder image', () => {
                expect($('.ons-card__image').attr('srcset')).toBe('/img/small/placeholder-card.png 1x, /img/large/placeholder-card.png 2x');
            });

            test('THEN: the card is rendered with the src attribute set to the placeholder image', () => {
                expect($('.ons-card__image').attr('src')).toBe('/img/small/placeholder-card.png');
            });

            test('THEN: the image has an empty alt attribute', () => {
                expect($('.ons-card__image').attr('alt')).toBe('');
            });
        });

        describe('WHEN: image placeholderUrl is provided', () => {
            const $ = cheerio.load(
                renderComponent('card', {
                    ...EXAMPLE_CARD,
                    image: {
                        placeholderUrl: '/placeholder-image-url',
                    },
                }),
            );

            test('THEN: it outputs an image element', () => {
                expect($('.ons-card__image')[0].tagName).toBe('img');
            });

            test('THEN: the image has the expected srcset attribute set with the custom path', () => {
                expect($('.ons-card__image').attr('srcset')).toBe(
                    '/placeholder-image-url/img/small/placeholder-card.png 1x, /placeholder-image-url/img/large/placeholder-card.png 2x',
                );
            });

            test('THEN: the image has the expected src attribute set with the custom path', () => {
                expect($('.ons-card__image').attr('src')).toBe('/placeholder-image-url/img/small/placeholder-card.png');
            });

            test('THEN: the image has an empty alt attribute', () => {
                expect($('.ons-card__image').attr('alt')).toBe('');
            });
        });
    });

    describe('GIVEN: Params: variant', () => {
        describe('WHEN: variant is set to feature', () => {
            const $ = cheerio.load(renderComponent('card', EXAMPLE_CARD_FEATURE_VARIANT));

            test('THEN: it renders the card with the feature modifier class', () => {
                expect($('.ons-card').hasClass('ons-card--feature')).toBe(true);
            });
        });
    });
});
