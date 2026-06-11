| Name         | Type                | Required | Description                                                                                                                                                                                |
| ------------ | ------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| headingLevel | number              | false    | Number used to determine the heading level of the title. The subtitle and download title are rendered one and two levels below this respectively. Accepts a value between 1 and 4, defaulting to 2 if not provided. All headings render at a fixed visual size regardless of the level chosen. |
| title        | string              | false    | The title displayed above the nested content.                                                                                                                                            |
| subtitle     | string              | false    | The subtitle displayed below the title.                                                                                                                                                  |
| audioDescription | string          | false    | A visually-hidden textual description of the nested content for screen readers, associated with the figure via `aria-describedby`.                                                       |
| caption      | string              | false    | A short visible caption describing the nested content, displayed in a `figcaption` below it.                                                                                             |
| source       | string              | false    | The source of the nested content, displayed in the same `figcaption` below it, typically used to credit where the content came from.                                                     |
| download     | `Object<Download>`  | false    | Object for [download](#download) options, displayed in a list below the nested content.                                                                                                  |
| footnotes    | `Object<Footnotes>` | false    | Footnotes to appear below the nested content in a 'details' element.                                                                                                                      |
| id           | string              | false    | An `id` applied to the wrapping element. Also used to generate the footnotes `id`.                                                                                                       |
| classes      | string              | false    | Classes to add to the wrapping element.                                                                                                                                                  |

The nested content (for example a [chart](/components/chart) or [image](/components/image)) is provided through the macro's `caller` block rather than as a parameter, so no HTML needs to be passed in. See the examples for usage.

## Download

| Name      | Type   | Required | Description                                                                                  |
| --------- | ------ | -------- | -------------------------------------------------------------------------------------------- |
| title     | string | false    | The title displayed above the download options.                                              |
| itemsList | array  | false    | An array of items available for download, each described by a [DownloadItem](#downloaditem). |

## DownloadItem

| Name | Type   | Required | Description                                        |
| ---- | ------ | -------- | -------------------------------------------------- |
| text | string | true     | The label or description of the downloadable item. |
| url  | string | true     | The URL to the downloadable resource.              |

## Footnotes

| Name    | Type   | Required | Description                               |
| ------- | ------ | -------- | ----------------------------------------- |
| title   | string | true     | The title text for the footnotes heading. |
| content | string | true     | HTML content for the footnotes.           |
