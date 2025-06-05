| Name         | Type                                 | Required              | Description                                                                                                                                                 |
| ------------ | ------------------------------------ | --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| title        | `Object<Title>`                      | true                  | An object containing the article's title text and link. See [Title](#title).                                                                                |
| metadata     | `Object<Metadata>`                   | true                  | An object containing metadata such as article type and release date. See [Metadata](#metadata).                                                             |
| itemsList    | `array<ListItem>`                    | false                 | An optional list of related items. See [ListItem](#listItem).                                                                                               |
| chart        | `Chart` [_(ref)_](/components/chart) | true if image not set | Configuration object for the chart.                                                                                                                         |
| image        | `Image` [_(ref)_](/components/image) | true if chart not set | Configuration object for the image.                                                                                                                         |
| headingLevel | number                               | false                 | Number used to determine the heading level of the title. Use to ensure the title has a correct semantic order on the page, defaulting to 2 if not provided. |

## Title

| Property | Type   | Required | Description                          |
| -------- | ------ | -------- | ------------------------------------ |
| text     | string | true     | The article title text.              |
| url      | string | true     | The URL linked to the article title. |

## Metadata

| Property | Type             | Required | Description                                                                                                    |
| -------- | ---------------- | -------- | -------------------------------------------------------------------------------------------------------------- |
| object   | `Object<Object>` | false    | An object for a list item describing the [type of article](#object), for example, “Dataset” or “Press release” |
| date     | `Object<Date>`   | false    | An object for the [date](#date) the article was published or updated                                           |

## Date

| Property   | Type    | Required | Description                                                 |
| ---------- | ------- | -------- | ----------------------------------------------------------- |
| prefix     | string  | false    | A label prefix (e.g., "Released").                          |
| showPrefix | boolean | false    | Whether the prefix should be displayed.                     |
| iso        | string  | true     | The ISO-formatted date string (YYYY-MM-DD).                 |
| short      | string  | true     | A human-readable formatted date (e.g., "18 February 2021"). |

#### Object

| Name | Type   | Required | Description                                                                     |
| ---- | ------ | -------- | ------------------------------------------------------------------------------- |
| text | string | true     | Label for the type of document, for example “User requested data”.              |
| url  | string | false    | URL `href` for the type. Can be used to filter a list of documents by category. |

## ListItem

| Property | Type   | Required | Description                    |
| -------- | ------ | -------- | ------------------------------ |
| text     | string | true     | The label or text of the item. |
| url      | string | false    | The URL linked to the item.    |
