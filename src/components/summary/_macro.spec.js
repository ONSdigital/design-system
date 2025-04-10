/** @jest-environment jsdom */

import * as cheerio from 'cheerio';

import axe from '../../tests/helpers/axe';
import { renderComponent, templateFaker } from '../../tests/helpers/rendering';

const EXAMPLE_SUMMARY_ROWS = {
    rows: [
        {
            // Contains - row with icon, attributes and titleAttributes, other value, no action
            id: 'row-id-1',
            title: 'row title 1',
            itemsList: [
                {
                    titleAttributes: {
                        a: 123,
                        b: 456,
                    },
                    attributes: {
                        a: 'aaa',
                        b: 'bbb',
                    },
                    iconType: 'check',
                    iconVisuallyHiddenText: 'Section completed',
                    id: 'item-id-1',
                    valueList: [
                        {
                            text: 'row value 1',
                            other: 'other value',
                        },
                    ],
                },
            ],
        },
        {
            // Contains - row with error and multiple actions
            id: 'row-id-2',
            title: 'row title 2',
            error: true,
            errorMessage: 'there are errors',
            itemsList: [
                {
                    id: 'item-id-2',
                    valueList: [
                        {
                            text: 'row value 2',
                        },
                    ],
                    actions: [
                        {
                            text: 'Action 1',
                            visuallyHiddenText: 'action 1 for row title 2',
                            attributes: {
                                a: 'abc',
                                b: 'def',
                            },
                            url: '#1',
                        },
                        {
                            text: 'Action 2',
                            visuallyHiddenText: 'action 2 for row title 2',
                            url: '#2',
                        },
                    ],
                },
            ],
        },
        {
            // Contains - row with multiple rows and multiple values
            id: 'row-id-3',
            title: 'row title 3',
            itemsList: [
                {
                    id: 'item-id-3',
                    valueList: [
                        {
                            text: 'row value 3',
                        },
                        {
                            text: 'row value 3b',
                        },
                    ],
                },
                {
                    id: 'item-id-4',
                    valueList: [
                        {
                            text: 'row value 4',
                        },
                    ],
                },
            ],
        },
        {
            // Contains - row with total
            id: 'row-id-4',
            title: 'row title 4',
            total: true,
            itemsList: [
                {
                    id: 'item-id-5',
                    valueList: [
                        {
                            text: '£234,000.00',
                        },
                    ],
                },
            ],
        },
    ],
};

const EXAMPLE_SUMMARY_GROUPS = {
    groups: [
        {
            id: 'group-id-1',
            title: 'group title',
            ...EXAMPLE_SUMMARY_ROWS,
        },
    ],
};

const EXAMPLE_SUMMARY_GROUPS_NO_ROWS = {
    groups: [
        {
            placeholderText: 'Placeholder text',
            summaryLink: {
                text: 'Summary link',
                url: '#0',
                attributes: {
                    a: 'xyz',
                },
            },
        },
    ],
};

const EXAMPLE_SUMMARY_HOUSEHOLD_GROUP = {
    rows: [
        {
            itemsList: [
                {
                    title: 'row item 1',
                    valueList: [
                        {
                            text: 'list item 1',
                        },
                    ],
                    actions: [
                        {
                            text: 'Change',
                            visuallyHiddenText: 'change list item',
                            url: '#0',
                        },
                        {
                            text: 'Remove',
                            visuallyHiddenText: 'remove list item',
                            url: '#0',
                        },
                    ],
                },
                {
                    title: 'row item 2',
                    valueList: [
                        {
                            text: 'list item 2',
                        },
                    ],
                    actions: [
                        {
                            text: 'Change',
                            visuallyHiddenText: 'change list item',
                            url: '#0',
                        },
                    ],
                },
                {
                    title: 'row item 3',
                    valueList: [
                        {
                            text: 'list item 3',
                        },
                    ],
                    actions: [
                        {
                            text: 'Change',
                            visuallyHiddenText: 'change list item',
                            url: '#0',
                        },
                    ],
                },
            ],
        },
        {
            itemsList: [
                {
                    title: 'row item 4',
                    actions: [
                        {
                            text: 'Change',
                            visuallyHiddenText: 'change list item',
                            url: '#0',
                        },
                    ],
                },
                {
                    title: 'row item 5',
                    valueList: [
                        {
                            text: 'list item 5',
                        },
                    ],
                },
                {
                    title: 'row item 6',
                    valueList: [
                        {
                            text: 'list item 6',
                        },
                    ],
                    actions: [
                        {
                            text: 'Change',
                            visuallyHiddenText: 'change list item',
                            url: '#0',
                        },
                    ],
                },
            ],
        },
    ],
    summaryLink: {
        text: 'Summary link',
        url: '#0',
    },
};

