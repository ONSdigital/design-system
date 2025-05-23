| Name                    | Type    | Required | Description                                                                                                                                                                                  |
| ----------------------- | ------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| chartType               | string  | true     | The type of chart to render. Supported types include: 'line', 'bar', 'column', 'scatter' and 'area'.                                                                                         |
| theme                   | string  | false    | The theme to apply to the chart. Either `primary` or `alternate`. Defaults to `primary`.                                                                                                     |
| headingLevel            | number  | false    | Number used to determine the heading level of the title. Use to ensure the title has a correct semantic order on the page. Accepts a value between 1 and 4, defaulting to 2 if not provided. |
| title                   | string  | true     | The main title of the chart.                                                                                                                                                                 |
| subtitle                | string  | true     | A subtitle that appears under the main title.                                                                                                                                                |
| id                      | string  | true     | A unique identifier for the chart instance.                                                                                                                                                  |
| caption                 | string  | false    | A caption providing additional context for the chart.                                                                                                                                        |
| description             | string  | false    | A textual description of the chart for screen readers.                                                                                                                                       |
| download                | object  | false    | Object for (download)[#download] options.                                                                                                                                                    |
| legend                  | boolean | false    | Whether the legend is displayed. Defaults to `true`.                                                                                                                                         |
| isChartInverted         | boolean | false    | Determines whether the chart should be rendered with inverted axes (i.e., flipping the X and Y axes). Typically used for bar or column charts. Defaults to false.                            |
| yAxis                   | object  | true     | Defines the vertical axis [y-axis](#y_axis) configuration parameters                                                                                                                         |
| xAxis                   | object  | true     | Defines the horizontal axis [x-axis](#x_axis) configuration parameters                                                                                                                       |
| series                  | array   | true     | The data [series](#series) to be plotted, including labels and values.                                                                                                                       |
| useStackedLayout        | boolean | false    | Determines whether the chart should use a stacked layout. It is useful only for bar and column charts.                                                                                       |
| annotations             | array   | false    | An array of annotations.                                                                                                                                                                     |
| percentageHeightDesktop | integer | false    | Sets the percentage plot height at desktop, relative to the width. If undefined the chart will fall back to the default height of 400px at desktop. Does not apply to bar charts.            |
| percentageHeightMobile  | integer | false    | Sets the percentage plot height at mobile, relative to the width. If undefined the chart will fall back to the default height of 400px at mobile. Does not apply to bar charts.              |
|                         |
| annotations             | array   | false    | An array of point annotations.                                                                                                                                                               |
| rangeAnnotations        | array   | false    | An array of range annotations.                                                                                                                                                               |
| estimateLineLabel       | string  | false    | Label for the estimate line in the legend. Used in column charts with confidence intervals.                                                                                                  |
| uncertaintyRangeLabel   | string  | false    | Label for the confidence interval in the legend. Used in column charts showing uncertainty ranges.                                                                                           |

## Download

| Property  | Type   | Required | Description                                                                                  |
| --------- | ------ | -------- | -------------------------------------------------------------------------------------------- |
| title     | string | false    | The title displayed above the download options.                                              |
| itemsList | array  | false    | An array of items available for download, each described by a (DownloadItem)[#DownloadItem]. |

## DownloadItem

| Property | Type   | Required | Description                                        |
| -------- | ------ | -------- | -------------------------------------------------- |
| `text`   | string | true     | The label or description of the downloadable item. |
| `url`    | string | true     | The URL to the downloadable resource.              |

## Y_Axis

| Name                | Type   | Required | Description                                                                                                                                                                                            |
| ------------------- | ------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| title               | string | true     | The title text displayed on the y-axis. Note that for any chart type apart from bar charts, a maximum character limit of 50 characters is recommended to avoid the axis title being cut off at mobile. |
| labelFormat         | string | false    | A format string for the axis label. Examples of string formats can be found in these [docs](https://www.highcharts.com/docs/chart-concepts/templating).                                                |
| tickIntervalMobile  | number | false    | The interval of the tick marks in axis units at mobile. Useful when you want to space out the labels (e.g. show every 2nd or 5th label).                                                               |
| tickIntervalDesktop | number | false    | The interval of the tick marks in axis units at desktop. Useful when you want to space out the labels (e.g. show every 2nd or 5th label).                                                              |

## X_Axis

| Name                | Type   | Required | Description                                                                                                                                                                  |
| ------------------- | ------ | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| title               | string | false    | The title text displayed on the x-axis. Note that for bar charts, a maximum character limit of 50 characters is recommended to avoid the axis title being cut off at mobile. |
| labelFormat         | string | false    | A format string for the x-axis label. Examples of string formats can be found in these [docs](https://www.highcharts.com/docs/chart-concepts/templating).                    |
| categories          | array  | false    | Labels for each tick mark along the x-axis.                                                                                                                                  |
| type                | string | false    | The type of axis. Can be one of `linear`, `logarithmic`, `datetime` or `category`. Defaults to linear.                                                                       |
| tickIntervalMobile  | number | false    | The interval of the tick marks in axis units at mobile. Useful when you want to space out the labels (e.g. show every 2nd or 5th label).                                     |
| tickIntervalDesktop | number | false    | The interval of the tick marks in axis units at desktop. Useful when you want to space out the labels (e.g. show every 2nd or 5th label).                                    |

## Series

| Name         | Type    | Required | Description                                                                                                                                                                                                                                            |
| ------------ | ------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| name         | string  | true     | The name of the series.                                                                                                                                                                                                                                |
| data         | array   | true     | The data values for the series. Each value corresponds to a category on the x-axis.                                                                                                                                                                    |
| dataLabels   | boolean | false    | Options for whether the DataLabel is displayed. Defaults to `false`. This option is only available for bar chart and clustered bar charts                                                                                                              |
| marker       | boolean | false    | Options for whether the Marker is displayed on the data points. Defaults to `false`. This option is only available for line charts.                                                                                                                    |
| type         | string  | false    | Specifies the configuration type to apply to the series. Supported types include 'line' and 'scatter'. By default, it aligns with the chart type, but this is used when combining multiple chart types within a single chart (e.g., column with line). |
| connectNulls | boolean | false    | Whether to connect lines that have a data point missing. Only relevant for line charts.                                                                                                                                                                |

## Point annotations

| Name              | Type   | Required | Description                                               |
| ----------------- | ------ | -------- | --------------------------------------------------------- |
| text              | string | true     | The annotation text.                                      |
| point             | object | false    | The x and y coordinates for the annotation                |
| labelOffsetX (px) | int    | true     | The x offset in px of the label from the annotation point |
| labelOffsetY (px) | int    | true     | The y offset in px of the label from the annotation point |

## Point

| Name   | Type         | Required | Description                                                                                                                                                |
| ------ | ------------ | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| xValue | float or int | true     | The x axis value of the annotation. For category axes this is the zero based index of the x axis categories array. It must be an integer in this scenario. |
| yValue | float        | true     | The y axis value of the annotation                                                                                                                         |

## Range annotations

| Name              | Type          | Required | Description                                                                                                                                                                   |
| ----------------- | ------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| text              | string        | true     | The annotation text.                                                                                                                                                          |
| range             | Object<Range> | true     | The xValue or yValue coordinates for the annotation                                                                                                                           |
| axis              | string        | true     | The axis the range annotation should be applied to. Should be one of 'x' or 'y'. Note that for bar charts 'x' will be the vertical axis, and 'y' will be the horizontal axis. |
| labelInside       | boolean       | true     | Whether the label for the range sits inside or outside the shaded area                                                                                                        |
| labelOffsetX (px) | int           | false    | The horizontal offset in px of the label from it's default position. Ignored if labelInside is true.                                                                          |
| labelOffsetY (px) | int           | false    | The vertical offset in px of the label from it's default position. Ignored if labelInside is true.                                                                            |
| labelWidth (px)   | int           | false    | The width of the label in pixels - the label text will wrap if it is wider than this value. If undefined, the label will be set to 150px wide.                                |

## Range

| Name       | Type         | Required | Description                                                                                                                                                          |
| ---------- | ------------ | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| axisValue1 | float or int | true     | The starting point on the axis for the annotation. For category axes this is the zero based index of the categories array. It must be an integer in this scenario.   |
| axisValue2 | float or int | true     | The ending pont on the axis for the annotation. For category axes this is the zero based index of the axis categories array. It must be an integer in this scenario. |
