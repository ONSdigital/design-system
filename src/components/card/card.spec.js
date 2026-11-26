import { setViewport } from '../../tests/helpers/puppeteer';
import { gotoTestPath, renderComponent, renderTemplate, setTestPage } from '../../tests/helpers/rendering';
import { EXAMPLE_CARD_FEATURE_VARIANT, EXAMPLE_CARD_FULL_EXAMPLE } from './_test_examples';

function renderCardSet(wide, figureAlignment, withList = true) {
    const cards = Array.from({ length: 5 }, (_, index) =>
        renderComponent('card', {
            ...EXAMPLE_CARD_FEATURE_VARIANT,
            figureAlignment,
            title: {
                text: index === 1 ? 'A longer headline that wraps across multiple lines' : `Headline ${index + 1}`,
                subtitle: 'England and Wales',
                ...(index === 0 ? { url: '#headline-1' } : {}),
            },
            body: {
                figure: index === 1 ? '6.15 Million households in England' : '581,363',
                text: index === 1 ? 'Supporting text that also wraps across several lines in narrower cards' : 'In 2023, up 0.7% from 2022',
                ...(index === 1 && withList ? { itemsList: [{ text: 'Additional supporting information' }] } : {}),
            },
        }),
    );

    return `<div class="ons-container${wide ? ' ons-container--wide' : ''}">
        <div class="ons-grid ons-grid-flex-gap ons-card-set--headline-figures">
            ${cards.map((card) => `<div class="ons-grid__col ons-grid__col--flex-col">${card}</div>`).join('')}
        </div>
    </div>`;
}

async function cardState() {
    return page.$eval('.ons-card', (card) => {
        const style = getComputedStyle(card);
        const linkStyle = getComputedStyle(card.querySelector('.ons-card__link'));
        return {
            background: style.backgroundColor,
            outline: style.outlineColor,
            outlineStyle: style.outlineStyle,
            outlineWidth: style.outlineWidth,
            color: linkStyle.color,
            underline: linkStyle.textDecorationLine,
            underlineColor: linkStyle.textDecorationColor,
        };
    });
}

