import ChartConstants from './chart-constants';

class Boxplot {
    constructor() {
        this.constants = ChartConstants.constants();
    }

    getBoxplotOptions = () => {
        return {
            plotOptions: {
                boxplot: {
                    boxDashStyle: 'Solid',
                    fillColor: '#A6206096',
                    lineWidth: 0,
                    medianColor: '#003c57',
                    medianDashStyle: 'Solid',
                    medianWidth: 3,
                    stemColor: '#A63400',
                    stemDashStyle: 'dot',
                    stemWidth: 0,
                    whiskerColor: '#3D9200',
                    whiskerLength: '100%',
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
                    <span style="display:inline-block; width:12px; height:12px; background-color: rgba(166,32,96,0.6);"></span>
                    <span>${uncertaintyRangeLabel}</span>
                </div>
                <div style="display:flex; align-items:center; gap:0.5rem;">
                    <span style="display:inline-block; width:20px; height:3px; border-radius: 2px; background-color: #003c57;"></span>
                    <span>${estimateLineLabel}</span>
                </div>
            `;

            container.parentNode.insertBefore(legend, container);
        }
    };
}

export default Boxplot;
