| Name               | Type          | Required | Description                                                                                           |
| ------------------ | ------------- | -------- | ----------------------------------------------------------------------------------------------------- |
| pages              | `Array<Page>` | true     | Settings for each [page](#page)                                                                       |
| ariaLabel          | string        | false    | Optional aria label text for Pagination element. Defaults to "Pagination"                             |
| currentPageNumber  | integer       | true     | Sets the current page number                                                                          |
| firstAriaLabel     | string        | false    | Optional aria label for the first page link. Defaults to "First page"                                 |
| previous           | string        | false    | Text label for the “Previous” link. Default is "Previous".                                            |
| previousAriaLabel  | string        | false    | Optional aria label text for 'Previous' button, comes before page number. Defaults to "Previous page" |
| next               | string        | false    | Text label for the “Next” link. Default is "Next".                                                    |
| nextAriaLabel      | string        | false    | Optional aria label text for 'Next' button, comes before page number. Defaults to "Next page"         |
| currentAriaLabel   | string        | false    | Optional aria label for the current page link. Defaults to "Current page"                             |
| lastAriaLabel      | string        | false    | Optional aria label for the last page link. Defaults to "Last page"                                   |
| goToAriaLabel      | string        | false    | Optional aria label for the 'go to page' link. Defaults to " page"                                    |
| classes            | string        | false    | Classes to add to the pagination HTML `nav` element                                                   |
| hideRangeIndicator | boolean       | false    | Set to “true” to hide the range indicator on viewports &geq; 740px                                    |

## Page

| Name | Type   | Required | Description                                             |
| ---- | ------ | -------- | ------------------------------------------------------- |
| url  | string | true     | The URL for the HTML `href` attribute for the page link |