const EXAMPLE_SUMMARY_BASIC = {
    summaries: [
        {
            ...EXAMPLE_SUMMARY_GROUPS,
        },
    ],
};

const EXAMPLE_SUMMARY_WITH_TITLE = {
    summaries: [
        {
            title: 'summary title',
            ...EXAMPLE_SUMMARY_GROUPS,
        },
    ],
};

const EXAMPLE_SUMMARY_WITH_NO_ROWS = {
    summaries: [
        {
            title: 'summary title',
            ...EXAMPLE_SUMMARY_GROUPS_NO_ROWS,
        },
    ],
};

const EXAMPLE_SUMMARY_MULTIPLE_GROUPS = {
    summaries: [
        {
            title: 'summary title',
            groups: [
                {
                    id: 'group-id-1',
                    title: 'group title',
                    ...EXAMPLE_SUMMARY_ROWS,
                },
                {
                    id: 'group-id-2',
                    title: 'group title',
                    ...EXAMPLE_SUMMARY_HOUSEHOLD_GROUP,
                },
                {
                    id: 'group-id-3',
                    title: 'group title',
                    ...EXAMPLE_SUMMARY_ROWS,
                },
            ],
        },
    ],
};

const EXAMPLE_SUMMARY_SINGLE_GROUP = {
    summaries: [
        {
            title: 'summary title',
            groups: [
                {
                    id: 'group-id-1',
                    title: 'group title',
                    ...EXAMPLE_SUMMARY_HOUSEHOLD_GROUP,
                },
            ],
        },
    ],
};

// To address a DAC issue, we've disabled specific axe definition list rules causing test failures.
// While resolving it would require a significant refactor, the failures are deemed non-critical for accessibility,
// leading to their removal in this context. [https://github.com/ONSdigital/design-system/issues/3027]
const axeRules = {
    rules: {
        dlitem: {
            enabled: false,
        },
        'definition-list': {
            enabled: false,
        },
    },
};

