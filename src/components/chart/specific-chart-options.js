import ChartConstants from './chart-constants';

// Options that rely on the chart config but are not specific to the chart type
class SpecificChartOptions {
    constructor(theme, config) {
        this.constants = ChartConstants.constants();
        this.theme = theme;
        this.config = config;

        this.options = {
            colors: this.theme === 'primary' ? this.constants.primaryTheme : this.constants.alternateTheme,
            chart: {
                marginTop: this.config.legend.enabled ? undefined : 50,
            },
        };
    }

    getOptions = () => this.options;
}

export default SpecificChartOptions;
