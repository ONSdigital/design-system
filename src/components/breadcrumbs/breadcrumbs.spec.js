import { setViewport } from '../../tests/helpers/puppeteer';
import { renderComponent, setTestPage } from '../../tests/helpers/rendering';

const LONG_LABEL = 'standardised-illness-ratios-national-statistics-socio-economic-classification-ew';

describe('layout: breadcrumbs', () => {
    test.each([LONG_LABEL, `${LONG_LABEL.replaceAll('-', ' ')} additional breadcrumb text`])(
        'keeps the chevron attached to the final word when wrapping: %s',
        async (text) => {
            await setViewport(page, { width: 620, height: 344 });
            await setTestPage(
                '/test',
                `<div style="padding: 2rem">${renderComponent('breadcrumbs', {
                    itemsList: [
                        { url: '/', text: 'Home' },
                        { url: '/section', text },
                        { url: '/section/parent', text },
                        { url: '/section/parent/child', text: 'Child' },
                    ],
                })}</div>`,
            );

            const layouts = await page.$$eval('#breadcrumb-2, #breadcrumb-3', (items) =>
                items.map((item) => {
                    const link = item.querySelector('a');
                    const text = link.firstChild;
                    const finalWordStart = Math.max(text.textContent.lastIndexOf('-'), text.textContent.lastIndexOf(' ')) + 1;
                    const range = document.createRange();
                    range.setStart(text, 0);
                    range.setEnd(text, 1);
                    const firstLetterRect = range.getBoundingClientRect();
                    range.setStart(text, finalWordStart);
                    range.setEnd(text, text.length);
                    const finalWordRect = range.getBoundingClientRect();
                    const finalWordLines = range.getClientRects().length;
                    const iconRect = item.querySelector('.ons-icon').getBoundingClientRect();
                    return {
                        firstLetterTop: firstLetterRect.top,
                        finalWordTop: finalWordRect.top,
                        finalWordBottom: finalWordRect.bottom,
                        finalWordRight: finalWordRect.right,
                        finalWordLines,
                        iconTop: iconRect.top,
                        iconBottom: iconRect.bottom,
                        iconLeft: iconRect.left,
                        iconRight: iconRect.right,
                        listRight: item.parentElement.getBoundingClientRect().right,
                    };
                }),
            );

            for (const layout of layouts) {
                expect(layout.finalWordTop).toBeGreaterThan(layout.firstLetterTop);
                expect(layout.finalWordLines).toBe(1);
                expect(layout.iconTop).toBeGreaterThanOrEqual(layout.finalWordTop);
                expect(layout.iconBottom).toBeLessThanOrEqual(layout.finalWordBottom);
                expect(layout.iconLeft - layout.finalWordRight).toBeCloseTo(4, 0);
                expect(layout.iconRight).toBeLessThanOrEqual(layout.listRight);
            }
        },
    );

    test('preserves the mobile back link when its text wraps', async () => {
        await setViewport(page, { width: 320, height: 568 });
        await setTestPage(
            '/test',
            renderComponent('breadcrumbs', {
                itemsList: [
                    { url: '/', text: 'Home' },
                    { url: '/section', text: LONG_LABEL },
                ],
            }),
        );

        expect(await page.$eval('#breadcrumb-1', (item) => getComputedStyle(item).display)).toBe('none');
        const layout = await page.$eval('#breadcrumb-2', (item) => {
            const linkRect = item.querySelector('a').getBoundingClientRect();
            const iconRect = item.querySelector('.ons-icon').getBoundingClientRect();
            return {
                iconWidth: iconRect.width,
                iconRight: iconRect.right,
                linkLeft: linkRect.left,
                itemRight: item.getBoundingClientRect().right,
                listRight: item.parentElement.getBoundingClientRect().right,
                transform: getComputedStyle(item.querySelector('.ons-icon')).transform,
            };
        });

        expect(layout.iconWidth).toBeGreaterThan(0);
        expect(layout.iconRight).toBeLessThanOrEqual(layout.linkLeft);
        expect(layout.itemRight).toBeLessThanOrEqual(layout.listRight);
        expect(layout.transform).toBe('matrix(-1, 0, 0, -1, 0, 0)');
    });
});
