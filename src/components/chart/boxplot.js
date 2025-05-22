import ChartConstants from './chart-constants';
import ColumnChart from './column-chart';

class Boxplot {
    constructor() {
        this.constants = ChartConstants.constants();
        this.columnChart = new ColumnChart();
    }

    getBoxplotOptions = (config, useStackedLayout, extraLines) => {
        return {
            plotOptions: {
                boxplot: {
                    ...this.columnChart.getPointPadding(config, useStackedLayout, extraLines, false),
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
                enabled: false,
                symbolRadius: 0,
                itemStyle: {
                    fontSize: this.constants.defaultFontSize,
                    color: this.constants.legendLabelColor,
                },
            },
        };
    };
}

export default Boxplot;
