| Name              | Type   | Required | Description                                                                                |
| ----------------- | ------ | -------- | ------------------------------------------------------------------------------------------ |
| chartType         | string | true     | The type of chart to render (e.g., 'line', 'bar', etc.).                                   |
| theme             | string | true     | The theme to apply to the chart. Either `primary` or `alternate`.                          |
| title             | string | true     | The main title of the chart.                                                               |
| subtitle          | string | true     | A subtitle that appears under the main title.                                              |
| uuid              | string | true     | A unique identifier for the chart instance.                                                |
| caption           | string | false    | A caption providing additional context for the chart.                                      |
| description       | string | false    | A textual description of the chart for screen readers.                                     |
| downloadTitle     | string | false    | The title displayed above the download options.                                            |
| downloadImage     | string | false    | URL for downloading the chart image in PNG format.                                         |
| downloadImageSize | string | false    | The file size of the downloadable image.                                                   |
| downloadCsv       | string | false    | URL for downloading the chart data as a CSV file.                                          |
| downloadCsvSize   | string | false    | The file size of the downloadable CSV.                                                     |
| downloadExcel     | string | false    | URL for downloading the chart data as an Excel file.                                       |
| downloadExcelSize | string | false    | The file size of the downloadable Excel file.                                              |
| config            | object | true     | The full [configuration](#config) object passed to Highcharts, defining axes, series, etc. |

### Config

| Name   | Type   | Required | Description                                                                               |
| ------ | ------ | -------- | ----------------------------------------------------------------------------------------- |
| chart  | object | true     | Defines the [chart's](#chart) overall behavior and appearance.                            |
| legend | object | false    | Controls the appearance and behavior of the [legend](#legend).                            |
| yAxis  | object | true     | Defines the vertical axis [y-axis](#y_axis) properties, including labels and title.       |
| xAxis  | object | true     | Defines the horizontal axis [x-axis](#x_axis) properties, including categories and title. |
| series | array  | true     | The data [series](#series) to be plotted, including labels and values.                    |

### Chart

| Name | Type   | Required | Description                                              |
| ---- | ------ | -------- | -------------------------------------------------------- |
| type | string | true     | The type of chart (e.g., `'line'`, `'bar'`, `'column'`). |

### Legend

| Name          | Type    | Required | Description                                                     |
| ------------- | ------- | -------- | --------------------------------------------------------------- |
| enabled       | boolean | false    | Whether the legend is displayed. Defaults to `true`.            |
| align         | string  | false    | Horizontal alignment of the legend (`left`, `center`, `right`). |
| verticalAlign | string  | false    | Vertical alignment of the legend (`top`, `middle`, `bottom`).   |
| layout        | string  | false    | Legend layout (`horizontal` or `vertical`).                     |

### Y_Axis

| Name          | Type    | Required | Description                                                           |
| ------------- | ------- | -------- | --------------------------------------------------------------------- |
| title         | object  | true     | Defines the [title](#title) of the y-axis.                            |
| reversed      | boolean | false    | Sets the axis so that the highest number is closest to the origin.    |
| labels        | object  | false    | The axis [labels](#labels) show the number or category for each tick. |
| gridLineWidth | number  | false    | The width of grid lines for the y-axis. Defaults to `1`.              |

### X_Axis

| Name       | Type    | Required | Description                                                                        |
| ---------- | ------- | -------- | ---------------------------------------------------------------------------------- |
| title      | object  | true     | Defines the [title](#title) of the x-axis.                                         |
| categories | array   | false    | Labels for each tick mark along the x-axis.                                        |
| reversed   | boolean | false    | Sets the axis so that the highest number is closest to the origin.                 |
| type       | string  | false    | The type of axis. Can be one of `linear`, `logarithmic`, `datetime` or `category`. |
| labels     | object  | false    | The axis [labels](#labels) show the number or category for each tick.              |

### Title

| Name | Type   | Required | Description                                       |
| ---- | ------ | -------- | ------------------------------------------------- |
| text | string | true     | The title text displayed on the y-axis or x-axis. |

### Labels

| Name   | Type   | Required | Description                         |
| ------ | ------ | -------- | ----------------------------------- |
| format | string | false    | A format string for the axis label. |

### Series

| Name       | Type   | Required | Description                                                                                 |
| ---------- | ------ | -------- | ------------------------------------------------------------------------------------------- |
| name       | string | true     | The name of the series.                                                                     |
| data       | array  | true     | The data values for the series. Each value corresponds to a category on the x-axis.         |
| dataLabels | object | false    | Configuration options for displaying labels on the data points.                             |
| marker     | object | false    | Configuration options for the series (markers)[#markers].                                   |
| tooltip    | object | false    | Customization options for the (tooltip)[#tooltip] displayed when hovering over data points. |
| animation  | object | false    | Defines (animation)[#animation] options for rendering the series. Defaults to false.        |

### DataLabel

| Name    | Type    | Required | Description                                              |
| ------- | ------- | -------- | -------------------------------------------------------- |
| enabled | boolean | false    | Whether the DataLabel is displayed. Defaults to `false`. |

### Marker

| Name    | Type    | Required | Description                                                       |
| ------- | ------- | -------- | ----------------------------------------------------------------- |
| enabled | boolean | false    | Whether markers are displayed for the series. Defaults to `true`. |
| symbol  | string  | false    | The shape of the marker (`circle`, `square`, `diamond`, etc.).    |

### Tooltip

| Name        | Type   | Required | Description                                                  |
| ----------- | ------ | -------- | ------------------------------------------------------------ |
| valueSuffix | string | false    | A string to append to each tooltip value (e.g., '°C', 'kg'). |

#### Animation

| Name     | Type   | Required | Description                                                   |
| -------- | ------ | -------- | ------------------------------------------------------------- |
| duration | number | false    | Duration of the animation in milliseconds. Default is `1000`. |
