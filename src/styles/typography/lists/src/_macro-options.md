| Name      | Type              | Required | Description                                                                        |
| --------- | ----------------- | -------- | ---------------------------------------------------------------------------------- |
| element   | string            | false    | The wrapping element for the list. If nothing is defined it will default to `<ul>` |
| id        | string            | false    | The id for the wrapping element                                                    |
| classList | string            | false    | Classes to be added to the wrapping element                                        |
| items     | `Array<ListItem>` | true     | An array of items to show in the list                                              |

## ListItem
| Name | Type | Required | Description |
| ------ | ------- | -------- | ----------------------------------------------------------- |
| text | string | true | The text for the list item |
| url | string | false | Will wrap the text in a link |
| target | string | false | If `url` is provided this will set the target for that link |
| index | boolean | false | Will prefix link with index number if set to `true` |
