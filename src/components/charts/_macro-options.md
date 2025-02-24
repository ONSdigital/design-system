| Name        | Type     | Required | Description                                                                                |
| ----------- | -------- | -------- | ------------------------------------------------------------------------------------------ |
| chartType   | string   | true     | The type of chart to render (e.g., 'line', 'bar', etc.).                                   |
| theme       | string   | false    | The theme to apply to the chart. Defaults to 'default'.                                    |
| title       | string   | true     | The main title of the chart.                                                               |
| subtitle    | string   | false    | A subtitle that appears under the main title.                                              |
| uuid        | string   | true     | A unique identifier for the chart instance.                                                |
| figId       | string   | true     | The ID applied to the `<figure>` element that wraps the chart.                             |
| caption     | string   | false    | A caption providing additional context for the chart.                                      |
| description | string   | false    | A textual description of the chart for screen readers.                                     |
| config      | `config` | true     | The full [configuration](#config) object passed to Highcharts, defining axes, series, etc. |

#### Config

| Name   | Type   | Required | Description                                                                               |
| ------ | ------ | -------- | ----------------------------------------------------------------------------------------- |
| chart  | object | true     | Defines the [chart's](#chart) overall behavior and appearance.                            |
| legend | object | false    | Controls the appearance and behavior of the [legend](#legend).                            |
| yAxis  | object | true     | Defines the vertical axis [y-axis](#y_axis) properties, including labels and title.       |
| xAxis  | object | true     | Defines the horizontal axis [x-axis](#x_axis) properties, including categories and title. |
| series | array  | true     | The data [series](#series) to be plotted, including labels and values.                    |

---

#### Chart

| Name            | Type   | Required | Description                                                 |
| --------------- | ------ | -------- | ----------------------------------------------------------- |
| type            | string | true     | The type of chart (e.g., `'line'`, `'bar'`, `'column'`).    |
| backgroundColor | string | false    | Background color of the chart. Defaults to `'transparent'`. |
| height          | number | false    | The height of the chart in pixels.                          |
| width           | number | false    | The width of the chart in pixels.                           |

#### Legend

| Name     | Type    | Required | Description                                                            |
| -------- | ------- | -------- | ---------------------------------------------------------------------- |
| enabled  | boolean | false    | Whether the legend is displayed. Defaults to `true`.                   |
| position | string  | false    | The position of the legend (`'top'`, `'bottom'`, `'left'`, `'right'`). |

#### Y_Axis

| Name          | Type   | Required | Description                                             |
| ------------- | ------ | -------- | ------------------------------------------------------- |
| title         | object | true     | Defines the [title](#title) of the y-axis.              |
| gridLineWidth | number | false    | Width of the grid lines on the y-axis. Defaults to `1`. |

#### X_Axis

| Name       | Type   | Required | Description                                 |
| ---------- | ------ | -------- | ------------------------------------------- |
| title      | object | true     | Defines the [title](#title) of the x-axis.  |
| categories | array  | false    | Labels for each tick mark along the x-axis. |

##### Title

| Name | Type   | Required | Description                                       |
| ---- | ------ | -------- | ------------------------------------------------- |
| text | string | true     | The title text displayed on the y-axis or x-axis. |

#### series

| Name | Type   | Required | Description                                                                         |
| ---- | ------ | -------- | ----------------------------------------------------------------------------------- |
| name | string | true     | The name of the series                                                              |
| data | array  | true     | The data values for the series. Each value corresponds to a category on the x-axis. |
