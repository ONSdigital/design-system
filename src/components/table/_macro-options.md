| Name         | Type               | Required | Description                                                                                                                                                 |
| ------------ | ------------------ | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| variants     | array or string    | false    | An array of values or single value (string) to adjust the table using available variants: `compact`, `responsive`,`scrollable`, `sortable`, and `row-hover` |
| tableClasses | string             | false    | Classes to add to the table component                                                                                                                       |
| id           | string             | false    | ID to add to the table component                                                                                                                            |
| caption      | string             | false    | The caption for the table component                                                                                                                         |
| hideCaption  | boolean            | false    | Visually hides the caption                                                                                                                                  |
| ariaLabel    | string             | false    | The ARIA label to be added if `scrollable` variant set, to inform screen reader users that the table can be scrolled. Defaults to `"Scrollable table"`      |
| ths          | Array`<th>`        | true     | An array of `th` elements for table                                                                                                                         |
| trs          | Array`<tr>`        | true     | An array of `tr` elements for table                                                                                                                         |
| tfoot        | Array`<tfootCell>` | false    | An array of `td` elements for `tdfoot`                                                                                                                      |
| ariaAsc      | string             | false    | Sets the `data-aria-asc` attribute for the table. Used to set aria labels when table is sorted                                                              |
| ariaDesc     | string             | false    | Sets the `data-aria-desc` attribute for the table. Used to set aria labels when table is sorted                                                             |

## th

| Name      | Type    | Required | Description                                             |
| --------- | ------- | -------- | ------------------------------------------------------- |
| thClasses | string  | false    | Classes to add to the `th` element                      |
| ariaSort  | string  | false    | Default is "none". Accepts "ascending" or "descending"  |
| value     | string  | true     | The content for the `th` cell                           |
| numeric   | boolean | false    | Aligns the cell content to the right when set to `true` |

## tr

| Name      | Type        | Required | Description                                        |
| --------- | ----------- | -------- | -------------------------------------------------- |
| tds       | Array`<td>` | true     | An array of `td` elements for each `tr`            |
| highlight | boolean     | false    | Adds a class to the table row to highlight the row |

## td

| Name      | Type    | Required | Description                                                         |
| --------- | ------- | -------- | ------------------------------------------------------------------- |
| tdClasses | string  | false    | Classes to add to the `td` element                                  |
| name      | string  | false    | Name to add to the `td` element                                     |
| data      | string  | false    | The corresponding `th` for the `td` for responsive tables           |
| dataSort  | integer | false    | numerical ordering of a column of `td` elements for sortable table  |
| value     | string  | false    | The content for the `td` cell                                       |
| numeric   | boolean | false    | Aligns the cell content to the right when set to `true`             |
| form      | object  | false    | Form attributes information for `method`, `action` and the `button` |

## form

| Name            | Type                                   | Required | Description                                 |
| --------------- | -------------------------------------- | -------- | ------------------------------------------- |
| method          | string                                 | false    | Default is `post` if no value is provided   |
| action          | string                                 | true     | The `action` for the form                   |
| button          | `Button` [_(ref)_](/components/button) | false    | Configuration object for the form button    |
| hiddenFormField | object                                 | false    | Configuration object for hidden form fields |

## hiddenFormField

| Name  | Type   | Required | Description        |
| ----- | ------ | -------- | ------------------ |
| name  | string | false    | Hidden field name  |
| value | string | false    | Hidden field value |

## tfootCell

| Name  | Type   | Required | Description                               |
| ----- | ------ | -------- | ----------------------------------------- |
| value | string | true     | The content for the `td` cell of `tdfoot` |