describe('Headline figure cards', () => {
    afterEach(async () => {
        await jestPuppeteer.resetPage();
    });

    it.each([
        [false, undefined, 1200],
        [true, undefined, 1600],
        [false, 'bottom', 1200],
        [true, 'bottom', 1600],
        [false, undefined, 1000],
        [true, 'bottom', 1000],
        [false, undefined, 800],
        [true, 'bottom', 375],
    ])('preserves gutters and figure alignment (wide: %s, alignment: %s, width: %i)', async (wide, alignment, width) => {
        await setViewport(page, { width, height: 1100 });
        await setTestPage('/test', renderCardSet(wide, alignment));

        const layout = await page.$$eval('.ons-card', (cards) =>
            cards.map((card) => {
                const rect = card.getBoundingClientRect();
                const figure = card.querySelector('.ons-card__figure').getBoundingClientRect();
                const body = card.querySelector('.ons-card__body').getBoundingClientRect();
                const title = card.querySelector('.ons-card__title').getBoundingClientRect();
                const subtitle = card.querySelector('.ons-card__subtitle').getBoundingClientRect();
                const list = card.querySelector('.ons-card__content > ul')?.getBoundingClientRect();
                const content = card.querySelector('.ons-card__content').getBoundingClientRect();
                return {
                    left: rect.left,
                    right: rect.right,
                    top: rect.top,
                    bottom: rect.bottom,
                    figureTop: figure.top,
                    figureBottom: figure.bottom,
                    bodyTop: body.top,
                    bodyBottom: body.bottom,
                    contentBottom: content.bottom,
                    listTop: list?.top,
                    listBottom: list?.bottom,
                    subtitleGap: subtitle.top - title.bottom,
                    linked: card.classList.contains('ons-card--linked'),
                    gutter: parseFloat(getComputedStyle(card.closest('.ons-card-set--headline-figures')).columnGap),
                };
            }),
        );
        const firstRow = layout.filter((card) => Math.abs(card.top - layout[0].top) < 1);
        const secondRow = layout[firstRow.length];
        const verticalGap = secondRow.top - layout[0].bottom;

        for (const card of layout) {
            expect(Math.abs(card.bodyTop - card.figureBottom - 8)).toBeLessThan(1);
            expect(Math.abs(card.subtitleGap - (card.linked ? 8 : 0))).toBeLessThan(1);
            if (card.listTop !== undefined) {
                expect(Math.abs(card.listTop - card.bodyBottom - 8)).toBeLessThan(1);
                expect(card.listBottom).toBeLessThanOrEqual(card.bottom);
            }
        }

        if (width >= 980) {
            expect(firstRow.length).toBeGreaterThan(1);
            const horizontalGap = firstRow[1].left - firstRow[0].right;
            expect(Math.abs(verticalGap - horizontalGap)).toBeLessThan(1);
            expect(Math.abs(horizontalGap - layout[0].gutter)).toBeLessThan(1);
        } else {
            expect(firstRow).toHaveLength(1);
            expect(Math.abs(verticalGap - Math.max(16, layout[0].gutter))).toBeLessThan(1);
        }

        for (const card of firstRow) {
            expect(Math.abs(card.bottom - firstRow[0].bottom)).toBeLessThan(1);
            const edge = alignment === 'bottom' ? 'contentBottom' : 'figureTop';
            expect(Math.abs(card[edge] - firstRow[0][edge])).toBeLessThan(1);
        }
    });

    it('bottom-aligns supporting text rather than figure bottoms when text wraps', async () => {
        await setViewport(page, { width: 1200, height: 1100 });
        await setTestPage('/test', renderCardSet(false, 'bottom', false));

        const layout = await page.$$eval('.ons-card', (cards) =>
            cards.slice(0, 3).map((card) => {
                const figure = card.querySelector('.ons-card__figure').getBoundingClientRect();
                const body = card.querySelector('.ons-card__body').getBoundingClientRect();
                return { figureBottom: figure.bottom, bodyBottom: body.bottom, bodyHeight: body.height };
            }),
        );

        expect(layout[1].bodyHeight).toBeGreaterThan(layout[0].bodyHeight);
        for (const card of layout) {
            expect(Math.abs(card.bodyBottom - layout[0].bodyBottom)).toBeLessThan(1);
        }
        expect(layout[0].figureBottom - layout[1].figureBottom).toBeGreaterThan(1);
    });

    describe('headline examples', () => {
        it('lists only the two default headline examples', async () => {
            await gotoTestPath('/components/card');

            const examples = await page.$$eval('a[href*="headline-figures"]', (links) =>
                links.map((link) => link.getAttribute('href')).sort(),
            );

            expect(examples).toEqual([
                '/components/card/example-card-set-with-headline-figures-long-content.html',
                '/components/card/example-card-set-with-headline-figures.html',
            ]);
        });

        it.each([
            [true, 1920],
            [false, 1600],
            [true, 1600],
            [false, 1000],
            [true, 1000],
            [false, 768],
            [true, 768],
            [false, 375],
            [true, 375],
        ])('demonstrates default alignment and content wrapping (long content: %s, width: %i)', async (longContent, width) => {
            await setViewport(page, { width, height: 1100 });
            await gotoTestPath(`/components/card/example-card-set-with-headline-figures${longContent ? '-long-content' : ''}`);
            await page.evaluate(() => document.fonts.ready);

            const layout = await page.$$eval('.ons-card', (cards) =>
                cards.map((card) => {
                    const rect = card.getBoundingClientRect();
                    const figure = card.querySelector('.ons-card__figure');
                    const title = card.querySelector('.ons-card__title');
                    const body = card.querySelector('.ons-card__body');
                    return {
                        top: rect.top,
                        figureTop: figure.getBoundingClientRect().top,
                        figureLines: figure.getBoundingClientRect().height / parseFloat(getComputedStyle(figure).lineHeight),
                        titleLines: title.getBoundingClientRect().height / parseFloat(getComputedStyle(title).lineHeight),
                        bodyLines: body.getBoundingClientRect().height / parseFloat(getComputedStyle(body).lineHeight),
                        bodyTop: body.getBoundingClientRect().top,
                        gap: body.getBoundingClientRect().top - figure.getBoundingClientRect().bottom,
                        alignment: getComputedStyle(card.querySelector('.ons-card__content')).alignSelf,
                    };
                }),
            );

            expect(layout).toHaveLength(3);
            for (const card of layout) {
                expect(card.alignment).toBe('start');
                expect(Math.abs(card.gap - 8)).toBeLessThan(1);
            }
            if (longContent && width !== 768) {
                expect(layout.some((card) => card.figureLines > 1.5)).toBe(true);
                expect(layout.some((card) => card.titleLines > 1.5)).toBe(true);
                expect(layout.some((card) => card.bodyLines > 1.5)).toBe(true);
            } else {
                expect(layout.every((card) => Math.abs(card.figureLines - 1) < 0.1)).toBe(true);
            }
            if (longContent && width >= 1600) {
                expect(layout[2].titleLines).toBeCloseTo(3, 1);
            }
            if (width >= 980) {
                const firstRow = layout.filter((card) => Math.abs(card.top - layout[0].top) < 1);
                expect(firstRow.length).toBeGreaterThan(1);
                for (const card of firstRow) {
                    expect(Math.abs(card.figureTop - layout[0].figureTop)).toBeLessThan(1);
                }
                if (longContent) {
                    expect(layout[1].bodyTop - layout[0].bodyTop).toBeGreaterThan(1);
                }
            }
            expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
        });

        it('retains the unlisted bottom-aligned reference', async () => {
            await setTestPage(
                '/test',
                renderTemplate('{% include "components/card/_example-card-set-with-headline-figures-bottom-aligned.njk" %}'),
            );

            expect(
                await page.$$eval('.ons-card', (cards) =>
                    cards.map((card) => getComputedStyle(card.querySelector('.ons-card__content')).alignSelf),
                ),
            ).toEqual(['end', 'end', 'end']);
        });
    });

    describe('linked feature cards', () => {
        beforeEach(async () => {
            await setViewport(page, { width: 1200, height: 1100 });
            await setTestPage('/test', renderCardSet(false));
        });

        async function hoverTilePadding() {
            const point = await page.$eval('.ons-card', (card) => {
                const rect = card.getBoundingClientRect();
                return { x: rect.right - 8, y: rect.bottom - 8 };
            });
            await page.mouse.move(point.x, point.y);
            return point;
        }

        it('has a blue underlined headline and a tile-wide hover and click target', async () => {
            expect(await cardState()).toMatchObject({
                background: 'rgb(245, 245, 246)',
                color: 'rgb(32, 96, 149)',
                underline: 'underline',
            });
            const point = await hoverTilePadding();
            expect(await cardState()).toMatchObject({
                background: 'rgb(233, 239, 244)',
                color: 'rgb(0, 60, 87)',
                underline: 'underline',
            });
            await page.mouse.click(point.x, point.y);
            await page.waitForFunction(() => window.location.hash === '#headline-1');
            expect(new URL(page.url()).hash).toBe('#headline-1');
        });

        it('shows yellow focus over hover and supports one native keyboard link', async () => {
            await hoverTilePadding();
            await page.keyboard.press('Tab');
            expect(await page.$eval('.ons-card__link', (link) => link === document.activeElement)).toBe(true);
            expect(await cardState()).toMatchObject({
                background: 'rgb(251, 201, 0)',
                outline: 'rgb(34, 34, 34)',
                outlineStyle: 'solid',
                outlineWidth: '2px',
                color: 'rgb(34, 34, 34)',
                underline: 'underline',
                underlineColor: 'rgb(34, 34, 34)',
            });
            await page.mouse.move(0, 0);
            expect(await cardState()).toMatchObject({
                background: 'rgb(251, 201, 0)',
                color: 'rgb(34, 34, 34)',
                underline: 'underline',
            });
            expect(await page.$$eval('.ons-card a', (links) => links.length)).toBe(1);
            await page.keyboard.press('Enter');
            await page.waitForFunction(() => window.location.hash === '#headline-1');
            expect(new URL(page.url()).hash).toBe('#headline-1');
        });

        it('shows yellow and a dark outline while the tile is pressed', async () => {
            await hoverTilePadding();
            await page.mouse.down();
            await page.$eval('.ons-card__link', (link) => link.blur());
            expect(await cardState()).toMatchObject({
                background: 'rgb(251, 201, 0)',
                outline: 'rgb(34, 34, 34)',
                outlineStyle: 'solid',
                color: 'rgb(34, 34, 34)',
                underline: 'underline',
                underlineColor: 'rgb(34, 34, 34)',
            });
            await page.mouse.up();
        });

        it('leaves unlinked cards non-interactive', async () => {
            await page.hover('.ons-card:not(.ons-card--linked)');
            expect(
                await page.$eval('.ons-card:not(.ons-card--linked)', (card) => ({
                    links: card.querySelectorAll('a').length,
                    background: getComputedStyle(card).backgroundColor,
                })),
            ).toEqual({ links: 0, background: 'rgb(245, 245, 246)' });
        });

        it('retains a visible tile focus outline in forced colours', async () => {
            await page.emulateMediaFeatures([{ name: 'forced-colors', value: 'active' }]);
            await page.keyboard.press('Tab');
            const state = await cardState();
            expect(state).toMatchObject({ outlineStyle: 'solid', outlineWidth: '2px' });
            expect(state.outline).not.toBe(state.background);
        });
    });

    it('keeps secondary feature-card links independently clickable', async () => {
        await setTestPage(
            '/test',
            renderComponent('card', {
                ...EXAMPLE_CARD_FEATURE_VARIANT,
                body: {
                    ...EXAMPLE_CARD_FEATURE_VARIANT.body,
                    itemsList: [{ text: 'Secondary destination', url: '#secondary' }],
                },
            }),
        );
        await page.click('a[href="#secondary"]');
        await page.waitForFunction(() => window.location.hash === '#secondary');
        expect(new URL(page.url()).hash).toBe('#secondary');
    });

    it('does not expand standard card title links or apply tile states', async () => {
        await setTestPage('/test', renderComponent('card', EXAMPLE_CARD_FULL_EXAMPLE));
        const point = await page.$eval('.ons-card', (card) => {
            const rect = card.getBoundingClientRect();
            return { x: rect.right - 8, y: rect.bottom - 8 };
        });
        await page.mouse.move(point.x, point.y);
        expect(await cardState()).toMatchObject({ background: 'rgba(0, 0, 0, 0)' });
        expect(await page.evaluate(({ x, y }) => document.elementFromPoint(x, y).closest('a') === null, point)).toBe(true);
    });
});
