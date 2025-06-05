| Name      | Type                                 | Required              | Description                                                                                     |
| --------- | ------------------------------------ | --------------------- | ----------------------------------------------------------------------------------------------- |
| title     | `Object<Title>`                      | true                  | An object containing the article's title text and link. See [Title](#title).                    |
| metadata  | `Object<Metadata>`                   | true                  | An object containing metadata such as article type and release date. See [Metadata](#metadata). |
| itemsList | array                                | false                 | An optional list of related downloadable items. See [Item](#item).                              |
| chart     | `Chart` [_(ref)_](/components/chart) | true if image not set | Configuration object for the chart.                                                             |
| image     | `Image` [_(ref)_](/components/image) | true if chart not set | Configuration object for the image.                                                             |

## Title

| Property | Type   | Required | Description                          |
| -------- | ------ | -------- | ------------------------------------ |
| text     | string | true     | The article title text.              |
| url      | string | true     | The URL linked to the article title. |

## Metadata

| Property | Type           | Required | Description                                    |
| -------- | -------------- | -------- | ---------------------------------------------- |
| object   | object         | false    | Contains a `text` label for the article type.  |
| date     | `Object<Date>` | false    | Contains release date info. See [Date](#date). |

## Date

| Property   | Type    | Required | Description                                                 |
| ---------- | ------- | -------- | ----------------------------------------------------------- |
| prefix     | string  | false    | A label prefix (e.g., "Released").                          |
| showPrefix | boolean | false    | Whether the prefix should be displayed.                     |
| iso        | string  | true     | The ISO-formatted date string (YYYY-MM-DD).                 |
| short      | string  | true     | A human-readable formatted date (e.g., "18 February 2021"). |

## Item

| Property | Type   | Required | Description                    |
| -------- | ------ | -------- | ------------------------------ |
| text     | string | true     | The label or text of the item. |
| url      | string | false    | The URL linked to the item.    |
