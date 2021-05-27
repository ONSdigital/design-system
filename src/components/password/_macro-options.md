| Name             | Type                                 | Required | Description                                                                         |
| ---------------- | ------------------------------------ | -------- | ----------------------------------------------------------------------------------- |
| id               | string                               | true     | The id of the input. This will also be added to the label if a label is specified   |
| label            | `Label` [_(ref)_](/components/label) | false    | Settings for the input label. `for` will automatically be set to match the input id |
| showPasswordText | string                               | true     | Text for the show password toggle                                                   |
| fieldId          | string                               | false    | Id for the field                                                                    |
| fieldClasses     | string                               | false    | Classes for the field                                                               |
| error            | `Error` [_(ref)_](/components/error) | false    | Configuration for validation errors                                                 |
