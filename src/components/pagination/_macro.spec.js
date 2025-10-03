/** @jest-environment jsdom */

import * as cheerio from 'cheerio';

import axe from '../../tests/helpers/axe';
import { renderComponent } from '../../tests/helpers/rendering';

const PAGINATION_PREV_NEXT_LABELS = {
    previous: 'Previous page',
    next: 'Next page',
};

const EXAMPLE_PAGINATION_MINIMAL = {
    ...PAGINATION_PREV_NEXT_LABELS,
    currentPageNumber: 1,
    pages: [{ url: '/page/1' }],
};

describe('macro: pagination', () => {
    it('has additionally provided style classes', () => {
        const $ = cheerio.load(
            renderComponent('pagination', {
                ...EXAMPLE_PAGINATION_MINIMAL,
                classes: 'extra-class another-extra-class',
            }),
        );

        expect($('.ons-pagination').hasClass('extra-class')).toBe(true);
        expect($('.ons-pagination').hasClass('another-extra-class')).toBe(true);
    });

    it('has `ons-pagination--no-indicator` style class when `hideRangeIndicator` is `true`', () => {
        const $ = cheerio.load(
            renderComponent('pagination', {
                ...EXAMPLE_PAGINATION_MINIMAL,
                hideRangeIndicator: true,
            }),
        );

        expect($('.ons-pagination').hasClass('ons-pagination--no-indicator')).toBe(true);
    });

    it('does not have `ons-pagination--no-indicator` style class when `hideRangeIndicator` is `false`', () => {
        const $ = cheerio.load(
            renderComponent('pagination', {
                ...EXAMPLE_PAGINATION_MINIMAL,
                hideRangeIndicator: false,
            }),
        );

        expect($('.ons-pagination').hasClass('ons-pagination--no-indicator')).toBe(false);
    });

    describe('one page', () => {
        const $ = cheerio.load(
            renderComponent('pagination', {
                ...PAGINATION_PREV_NEXT_LABELS,
                currentPageNumber: 1,
                pages: [{ url: '/page/1' }],
            }),
        );

        it('passes jest-axe checks', async () => {
            const results = await axe($.html());
            expect(results).toHaveNoViolations();
        });

        it('has `aria-label` attribute indicating position within pagination', () => {
            expect($('.ons-pagination').attr('aria-label')).toBe('Pagination (Page 1 of 1)');
        });

        it('renders element indicating position within pagination', () => {
            expect($('.ons-pagination__position').text().trim()).toBe('Page 1 of 1');
        });

        it('has a single list item', () => {
            expect($('li').length).toBe(1);
            assertIsCurrentPage($('.ons-pagination__item'), '/page/1', 'Page 1 of 1', '1');
        });
    });

    describe('two pages where first is the current page', () => {
        const $ = cheerio.load(
            renderComponent('pagination', {
                ...PAGINATION_PREV_NEXT_LABELS,
                currentPageNumber: 1,
                pages: [{ url: '/page/1' }, { url: '/page/2' }],
            }),
        );

        it('passes jest-axe checks', async () => {
            const results = await axe($.html());
            expect(results).toHaveNoViolations();
        });

        it('has `aria-label` attribute indicating position within pagination', () => {
            expect($('.ons-pagination').attr('aria-label')).toBe('Pagination (Page 1 of 2)');
        });

        it('renders element indicating position within pagination', () => {
            expect($('.ons-pagination__position').text().trim()).toBe('Page 1 of 2');
        });

        it('has a 3 list items ("1", "2", "Next page")', () => {
            expect($('li').length).toBe(3);
            assertIsCurrentPage($('.ons-pagination__item:nth-child(1)'), '/page/1', 'Page 1 of 2', '1');
            assertIsNextPage($('.ons-pagination__item:nth-child(2)'), '/page/2', 'Page 2', '2');
            assertIsNextPage($('.ons-pagination__item:nth-child(3)'), '/page/2', 'Next page (2)', 'Next page');
        });
    });

    describe('two pages where second is the current page', () => {
        const $ = cheerio.load(
            renderComponent('pagination', {
                ...PAGINATION_PREV_NEXT_LABELS,
                currentPageNumber: 2,
                pages: [{ url: '/page/1' }, { url: '/page/2' }],
            }),
        );

        it('passes jest-axe checks', async () => {
            const results = await axe($.html());
            expect(results).toHaveNoViolations();
        });

        it('has `aria-label` attribute indicating position within pagination', () => {
            expect($('.ons-pagination').attr('aria-label')).toBe('Pagination (Page 2 of 2)');
        });

        it('renders element indicating position within pagination', () => {
            expect($('.ons-pagination__position').text().trim()).toBe('Page 2 of 2');
        });

        it('has a 3 list items ("Previous page", "1", "2")', () => {
            expect($('li').length).toBe(3);
            assertIsPreviousPage($('.ons-pagination__item:nth-child(1)'), '/page/1', 'Previous page (1)', 'Previous page');
            assertIsPreviousPage($('.ons-pagination__item:nth-child(2)'), '/page/1', 'Page 1', '1');
            assertIsCurrentPage($('.ons-pagination__item:nth-child(3)'), '/page/2', 'Page 2 of 2', '2');
        });
    });

    describe('three pages where second is the current page', () => {
        const $ = cheerio.load(
            renderComponent('pagination', {
                ...PAGINATION_PREV_NEXT_LABELS,
                currentPageNumber: 2,
                pages: [{ url: '/page/1' }, { url: '/page/2' }, { url: '/page/3' }],
            }),
        );

        it('passes jest-axe checks', async () => {
            const results = await axe($.html());
            expect(results).toHaveNoViolations();
        });

        it('has `aria-label` attribute indicating position within pagination', () => {
            expect($('.ons-pagination').attr('aria-label')).toBe('Pagination (Page 2 of 3)');
        });

        it('renders element indicating position within pagination', () => {
            expect($('.ons-pagination__position').text().trim()).toBe('Page 2 of 3');
        });

        it('has a 5 list items ("Previous page", "1", "2", "3", "Next page")', () => {
            expect($('li').length).toBe(5);
            assertIsPreviousPage($('.ons-pagination__item:nth-child(1)'), '/page/1', 'Previous page (1)', 'Previous page');
            assertIsPreviousPage($('.ons-pagination__item:nth-child(2)'), '/page/1', 'Page 1', '1');
            assertIsCurrentPage($('.ons-pagination__item:nth-child(3)'), '/page/2', 'Page 2 of 3', '2');
            assertIsNextPage($('.ons-pagination__item:nth-child(4)'), '/page/3', 'Page 3', '3');
            assertIsNextPage($('.ons-pagination__item:nth-child(5)'), '/page/3', 'Next page (3)', 'Next page');
        });
    });

    describe('five pages where second is the current page', () => {
        const $ = cheerio.load(
            renderComponent('pagination', {
                ...PAGINATION_PREV_NEXT_LABELS,
                currentPageNumber: 2,
                pages: [{ url: '/page/1' }, { url: '/page/2' }, { url: '/page/3' }, { url: '/page/4' }, { url: '/page/5' }],
            }),
        );

        it('passes jest-axe checks', async () => {
            const results = await axe($.html());
            expect(results).toHaveNoViolations();
        });

        it('has `aria-label` attribute indicating position within pagination', () => {
            expect($('.ons-pagination').attr('aria-label')).toBe('Pagination (Page 2 of 5)');
        });

        it('renders element indicating position within pagination', () => {
            expect($('.ons-pagination__position').text().trim()).toBe('Page 2 of 5');
        });

        it('has a 7 list items ("Previous page", "1", "2", "3", "4", "5", "Next page")', () => {
            expect($('li').length).toBe(7);
            assertIsPreviousPage($('.ons-pagination__item:nth-child(1)'), '/page/1', 'Previous page (1)', 'Previous page');
            assertIsPreviousPage($('.ons-pagination__item:nth-child(2)'), '/page/1', 'Page 1', '1');
            assertIsCurrentPage($('.ons-pagination__item:nth-child(3)'), '/page/2', 'Page 2 of 5', '2');
            assertIsNextPage($('.ons-pagination__item:nth-child(4)'), '/page/3', 'Page 3', '3');
            assertIsOtherPage($('.ons-pagination__item:nth-child(5)'), '/page/4', 'Page 4', '4');
            assertIsOtherPage($('.ons-pagination__item:nth-child(6)'), '/page/5', 'Last page (5)', '5');
            assertIsNextPage($('.ons-pagination__item:nth-child(7)'), '/page/3', 'Next page (3)', 'Next page');
        });
    });

    describe('six pages where second is the current page', () => {
        const $ = cheerio.load(
            renderComponent('pagination', {
                ...PAGINATION_PREV_NEXT_LABELS,
                currentPageNumber: 2,
                pages: [
                    { url: '/page/1' },
                    { url: '/page/2' },
                    { url: '/page/3' },
                    { url: '/page/4' },
                    { url: '/page/5' },
                    { url: '/page/6' },
                ],
            }),
        );

        it('passes jest-axe checks', async () => {
            const results = await axe($.html());
            expect(results).toHaveNoViolations();
        });

        it('has `aria-label` attribute indicating position within pagination', () => {
            expect($('.ons-pagination').attr('aria-label')).toBe('Pagination (Page 2 of 6)');
        });

        it('renders element indicating position within pagination', () => {
            expect($('.ons-pagination__position').text().trim()).toBe('Page 2 of 6');
        });

        it('has 7 list items ("Previous page", "1", "2", "3", "...", "6", "Next page")', () => {
            expect($('li').length).toBe(7);
            assertIsPreviousPage($('.ons-pagination__item:nth-child(1)'), '/page/1', 'Previous page (1)', 'Previous page');
            assertIsPreviousPage($('.ons-pagination__item:nth-child(2)'), '/page/1', 'Page 1', '1');
            assertIsCurrentPage($('.ons-pagination__item:nth-child(3)'), '/page/2', 'Page 2 of 6', '2');
            assertIsNextPage($('.ons-pagination__item:nth-child(4)'), '/page/3', 'Page 3', '3');
            assertIsGap($('.ons-pagination__item:nth-child(5)'));
            assertIsOtherPage($('.ons-pagination__item:nth-child(6)'), '/page/6', 'Last page (6)', '6');
            assertIsNextPage($('.ons-pagination__item:nth-child(7)'), '/page/3', 'Next page (3)', 'Next page');
        });
    });

    describe('eleven pages where fifth is the current page', () => {
        const $ = cheerio.load(
            renderComponent('pagination', {
                ...PAGINATION_PREV_NEXT_LABELS,
                currentPageNumber: 5,
                pages: [
                    { url: '/page/1' },
                    { url: '/page/2' },
                    { url: '/page/3' },
                    { url: '/page/4' },
                    { url: '/page/5' },
                    { url: '/page/6' },
                    { url: '/page/7' },
                    { url: '/page/8' },
                    { url: '/page/9' },
                    { url: '/page/10' },
                    { url: '/page/11' },
                ],
            }),
        );

        it('passes jest-axe checks', async () => {
            const results = await axe($.html());
            expect(results).toHaveNoViolations();
        });

        it('has `aria-label` attribute indicating position within pagination', () => {
            expect($('.ons-pagination').attr('aria-label')).toBe('Pagination (Page 5 of 11)');
        });

        it('renders element indicating position within pagination', () => {
            expect($('.ons-pagination__position').text().trim()).toBe('Page 5 of 11');
        });

        it('has a 9 list items ("Previous page", "1", "...", "4", "5", "6", "...", "11", "Next page")', () => {
            expect($('li').length).toBe(9);
            assertIsPreviousPage($('.ons-pagination__item:nth-child(1)'), '/page/4', 'Previous page (4)', 'Previous page');
            assertIsOtherPage($('.ons-pagination__item:nth-child(2)'), '/page/1', 'First page', '1');
            assertIsGap($('.ons-pagination__item:nth-child(3)'));
            assertIsPreviousPage($('.ons-pagination__item:nth-child(4)'), '/page/4', 'Page 4', '4');
            assertIsCurrentPage($('.ons-pagination__item:nth-child(5)'), '/page/5', 'Page 5 of 11', '5');
            assertIsNextPage($('.ons-pagination__item:nth-child(6)'), '/page/6', 'Page 6', '6');
            assertIsGap($('.ons-pagination__item:nth-child(7)'));
            assertIsOtherPage($('.ons-pagination__item:nth-child(8)'), '/page/11', 'Last page (11)', '11');
            assertIsNextPage($('.ons-pagination__item:nth-child(9)'), '/page/6', 'Next page (6)', 'Next page');
        });
    });

    describe('eleven pages where tenth is the current page', () => {
        const $ = cheerio.load(
            renderComponent('pagination', {
                ...PAGINATION_PREV_NEXT_LABELS,
                currentPageNumber: 10,
                pages: [
                    { url: '/page/1' },
                    { url: '/page/2' },
                    { url: '/page/3' },
                    { url: '/page/4' },
                    { url: '/page/5' },
                    { url: '/page/6' },
                    { url: '/page/7' },
                    { url: '/page/8' },
                    { url: '/page/9' },
                    { url: '/page/10' },
                    { url: '/page/11' },
                ],
            }),
        );

        it('passes jest-axe checks', async () => {
            const results = await axe($.html());
            expect(results).toHaveNoViolations();
        });

        it('has `aria-label` attribute indicating position within pagination', () => {
            expect($('.ons-pagination').attr('aria-label')).toBe('Pagination (Page 10 of 11)');
        });

        it('renders element indicating position within pagination', () => {
            expect($('.ons-pagination__position').text().trim()).toBe('Page 10 of 11');
        });

        it('has a 7 list items ("Previous page", "1", "...", "9", "10", "11", "Next page")', () => {
            expect($('li').length).toBe(7);
            assertIsPreviousPage($('.ons-pagination__item:nth-child(1)'), '/page/9', 'Previous page (9)', 'Previous page');
            assertIsOtherPage($('.ons-pagination__item:nth-child(2)'), '/page/1', 'First page', '1');
            assertIsGap($('.ons-pagination__item:nth-child(3)'));
            assertIsPreviousPage($('.ons-pagination__item:nth-child(4)'), '/page/9', 'Page 9', '9');
            assertIsCurrentPage($('.ons-pagination__item:nth-child(5)'), '/page/10', 'Page 10 of 11', '10');
            assertIsNextPage($('.ons-pagination__item:nth-child(6)'), '/page/11', 'Page 11', '11');
            assertIsNextPage($('.ons-pagination__item:nth-child(7)'), '/page/11', 'Next page (11)', 'Next page');
        });
    });

    describe('custom previousAriaLabel and nextAriaLabel', () => {
        const customPreviousAriaLabel = 'Go back to page';
        const customNextAriaLabel = 'Continue to page';
        const $custom = cheerio.load(
            renderComponent('pagination', {
                currentPageNumber: 2,
                pages: [{ url: '/page/1' }, { url: '/page/2' }, { url: '/page/3' }],
                previous: 'Previous',
                next: 'Next',
                previousAriaLabel: customPreviousAriaLabel,
                nextAriaLabel: customNextAriaLabel,
            }),
        );
        const $default = cheerio.load(
            renderComponent('pagination', {
                currentPageNumber: 2,
                pages: [{ url: '/page/1' }, { url: '/page/2' }, { url: '/page/3' }],
                previous: 'Previous',
                next: 'Next',
            }),
        );

        it('renders the custom previousAriaLabel and page number on the Previous link', () => {
            const prevItem = $custom('.ons-pagination__item--previous');
            expect(prevItem.length).toBe(1);
            expect(prevItem.find('a').attr('aria-label')).toBe('Go back to page (1)');
        });
        it('renders the default previousAriaLabel and page number on the Previous link if not provided', () => {
            const prevItem = $default('.ons-pagination__item--previous');
            expect(prevItem.length).toBe(1);
            expect(prevItem.find('a').attr('aria-label')).toBe('Previous page (1)');
        });
        it('renders the custom nextAriaLabel and page number on the Next link', () => {
            const nextItem = $custom('.ons-pagination__item--next');
            expect(nextItem.length).toBe(1);
            expect(nextItem.find('a').attr('aria-label')).toBe('Continue to page (3)');
        });
        it('renders the default nextAriaLabel and page number on the Next link if not provided', () => {
            const nextItem = $default('.ons-pagination__item--next');
            expect(nextItem.length).toBe(1);
            expect(nextItem.find('a').attr('aria-label')).toBe('Next page (3)');
        });
    });

    describe('custom ariaLabel', () => {
        it('renders a custom aria-label on the nav element', () => {
            const $ = cheerio.load(
                renderComponent('pagination', {
                    currentPageNumber: 2,
                    pages: [{ url: '/page/1' }, { url: '/page/2' }, { url: '/page/3' }],
                    ariaLabel: 'Custom pagination navigation',
                }),
            );
            expect($('.ons-pagination').attr('aria-label')).toBe('Custom pagination navigation (Page 2 of 3)');
        });
        it('renders the default aria-label on the nav element if not provided', () => {
            const $ = cheerio.load(
                renderComponent('pagination', {
                    currentPageNumber: 2,
                    pages: [{ url: '/page/1' }, { url: '/page/2' }, { url: '/page/3' }],
                }),
            );
            expect($('.ons-pagination').attr('aria-label')).toBe('Pagination (Page 2 of 3)');
        });
    });

    describe('custom firstAriaLabel', () => {
        it('renders a custom aria-label on the first page link', () => {
            const $ = cheerio.load(
                renderComponent('pagination', {
                    currentPageNumber: 3,
                    pages: [{ url: '/page/1' }, { url: '/page/2' }, { url: '/page/3' }, { url: '/page/4' }],
                    firstAriaLabel: 'Jump to first page',
                }),
            );
            const firstPageLink = $('.ons-pagination__item a').filter(function () {
                return $(this).text().trim() === '1';
            });
            expect(firstPageLink.attr('aria-label')).toBe('Jump to first page');
        });
        it('renders the default aria-label on the first page link if not provided', () => {
            const $ = cheerio.load(
                renderComponent('pagination', {
                    currentPageNumber: 3,
                    pages: [{ url: '/page/1' }, { url: '/page/2' }, { url: '/page/3' }, { url: '/page/4' }],
                }),
            );
            const firstPageLink = $('.ons-pagination__item a').filter(function () {
                return $(this).text().trim() === '1';
            });
            expect(firstPageLink.attr('aria-label')).toBe('First page');
        });
    });

    describe('custom currentAriaLabel', () => {
        it('renders a custom aria-label on the current page link', () => {
            const $ = cheerio.load(
                renderComponent('pagination', {
                    currentPageNumber: 2,
                    pages: [{ url: '/page/1' }, { url: '/page/2' }, { url: '/page/3' }],
                    currentAriaLabel: 'You are on page',
                }),
            );
            const currentPageLink = $('.ons-pagination__item--current a');
            expect(currentPageLink.attr('aria-label')).toBe('You are on page (Page 2 of 3)');
        });
        it('renders the default aria-label on the current page link if not provided', () => {
            const $ = cheerio.load(
                renderComponent('pagination', {
                    currentPageNumber: 2,
                    pages: [{ url: '/page/1' }, { url: '/page/2' }, { url: '/page/3' }],
                }),
            );
            const currentPageLink = $('.ons-pagination__item--current a');
            expect(currentPageLink.attr('aria-label')).toBe('Page 2 of 3');
        });
    });

    describe('custom lastAriaLabel', () => {
        it('renders a custom aria-label on the last page link', () => {
            const $ = cheerio.load(
                renderComponent('pagination', {
                    currentPageNumber: 2,
                    pages: [{ url: '/page/1' }, { url: '/page/2' }, { url: '/page/3' }, { url: '/page/4' }],
                    lastAriaLabel: 'Jump to last page',
                }),
            );
            const lastPageLink = $('.ons-pagination__item a').filter(function () {
                return $(this).text().trim() === '4';
            });
            expect(lastPageLink.attr('aria-label')).toBe('Jump to last page (4)');
        });
        it('renders the default aria-label on the last page link if not provided', () => {
            const $ = cheerio.load(
                renderComponent('pagination', {
                    currentPageNumber: 2,
                    pages: [{ url: '/page/1' }, { url: '/page/2' }, { url: '/page/3' }, { url: '/page/4' }],
                }),
            );
            const lastPageLink = $('.ons-pagination__item a').filter(function () {
                return $(this).text().trim() === '4';
            });
            expect(lastPageLink.attr('aria-label')).toBe('Last page (4)');
        });
    });

    describe('custom goToAriaLabel', () => {
        it('renders a custom aria-label on non-current, non-first/last page links', () => {
            const $ = cheerio.load(
                renderComponent('pagination', {
                    currentPageNumber: 3,
                    pages: [{ url: '/page/1' }, { url: '/page/2' }, { url: '/page/3' }, { url: '/page/4' }, { url: '/page/5' }],
                    goToAriaLabel: 'Jump to page',
                }),
            );
            const page2Link = $('.ons-pagination__item a').filter(function () {
                return $(this).text().trim() === '2';
            });
            expect(page2Link.attr('aria-label')).toBe('Jump to page 2');
        });
        it('renders the default aria-label on non-current, non-first/last page links if not provided', () => {
            const $ = cheerio.load(
                renderComponent('pagination', {
                    currentPageNumber: 3,
                    pages: [{ url: '/page/1' }, { url: '/page/2' }, { url: '/page/3' }, { url: '/page/4' }, { url: '/page/5' }],
                }),
            );
            const page2Link = $('.ons-pagination__item a').filter(function () {
                return $(this).text().trim() === '2';
            });
            expect(page2Link.attr('aria-label')).toBe('Page 2');
        });
    });
});

