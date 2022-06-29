| Name         | Type              | Required | Description                                                                                                                                            |
| ------------ | ----------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| element      | string            | false    | The wrapping element for the list. If nothing is defined it will default to `<ul>`                                                                     |
| id           | string            | false    | The HTML `id` for the wrapping element                                                                                                                 |
| classes      | string            | false    | Classes to be added to the wrapping element                                                                                                            |
| itemsList    | `Array<ListItem>` | true     | Settings for each [list item](#listitem)                                                                                                               |
| variants     | array or string   | false    | An array of values or single value (string) to adjust the component using available variants: “bare”, “dashed”, “inline”, “social”, and “languages”    |
| iconPosition | string            | false    | Sets position of icon to “before” or “after” each list item                                                                                            |
| iconType     | string            | false    | Adds an icon to all the list items when set to the name of one of the [available icons](/foundations/icons#a-to-z). Requires `iconPosition` to be set. |
| iconSize     | string            | false    | Icon size can be set to match the size of the list item text as detailed in the [typography type scale](/foundations/typography/#type-scale).          |
| attributes   | object            | false    | HTML attributes (for example, data attributes) to add to wrapping element                                                                              |

## ListItem

| Name                | Type    | Required | Description                                                                                                                                          |
| ------------------- | ------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| listClasses         | string  | false    | Classes to be added to the list item                                                                                                                 |
| text                | string  | true     | The text for the list item                                                                                                                           |
| title               | string  | false    | The text for the list item - _used for Craft CMS_                                                                                                    |
| navigationTitle     | string  | false    | The text for the list item - _used for Craft CMS_                                                                                                    |
| url                 | string  | false    | Wraps the list item text in a link with the set `href`                                                                                               |
| classes             | string  | false    | Classes to be added to the list item link                                                                                                            |
| variants            | string  | false    | Use the value “inPageLink” for list items set with `url` when using the [error summary panel](/patterns/correct-errors/#error-summary)               |
| target              | string  | false    | Sets the HTML `target` attribute for the list item when `url` is set                                                                                 |
| screenreaderMessage | string  | false    | Sets a message to be read out by screen readers when `target` is set to “\_blank” to open a new tab. Defaults to “this link will open in a new tab”. |
| external            | boolean | false    | Sets the list item as an [external link](#external-links)                                                                                            |
| prefix              | string  | false    | Will prefix the list item with the parameter’s value                                                                                                 |
| suffix              | string  | false    | Will suffix the list item with the parameter’s value                                                                                                 |
| current             | boolean | false    | Set to “true” to indicate the current page in a list of content navigational links                                                                   |
| iconType            | string  | false    | Adds an icon to the individual list item when set to the name of one of the [available icons](/foundations/icons#a-to-z)                             |
| attributes          | object  | false    | HTML attributes (for example, data attributes) to add to list item link                                                                              |
