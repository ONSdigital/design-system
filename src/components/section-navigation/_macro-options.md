| Name          | Type          | Required                        | Description                                                                                                |
| ------------- | ------------- | ------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| id            | string        | true                            | The HTML `id` of the `nav` element of the component                                                        |
| currentPath   | string        | true (unless `tabQuery` set)    | Path to the current active page                                                                            |
| tabQuery      | string        | true (unless `currentPath` set) | Query parameter in the URL for the current active page                                                     |
| ariaLabel     | string        | false                           | The `aria-label` attribute for the `nav` element to describe its purpose. Defaults to ”Section menu”.      |
| ariaListLabel | string        | false                           | The `aria-label` attribute for the `ul` element to describe its purpose. Defaults to ”Section menu links”. |
| itemsList     | `Array<Item>` | true                            | An array of [list items](#item) to display in the section navigation element                               |
| variants      | string        | false                           | To adjust the component using available variant “vertical”                                                 |

## Item

| Name    | Type             | Required | Description                                                                                          |
| ------- | ---------------- | -------- | ---------------------------------------------------------------------------------------------------- |
| classes | string           | false    | Additional classes for the list item element                                                         |
| url     | string           | true     | The URL for the HTML `href` attribute for the link                                                   |
| title   | string           | true     | The text for the link                                                                                |
| anchors | `Array<Anchors>` | false    | An array of [sub-section list anchors](#anchors) to display in the vertical variant of the component |

## Anchors

| Name  | Type   | Required | Description                                             |
| ----- | ------ | -------- | ------------------------------------------------------- |
| url   | string | true     | The HTML `id` of the heading tag on the page to link to |
| title | string | true     | The text for the anchor link                            |