function assertIsCurrentPage(pageItem, url, label, text) {
    expect(pageItem.hasClass('ons-pagination__item--current')).toBe(true);
    expect(pageItem.find('.ons-pagination__link').attr('href')).toBe(url);
    expect(pageItem.find('.ons-pagination__link').attr('aria-current')).toBe('true');
    expect(pageItem.find('.ons-pagination__link').attr('aria-label')).toBe(label);
    expect(pageItem.find('.ons-pagination__link').text().trim()).toBe(text);
}

function assertIsOtherPage(pageItem, url, label, text) {
    expect(pageItem.hasClass('ons-pagination__item--current')).toBe(false);
    expect(pageItem.find('.ons-pagination__link').attr('href')).toBe(url);
    expect(pageItem.find('.ons-pagination__link').attr('aria-current')).toBeUndefined();
    expect(pageItem.find('.ons-pagination__link').attr('aria-label')).toBe(label);
    expect(pageItem.find('.ons-pagination__link').text().trim()).toBe(text);
}

function assertIsPreviousPage(pageItem, url, label, text) {
    assertIsOtherPage(pageItem, url, label, text);
    expect(pageItem.find('.ons-pagination__link').attr('rel')).toBe('prev');
}

function assertIsNextPage(pageItem, url, label, text) {
    assertIsOtherPage(pageItem, url, label, text);
    expect(pageItem.find('.ons-pagination__link').attr('rel')).toBe('next');
}

function assertIsGap(pageItem) {
    expect(pageItem.hasClass('ons-pagination__item--gap')).toBe(true);
    expect(pageItem.text().trim()).toBe('…');
}
