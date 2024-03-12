| Name               | Type          | Required | Description                                                        |
| ------------------ | ------------- | -------- | ------------------------------------------------------------------ |
| pages              | `Array<Page>` | true     | Settings for each [page](#page)                                    |
| currentPageNumber  | integer       | true     | Sets the current page number                                       |
| previous           | string        | false    | Text label for the “Previous” link. Default is "Previous".         |
| next               | string        | false    | Text label for the “Next” link. Default is "Next".                 |
| classes            | string        | false    | Classes to add to the pagination HTML `nav` element                |
| hideRangeIndicator | boolean       | false    | Set to “true” to hide the range indicator on viewports &geq; 740px |

## Page

| Name | Type   | Required | Description                                             |
| ---- | ------ | -------- | ------------------------------------------------------- |
| url  | string | true     | The URL for the HTML `href` attribute for the page link |
