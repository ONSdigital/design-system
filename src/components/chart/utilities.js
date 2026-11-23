import Highcharts from 'highcharts';

// Returns a label formatter for a value axis.
// When abbreviateNumbers is true, large magnitudes are abbreviated with SI suffixes
// (k, M, B, T) following the Highcharts default style.
// Otherwise values are rendered as comma-separated numbers (e.g. 1,000,000),
// including small values below 10,000 where Highcharts' default formatter would
// omit thousands separators.
//
// Datetime axes and non-numeric values (category labels) use the default label formatter. A user-supplied labels.format template also
// takes precedence over the comma branch so existing labelFormat usage keeps
// working; the abbreviateNumbers branch takes precedence over labels.format.
const SI_THRESHOLDS = [
    { limit: 1e12, suffix: 'T' },
    { limit: 1e9, suffix: 'B' },
    { limit: 1e6, suffix: 'M' },
    { limit: 1e3, suffix: 'k' },
];

export const getValueAxisLabelFormatter = (abbreviateNumbers) => {
    return function () {
        const value = this.value;
        const axisOptions = this.axis?.options;

        if (typeof value !== 'number' || !isFinite(value) || axisOptions?.type === 'datetime') {
            return this.axis.defaultLabelFormatter.call(this);
        }

        if (abbreviateNumbers) {
            const abs = Math.abs(value);
            for (const { limit, suffix } of SI_THRESHOLDS) {
                if (abs >= limit) {
                    return Highcharts.numberFormat(value / limit, -1) + suffix;
                }
            }
            return Highcharts.numberFormat(value, -1);
        }

        // Ignored if abbreviateNumbers is true
        const labelFormat = axisOptions?.labels?.format;
        if (labelFormat) {
            return Highcharts.format(labelFormat, this);
        }

        return Highcharts.numberFormat(value, -1);
    };
};

// Utility function to merge two configs together
export const mergeConfigs = (baseConfig, newConfig) => {
    // If newConfig is null/undefined, return baseConfig
    if (!newConfig) return baseConfig;

    // Create a new object to store the merged result
    const merged = { ...baseConfig };

    // Iterate through all keys in newConfig
    Object.keys(newConfig).forEach((key) => {
        // Get values from both configs for this key
        const baseValue = merged[key];
        const newValue = newConfig[key];

        // If both values are objects (and not null), recursively merge them
        if (
            baseValue &&
            newValue &&
            typeof baseValue === 'object' &&
            typeof newValue === 'object' &&
            !Array.isArray(baseValue) &&
            !Array.isArray(newValue)
        ) {
            merged[key] = mergeConfigs(baseValue, newValue);
        } else {
            // For non-objects and arrays use the new value
            // If the new value is null/undefined, use the base value
            merged[key] = newValue ?? baseValue;
        }
    });

    return merged;
};

// Helper function to process the range and reference line annotations plus any plot lines config
// ready to pass to the responsive rules
export const preparePlotLinesAndBands = (
    annotations = undefined,
    rangeAnnotations = undefined,
    rangeAnnotationsOptions = undefined,
    referenceLineAnnotationsOptions = undefined,
    specificChartOptions,
    chartType,
    customReferenceLineValue,
) => {
    const totalPointAndRangeAnnotations = (annotations ? annotations.length : 0) + (rangeAnnotations ? rangeAnnotations.length : 0);

    // Both range and reference line annotations are added to the axis objects, so we need to correctly combine them before we can pass them to the config.
    let desktopRangeAnnotations = {};
    let mobileRangeAnnotations = {};
    let desktopReferenceLineAnnotations = {};
    let mobileReferenceLineAnnotations = {};
    let desktopAllPlotLines = {};
    let mobileAllPlotLines = {};
    let desktopAllPlotLinesAndBands = {};
    let mobileAllPlotLinesAndBands = {};

    // get the desktop and mobile range annotations
    if (rangeAnnotationsOptions) {
        desktopRangeAnnotations = rangeAnnotationsOptions.getRangeAnnotationsOptionsDesktop(chartType);
        mobileRangeAnnotations = rangeAnnotationsOptions.getRangeAnnotationsOptionsMobile(annotations ? annotations.length : 0, chartType);
    }

    // get the desktop and mobile reference line annotations
    if (referenceLineAnnotationsOptions) {
        desktopReferenceLineAnnotations = referenceLineAnnotationsOptions.getReferenceLineAnnotationsOptionsDesktop();
        mobileReferenceLineAnnotations = referenceLineAnnotationsOptions.getReferenceLineAnnotationsOptionsMobile(
            totalPointAndRangeAnnotations,
            chartType,
        );
    }

    // We also need to combine the zero line / custom reference line with the reference line annotations here, as otherwise
    // it gets overridden by the reference line annotations config
    let plotLineOptions = specificChartOptions.getReferenceLine(customReferenceLineValue, chartType);
    desktopAllPlotLines = { ...desktopReferenceLineAnnotations };
    mobileAllPlotLines = { ...mobileReferenceLineAnnotations };

    if (desktopReferenceLineAnnotations.yAxis !== undefined) {
        let desktopMergedPlotLines = desktopReferenceLineAnnotations.yAxis.plotLines.concat(plotLineOptions.yAxis.plotLines);
        let mobileMergedPlotLines = mobileReferenceLineAnnotations.yAxis.plotLines.concat(plotLineOptions.yAxis.plotLines);
        desktopAllPlotLines.yAxis.plotLines = desktopMergedPlotLines;
        mobileAllPlotLines.yAxis.plotLines = mobileMergedPlotLines;
    } else {
        desktopAllPlotLines.yAxis = { ...plotLineOptions.yAxis };
        mobileAllPlotLines.yAxis = { ...plotLineOptions.yAxis };
    }

    // combine the desktop and mobile range and reference line annotations, along with other plot lines, ready to pass to the config
    desktopAllPlotLinesAndBands = mergeConfigs(desktopRangeAnnotations, desktopAllPlotLines);
    mobileAllPlotLinesAndBands = mergeConfigs(mobileRangeAnnotations, mobileAllPlotLines);

    return {
        desktopAllPlotLinesAndBands,
        mobileAllPlotLinesAndBands,
    };
};
