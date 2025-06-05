import ChartConstants from './chart-constants';

// Options that rely on the chart config but are not specific to the chart type
class SpecificChartOptions {
    constructor(theme, type, config) {
        this.constants = ChartConstants.constants();
        this.theme = theme;
        this.config = config;

        this.options = {
            colors: this.theme === 'alternate' ? this.constants.alternateTheme : this.constants.primaryTheme,
            chart: {
                type: type,
                marginTop: this.config.legend.enabled ? (type === 'boxplot' ? 50 : undefined) : 50,
            },
        };
    }

    getOptions = () => this.options;

    // Add zero line or custom reference line (but only for column or line charts)
    getReferenceLine = (customReferenceLineValue, chartType) => {
        let lineValue = 0;
        if (customReferenceLineValue && (chartType === 'line' || chartType === 'column')) {
            lineValue = customReferenceLineValue;
        }

        return {
            yAxis: {
                plotLines: [
                    {
                        color: this.constants.zeroLineColor,
                        width: 1.5,
                        value: lineValue,
                        zIndex: 2,
                    },
                ],
            },
        };
    };
}

export default SpecificChartOptions;
