| Name      | Type         | Required                       | Description                                                                                                              |
| --------- | ------------ | ------------------------------ | ------------------------------------------------------------------------------------------------------------------------ |
| title     | string       | true (false if `Row` provided) | The title for the related content                                                                                        |
| body      | string       | true (false if `Row` provided) | The contents of the related content. This can be a string of HTML                                                        |
| ariaLabel | string       | false                          | Descriptive landmark label to allow a screen reader user greater understanding of purpose. Defaults to `Related content` |
| classes   | string       | false                          | Custom classes to add to the related content                                                                             |
| rows      | `Array<Row>` | false                          | An array of Row objects                                                                                                  |

## Row

| Name      | Type                                                        | Required | Description                 |
| --------- | ----------------------------------------------------------- | -------- | --------------------------- |
| id        | string                                                      | true     | id of the itemsList         |
| title     | string                                                      | true     | The title of the row        |
| itemsList | `Array<ListItem>` [_(ref)_](/foundations/typography/#lists) | true     | A list of links for the row |
