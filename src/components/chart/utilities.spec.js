import { getValueAxisLabelFormatter } from './utilities';

// Mirror enough of the Highcharts formatter `this` context for the tests to run
// in isolation. `defaultLabelFormatter` is what the formatter delegates to for
// non-numeric and datetime axes; here it just stringifies the value.
const invoke = (formatter, value, axisOptions = {}) => {
    const context = {
        value,
        axis: {
            options: axisOptions,
            // this is a mock for the default label formatter from Highcharts
            defaultLabelFormatter() {
                return String(this.value);
            },
        },
    };
    return formatter.call(context);
};

describe('chart utilities', () => {
    describe('getValueAxisLabelFormatter', () => {
        describe('default (comma-separated)', () => {
            const format = getValueAxisLabelFormatter(false);

            test.each([
                [0, '0'],
                [100, '100'],
                [1000, '1,000'],
                [5000, '5,000'],
                [-5000, '-5,000'],
                [1000000, '1,000,000'],
                [-1234567, '-1,234,567'],
                [1.5, '1.5'],
            ])('formats %p as %p', (input, expected) => {
                expect(invoke(format, input)).toBe(expected);
            });

            test('delegates non-numeric values to the axis default formatter', () => {
                expect(invoke(format, 'Jan 2024')).toBe('Jan 2024');
            });

            test('delegates NaN to the axis default formatter', () => {
                expect(invoke(format, NaN)).toBe('NaN');
            });

            test('delegates datetime axes to the axis default formatter', () => {
                // A timestamp value with no format applied would wrongly render as
                // a comma-separated number; delegating preserves date rendering.
                expect(invoke(format, 1700000000000, { type: 'datetime' })).toBe('1700000000000');
            });

            test('honours a user-supplied labels.format template', () => {
                expect(invoke(format, 1234.567, { labels: { format: '{value:.2f}' } })).toBe('1234.57');
            });
        });

        describe('abbreviated numbers', () => {
            const format = getValueAxisLabelFormatter(true);

            test.each([
                [0, '0'],
                [999, '999'],
                [1000, '1k'],
                [1500, '1.5k'],
                [1000000, '1M'],
                [2500000, '2.5M'],
                [1000000000, '1B'],
                [1000000000000, '1T'],
                [-1500000, '-1.5M'],
            ])('formats %p as %p', (input, expected) => {
                expect(invoke(format, input)).toBe(expected);
            });

            test('ignores labels.format in favour of the abbreviated output', () => {
                expect(invoke(format, 1500000, { labels: { format: '{value:.2f}' } })).toBe('1.5M');
            });
        });
    });
});
