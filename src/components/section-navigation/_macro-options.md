| Name        | Type          | Required                        | Description                                                                                             |
| ----------- | ------------- | ------------------------------- | ------------------------------------------------------------------------------------------------------- |
| id          | string        | false                           | The HTML `id` of the `<nav>` element of the component                                                   |
| classes     | string        | false                           | Additional classes for the `<nav>` element                                                              |
| ariaLabel   | string        | false                           | The `aria-label` attribute for the `<nav>` element to describe its purpose. Defaults to ”Section menu”. |
| variants    | string        | false                           | To adjust the orientation of the component using available variant “vertical”                           |
| currentPath | string        | true (unless `tabQuery` set)    | Path to the current active page                                                                         |
| tabQuery    | string        | true (unless `currentPath` set) | Query parameter in the URL for the current active page                                                  |
| sections    | `Array<Item>` | false                           | An array of [sections](#sections) for the component                                                     |

## Sections

| Name      | Type          | Required | Description                                                                           |
| --------- | ------------- | -------- | ------------------------------------------------------------------------------------- |
| title     | string        | false    | The title/header to display in the section navigation element                         |
| itemsList | `Array<Item>` | true     | An array of [list items](#itemList) to display in the section navigation list element |

## ItemList

| Name    | Type             | Required | Description                                        |
| ------- | ---------------- | -------- | -------------------------------------------------- |
| classes | string           | false    | Additional classes for the list item element       |
| url     | string           | true     | The URL for the HTML `href` attribute for the link |
| title   | string           | true     | The text for the link                              |
| anchors | `Array<Anchors>` | false    | An array of [sub-section list anchors](#anchors)   |

## Anchors

| Name  | Type   | Required | Description                                             |
| ----- | ------ | -------- | ------------------------------------------------------- |
| url   | string | true     | The HTML `id` of the heading tag on the page to link to |
| title | string | true     | The text for the anchor link                            |
