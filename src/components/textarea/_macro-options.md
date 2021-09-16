| Name              | Type                                                          | Required                      | Description                                                                            |
| ----------------- | ------------------------------------------------------------- | ----------------------------- | -------------------------------------------------------------------------------------- |
| id                | string                                                        | true                          | The id of the textarea. This will also be added to the label if a label is specified   |
| classes           | string                                                        | false                         | Classes to add to the textarea                                                         |
| name              | string                                                        | false                         | The name of the textarea                                                               |
| value             | string                                                        | false                         | The value of the textarea                                                              |
| attributes        | object                                                        | false                         | HTML attributes (for example, data attributes) to add to the textarea                  |
| label             | `Label` [_(ref)_](/components/label)                          | false                         | Settings for the input label. `for` will automatically be set to match the textarea id |
| rows              | number                                                        | false                         | The size of the text area in number of rows, defaults to 8                             |
| mutuallyExclusive | `MutuallyExclusive` [_(ref)_](/components/mutually-exclusive) | false                         | Configuration object if this is a mutually exclusive list                              |
| CharCheckLimit    | `CharCheckLimit`                                              | false                         | Configuration object if this input has a character count                               |
| fieldId           | string                                                        | false                         | Id for the field                                                                       |
| fieldClasses      | string                                                        | false                         | Classes for the field                                                                  |
| legend            | string                                                        | Only if mutuallyExclusive set | Text for the legend                                                                    |
| legendClasses     | string                                                        | false                         | Classes for the legend                                                                 |
| dontWrap          | boolean                                                       | false                         | Prevents the textarea from being wrapped in a [field component](/components/field)     |
| error             | `Error` [_(ref)_](/components/error)                          | false                         | Configuration for validation errors                                                    |

## CharCheckLimit

| Name              | Type   | Required | Description                                                                                                                                                |
| ----------------- | ------ | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| limit             | number | false    | The maximum amount of characters a user should type in                                                                                                     |
| charCountPlural   | string | false    | Required if `CharCheckLimit` is supplied. The string that will render how many characters are remaining. `{x}` Will be replaced with the number            |
| charCountSingular | string | false    | Required if `CharCheckLimit` is supplied. The string that will render how many characters are remaining (singular). `{x}` Will be replaced with the number |
