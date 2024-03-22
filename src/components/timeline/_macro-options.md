| Name         | Type                   | Required | Description                                                                                                                                |
| ------------ | ---------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| classes      | string                 | false    | Classes to add to the component                                                                                                            |
| headingLevel | int                    | false    | Number used to determine the heading level of the title. Use to ensure the title has a correct semantic order on the page. Defaults to `2` |
| items        | array`<TimelineItems>` | true     | An array of [timeline items](#timelineitems)                                                                                               |

## TimelineItems

| Name      | Type                                                        | Required | Description                                                                                                                    |
| --------- | ----------------------------------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------ |
| heading   | string                                                      | true     | The `h2` heading for the period of time in the timeline                                                                        |
| itemsList | `Array<ListItem>` [_(ref)_](/foundations/typography/#lists) | false    | A list of items for the period of time in the timeline. This should only be set when `content` is not set                      |
| content   | string                                                      | false    | The content for the period of time in the timeline. This can contain HTML. This should only be set when `itemsList` is not set |
