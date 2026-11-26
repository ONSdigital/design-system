import { renderComponent, setTestPage } from '../../tests/helpers/rendering';
import { EXAMPLE_EXTERNAL_LINK } from './_test_examples';

async function getIconFill() {
    return await page.$eval('.ons-external-link .ons-icon', (icon) => window.getComputedStyle(icon).fill);
}

async function getTokenColor(token) {
    return await page.evaluate((name) => {
        const probe = document.createElement('span');
        probe.style.color = `var(${name})`;
        document.body.appendChild(probe);
        const color = getComputedStyle(probe).color;
        probe.remove();
        return color;
    }, token);
}

describe('styles: external-link', () => {
    beforeEach(async () => {
        await page.mouse.move(500, 500);
        await setTestPage('/test', renderComponent('external-link', EXAMPLE_EXTERNAL_LINK));
    });

    it('keeps the icon dark grey without hover or focus', async () => {
        expect(await getIconFill()).toBe(await getTokenColor('--ons-color-grey-100'));
    });

    it('turns the icon blue on hover without focus', async () => {
        await page.hover('.ons-external-link');

        expect(await getIconFill()).toBe(await getTokenColor('--ons-color-text-link-hover'));
    });

    it('keeps the icon black on keyboard focus', async () => {
        await page.keyboard.press('Tab');

        expect(await getIconFill()).toBe(await getTokenColor('--ons-color-black'));
    });

    it('keeps the icon black when a focused link is hovered', async () => {
        await page.keyboard.press('Tab');
        await page.hover('.ons-external-link');

        expect(await getIconFill()).toBe(await getTokenColor('--ons-color-black'));
    });
});
