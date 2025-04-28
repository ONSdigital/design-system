class ChartConstants {
    static constants() {
        const constants = {
            primaryTheme: ['#206095', '#27a0cc', '#003c57', '#118c7b', '#a8bd3a', '#871a5b', '#f66068', '#746cb1', '#22d0b6'],
            // Alternate theme colours from https://service-manual.ons.gov.uk/data-visualisation/colours/using-colours-in-charts
            alternateTheme: ['#206095', '#27A0CC', '#871A5B', '#A8BD3A', '#F66068'],
            labelColor: '#414042',
            axisLabelColor: '#707071',
            categoryLabelColor: '#414042',
            gridLineColor: '#d9d9d9',
            zeroLineColor: '#b3b3b3',
            defaultFontSize: '0.875rem', // 14px
            lineMarkerStyles: [
                {
                    radius: 4,
                    symbol: 'circle',
                },
                {
                    radius: 4,
                    symbol: 'square',
                },
                {
                    radius: 5,
                    symbol: 'diamond',
                },
                {
                    radius: 5,
                    symbol: 'triangle',
                },
                {
                    radius: 5,
                    symbol: 'triangle-down',
                },
                {
                    radius: 4,
                    symbol: 'circle',
                    fillColor: 'white',
                    lineWidth: 2.5,
                    lineColor: null,
                },
                {
                    radius: 4,
                    symbol: 'square',
                    fillColor: 'white',
                    lineWidth: 2.5,
                    lineColor: null,
                },
                {
                    radius: 5,
                    symbol: 'diamond',
                    fillColor: 'white',
                    lineWidth: 2.5,
                    lineColor: null,
                },
                {
                    radius: 5,
                    symbol: 'triangle',
                    fillColor: 'white',
                    lineWidth: 2.5,
                    lineColor: null,
                },
                {
                    radius: 5,
                    symbol: 'triangle-down',
                    fillColor: 'white',
                    lineWidth: 2.5,
                    lineColor: null,
                },
            ],
            scatterMarkerStyles: [
                {
                    radius: 5,
                    symbol: 'circle',
                    lineWidth: 1,
                    lineColor: '#ffffff',
                },
                {
                    radius: 5,
                    symbol: 'square',
                    lineWidth: 1,
                    lineColor: '#ffffff',
                },
                {
                    radius: 6,
                    symbol: 'diamond',
                    lineWidth: 1,
                    lineColor: '#ffffff',
                },
                {
                    radius: 6,
                    symbol: 'triangle',
                    lineWidth: 1,
                    lineColor: '#ffffff',
                },
            ],
        };

        return constants;
    }
}

export default ChartConstants;
