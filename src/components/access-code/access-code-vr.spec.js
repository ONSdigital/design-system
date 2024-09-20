import { renderComponent, setTestPage } from '../../tests/helpers/rendering';
const jestVRConfig = require('./jest-vr.config.js');

describe('FOR: VR: Access-code', () => {
    describe('GIVEN: required params', () => {
        it('THEN: component renders correctly', async () => {
            await setTestPage(
                '/test',
                renderComponent('access-code', {
                    id: 'test-access-code',
                    label: {
                        text: 'Enter your 16-character access code',
                        description: 'Keep this code safe. You will need to enter it every time you access your study',
                    },
                }),
            );
            const { configureToMatchImageSnapshot } = require('jest-image-snapshot');
            const toMatchImageSnapshot = configureToMatchImageSnapshot({
                customDiffConfig: jestVRConfig,
            });
            expect.extend({ toMatchImageSnapshot });
            const image = await page.screenshot();

            expect(image).toMatchImageSnapshot();
        });
    });
});
