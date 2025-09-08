/** @jest-environment jsdom */

import * as cheerio from 'cheerio';

import axe from '../../tests/helpers/axe';
import { renderComponent, templateFaker } from '../../tests/helpers/rendering';

const EXAMPLE_TEXTAREA = {
    id: 'example-id',
    name: 'feedback',
    label: {
        classes: 'extra-label-class',
        text: 'Please provide some feedback',
        description: 'For example, describe any difficulties you experienced in the use of this service',
    },
};

const EXAMPLE_TEXTAREA_WITH_CHARACTER_LIMIT = {
    ...EXAMPLE_TEXTAREA,
    width: 30,
    charCheckLimit: {
        limit: 200,
        charCountSingular: 'You have {x} character remaining',
        charCountPlural: 'You have {x} characters remaining',
        charCountOverLimitSingular: '{x} character too many',
        charCountOverLimitPlural: '{x} characters too many',
    },
};

const EXAMPLE_TEXTAREA_WITH_WORD_LIMIT = {
    ...EXAMPLE_TEXTAREA,
    width: 30,
    wordCheckLimit: {
        limit: 5,
        wordCountSingular: 'You have {x} word remaining',
        wordCountPlural: 'You have {x} words remaining',
        wordCountOverLimitSingular: '{x} word too many',
        wordCountOverLimitPlural: '{x} words too many',
    },
};
const EXAMPLE_TEXTAREA_WITH_ERROR = {
    ...EXAMPLE_TEXTAREA,
    error: {
        id: 'feedback-error',
        text: 'Enter your feedback',
    },
};

const EXAMPLE_TEXTAREA_WITH_MUTUALLY_EXCLUSIVE_WITH_ERROR = {
    ...EXAMPLE_TEXTAREA_WITH_ERROR,
    dontWrap: true,
    mutuallyExclusive: {
        or: 'Or',
        deselectMessage: 'Selecting this will clear your feedback',
        deselectGroupAdjective: 'cleared',
        deselectExclusiveOptionAdjective: 'deselected',
        exclusiveOptions: [
            {
                id: 'feedback-exclusive-option',
                name: 'no-feedback',
                value: 'no-feedback',
                label: {
                    text: 'I dont want to provide feedback',
                },
            },
        ],
    },
};

