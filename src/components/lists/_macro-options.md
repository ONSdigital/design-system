| Name         | Type              | Required | Description                                                                                                                                 |
| ------------ | ----------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| element      | string            | false    | The wrapping element for the list. If nothing is defined it will default to `<ul>`                                                          |
| id           | string            | false    | The id for the wrapping element                                                                                                             |
| classes      | string            | false    | Classes to be added to the wrapping element                                                                                                 |
| itemsList    | `Array<ListItem>` | true     | An array of items to show in the list                                                                                                       |
| variants     | array or string   | false    | An array of values or single value (string) to adjust the 'list' display using available variants - bare, dashed, inline, social, languages |
| iconPosition | string            | true     | Sets position of icon to `before` or `after` all the list items                                                                             |
| iconSize     | string            | true     | Icon size can be set to `m`, `l`, `xl`, `xxl`                                                                                               |
| iconType     | string            | true     | Adds an icon to all the list items when set to the name of one of the [available icons](/foundations/icons#a-to-z)                          |

## ListItem
| Name | Type | Required | Description |
| ------------------- | ------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| text | string | true | The text for the list item |
| title | string | false | The text for the list item - _only used for craft_ |
| url | string | false | Will wrap the text in a link |
| listClasses | string | false | Classes to be added to the list item |
| variants | string | false | Used for variations. Available `variants` values: `inPageLink` for use with error lists when a `url` is also provided |
| rel | string | false | allows setting of rel attribute for list item links |
| target | string | false | If `url` is provided this will set the target for that link |
| screenreaderMessage | string | false | Sets a message to be read out by screen readers when `target` is set to `_blank` and link opens in a new tab. Defaults to `this link will open in a new tab` if not set |
| index | boolean | false | Will prefix the list item with index number if set to `true` |
| external | boolean | false | Will style the item like an external link |
| prefix | string | true | Will prefix the list item with whatever prefix is set to |
| suffix | string | true | Will suffix the list item with whatever suffix is set to |
| iconType | string | true | Adds an icon to the list item when set to the name of one of the [available icons](/foundations/icons#a-to-z) |
