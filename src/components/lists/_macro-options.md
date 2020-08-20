| Name          | Type              | Required | Description                                                                                |
| ------------- | ----------------- | -------- | ------------------------------------------------------------------------------------------ |
| element       | string            | false    | The wrapping element for the list. If nothing is defined it will default to `<ul>`         |
| id            | string            | false    | The id for the wrapping element                                                            |
| classList     | string            | false    | Classes to be added to the wrapping element                                                |
| itemsList     | `Array<ListItem>` | true     | An array of items to show in the list                                                      |
| ariaHideIndex | boolean           | false    | If set to `false` will not have `aria-hidden="true"` added to any prefixes set in the list |

## ListItem
| Name | Type | Required | Description |
| ---------- | ------- | -------- | ------------------------------------------------------------ |
| text | string | true | The text for the list item |
| name | string | false | The name attribute for the list item |
| url | string | false | Will wrap the text in a link |
| target | string | false | If `url` is provided this will set the target for that link |
| index | boolean | false | Will prefix the list item with index number if set to `true` |
| prefix | string | false | Will prefix the list item with whatever prefix is set to |
| external | boolean | false | Will style the item like an external link |
| prefixText | string | false | Will prefix the list item with whatever prefixText is set to |
| prefixIcon | string | false | If set to an icon name will prefix the item with that icon |
