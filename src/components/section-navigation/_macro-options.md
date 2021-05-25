| Name          | Type          | Required | Description                                                                           |
| ------------- | ------------- | -------- | ------------------------------------------------------------------------------------- |
| currentPath   | string        | true     | Path to the default active page                                                       |
| ariaLabel     | string        | false    | The aria-label added to the section navigation element. Defaults to `Section menu`    |
| ariaListLabel | string        | false    | The aria-label added to the section navigation list. Defaults to `Section menu Links` |
| itemsList     | `Array<Item>` | true     | An array of list items to render in the section navigation element                    |

## Item

| Name    | Type   | Required | Description                                               |
| ------- | ------ | -------- | --------------------------------------------------------- |
| classes | string | false    | Additional css classes for the section navigation element |
| path    | string | true     | The path to the linked page                               |
| title   | string | true     | The text for the link                                     |
