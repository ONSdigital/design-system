| Name      | Type         | Required                       | Description                                                                                                                       |
| --------- | ------------ | ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------- |
| title     | string       | true (false if `Row` provided) | The text for the `h2` heading for related content                                                                                 |
| body      | string       | true (false if `Row` provided) | The contents of the related content. This can contain HTML                                                                        |
| ariaLabel | string       | false                          | Descriptive landmark ARIA label to give a screen reader user greater understanding of its purpose. Defaults to ”Related content”. |
| classes   | string       | false                          | Custom classes to add to the related content `aside` element                                                                      |
| rows      | `Array<Row>` | false                          | Settings for an array of [row objects](#row)                                                                                      |

## Row

| Name         | Type                                                        | Required | Description                                                                                                                                            |
| ------------ | ----------------------------------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| title        | string                                                      | true     | The text for the `h2` heading for the row                                                                                                              |
| id           | string                                                      | true     | The HTML `id` of the row heading. Connects heading to the HTML `nav` element using the same value for an ARIA label attribute.                         |
| itemsList    | `Array<ListItem>` [_(ref)_](/foundations/typography/#lists) | true     | A list of links for the row                                                                                                                            |
| iconType     | string                                                      | false    | Adds an icon to all the list items when set to the name of one of the [available icons](/foundations/icons#a-to-z). Requires `iconPosition` to be set. |
| iconPosition | string                                                      | false    | Sets the position of the icon to “before” or “after” each list item in the row                                                                         |
| iconSize     | string                                                      | false    | Icon size can be set to match the size of the list item text as detailed in the [typography type scale](/foundations/typography/#type-scale).          |
