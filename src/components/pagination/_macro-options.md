| Name               | Type        | Required | Description                                               |
| ------------------ | ----------- | -------- | --------------------------------------------------------- |
| pages              | Array<Page> | true     | An array of all pages                                     |
| previous           | string      | true     | Text for the previous button                              |
| next               | string      | true     | Text for the next button                                  |
| classes            | string      | false    | Classes to add to the pagination                          |
| hideRangeIndicator | boolean     | false    | When set to true will hide the range indicator on desktop |

## Page

| Name    | Type    | Required | Description                             |
| ------- | ------- | -------- | --------------------------------------- |
| url     | string  | true     | URL for the page                        |
| current | boolean | false    | If this is the current page set to true |
