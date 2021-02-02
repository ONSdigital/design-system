| Name      | Type                                               | Required | Description                                                                                       |
| --------- | -------------------------------------------------- | -------- | ------------------------------------------------------------------------------------------------- |
| Title     | string                                             | true     | A title for the TOC e.g. "Contents"                                                               |
| ariaLabel | string                                             | true     | Accessible label to provide context to contents e.g. "Links to page sections"                     |
| skipLink  | `Skip link` [_(ref)_](/components/skip-to-content) | true     | Settings for the skip to content link that allows users to avoid reading out the TOC on each page |
| lists     | `Array<list>`                                      | true     | An array of list items to render.                                                                 |

## Lists

| Name              | Type               | Required | Description                                              |
| ----------------- | ------------------ | -------- | -------------------------------------------------------- |
| listHeading       | string             | false    | A heading that can be added between TOC link list items  |
| listHeadingHidden | string             | false    | Accessible hidden text to provide context to the heading |
| itemsList         | `Array<itemsList>` | true     | An array of list item links                              |

## itemsList

| Name | Type   | Required | Description                                                  |
| ---- | ------ | -------- | ------------------------------------------------------------ |
| url  | string | true     | URL that contains the `id` of the content heading to link to |
| text | string | true     | Text to display for the list item                            |
