| Name  | Type         | Required | Description                                                           |
| ----- | ------------ | -------- | --------------------------------------------------------------------- |
| title | string       | true     | The visually hidden `h2` level heading for the tabs `section` element |
| tabs  | array`<tab>` | true     | An array of [tabs](#tab)                                              |

## Tab

| Name    | Type   | Required | Description                                     |
| ------- | ------ | -------- | ----------------------------------------------- |
| title   | string | true     | The title for the tab                           |
| content | string | true     | The contents of the tab. This can contain HTML. |
