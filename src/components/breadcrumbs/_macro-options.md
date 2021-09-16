| Name      | Type                   | Required | Description                                                     |
| --------- | ---------------------- | -------- | --------------------------------------------------------------- |
| classes   | string                 | false    | Custom classes to add to the breadcrumbs                        |
| ariaLabel | string                 | false    | The label added to the `nav` element. Defaults to `Breadcrumbs` |
| id        | string                 | false    | The ID added to the `nav` element                               |
| itemsList | Array<BreadcrumbsItem> | true     | An array of items to show in the breadcrumbs list               |

## BreadcrumbsItem
| Name | Type | Required | Description |
| ----------- | ------ | -------- | ------------------------------------------------------------------------------ |
| itemClasses | string | false | Custom classes to add to the breadcrumbs list item |
| linkClasses | string | false | Custom classes to add to the breadcrumb link |
| url | string | true | The url for the link |
| text | string | true | The name of the page |
| attributes | object | false | HTML attributes (for example, data attributes) to add to the breadcrumb element |
| id | string | false | The ID added to the breadcrumb |
