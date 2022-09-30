| Name               | Type            | Required | Description                                                                                                                               |
| ------------------ | --------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| title              | string          | true     | The `h2` level heading for the tabs `section` element required to give context for screen readers. Visually hidden when tabs are visible. |
| titleTag           | string          | false    | The HTML heading tag to wrap the title text in for it’s correct semantic order on the page. Will default to an `h2`                       |
| tabs               | array`<tab>`    | true     | An array of [tabs](#tab)                                                                                                                  |
| variants           | array`<string>` | false    | Adjust the component using available variants: “details”                                                                                  |
| noInitialActiveTab | boolean         | false    | Do not initially show an active tab when `true`.                                                                                          |

## Tab

| Name    | Type   | Required | Description                                     |
| ------- | ------ | -------- | ----------------------------------------------- |
| id      | string | false    | Sets the HTML `id` of the tab                   |
| title   | string | true     | The title for the tab                           |
| content | string | true     | The contents of the tab. This can contain HTML. |
