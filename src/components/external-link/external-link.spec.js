import { renderComponent, setTestPage } from '../../tests/helpers/rendering';
import { EXAMPLE_EXTERNAL_LINK } from './_test_examples';

async function getIconState() {
    return await page.$eval('.ons-external-link', (link) => ({
        fill: window.getComputedStyle(link.querySelector('.ons-icon')).fill,
        hover: link.matches(':hover'),
        focus: link.matches(':focus'),
        active: link.matches(':active'),
    }));
}

describe('styles: external-link', () => {
    beforeEach(async () => {
        await page.mouse.move(500, 500);
        await setTestPage('/test', renderComponent('external-link', EXAMPLE_EXTERNAL_LINK));
    });

    it('keeps the icon dark grey without hover or focus', async () => {
        expect(await getIconState()).toEqual({
            fill: 'rgb(65, 64, 66)',
            hover: false,
            focus: false,
            active: false,
        });
    });

    it('turns the icon blue on hover without focus', async () => {
        await page.hover('.ons-external-link');

        expect(await getIconState()).toEqual({
            fill: 'rgb(0, 60, 87)',
            hover: true,
            focus: false,
            active: false,
        });
    });

    it('keeps the icon black on keyboard focus', async () => {
        await page.keyboard.press('Tab');

        expect(await getIconState()).toEqual({
            fill: 'rgb(34, 34, 34)',
            hover: false,
            focus: true,
            active: false,
        });
    });

    it('keeps the icon black when a focused link is hovered', async () => {
        await page.keyboard.press('Tab');
        await page.hover('.ons-external-link');

        expect(await getIconState()).toEqual({
            fill: 'rgb(34, 34, 34)',
            hover: true,
            focus: true,
            active: false,
        });
    });

    it('keeps the icon black while the link is active', async () => {
        await page.hover('.ons-external-link');

        try {
            await page.mouse.down();

            expect(await getIconState()).toEqual({
                fill: 'rgb(34, 34, 34)',
                hover: true,
                focus: true,
                active: true,
            });
        } finally {
            // Release outside the link to avoid opening its external destination.
            await page.mouse.move(500, 500);
            await page.mouse.up();
        }
    });
});
