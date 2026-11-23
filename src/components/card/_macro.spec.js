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

            test('THEN: standard cards keep title-only links', () => {
                expect($('.ons-card').hasClass('ons-card--linked')).toBe(false);
                expect($('.ons-card__heading, .ons-card__content')).toHaveLength(0);
                expect($('.ons-card__figure').next().hasClass('ons-card__body')).toBe(true);
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

            test('THEN: linked feature cards have one native title link and a tile interaction modifier', async () => {
                expect($('.ons-card').hasClass('ons-card--linked')).toBe(true);
                expect($('.ons-card a').length).toBe(1);
                expect($('.ons-card__link').text().trim()).toBe('Feature card title');
                expect(await axe($.html())).toHaveNoViolations();
            });

            test('THEN: feature cards without a title URL stay non-interactive', () => {
                const $unlinked = cheerio.load(renderComponent('card', { ...EXAMPLE_CARD, variant: 'feature' }));

                expect($unlinked('.ons-card').hasClass('ons-card--linked')).toBe(false);
                expect($unlinked('a').length).toBe(0);
            });

            test('THEN: it groups the title and subtitle before the headline figure', () => {
                expect(
                    $('.ons-card__heading')
                        .children()
                        .map((_, element) => element.attribs.class)
                        .get(),
                ).toEqual(['ons-card__link', 'ons-card__subtitle ons-u-fs-s ons-u-mt-2xs']);
                expect($('.ons-card__heading').next().hasClass('ons-card__figure')).toBe(true);
                expect($('.ons-card__figure').next().hasClass('ons-card__content')).toBe(true);
                expect($('.ons-card__content').children().get()).toEqual($('.ons-card__body').get());
            });

            test('THEN: top alignment groups the figure and its supporting text', () => {
                const $topAligned = cheerio.load(renderComponent('card', { ...EXAMPLE_CARD_FEATURE_VARIANT, figureAlignment: 'top' }));

                expect($topAligned('.ons-card').hasClass('ons-card--figure-top')).toBe(true);
                expect(
                    $topAligned('.ons-card__content')
                        .children()
                        .map((_, element) => element.attribs.class)
                        .get(),
                ).toEqual(['ons-card__figure ons-u-fs-3xl ons-u-fw-b ons-u-mb-no', 'ons-card__body']);
                expect($topAligned('.ons-card__heading').next().hasClass('ons-card__content')).toBe(true);
            });

            test('THEN: cards without a figure keep the original body markup', () => {
                const $noFigure = cheerio.load(renderComponent('card', { ...EXAMPLE_CARD, variant: 'feature', figureAlignment: 'top' }));

                expect($noFigure('.ons-card').hasClass('ons-card--figure-top')).toBe(false);
                expect($noFigure('.ons-card__content').length).toBe(0);
                expect($noFigure('.ons-card__heading').length).toBe(0);
                expect($noFigure('.ons-card__body').parent().hasClass('ons-card')).toBe(true);
            });

            it.each([undefined, 'top'])('THEN: alignment %s keeps the optional list with its supporting text', (figureAlignment) => {
                const $withList = cheerio.load(
                    renderComponent('card', {
                        ...EXAMPLE_CARD_FEATURE_VARIANT,
                        figureAlignment,
                        body: {
                            ...EXAMPLE_CARD_FEATURE_VARIANT.body,
                            itemsList: EXAMPLE_CARD_WITH_LIST.body.itemsList,
                        },
                    }),
                );

                expect($withList('.ons-card__content > .ons-card__body').next('ul')).toHaveLength(1);
                expect($withList('.ons-card__content > ul li')).toHaveLength(2);
                expect($withList('.ons-card__content > .ons-card__figure')).toHaveLength(figureAlignment === 'top' ? 1 : 0);
            });
        });
    });
});
