| Name | Type   | Required | Description |
|------|--------|----------|-------------|
| element | string | false | The wrapping element for the list. If nothing is defined it will default to `<ul>` |
| classList | string | false | Classes to be added to the wrapping element |
| items | Array< ListItem> | true | An array of items to show in the list |

## ListItem
| Name | Type   | Required | Description |
|------|--------|----------|-------------|
| text | string | true | The text for the list item |
| href | string | false | Will wrap the text in a link |
| target | string | false | If `href` is provided this will set the target for that link |