describe('macro: textarea', () => {
    it('passes jest-axe checks', async () => {
        const $ = cheerio.load(renderComponent('textarea', EXAMPLE_TEXTAREA));

        const results = await axe($.html());
        expect(results).toHaveNoViolations();
    });

    it('has the provided `id` attribute', () => {
        const $ = cheerio.load(renderComponent('textarea', EXAMPLE_TEXTAREA));

        expect($('.ons-input--textarea').attr('id')).toBe('example-id');
    });

    it('has additionally provided classes', () => {
        const $ = cheerio.load(
            renderComponent('textarea', {
                ...EXAMPLE_TEXTAREA,
                classes: 'extra-class another-extra-class',
            }),
        );

        expect($('.ons-input--textarea').hasClass('extra-class')).toBe(true);
        expect($('.ons-input--textarea').hasClass('another-extra-class')).toBe(true);
    });

    it('has additionally provided `attributes`', () => {
        const $ = cheerio.load(
            renderComponent('textarea', {
                ...EXAMPLE_TEXTAREA,
                attributes: {
                    a: 123,
                    b: 456,
                },
            }),
        );

        expect($('.ons-input--textarea').attr('a')).toBe('123');
        expect($('.ons-input--textarea').attr('b')).toBe('456');
    });

    it('has the provided `name` attribute', () => {
        const $ = cheerio.load(renderComponent('textarea', EXAMPLE_TEXTAREA));

        expect($('.ons-input--textarea').attr('name')).toBe('feedback');
    });

    it('defaults to having 8 rows of text', () => {
        const $ = cheerio.load(renderComponent('textarea', EXAMPLE_TEXTAREA));

        expect($('.ons-input--textarea').attr('rows')).toBe('8');
    });

    it('has the provided number of rows', () => {
        const $ = cheerio.load(
            renderComponent('textarea', {
                ...EXAMPLE_TEXTAREA,
                rows: 12,
            }),
        );

        expect($('.ons-input--textarea').attr('rows')).toBe('12');
    });

    it('has a class representing the provided `width`', () => {
        const $ = cheerio.load(
            renderComponent('textarea', {
                ...EXAMPLE_TEXTAREA,
                width: 10,
            }),
        );

        expect($('.ons-input--textarea').hasClass('ons-input--w-10')).toBe(true);
    });

    it('has no value initially', () => {
        const $ = cheerio.load(renderComponent('textarea', EXAMPLE_TEXTAREA));

        expect($('.ons-input--textarea').text()).toBe('');
    });

    it('has the provided initial value', () => {
        const $ = cheerio.load(
            renderComponent('textarea', {
                ...EXAMPLE_TEXTAREA,
                value: 'Initial value',
            }),
        );

        expect($('.ons-input--textarea').text()).toBe('Initial value');
    });

    it('does not render label component when not specified', () => {
        const faker = templateFaker();
        const labelSpy = faker.spy('label');

        faker.renderComponent('textarea', {
            ...EXAMPLE_TEXTAREA,
            label: undefined,
        });

        expect(labelSpy.occurrences.length).toBe(0);
    });

    it('renders label using the label component', () => {
        const faker = templateFaker();
        const labelSpy = faker.spy('label');

        faker.renderComponent('textarea', EXAMPLE_TEXTAREA);

        expect(labelSpy.occurrences).toContainEqual({
            id: 'example-id-label',
            for: 'example-id',
            text: 'Please provide some feedback',
            description: 'For example, describe any difficulties you experienced in the use of this service',
            classes: 'extra-label-class',
        });
    });

    it('does not render character limit component when not specified', () => {
        const faker = templateFaker();
        const charCheckLimitSpy = faker.spy('char-check-limit');

        faker.renderComponent('textarea', EXAMPLE_TEXTAREA);

        expect(charCheckLimitSpy.occurrences.length).toBe(0);
    });

    it('renders field component', () => {
        const faker = templateFaker();
        const fieldSpy = faker.spy('field');

        faker.renderComponent('textarea', {
            ...EXAMPLE_TEXTAREA_WITH_ERROR,
            dontWrap: true,
            fieldId: 'example-field-id',
            fieldClasses: 'extra-field-class',
        });

        expect(fieldSpy.occurrences).toContainEqual({
            id: 'example-field-id',
            classes: 'extra-field-class',
            dontWrap: true,
            error: EXAMPLE_TEXTAREA_WITH_ERROR.error,
        });
    });

    describe('with character check', () => {
        it('has the `ons-js-char-check-input` class', () => {
            const $ = cheerio.load(renderComponent('textarea', EXAMPLE_TEXTAREA_WITH_CHARACTER_LIMIT));

            expect($('.ons-input--textarea').hasClass('ons-js-char-check-input')).toBe(true);
        });

        it('has the provided maximum length', () => {
            const $ = cheerio.load(renderComponent('textarea', EXAMPLE_TEXTAREA_WITH_CHARACTER_LIMIT));

            expect($('.ons-input--textarea').attr('data-message-check-num')).toBe('200');
        });

        it('has data attribute which references the character check component', () => {
            const $ = cheerio.load(renderComponent('textarea', EXAMPLE_TEXTAREA_WITH_CHARACTER_LIMIT));

            expect($('.ons-input--textarea').attr('data-message-check-ref')).toBe('example-id-check');
        });

        it('has `aria-describedby` attribute which references the character limit component', () => {
            const $ = cheerio.load(renderComponent('textarea', EXAMPLE_TEXTAREA_WITH_CHARACTER_LIMIT));

            expect($('.ons-input--textarea').attr('aria-describedby')).toBe('example-id-check');
        });

        it('renders character check limit component', () => {
            const faker = templateFaker();
            const charCheckLimitSpy = faker.spy('char-check-limit');

            faker.renderComponent('textarea', EXAMPLE_TEXTAREA_WITH_CHARACTER_LIMIT);

            expect(charCheckLimitSpy.occurrences).toContainEqual({
                id: 'example-id-check',
                limit: 200,
                charCountSingular: 'You have {x} character remaining',
                charCountPlural: 'You have {x} characters remaining',
                charCountOverLimitSingular: '{x} character too many',
                charCountOverLimitPlural: '{x} characters too many',
            });
        });
    });

    describe('with word check', () => {
        it('has the `ons-js-char-check-input` class', () => {
            const $ = cheerio.load(renderComponent('textarea', EXAMPLE_TEXTAREA_WITH_WORD_LIMIT));

            expect($('.ons-input--textarea').hasClass('ons-js-char-check-input')).toBe(true);
        });

        it('has the provided maximum length', () => {
            const $ = cheerio.load(renderComponent('textarea', EXAMPLE_TEXTAREA_WITH_WORD_LIMIT));

            expect($('.ons-input--textarea').attr('data-message-check-num')).toBe('5');
        });

        it('has data attribute which references the word check component', () => {
            const $ = cheerio.load(renderComponent('textarea', EXAMPLE_TEXTAREA_WITH_WORD_LIMIT));

            expect($('.ons-input--textarea').attr('data-message-check-ref')).toBe('example-id-check');
        });

        it('has `aria-describedby` attribute which references the word limit component', () => {
            const $ = cheerio.load(renderComponent('textarea', EXAMPLE_TEXTAREA_WITH_WORD_LIMIT));

            expect($('.ons-input--textarea').attr('aria-describedby')).toBe('example-id-check');
        });

        it('renders char check limit component which counts words instead of characters', () => {
            const faker = templateFaker();
            const charCheckLimitSpy = faker.spy('char-check-limit');

            faker.renderComponent('textarea', EXAMPLE_TEXTAREA_WITH_WORD_LIMIT);

            expect(charCheckLimitSpy.occurrences).toContainEqual({
                id: 'example-id-check',
                limit: 5,
                variant: 'word',
                wordCountSingular: 'You have {x} word remaining',
                wordCountPlural: 'You have {x} words remaining',
                wordCountOverLimitSingular: '{x} word too many',
                wordCountOverLimitPlural: '{x} words too many',
            });
        });
    });

    describe('with character check and word check', () => {
        it('only renders char check limit component which counts characters', () => {
            const faker = templateFaker();
            const charCheckLimitSpy = faker.spy('char-check-limit');

            faker.renderComponent('textarea', EXAMPLE_TEXTAREA_WITH_WORD_LIMIT);

            expect(charCheckLimitSpy.occurrences).toContainEqual({
                id: 'example-id-check',
                limit: 5,
                variant: 'word',
                wordCountSingular: 'You have {x} word remaining',
                wordCountPlural: 'You have {x} words remaining',
                wordCountOverLimitSingular: '{x} word too many',
                wordCountOverLimitPlural: '{x} words too many',
            });
        });
    });

    describe('with error', () => {
        it('has the `error` modifier class', () => {
            const $ = cheerio.load(renderComponent('textarea', EXAMPLE_TEXTAREA_WITH_ERROR));

            expect($('.ons-input--textarea').hasClass('ons-input--error')).toBe(true);
        });
    });

    describe('mutually exclusive', () => {
        it('has the `ons-js-exclusive-group-item` class', () => {
            const $ = cheerio.load(renderComponent('textarea', EXAMPLE_TEXTAREA_WITH_MUTUALLY_EXCLUSIVE_WITH_ERROR));

            expect($('.ons-input--textarea').hasClass('ons-js-exclusive-group-item')).toBe(true);
        });

        it('renders mutually exclusive component', () => {
            const faker = templateFaker();
            const mutuallyExclusiveSpy = faker.spy('mutually-exclusive');

            faker.renderComponent('textarea', {
                ...EXAMPLE_TEXTAREA_WITH_MUTUALLY_EXCLUSIVE_WITH_ERROR,
                fieldId: 'example-field-id',
                fieldClasses: 'extra-field-class',
                legend: 'Legend text',
                legendClasses: 'extra-legend-class',
                description: 'Example description text',
                legendIsQuestionTitle: true,
            });

            expect(mutuallyExclusiveSpy.occurrences).toContainEqual({
                id: 'example-field-id',
                classes: 'extra-field-class',
                legend: 'Legend text',
                legendClasses: 'extra-legend-class',
                description: 'Example description text',
                dontWrap: true,
                legendIsQuestionTitle: true,
                exclusiveOptions: EXAMPLE_TEXTAREA_WITH_MUTUALLY_EXCLUSIVE_WITH_ERROR.mutuallyExclusive.exclusiveOptions,
                or: 'Or',
                deselectMessage: 'Selecting this will clear your feedback',
                deselectGroupAdjective: 'cleared',
                deselectExclusiveOptionAdjective: 'deselected',
                error: EXAMPLE_TEXTAREA_WITH_MUTUALLY_EXCLUSIVE_WITH_ERROR.error,
            });
        });
    });
});
