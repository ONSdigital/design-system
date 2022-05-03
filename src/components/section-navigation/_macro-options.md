| Name        | Type          | Required | Description                                                                        |
| ----------- | ------------- | -------- | ---------------------------------------------------------------------------------- |
| currentPath | string        | true     | Path to the default active page                                                    |
| ariaLabel   | string        | false    | The aria-label added to the section navigation element. Defaults to `Section menu` |
| itemsList   | `Array<Item>` | true     | An array of list items to render in the section navigation element                 |
| variants    | string        | false    | Use the value `vertical` to display the navigation vertically                      |

## Item

| Name    | Type             | Required | Description                                                        |
| ------- | ---------------- | -------- | ------------------------------------------------------------------ |
| classes | string           | false    | Additional css classes for the section navigation element          |
| url     | string           | true     | The URL to the linked page                                         |
| title   | string           | true     | The text for the link                                              |
| anchors | `Array<Anchors>` | false    | An array of list items to render in the section navigation element |

## Anchors

| Name  | Type   | Required | Description                         |
| ----- | ------ | -------- | ----------------------------------- |
| url   | string | true     | The ID of the H-tag to be linked to |
| title | string | true     | The text for the link               |
