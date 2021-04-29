| Name      | Type                  | Required | Description                                      |
| --------- | --------------------- | -------- | ------------------------------------------------ |
| classes   | string                | false    | Custom classes to add to the breadcrumb          |
| ariaLabel | string                | true     | The label added to the `nav` element             |
| id        | string                | false    | The ID added to the `nav` element                |
| itemsList | Array<BreadcrumbItem> | true     | An array of items to show in the breadcrumb list |

## BreadcrumbItem
| Name | Type | Required | Description |
| ----------- | ------ | --------- | ------------------------------------------------------------------------------ |
| itemClasses | string | false | Custom classes to add to the breadcrumb list item |
| linkClasses | string | false | Custom classes to add to the breadcrumb link |
| url | string | true | The url for the link |
| text | string | true | The name of the page |
| attributes | object | false | HTML attributes (for example data attributes) to add to the breadcrumb element |
| id | string | false | The ID added to the breadcrumb |
