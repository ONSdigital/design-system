/** @jest-environment jsdom */

import * as cheerio from 'cheerio';

import axe from '../../tests/helpers/axe';
import { renderComponent } from '../../tests/helpers/rendering';
import { EXAMPLE_ACCORDION } from './_test_examples';

describe('FOR: Macro: Accordion', () => {
    describe('GIVEN: Params: required', () => {
        describe('WHEN: all required params are provided', () => {
            const $ = cheerio.load(renderComponent('accordion', EXAMPLE_ACCORDION));
            test('THEN: jest-axe checks pass', async () => {
                const results = await axe($.html());
                expect(results).toHaveNoViolations();
            });
        });
    });
    describe('GIVEN: Params: required and allButton', () => {
        describe('WHEN: required and allButton params are provided', () => {
            const $ = cheerio.load(
                renderComponent('accordion', {
                    ...EXAMPLE_ACCORDION,
                    allButton: {
                        open: 'Open label',
                        close: 'Close label',
                    },
                }),
            );
            test('THEN: jest-axe checks pass', async () => {
                const results = await axe($.html());
                expect(results).toHaveNoViolations();
            });
        });
    });
    describe('GIVEN: Params: id', () => {
        describe('WHEN: id is provided', () => {
            const $ = cheerio.load(renderComponent('accordion', EXAMPLE_ACCORDION));
            test('THEN: renders with provided id', () => {
                expect($('.ons-accordion').attr('id')).toBe('accordion-identifier');
            });
        });
    });
    describe('GIVEN: Params: classes', () => {
        describe('WHEN: additional style classes are provided', () => {
            const $ = cheerio.load(
                renderComponent('accordion', {
                    ...EXAMPLE_ACCORDION,
                    classes: 'extra-class another-extra-class',
                }),
            );
            test('THEN: renders with provided classes', () => {
                expect($('.ons-accordion').hasClass('extra-class')).toBe(true);
                expect($('.ons-accordion').hasClass('another-extra-class')).toBe(true);
            });
        });
    });
    describe('GIVEN: Params: itemsList: AccordionItem', () => {
        describe('WHEN: title is provided', () => {
            const $ = cheerio.load(renderComponent('accordion', EXAMPLE_ACCORDION));
            test('THEN: renders title with provided text', () => {
                const titleText = $('.ons-details__title').first().text().trim();
                expect(titleText).toBe('Title for item 1');
            });
        });
        describe('WHEN: headingLevel is not provided', () => {
            const $ = cheerio.load(
                renderComponent('accordion', {
                    itemsList: [
                        {
                            title: 'Title for item 1',
                            content: 'Content for item 1',
                        },
                    ],
                }),
            );
            test('THEN: item title renders with default heading tag', () => {
                const titleTag = $('.ons-details__title')[0].tagName;
                expect(titleTag).toBe('h2');
            });
        });
        describe('WHEN: headingLevel is provided', () => {
            const $ = cheerio.load(
                renderComponent('accordion', {
                    itemsList: [
                        {
                            title: 'Title for item 1',
                            headingLevel: 5,
                            content: 'Content for item 1',
                        },
                    ],
                }),
            );
            test('THEN: item title renders with provided heading tag', () => {
                const titleTag = $('.ons-details__title')[0].tagName;
                expect(titleTag).toBe('h5');
            });
        });
        describe('WHEN: content is provided', () => {
            const $ = cheerio.load(renderComponent('accordion', EXAMPLE_ACCORDION));
            test('THEN: item content renders with provided text', () => {
                const titleText = $('.ons-details__content').first().text().trim();
                expect(titleText).toBe('Content for item 1');
            });
        });
        describe('WHEN: attributes are provided', () => {
            const $ = cheerio.load(
                renderComponent('accordion', {
                    itemsList: [
                        {
                            title: 'Title for item 1',
                            attributes: {
                                a: 123,
                                b: 456,
                            },
                        },
                    ],
                }),
            );
            test('THEN: item renders with provided HTML attributes', () => {
                expect($('.ons-details').attr('a')).toBe('123');
                expect($('.ons-details').attr('b')).toBe('456');
            });
        });
        describe('WHEN: headingAttributes are provided', () => {
            const $ = cheerio.load(
                renderComponent('accordion', {
                    itemsList: [
                        {
                            title: 'Title for item 1',
                            headingAttributes: {
                                a: 123,
                                b: 456,
                            },
                        },
                    ],
                }),
            );
            test('THEN: item header renders with provided HTML attributes', () => {
                expect($('.ons-details__heading').attr('a')).toBe('123');
                expect($('.ons-details__heading').attr('b')).toBe('456');
            });
        });
        describe('WHEN: contentAttributes are provided', () => {
            const $ = cheerio.load(
                renderComponent('accordion', {
                    itemsList: [
                        {
                            title: 'Title for item 1',
                            content: 'Content for item 1',
                            contentAttributes: {
                                a: 123,
                                b: 456,
                            },
                        },
                    ],
                }),
            );
            test('THEN: item content renders with provided HTML attributes', () => {
                expect($('.ons-details__content').attr('a')).toBe('123');
                expect($('.ons-details__content').attr('b')).toBe('456');
            });
        });
    });
    describe('GIVEN: Params: allButton: AccordionButton', () => {
        describe('WHEN: required open/close params are provided', () => {
            const $ = cheerio.load(
                renderComponent('accordion', {
                    ...EXAMPLE_ACCORDION,
                    allButton: {
                        open: 'Open label',
                        close: 'Close label',
                    },
                }),
            );
            test('THEN: renders button with expected class', () => {
                expect($('button.ons-accordion__toggle-all').length).toBe(1);
            });
            test('THEN: renders button with provided open text', () => {
                expect($('.ons-accordion__toggle-all-inner').text()).toBe('Open label');
            });
            test('THEN: renders button with provided close text', () => {
                expect($('button.ons-accordion__toggle-all').attr('data-close-all')).toBe('Close label');
            });
        });
        describe('WHEN: attributes are provided', () => {
            const $ = cheerio.load(
                renderComponent('accordion', {
                    ...EXAMPLE_ACCORDION,
                    allButton: {
                        open: 'Open label',
                        close: 'Close label',
                        attributes: {
                            a: 123,
                            b: 456,
                        },
                    },
                }),
            );
            test('THEN: renders button with additional attributes provided', () => {
                expect($('button.ons-accordion__toggle-all').attr('a')).toBe('123');
                expect($('button.ons-accordion__toggle-all').attr('b')).toBe('456');
            });
        });

        describe('WHEN: openAriaLabel and closeAriaLabel are provided', () => {
            const $ = cheerio.load(
                renderComponent('accordion', {
                    ...EXAMPLE_ACCORDION,
                    allButton: {
                        open: 'Open label',
                        close: 'Close label',
                        openAriaLabel: 'Open all sections',
                        closeAriaLabel: 'Close all sections',
                    },
                }),
            );
            test('THEN: renders toggle all button with provided openAriaLabel', () => {
                expect($('button.ons-accordion__toggle-all').attr('data-open-aria-label')).toBe('Open all sections');
            });
            test('THEN: renders toggle all button with provided closeAriaLabel', () => {
                expect($('button.ons-accordion__toggle-all').attr('data-close-aria-label')).toBe('Close all sections');
            });
        });

        describe('WHEN: openAriaLabel and closeAriaLabel are NOT provided', () => {
            const $ = cheerio.load(
                renderComponent('accordion', {
                    ...EXAMPLE_ACCORDION,
                    allButton: {
                        open: 'Open label',
                        close: 'Close label',
                    },
                }),
            );
            test('THEN: renders toggle all button with default openAriaLabel', () => {
                expect($('button.ons-accordion__toggle-all').attr('data-open-aria-label')).toBe('Show all buttons');
            });
            test('THEN: renders toggle all button with default closeAriaLabel', () => {
                expect($('button.ons-accordion__toggle-all').attr('data-close-aria-label')).toBe('Hide all buttons');
            });
        });
    });

    describe('GIVEN: Params: saveState', () => {
        describe('WHEN: saveState param is not provided', () => {
            const $ = cheerio.load(
                renderComponent('accordion', {
                    ...EXAMPLE_ACCORDION,
                }),
            );
            test('THEN: renders without saveState attribute', () => {
                expect($('.ons-details--accordion').attr('saveState')).toBe(undefined);
            });
        });
        describe('WHEN: saveState param is set to true', () => {
            const $ = cheerio.load(
                renderComponent('accordion', {
                    ...EXAMPLE_ACCORDION,
                    saveState: true,
                }),
            );
            test('THEN: renders with saveState attribute', () => {
                expect($('.ons-details--accordion').attr('saveState'));
            });
        });
    });
    describe('GIVEN: Params: open', () => {
        describe('WHEN: open param is not provided', () => {
            const $ = cheerio.load(
                renderComponent('accordion', {
                    ...EXAMPLE_ACCORDION,
                }),
            );
            test('THEN: renders with accordion items closed on page load', () => {
                expect($('.ons-details--accordion').attr('open')).toBe(undefined);
            });
        });
        describe('WHEN: open param is set to true', () => {
            const $ = cheerio.load(
                renderComponent('accordion', {
                    ...EXAMPLE_ACCORDION,
                    open: true,
                }),
            );
            test('THEN: renders with accordion items open on page load', () => {
                expect($('.ons-details--accordion').attr('open'));
            });
        });
    });
});
