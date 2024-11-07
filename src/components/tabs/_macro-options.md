| Name               | Type            | Required | Description                                                                                                                                |
| ------------------ | --------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| title              | string          | true     | The `h2` level heading for the tabs `section` element required to give context for screen readers. Visually hidden when tabs are visible.  |
| headingLevel       | int             | false    | Number used to determine the heading level of the title. Use to ensure the title has a correct semantic order on the page. Defaults to `2` |
| titleClasses       | string          | false    | Additional utility classes to be added to title                                                                                            |
| tabs               | array`<tab>`    | true     | An array of [tabs](#tab)                                                                                                                   |
| variants           | array`<string>` | false    | Adjust the component using available variants: “details”                                                                                   |
| noInitialActiveTab | boolean         | false    | Do not initially show an active tab when `true`.                                                                                           |

## Tab

| Name       | Type    | Required | Description                                                                                                                                    |
| ---------- | ------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| id         | string  | false    | Sets the HTML `id` of the tab                                                                                                                  |
| title      | string  | true     | The title for the tab                                                                                                                          |
| showTitle  | boolean | false    | Sets an optional `h2` which will be displayed only in toc view and visually hidden in tab view.                                                |
| hiddenSpan | string  | false    | Sets a visually hidden span after the title to distinguish the tab from others if multiple tabs with same title are displayed in the same page |
| content    | string  | true     | The contents of the tab. This can contain HTML.                                                                                                |
| attributes | object  | false    | HTML attributes (for example, data attributes) to add to the details header element                                                            |
