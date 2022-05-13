| Name      | Type                                                     | Required                      | Description                                                                                                                                                                                                |
| --------- | -------------------------------------------------------- | ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| title     | string                                                   | true                          | A title for the component, for example, “Contents”                                                                                                                                                         |
| ariaLabel | string                                                   | false                         | Descriptive landmark ARIA label to give a screen reader user greater understanding of its purpose. Defaults to “Table of contents”.                                                                        |
| skipLink  | `Skip to content` [_(ref)_](/components/skip-to-content) | false                         | Settings for the skip to content link that allows users to avoid reading out the Table of Contents (ToC) on each page. Required for any ToC repeated on multiple pages, such as a [guide](/patterns/guide) |
| lists     | array`<list>`                                            | true (unless `itemsList` set) | An array of [lists](#lists) for the component                                                                                                                                                              |
| itemsList | array`<itemsList>`                                       | true (unless `lists` set)     | An array of [list items](#itemslist) for the component                                                                                                                                                     |

## List

| Name              | Type               | Required | Description                                                                          |
| ----------------- | ------------------ | -------- | ------------------------------------------------------------------------------------ |
| listHeading       | string             | false    | A sub-heading for each list                                                          |
| listHeadingHidden | string             | false    | Visually hidden text following the sub-heading to provide context for screen readers |
| itemsList         | array`<itemsList>` | true     | An array of [list item links](#itemslist)                                            |

## itemsList

| Name | Type   | Required | Description                                        |
| ---- | ------ | -------- | -------------------------------------------------- |
| url  | string | true     | The URL or path for the page or heading to link to |
| text | string | true     | Text for the list item                             |
