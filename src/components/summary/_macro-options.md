## SummaryGroup

| Name       | Type    | Required | Description                               |
| ---------- | ------- | -------- | ----------------------------------------- |
| groupTitle | string  | false    | The group title for the summary block     |
| classes    | string  | false    | Classes to add to the summary component   |
| hub        | boolean | false    | Whether to render the summary in as a hub |

## Summary

| Name  | Type              | Required | Description                     |
| ----- | ----------------- | -------- | ------------------------------- |
| rows  | Array<SummaryRow> | true     | An array of rows to summarise   |
| title | string            | false    | The title for the summary block |

## SummaryRow

| Name         | Type                  | Required | Description                             |
| ------------ | --------------------- | -------- | --------------------------------------- |
| rowItems     | Array<SummaryRowItem> | true     | An array of items for this row          |
| title        | string                | false    | The title for the row                   |
| error        | boolean               | false    | Whether to render this item as an error |
| errorMessage | string                | false    | Error message for the row               |
| total        | boolean               | false    | Whether to render this item as a total  |

## SummaryRowItem

| Name      | Type                 | Required | Description                                                            |
| --------- | -------------------- | -------- | ---------------------------------------------------------------------- |
| icon      | string               | false    | Name of the icon to be placed next to the title                        |
| title     | string               | false    | Label for the row item                                                 |
| valueList | Array<SummaryValue>  | false    | The value(s) to the row item                                           |
| actions   | Array<SummaryAction> | false    | Configurations for action links. If not specified no links will render |

## SummaryValue

| Name  | Type   | Required | Description                                                    |
| ----- | ------ | -------- | -------------------------------------------------------------- |
| text  | string | true     | The display value                                              |
| other | string | false    | The display value for the "other" input on a checkbox or radio |

## SummaryAction

| Name       | Type   | Required | Description                                                                             |
| ---------- | ------ | -------- | --------------------------------------------------------------------------------------- |
| text       | string | true     | Text for the action link                                                                |
| url        | string | true     | URL to edit the answer                                                                  |
| ariaLabel  | string | false    | An aria-label to apply to the link if you need it to be more verbose for screen readers |
| attributes | object | false    | HTML attributes (for example data attributes) to add to the action link                 |
