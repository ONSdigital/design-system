| Name     | Type                   | Required | Description                                                                                                          |
| -------- | ---------------------- | -------- | -------------------------------------------------------------------------------------------------------------------- |
| classes  | string                 | false    | Classes to add to the component                                                                                      |
| titleTag | string                 | false    | The HTML heading tag to wrap the title text in for it’s correct semantic order on the page. Will default to an `h2`. |
| items    | array`<TimelineItems>` | true     | An array of [timeline items](#timelineitems)                                                                         |

## TimelineItems

| Name      | Type                                                        | Required | Description                                                                |
| --------- | ----------------------------------------------------------- | -------- | -------------------------------------------------------------------------- |
| heading   | string                                                      | true     | The `h2` heading for the period of time in the timeline                    |
| itemsList | `Array<ListItem>` [_(ref)_](/foundations/typography/#lists) | false    | A list of items for the period of time in the timeline                     |
| content   | string                                                      | false    | The content for the period of time in the timeline. This can contain HTML. |
