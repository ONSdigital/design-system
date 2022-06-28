| Name      | Type               | Required | Description                               |
| --------- | ------------------ | -------- | ----------------------------------------- |
| summaries | Array`<Summaries>` | true     | An array of [summaries](#summaries)       |
| classes   | string             | false    | Classes to add to the summary component   |
| hub       | boolean            | false    | Set to “true” to use the summary as a hub |

## Summaries

| Name         | Type                  | Required | Description                                          |
| ------------ | --------------------- | -------- | ---------------------------------------------------- |
| groups       | Array`<SummaryGroup>` | true     | An array of [groups](#summarygroup) within a summary |
| summaryTitle | string                | false    | The `h2` title heading for a group of summaries      |

## SummaryGroup

| Name            | Type                 | Required                            | Description                                                                               |
| --------------- | -------------------- | ----------------------------------- | ----------------------------------------------------------------------------------------- |
| rows            | Array`<SummaryRow>`  | true (unless `placeholderText` set) | An array of [rows](#summaryrow) within a group                                            |
| placeholderText | string               | true (unless `rows` set)            | A message to be shown as a placeholder if there are no rows in the summary                |
| groupTitle      | string               | false                               | The title heading for a summary within a group                                            |
| headers         | Array                | true                                | An array of headers to describe the data in each column of the summary for screen readers |
| id              | string               | false                               | The HTML `id` of the group                                                                |
| summaryLink     | Array`<SummaryLink>` | false                               | Settings for the [summary link](#summarylink) used to a new row to the summary            |

## SummaryRow

| Name               | Type                    | Required | Description                                                           |
| ------------------ | ----------------------- | -------- | --------------------------------------------------------------------- |
| id                 | string                  | false    | The HTML `id` of the row                                              |
| rowItems           | Array`<SummaryRowItem>` | true     | An array of [items for the row](#summaryrowitem)                      |
| rowTitle           | string                  | false    | The title for the row                                                 |
| rowTitleAttributes | object                  | false    | HTML attributes (for example, data attributes) to add to the rowTitle |
| error              | boolean                 | false    | Set to “true” display an [error](/components/error) on a row          |
| errorMessage       | string                  | false    | The error message for the row                                         |
| total              | boolean                 | false    | Set to “true” to display row as a calculated total of previous rows   |

## SummaryRowItem

| Name       | Type                   | Required | Description                                                                                 |
| ---------- | ---------------------- | -------- | ------------------------------------------------------------------------------------------- |
| id         | string                 | false    | The HTML `id` of the row item                                                               |
| iconType   | string                 | false    | Adds an icon before the row title, by setting the [icon type](/foundations/icons#icon-type) |
| rowTitle   | string                 | false    | The title for the row item                                                                  |
| valueList  | Array`<SummaryValue>`  | false    | An array of [value(s)](#summaryvalue) for the row item                                      |
| actions    | Array`<SummaryAction>` | false    | Settings for the row [action links](#summaryaction)                                         |
| attributes | object                 | false    | HTML attributes (for example, data attributes) to add to the row item                       |

## SummaryValue

| Name  | Type   | Required | Description                                                    |
| ----- | ------ | -------- | -------------------------------------------------------------- |
| text  | string | true     | Text for the value                                             |
| other | string | false    | Text for a Nested value for displaying an “other” input answer |

## SummaryAction

| Name       | Type   | Required | Description                                                                                |
| ---------- | ------ | -------- | ------------------------------------------------------------------------------------------ |
| text       | string | true     | Text for the action link                                                                   |
| url        | string | true     | The URL for the HTML `href` attribute of the link used to change the value of the row item |
| ariaLabel  | string | false    | An `aria-label` to apply to the action link to add more context for screen readers         |
| attributes | object | false    | HTML attributes (for example, data attributes) to add to the action link                   |

## SummaryLink

| Name       | Type   | Required | Description                                                               |
| ---------- | ------ | -------- | ------------------------------------------------------------------------- |
| url        | string | true     | The URL for the HTML `href` attribute of the summary link                 |
| text       | string | true     | The text for the summary link                                             |
| attributes | object | false    | HTML attributes (for example, data attributes) to add to the summary link |
