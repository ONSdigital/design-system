import ChartConstants from './chart-constants';

class Boxplot {
    constructor() {
        this.constants = ChartConstants.constants();
    }

    getBoxplotOptions = (config, useStackedLayout, extraLines) => {
        return {
            plotOptions: {
                boxplot: {
                    ...this.getPointPadding(config, useStackedLayout, extraLines, false),
                    boxDashStyle: 'Solid',
                    fillColor: this.constants.uncertaintyRangeColor,
                    lineWidth: 0,
                    medianColor: this.constants.estimateLineColor,
                    medianDashStyle: 'Solid',
                    medianWidth: 3,
                    stemWidth: 0,
                    whiskerWidth: 0,
                },
            },
            legend: {
                symbolRadius: 0,
                itemStyle: {
                    fontSize: this.constants.defaultFontSize,
                    color: this.constants.legendLabelColor,
                },
            },
        };
    };

    getPointPadding = (config, stackedLayout, numberOfExtraLines, isMobile) => {
        const numberOfCategories = config.xAxis.categories ? config.xAxis.categories.length : 0;
        const numberOfSeries = config.series.length - numberOfExtraLines; // Get number of series

        const categoryThreshold = isMobile ? 10 : 20;
        const maxPointWidth = isMobile ? 55 : 75;

        let pointPadding = 0;
        let groupPadding = 0;
        let spacing = numberOfCategories >= categoryThreshold ? 0.1 : 0.2;

        // non-clustered charts or stacked charts
        if (numberOfSeries === 1 || stackedLayout === true) {
            pointPadding = spacing;
        }
        // clustered charts
        else {
            groupPadding = spacing;
        }

        return { pointPadding: pointPadding, groupPadding: groupPadding, maxPointWidth: maxPointWidth };
    };

    updateLegend = (chart, uncertaintyRangeLabel, estimateLineLabel) => {
        const container = document.getElementsByClassName('highcharts-container')[0];
        if (!container) return;

        if (chart.legend.options.enabled === true) {
            // Remove existing custom legend if it exists
            const existingLegend = document.querySelector('.highcharts-legend');
            if (existingLegend) existingLegend.remove();

            // Create custom legend
            const legend = document.createElement('div');
            legend.className = 'highcharts-legend';
            legend.style.display = 'flex';
            legend.style.gap = '2rem';
            legend.style.fontSize = `${this.constants.defaultFontSize}`;
            legend.style.paddingLeft = '1rem';
            legend.style.alignItems = 'center';

            legend.innerHTML = `
                <div style="display:flex; align-items:center; gap:0.5rem;">
                    <span style="display:inline-block; width:12px; height:12px; background-color: ${this.constants.uncertaintyRangeColor};"></span>
                    <span>${uncertaintyRangeLabel}</span>
                </div>
                <div style="display:flex; align-items:center; gap:0.5rem;">
                    <span style="display:inline-block; width:20px; height:3px; border-radius: 2px; background-color: ${this.constants.estimateLineColor};"></span>
                    <span>${estimateLineLabel}</span>
                </div>
            `;

            container.parentNode.insertBefore(legend, container);
        }
    };
}

export default Boxplot;
