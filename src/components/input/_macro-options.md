| Name          | Type                                 | Required | Description                                                                         |
| ------------- | ------------------------------------ | -------- | ----------------------------------------------------------------------------------- |
| id            | string                               | true     | The id of the input. This will also be added to the label if a label is specified   |
| type          | string                               | false    | The type of the input, e.g. `number`, `email`, `tel`. Will default to `text`        |
| classes       | string                               | false    | Classes to add to the input.                                                        |
| name          | string                               | false    | The name of the input                                                               |
| value         | string &#124; number                 | false    | The value to set the input to                                                       |
| attributes    | object                               | false    | HTML attributes (for example data attributes) to add to the input                   |
| label         | `Label` [_(ref)_](/components/label) | false    | Settings for the input label. `for` will automatically be set to match the input id |
| prefix        | `InputPrefix`                        | false    | Settings to prefix the input with                                                   |
| suffix        | `InputSuffix`                        | false    | Settings to suffix the input with                                                   |
| fieldId       | string                               | false    | Id for the field                                                                    |
| fieldClasses  | string                               | false    | Classes for the field                                                               |
| legendClasses | string                               | false    | Classes for the legend                                                              |

## Prefix/Suffix

| Name  | Type   | Required | Description                                                                                      |
| ----- | ------ | -------- | ------------------------------------------------------------------------------------------------ |
| text  | string | true     | The text for the prefix/suffix                                                                   |
| title | string | true     | The title of the prefix/suffix. For example where `text` is "cm", `title` would be "centimeters" |
| id    | string | false    | Id for the prefix/suffix                                                                         |
