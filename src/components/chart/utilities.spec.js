import { getValueAxisLabelFormatter } from './utilities';

describe('chart utilities', () => {
    describe('getValueAxisLabelFormatter', () => {
        const invoke = (formatter, value) => formatter.call({ value });

        describe('default (comma-separated)', () => {
            const format = getValueAxisLabelFormatter(false);

            test.each([
                [0, '0'],
                [100, '100'],
                [1000, '1,000'],
                [1500, '1,500'],
                [1000000, '1,000,000'],
                [-1234567, '-1,234,567'],
                [1.5, '1.5'],
            ])('formats %p as %p', (input, expected) => {
                expect(invoke(format, input)).toBe(expected);
            });

            test('passes non-numeric values through unchanged', () => {
                expect(invoke(format, 'Jan 2024')).toBe('Jan 2024');
            });

            test('passes NaN through unchanged', () => {
                expect(Number.isNaN(invoke(format, NaN))).toBe(true);
            });
        });

        describe('SI units', () => {
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

            test('passes non-numeric values through unchanged', () => {
                expect(invoke(format, '2024')).toBe('2024');
            });
        });
    });
});
