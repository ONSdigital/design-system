| Name               | Type          | Required | Description                                                        |
| ------------------ | ------------- | -------- | ------------------------------------------------------------------ |
| pages              | `Array<Page>` | true     | Settings for each [page](#page)                                    |
| previous           | string        | true     | Text label for the “Previous” link                                 |
| next               | string        | true     | Text label for the “Next” link                                     |
| classes            | string        | false    | Classes to add to the pagination HTML `nav` element                |
| hideRangeIndicator | boolean       | false    | Set to “true” to hide the range indicator on viewports &geq; 740px |

## Page

| Name    | Type    | Required | Description                                             |
| ------- | ------- | -------- | ------------------------------------------------------- |
| url     | string  | true     | The URL for the HTML `href` attribute for the page link |
| current | boolean | false    | Set to “true” for the current loaded page link          |
