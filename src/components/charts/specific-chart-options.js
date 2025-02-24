/* this contains global options for all charts */
class SpecificChartOptions {
    constructor(theme, type) {
        this.constants = {
            primaryTheme: ['#206095', '#27a0cc', '#003c57', '#118c7b', '#a8bd3a', '#871a5b', '#f66068', '#746cb1', '#22d0b6'],
            // Alternate theme colours from https://service-manual.ons.gov.uk/data-visualisation/colours/using-colours-in-charts
            alternateTheme: ['#206095', '#27A0CC', '#871A5B', '#A8BD3A', '#F66068'],
            labelColor: '#414042',
            // Responsive font sizes
            desktopFontSize: '1rem',
        };

        // These options vary according to the chart type or theme,
        // so need to be set for each chart
        this.options = {
            colors: theme === 'primary' ? this.constants.primaryTheme : this.constants.alternateTheme,
            legend: {
                align: 'left',
                verticalAlign: 'top',
                layout: 'horizontal',
                symbolWidth: type === 'line' ? 20 : 12,
                symbolHeight: type === 'line' ? 3 : 12,
                margin: 30,
                itemStyle: {
                    color: this.constants.labelColor,
                    fontSize: this.constants.desktopFontSize,
                    fontWeight: 'normal',
                },
            },
        };
    }

    getOptions = () => this.options;
}

export default SpecificChartOptions;
