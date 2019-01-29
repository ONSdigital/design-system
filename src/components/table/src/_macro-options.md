| Name        | Type               | Required | Description                                        |
| ----------- | ------------------ | -------- | -------------------------------------------------- |
| table_class | string             | false    | Classes to add to the table component              |
| caption     | string             | false    | The caption for the table component                |
| scrollable  | boolean            | false    | Sets the component to render as a scrollable table |
| sortable    | boolean            | false    | Sets the component to render as a sortable table   |
| ths         | Array`<th>`        | true     | An array of `th` elements for table                |
| trs         | Array`<tr>`        | true     | An array of `tr` elements for table                |
| tfoot       | Array`<tfootCell>` | false    | An array of `td` elements for `tdfoot`             |

## th

| Name      | Type   | Required | Description                                            |
| --------- | ------ | -------- | ------------------------------------------------------ |
| class     | string | false    | Classes to add to the `th` element                     |
| aria_sort | string | false    | Default is "none". Accepts "ascending" or "descending" |
| value     | string | true     | The content for the `th` cell                          |

## tr

| Name | Type        | Required | Description                             |
| ---- | ----------- | -------- | --------------------------------------- |
| tds  | Array`<td>` | true     | An array of `td` elements for each `tr` |

## td

| Name      | Type    | Required | Description                                                        |
| --------- | ------- | -------- | ------------------------------------------------------------------ |
| class     | string  | false    | Classes to add to the `td` element                                 |
| data      | string  | false    | The corresponding `th` for the `td` for responsive tables          |
| data_sort | integer | false    | numerical ordering of a column of `td` elements for sortable table |
| value     | string  | true     | The content for the `td` cell                                      |

## tfootCell

| Name  | Type   | Required | Description                               |
| ----- | ------ | -------- | ----------------------------------------- |
| value | string | true     | The content for the `td` cell of `tdfoot` |
