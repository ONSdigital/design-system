| Name                   | Type                           | Required | Description                                                                                                                                 |
| ---------------------- | ------------------------------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| ariaLabel              | string                         | false    | The ARIA label added to the HTML `nav` landmark. Required when multiple navigation landmarks are on a page. Defaults to “Guide pagination”. |
| contentPaginationItems | `Array<contentPaginationItem>` | true     | Settings for the [pagination items](#contentpaginationitem)                                                                                 |

## contentPaginationItem

| Name         | Type   | Required | Description                                                                                                                                                                                              |
| ------------ | ------ | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| url          | string | true     | The URL for the pagination link                                                                                                                                                                          |
| rel          | string | true     | Sets the HTML `rel` attribute on the link to set the correct arrow icon. Set to “next” or “prev”.                                                                                                        |
| text         | string | true     | Text for the pagination link                                                                                                                                                                             |
| bridgingText | string | false    | Sets the visually hidden text for screen readers to bridge the `text` and `label`. Defaults to “page in this guide is:”. For example, “Next **_page in this guide is:_** ‘Who should take part and why’. |
| label        | string | true     | Title of the next or previous page                                                                                                                                                                       |
