| Name      | Type                     | Required | Description                                                                                                                         |
| --------- | ------------------------ | -------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| classes   | string                   | false    | Custom classes to add to the breadcrumbs `nav` element                                                                              |
| ariaLabel | string                   | false    | The `aria-label` added to the `nav` element. Defaults to “Breadcrumbs”.                                                             |
| id        | string                   | false    | The `id` added to the `nav` element                                                                                                 |
| itemsList | `Array<BreadcrumbsItem>` | true     | An array of [breadcrumb items](#breadcrumbsitem)                                                                                    |
| variant   | string                   | false    | Set variant to "hero-grey", "hero-dark", "hero-default", "hero-pale-blue" or "hero-navy-blue" for matching colour of the hero variants |

## BreadcrumbsItem

| Name        | Type   | Required | Description                                                                  |
| ----------- | ------ | -------- | ---------------------------------------------------------------------------- |
| itemClasses | string | false    | Custom classes to add to the breadcrumbs list item                           |
| linkClasses | string | false    | Custom classes to add to the breadcrumb link                                 |
| id          | string | false    | The ID added to the breadcrumb link                                          |
| url         | string | true     | The URL for the breadcrumb link                                              |
| text        | string | true     | The title of the page the breadcrumb is linking to                           |
| attributes  | object | false    | HTML attributes (for example, data attributes) to add to the breadcrumb link |
