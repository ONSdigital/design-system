| Name  | Type                        | Required | Description                          |
| ----- | --------------------------- | -------- | ------------------------------------ |
| title | string                      | true     | The descriptive title for a tab set. |
| tabs  | `Array<tab>`[_(ref)_](#tab) | true     | An array of tabs to render.          |

## Tab

| Name    | Type   | Required | Description             |
| ------- | ------ | -------- | ----------------------- |
| title   | string | true     | The title for the tab   |
| content | string | true     | The content for the tab |