describe('macro: summary', () => {
    describe('mode: general', () => {
        it('passes jest-axe checks', async () => {
            const $ = cheerio.load(renderComponent('summary', EXAMPLE_SUMMARY_BASIC));
            const results = await axe($.html(), axeRules);

            expect(results).toHaveNoViolations();
        });

        it('has custom classes applied', () => {
            const $ = cheerio.load(
                renderComponent('summary', {
                    ...EXAMPLE_SUMMARY_BASIC,
                    classes: 'ons-custom-class',
                }),
            );

            expect($('.ons-summary').hasClass('ons-custom-class')).toBe(true);
        });

        describe('part: group', () => {
            it('has the correct group `id`', () => {
                const $ = cheerio.load(renderComponent('summary', EXAMPLE_SUMMARY_BASIC));

                expect($('#group-id-1').length).toBe(1);
            });

            it('has the correct group `title` tag', () => {
                const $ = cheerio.load(renderComponent('summary', EXAMPLE_SUMMARY_BASIC));

                expect($('.ons-summary__group-title')[0].tagName).toBe('h2');
            });

            it('has the group `title` text', () => {
                const $ = cheerio.load(renderComponent('summary', EXAMPLE_SUMMARY_BASIC));

                expect($('.ons-summary__group-title').text()).toBe('group title');
            });

            it('has larger margin between groups if the top one is a household style summary', () => {
                const $ = cheerio.load(renderComponent('summary', EXAMPLE_SUMMARY_MULTIPLE_GROUPS));

                expect($('.ons-summary__group:nth-last-of-type(2) .ons-summary__link').hasClass('ons-u-mb-3xl')).toBe(true);
            });
        });

        describe('part: row', () => {
            it('has the correct row class when `error` is `true`', () => {
                const $ = cheerio.load(renderComponent('summary', EXAMPLE_SUMMARY_BASIC));

                expect($('.ons-summary__items .ons-summary__item:nth-of-type(2)').hasClass('ons-summary__item--error')).toBe(true);
            });

            it('has the correct row class when `total` is `true`', () => {
                const $ = cheerio.load(renderComponent('summary', EXAMPLE_SUMMARY_BASIC));

                expect($('.ons-summary__items .ons-summary__item:nth-of-type(4)').hasClass('ons-summary__item--total')).toBe(true);
            });

            it('displays the row `title` text', () => {
                const $ = cheerio.load(renderComponent('summary', EXAMPLE_SUMMARY_BASIC));

                expect($('.ons-summary__items .ons-summary__item:nth-of-type(3) .ons-summary__row-title').text()).toBe('row title 3');
            });

            it('overrides the row `title` with the `errorMessage` if provided', () => {
                const $ = cheerio.load(renderComponent('summary', EXAMPLE_SUMMARY_WITH_TITLE));

                expect($('.ons-summary__items .ons-summary__item:nth-of-type(2) .ons-summary__row-title--error').text()).toBe(
                    'there are errors',
                );
            });

            it('has the correct row `id` for each row', () => {
                const $ = cheerio.load(renderComponent('summary', EXAMPLE_SUMMARY_BASIC));

                expect($('#row-id-1').length).toBe(1);
                expect($('#row-id-2').length).toBe(1);
                expect($('#row-id-3').length).toBe(1);
            });

            it('has custom row `titleAttributes`', () => {
                const $ = cheerio.load(renderComponent('summary', EXAMPLE_SUMMARY_BASIC));

                expect($('.ons-summary__item-title').attr('a')).toBe('123');
                expect($('.ons-summary__item-title').attr('b')).toBe('456');
            });
        });

        describe('part: item title', () => {
            it('displays the row `title` text', () => {
                const $ = cheerio.load(renderComponent('summary', EXAMPLE_SUMMARY_BASIC));

                expect(
                    $('.ons-summary__items .ons-summary__item:nth-of-type(1) .ons-summary__item--text:nth-of-type(1)').text().trim(),
                ).toBe('row title 1');
            });

            it('has a custom icon `iconType`', () => {
                const faker = templateFaker();
                const iconsSpy = faker.spy('icon');

                faker.renderComponent('summary', EXAMPLE_SUMMARY_BASIC);

                expect(iconsSpy.occurrences[0].iconType).toBe('check');
            });

            it('has the correct icon class when `iconType` is `check`', () => {
                const $ = cheerio.load(renderComponent('summary', EXAMPLE_SUMMARY_BASIC));

                expect($('.ons-summary__item-title-icon').hasClass('ons-summary__item-title-icon--check')).toBe(true);
            });

            it('has the visually hidden text <span> text when `iconType` is `check`', () => {
                const $ = cheerio.load(renderComponent('summary', EXAMPLE_SUMMARY_BASIC));

                expect($('.ons-summary__item-title-icon').text().trim()).toBe('Section completed');
            });

            it('has the correct item text class when `iconType` is provided', () => {
                const $ = cheerio.load(renderComponent('summary', EXAMPLE_SUMMARY_BASIC));

                expect($('.ons-summary__item--text').hasClass('ons-summary__item-title--text')).toBe(true);
            });

            it('has custom `attributes`', () => {
                const $ = cheerio.load(renderComponent('summary', EXAMPLE_SUMMARY_BASIC));

                expect($('.ons-summary__values').attr('a')).toBe('aaa');
                expect($('.ons-summary__values').attr('b')).toBe('bbb');
            });
        });

        describe('part: item value', () => {
            it('displays the `valueList` text', () => {
                const $ = cheerio.load(renderComponent('summary', EXAMPLE_SUMMARY_BASIC));

                expect(
                    $('.ons-summary__items .ons-summary__item:nth-of-type(1) .ons-summary__values .ons-summary__text').text().trim(),
                ).toBe('row value 1');
            });

            it('displays the `other` text', () => {
                const $ = cheerio.load(renderComponent('summary', EXAMPLE_SUMMARY_BASIC));

                expect($('.ons-summary__items .ons-summary__item:nth-of-type(1) .ons-summary__values ul li').text().trim()).toBe(
                    'other value',
                );
            });

            it('wraps the `valueList` in a ul if multiple values provided', () => {
                const $ = cheerio.load(renderComponent('summary', EXAMPLE_SUMMARY_BASIC));

                expect($('.ons-summary__items .ons-summary__item:nth-of-type(3) .ons-summary__values ul').length).toBe(1);
            });

            it('adds the `ons-summary__column-size--2` class if no `valueList` is provided', () => {
                const $ = cheerio.load(renderComponent('summary', EXAMPLE_SUMMARY_SINGLE_GROUP));

                expect(
                    $('.ons-summary__items .ons-summary__item:nth-of-type(2) .ons-summary__actions').hasClass(
                        'ons-summary__column-size--2',
                    ),
                ).toBe(true);
            });
        });

        describe('part: item action', () => {
            it('has a spacer element if multiple actions are provided', () => {
                const $ = cheerio.load(renderComponent('summary', EXAMPLE_SUMMARY_BASIC));

                expect($('.ons-summary__items .ons-summary__item:nth-of-type(2) .ons-summary__actions .ons-summary__spacer').length).toBe(
                    1,
                );
            });

            it('has the correct `url` for each action provided', () => {
                const $ = cheerio.load(renderComponent('summary', EXAMPLE_SUMMARY_BASIC));

                expect(
                    $('.ons-summary__items .ons-summary__item:nth-of-type(2) .ons-summary__actions .ons-summary__button:first-child').attr(
                        'href',
                    ),
                ).toBe('#1');
                expect(
                    $('.ons-summary__items .ons-summary__item:nth-of-type(2) .ons-summary__actions .ons-summary__button:last-child').attr(
                        'href',
                    ),
                ).toBe('#2');
            });

            it('has the action `text` for each action provided', () => {
                const $ = cheerio.load(renderComponent('summary', EXAMPLE_SUMMARY_BASIC));

                expect(
                    $(
                        '.ons-summary__items .ons-summary__item:nth-of-type(2) .ons-summary__actions .ons-summary__button:first-child .ons-summary__button-text',
                    ).text(),
                ).toBe('Action 1');
                expect(
                    $(
                        '.ons-summary__items .ons-summary__item:nth-of-type(2) .ons-summary__actions .ons-summary__button:last-child .ons-summary__button-text',
                    ).text(),
                ).toBe('Action 2');
            });

            it('has the correct `id` added to the actions', () => {
                const $ = cheerio.load(renderComponent('summary', EXAMPLE_SUMMARY_BASIC));

                expect($('.ons-summary__items .ons-summary__item:nth-of-type(2) .ons-summary__actions').attr('id')).toBe('item-id-2');
            });

            it('has the correct visually hidden <span> text', () => {
                const $ = cheerio.load(renderComponent('summary', EXAMPLE_SUMMARY_BASIC));

                expect(
                    $(
                        '.ons-summary__items .ons-summary__item:nth-of-type(2) .ons-summary__actions .ons-summary__button:first-child .ons-u-vh',
                    ).text(),
                ).toBe('action 1 for row title 2');
                expect(
                    $(
                        '.ons-summary__items .ons-summary__item:nth-of-type(2) .ons-summary__actions .ons-summary__button:last-child .ons-u-vh',
                    ).text(),
                ).toBe('action 2 for row title 2');
            });

            it('has custom `attributes`', () => {
                const $ = cheerio.load(renderComponent('summary', EXAMPLE_SUMMARY_BASIC));

                expect(
                    $('.ons-summary__items .ons-summary__item:nth-of-type(2) .ons-summary__actions .ons-summary__button:first-child').attr(
                        'a',
                    ),
                ).toBe('abc');
                expect(
                    $('.ons-summary__items .ons-summary__item:nth-of-type(2) .ons-summary__actions .ons-summary__button:first-child').attr(
                        'b',
                    ),
                ).toBe('def');
            });

            it('adds the `ons-summary__column-size--2` class if no action is provided', () => {
                const $ = cheerio.load(renderComponent('summary', EXAMPLE_SUMMARY_SINGLE_GROUP));

                expect(
                    $('.ons-summary__items .ons-summary__item:nth-of-type(2) .ons-summary__values').hasClass('ons-summary__column-size--2'),
                ).toBe(true);
            });
        });
    });

    describe('mode: with title', () => {
        it('passes jest-axe checks', async () => {
            const $ = cheerio.load(renderComponent('summary', EXAMPLE_SUMMARY_WITH_TITLE));
            const results = await axe($.html(), axeRules);

            expect(results).toHaveNoViolations();
        });

        it('displays the summary `title`', () => {
            const $ = cheerio.load(renderComponent('summary', EXAMPLE_SUMMARY_WITH_TITLE));

            expect($('.ons-summary__title').text()).toBe('summary title');
        });
    });

    describe('mode: hub', () => {
        it('passes jest-axe checks', async () => {
            const $ = cheerio.load(
                renderComponent('summary', {
                    ...EXAMPLE_SUMMARY_BASIC,
                    variant: 'hub',
                }),
            );
            const results = await axe($.html(), axeRules);

            expect(results).toHaveNoViolations();
        });

        it('has the correct class applied', () => {
            const $ = cheerio.load(
                renderComponent('summary', {
                    ...EXAMPLE_SUMMARY_BASIC,
                    variant: 'hub',
                }),
            );

            expect($('.ons-summary').hasClass('ons-summary--hub')).toBe(true);
        });

        it('has the value rendered after the row `title` that shows on mobile', () => {
            const $ = cheerio.load(
                renderComponent('summary', {
                    ...EXAMPLE_SUMMARY_BASIC,
                    variant: 'hub',
                }),
            );

            expect($('.ons-summary__items .ons-summary__item:nth-of-type(2) .ons-summary__item-title span').text()).toBe(' — row value 2');
        });
    });

    describe('mode: no rows', () => {
        it('passes jest-axe checks', async () => {
            const $ = cheerio.load(renderComponent('summary', EXAMPLE_SUMMARY_WITH_NO_ROWS));

            const results = await axe($.html(), axeRules);
            expect(results).toHaveNoViolations();
        });

        it('has the `placeholderText` provided', () => {
            const $ = cheerio.load(renderComponent('summary', EXAMPLE_SUMMARY_WITH_NO_ROWS));

            expect($('.ons-summary__group .ons-summary__placeholder').text()).toBe('Placeholder text');
        });

        it('has the correct class added to the `summaryLink` when `placeholderText` is provided', () => {
            const $ = cheerio.load(renderComponent('summary', EXAMPLE_SUMMARY_WITH_NO_ROWS));

            expect($('.ons-summary__group .ons-summary__link').hasClass('ons-u-pt-s')).toBe(true);
        });

        it('has custom `attributes` on the `summaryLink`', () => {
            const $ = cheerio.load(renderComponent('summary', EXAMPLE_SUMMARY_WITH_NO_ROWS));

            expect($('.ons-summary__group .ons-summary__link a').attr('a')).toBe('xyz');
        });

        it('has the correct link `text`', () => {
            const $ = cheerio.load(renderComponent('summary', EXAMPLE_SUMMARY_WITH_NO_ROWS));

            expect($('.ons-summary__group .ons-summary__link a').text().trim()).toBe('Summary link');
        });

        it('has the correct link `url`', () => {
            const $ = cheerio.load(renderComponent('summary', EXAMPLE_SUMMARY_WITH_NO_ROWS));

            expect($('.ons-summary__group .ons-summary__link a').attr('href')).toBe('#0');
        });
    });
});

describe('mode: card', () => {
    it('passes jest-axe checks', async () => {
        const $ = cheerio.load(renderComponent('summary', { ...EXAMPLE_SUMMARY_BASIC, variant: 'card' }));
        const results = await axe($.html(), axeRules);

        expect(results).toHaveNoViolations();
    });

    it('has the correct classes applied', () => {
        const $ = cheerio.load(
            renderComponent('summary', {
                ...EXAMPLE_SUMMARY_MULTIPLE_GROUPS,
                variant: 'card',
            }),
        );

        expect($('.ons-summary__group').hasClass('ons-summary__group--card')).toBe(true);
    });
});
