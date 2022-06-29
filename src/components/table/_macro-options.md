| Name         | Type            | Required                              | Description                                                                                                                                                                                              |
| ------------ | --------------- | ------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| variants     | array or string | false                                 | An array of values or single value (string) to adjust the component using available variants: “compact”, “responsive”,“scrollable”, “sortable”, and “row-hover”                                          |
| tableClasses | string          | false                                 | Classes to add to the `<table>` element of the component                                                                                                                                                 |
| id           | string          | false                                 | The HTML `id` of the table component                                                                                                                                                                     |
| caption      | string          | false                                 | The caption for the table component                                                                                                                                                                      |
| hideCaption  | boolean         | false                                 | Set to “true” to visually hide the caption                                                                                                                                                               |
| ariaLabel    | string          | false                                 | The ARIA label to be added if ”scrollable” variant set, to inform screen reader users that the table can be scrolled. Defaults to “Scrollable table“.                                                    |
| ths          | Array`<th>`     | true                                  | An array of `th` [header cell elements](#th) for table                                                                                                                                                   |
| trs          | Array`<tr>`     | true                                  | An array of `tr` [row elements](#tr) for table                                                                                                                                                           |
| sortBy       | string          | false (unless “sortable” variant set) | Sets the `data-aria-sort` attribute for the table. Used as a prefix for the `aria-label` to announce to screen readers when the table is sorted by a column. For example, “**Sort by** Date, ascending”. |
| ariaAsc      | string          | false (unless “sortable” variant set) | Sets the `data-aria-asc` attribute for the table. Used to update `aria-sort` attribute to announce to screen readers how a table is sorted by a column, for example, "Sort by Date, **ascending**".      |
| ariaDesc     | string          | false (unless “sortable” variant set) | Sets the `data-aria-desc` attribute for the table. Used to update `aria-sort` attribute to announce to screen readers how a table is sorted by a column, for example, "Sort by Date, **descending**".    |
| tfoot        | Array`<tfoot>`  | false                                 | An array of `td` elements for a `tfoot` [footer element](#tfoot)                                                                                                                                         |

## th

| Name      | Type    | Required | Description                                                                                                                                                  |
| --------- | ------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| thClasses | string  | false    | Classes to add to the `th` element                                                                                                                           |
| ariaSort  | string  | false    | Set to “ascending” or “descending” to set the default order of a table column when the page loads when setting `variants` to “sortable”. Defaults to “none”. |
| value     | string  | true     | The content for the `th` cell                                                                                                                                |
| numeric   | boolean | false    | Set to “true” if all the cells in the column contain numbers. This aligns the content to the right so numbers can easily be compared.                        |

## tr

| Name      | Type        | Required | Description                                         |
| --------- | ----------- | -------- | --------------------------------------------------- |
| tds       | Array`<td>` | true     | An array of `td` [cell elements](#td) for each `tr` |
| id        | string      | false    | The HTML `id` of the `tr` element                   |
| name      | string      | false    | The HTML `name` attribute for the `tr` element      |
| highlight | boolean     | false    | Set to “true” to highlight the row                  |

## td

| Name      | Type           | Required                                   | Description                                                                                                                           |
| --------- | -------------- | ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------- |
| tdClasses | string         | false                                      | Classes to add to the `td` element                                                                                                    |
| id        | string         | false                                      | The HTML `id` of the `td` element                                                                                                     |
| name      | string         | false                                      | The HTML `name` attribute for the `td` element                                                                                        |
| data      | string         | false (unless “responsive” variant is set) | Set to the corresponding `th` header cell when using the “responsive” variant                                                         |
| dataSort  | integer        | false                                      | Set the numerical order of a table cell in a column when using the “sortable” variant                                                 |
| value     | string         | false                                      | The content for the `td` cell                                                                                                         |
| numeric   | boolean        | false                                      | Set to “true” if all the cells in the column contain numbers. This aligns the content to the right so numbers can easily be compared. |
| form      | object`<form>` | false                                      | Settings for a [form](#form) within the `td` cell                                                                                     |

## form

| Name            | Type             | Required | Description                                                   |
| --------------- | ---------------- | -------- | ------------------------------------------------------------- |
| method          | string           | false    | The HTML `method` attribute for the form. Defaults to `post`. |
| action          | string           | true     | The HTML `action` attribute for the form                      |
| button          | object`<button>` | false    | Settings for the form’s [button](#button)                     |
| hiddenFormField | object           | false    | Settings for a [hidden form field](#hiddenformfield)          |

## hiddenFormField

| Name  | Type   | Required | Description                                             |
| ----- | ------ | -------- | ------------------------------------------------------- |
| name  | string | false    | The HTML `name` attribute for the hidden field `input`  |
| value | string | false    | The HTML `value` attribute for the hidden field `input` |

## button

| Name    | Type   | Required | Description                                                                      |
| ------- | ------ | -------- | -------------------------------------------------------------------------------- |
| text    | string | true     | Text label for the button                                                        |
| id      | string | false    | Sets the HTML `id` attribute for the button                                      |
| name    | string | false    | Sets the HTML `name` attribute for the `<button>`. Not valid if `url` is set.    |
| value   | string | false    | Sets the HTML `value` attribute for the `<button>`. Not valid if `url` is set.   |
| url     | string | false    | If set, will create an HTML anchor link with the required classes and attributes |
| classes | string | false    | Classes to add to the button component                                           |

## tfoot

| Name  | Type   | Required | Description                                  |
| ----- | ------ | -------- | -------------------------------------------- |
| value | string | true     | The content for the `td` cell in the `tfoot` |
