| Name         | Type                                 | Required              | Description                                                                                                                                                 |
| ------------ | ------------------------------------ | --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| title        | `Object<Title>`                      | true                  | An object containing the article's title text and link. See [Title](#title).                                                                                |
| metadata     | `Object<Metadata>`                   | false                 | An object containing metadata such as article type and release date. See [Metadata](#metadata).                                                             |
| headingLevel | number                               | false                 | Number used to determine the heading level of the title. Use to ensure the title has a correct semantic order on the page, defaulting to 2 if not provided. |
| description  | string                               | false                 | A short HTML extract of text (for example, a short sentence to give some context of the article)                                                            |

The article's media is provided through the macro's `caller` block rather than as a parameter. Use `{% call onsFeaturedArticle({...}) %}` and nest a [figure](/components/figure) (containing a [chart](/components/chart) or [image](/components/image)) inside it. See the examples for usage.

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
