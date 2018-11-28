| Name | Type   | Required | Description |
|------|--------|----------|-------------|
| ariaLabel | string | true | The label added to the `nav` element |
| items | Array<BreadcrumbItem> | true | An array of items to show in the breadcrumb list |

## BreadcrumbItem
| Name | Type   | Required | Description |
|------|--------|----------|-------------|
| href | string | true (unless current) | The url for the link |
| text | string | true | The name of the page |
| current | boolean | false | If true this will not render a link for the item and add `breadcrumb__item--current` to the item class name |
