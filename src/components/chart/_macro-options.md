| Name             | Type    | Required | Description                                                                                                                                                                                  |
| ---------------- | ------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| chartType        | string  | true     | The type of chart to render. Supported types include: 'line' and 'bar'.                                                                                                                      |
| theme            | string  | false    | The theme to apply to the chart. Either `primary` or `alternate`. Defaults to `primary`.                                                                                                     |
| headingLevel     | number  | false    | Number used to determine the heading level of the title. Use to ensure the title has a correct semantic order on the page. Accepts a value between 1 and 4, defaulting to 2 if not provided. |
| title            | string  | true     | The main title of the chart.                                                                                                                                                                 |
| subtitle         | string  | true     | A subtitle that appears under the main title.                                                                                                                                                |
| id               | string  | true     | A unique identifier for the chart instance.                                                                                                                                                  |
| caption          | string  | false    | A caption providing additional context for the chart.                                                                                                                                        |
| description      | string  | false    | A textual description of the chart for screen readers.                                                                                                                                       |
| download         | object  | false    | Object for (download)[#download] options.                                                                                                                                                    |
| legend           | boolean | false    | Whether the legend is displayed. Defaults to `true`.                                                                                                                                         |
| yAxis            | object  | true     | Defines the vertical axis [y-axis](#y_axis) configuration parameters                                                                                                                         |
| xAxis            | object  | true     | Defines the horizontal axis [x-axis](#x_axis) configuration parameters                                                                                                                       |
| series           | array   | true     | The data [series](#series) to be plotted, including labels and values.                                                                                                                       |
| useStackedLayout | boolean | false    | Determines whether the chart should use a stacked layout. It is useful only for bar charts.                                                                                                  |
| annotations      | array   | false    | An array of annotations.                                                                                                                                                                     |

### Download

| Property  | Type   | Required | Description                                                                                  |
| --------- | ------ | -------- | -------------------------------------------------------------------------------------------- |
| title     | string | false    | The title displayed above the download options.                                              |
| itemsList | array  | false    | An array of items available for download, each described by a (DownloadItem)[#DownloadItem]. |

### DownloadItem

| Property | Type   | Required | Description                                        |
| -------- | ------ | -------- | -------------------------------------------------- |
| `text`   | string | true     | The label or description of the downloadable item. |
| `url`    | string | true     | The URL to the downloadable resource.              |

### Y_Axis

| Name        | Type   | Required | Description                                                                                                                                             |
| ----------- | ------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| title       | string | true     | The title text displayed on the y-axis                                                                                                                  |
| labelFormat | string | false    | A format string for the axis label. Examples of string formats can be found in these [docs](https://www.highcharts.com/docs/chart-concepts/templating). |

### X_Axis

| Name        | Type   | Required | Description                                                                                                                                               |
| ----------- | ------ | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| title       | string | true     | The title text displayed on the x-axis                                                                                                                    |
| labelFormat | string | false    | A format string for the x-axis label. Examples of string formats can be found in these [docs](https://www.highcharts.com/docs/chart-concepts/templating). |
| categories  | array  | false    | Labels for each tick mark along the x-axis.                                                                                                               |
| type        | string | false    | The type of axis. Can be one of `linear`, `logarithmic`, `datetime` or `category`. Defaults to linear.                                                    |

### Series

| Name       | Type    | Required | Description                                                                          |
| ---------- | ------- | -------- | ------------------------------------------------------------------------------------ |
| name       | string  | true     | The name of the series.                                                              |
| data       | array   | true     | The data values for the series. Each value corresponds to a category on the x-axis.  |
| dataLabels | boolean | false    | Options for whether the DataLabel is displayed. Defaults to `false`.                 |
| marker     | boolean | false    | Options for whether the Marker is displayed on the data points. Defaults to `false`. |

### Annotations

| Name                           | Type   | Required | Description                                                                    |
| ------------------------------ | ------ | -------- | ------------------------------------------------------------------------------ |
| text                           | string | true     | The annotation text.                                                           |
| coordinatePointAnnotation      | object | false    | An annotation for use on a chart that has 2 value axes                         |
| categorisedDataPointAnnotation | object | false    | An annotation for use on a chart that has one value axis and one category axis |
| labelOffsetX (px)              | int    | true     | The x offset in px of the label from the annotation point                      |
| labelOffsetY (px)              | int    | true     | The y offset in px of the label from the annotation point                      |

### Co-ordinate point annotation

| Name   | Type  | Required | Description                        |
| ------ | ----- | -------- | ---------------------------------- |
| xValue | float | true     | The x axis value of the annotation |
| yValue | float | true     | The y axis value of the annotation |

### Categorised data point annotation

| Name   | Type  | Required | Description                                                                           |
| ------ | ----- | -------- | ------------------------------------------------------------------------------------- |
| xValue | float | true     | Category index for the annotation - a zero based index of the x axis categories array |
| yValue | float | true     | The y axis value for the annotation                                                   |
