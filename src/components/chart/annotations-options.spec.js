import RangeAnnotationsOptions from './range-annotations-options';
import ReferenceLineAnnotationsOptions from './reference-line-annotations-options';

describe.each(['x', 'y'])('Chart annotation labels on the %s-axis', (axis) => {
    describe.each([undefined, 80])('GIVEN: a label width of %s', (labelWidth) => {
        test('THEN: range annotation labels wrap instead of using the Highcharts ellipsis default', () => {
            const options = new RangeAnnotationsOptions([
                {
                    axis,
                    text: 'A range annotation that wraps across multiple lines',
                    range: { axisValue1: 1, axisValue2: 2 },
                    labelWidth,
                },
            ]).getRangeAnnotationsOptionsDesktop('line');

            expect(options[`${axis}Axis`].plotBands[0].label.style).toMatchObject({
                textOverflow: 'clip',
                width: labelWidth ?? 150,
            });
        });

        test('THEN: reference line annotation labels wrap instead of using the Highcharts ellipsis default', () => {
            const options = new ReferenceLineAnnotationsOptions([
                {
                    axis,
                    text: 'A reference line annotation that wraps across multiple lines',
                    value: 1,
                    labelWidth,
                },
            ]).getReferenceLineAnnotationsOptionsDesktop();

            expect(options[`${axis}Axis`].plotLines[0].label).toMatchObject({
                allowOverlap: true,
                style: {
                    textOverflow: 'clip',
                    width: labelWidth ?? 150,
                },
            });
        });
    });

    test('THEN: inside range annotation labels wrap without a fixed width', () => {
        const options = new RangeAnnotationsOptions([
            {
                axis,
                text: 'An annotation inside the range',
                range: { axisValue1: 1, axisValue2: 2 },
                labelInside: true,
                labelWidth: 80,
            },
        ]).getRangeAnnotationsOptionsDesktop('line');

        expect(options[`${axis}Axis`].plotBands[0].label.style).toMatchObject({
            textOverflow: 'clip',
            width: undefined,
        });
    });

    test('THEN: mobile range annotations retain numbered footnote labels', () => {
        const options = new RangeAnnotationsOptions([
            {
                axis,
                text: 'A range annotation',
                range: { axisValue1: 1, axisValue2: 2 },
                labelWidth: 80,
            },
        ]).getRangeAnnotationsOptionsMobile(1, 'line');
        const label = options[`${axis}Axis`].plotBands[0].label;

        expect(label.text).toBe('2');
        expect(label.className).toBe('ons-chart__annotations-footnotes-number');
        expect(label.style).not.toHaveProperty('width');
        expect(label.style).not.toHaveProperty('textOverflow');
    });

    test('THEN: mobile reference line annotations retain numbered footnote labels', () => {
        const options = new ReferenceLineAnnotationsOptions([
            {
                axis,
                text: 'A reference line annotation',
                value: 1,
                labelWidth: 80,
            },
        ]).getReferenceLineAnnotationsOptionsMobile(2, 'line');
        const label = options[`${axis}Axis`].plotLines[0].label;

        expect(label.text).toBe('3');
        expect(label.className).toBe('ons-chart__annotations-footnotes-number');
        expect(label.style).not.toHaveProperty('width');
        expect(label.style).not.toHaveProperty('textOverflow');
    });
});
