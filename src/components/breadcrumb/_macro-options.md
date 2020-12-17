| Name      | Type                  | Required | Description                                      |
| --------- | --------------------- | -------- | ------------------------------------------------ |
| ariaLabel | string                | true     | The label added to the `nav` element             |
| id        | string                | false    | The ID added to the `nav` element                |
| itemsList | Array<BreadcrumbItem> | true     | An array of items to show in the breadcrumb list |

## BreadcrumbItem
| Name | Type | Required | Description |
| ---------- | ------ | -------- | ------------------------------------------------------------------------------ |
| url | string | true | The url for the link |
| text | string | true | The name of the page |
| attributes | object | false | HTML attributes (for example data attributes) to add to the breadcrumb element |
