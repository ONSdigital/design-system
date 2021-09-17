| Name      | Type              | Required | Description                                                                                                                                 |
| --------- | ----------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| element   | string            | false    | The wrapping element for the list. If nothing is defined it will default to `<ul>`                                                          |
| id        | string            | false    | The id for the wrapping element                                                                                                             |
| classList | string            | false    | Classes to be added to the wrapping element                                                                                                 |
| itemsList | `Array<ListItem>` | true     | An array of items to show in the list                                                                                                       |
| variants  | array or string   | false    | An array of values or single value (string) to adjust the 'list' display using available variants - bare, dashed, inline, social, languages |

## ListItem
| Name | Type | Required | Description |
| -------------- | ------- | -------- | ------------------------------------------------------------ |
| text | string | true | The text for the list item |
| title | string | false | The text for the list item - _only used for craft_ |
| url | string | false | Will wrap the text in a link |
| variants | string | false | Used for variations. Available `variants` values: `inPageLink` for use with error lists when a `url` is also provided |
| rel | string | false | allows setting of rel attribute for list item links |
| target | string | false | If `url` is provided this will set the target for that link |
| screenreaderMessage | string | false | Sets a message to be read out by screen readers when `target` is set to `_blank` and link opens in a new tab. Defaults to `this link will open in a new tab` if not set |
| index | boolean | false | Will prefix the list item with index number if set to `true` |
| external | boolean | false | Will style the item like an external link |
| prefix | string | true | Will prefix the list item with whatever prefix is set to |
| prefixIcon | string | true | If set to an icon name will prefix the item with that icon |
| prefixIconSize | string | true | Icon size can be set to `m`, `l`, `xl`, `xxl` |
| suffix | string | true | Will suffix the list item with whatever suffix is set to |
| suffixIcon | string | true | If set to an icon name will suffix the item with that icon |
| suffixIconSize | string | true | Icon size can be set to `m`, `l`, `xl`, `xxl` |
