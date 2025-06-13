| Name         | Type                                 | Required              | Description                                                                                                                                                 |
| ------------ | ------------------------------------ | --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| title        | `Object<Title>`                      | true                  | An object containing the article's title text and link. See [Title](#title).                                                                                |
| metadata     | `Object<Metadata>`                   | false                 | An object containing metadata such as article type and release date. See [Metadata](#metadata).                                                             |
| chart        | `Chart` [_(ref)_](/components/chart) | true if image not set | Configuration object for the chart. If both chart and image are provided, the chart will be displayed and the image will be ignored.                        |
| image        | `Image` [_(ref)_](/components/image) | true if chart not set | Configuration object for the image. Displayed only if chart is not set.                                                                                     |
| headingLevel | number                               | false                 | Number used to determine the heading level of the title. Use to ensure the title has a correct semantic order on the page, defaulting to 2 if not provided. |
| description  | string                               | false                 | A short HTML extract of text (for example, a short sentence to give some context of the article)                                                            |

## Title

| Property | Type   | Required | Description                          |
| -------- | ------ | -------- | ------------------------------------ |
| text     | string | true     | The article title text.              |
| url      | string | true     | The URL linked to the article title. |

## Metadata

| Property | Type           | Required | Description                                                          |
| -------- | -------------- | -------- | -------------------------------------------------------------------- |
| text     | string         | false    | Label for the type of document, for example “User requested data”.   |
| date     | `Object<Date>` | false    | An object for the [date](#date) the article was published or updated |

## Date

| Property   | Type    | Required | Description                                                 |
| ---------- | ------- | -------- | ----------------------------------------------------------- |
| prefix     | string  | false    | A label prefix (e.g., "Released").                          |
| showPrefix | boolean | false    | Whether the prefix should be displayed.                     |
| iso        | string  | true     | The ISO-formatted date string (YYYY-MM-DD).                 |
| short      | string  | true     | A human-readable formatted date (e.g., "18 February 2021"). |
