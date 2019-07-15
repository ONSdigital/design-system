| Name              | Type                                                          | Required                         | Description                                                                     |
| ----------------- | ------------------------------------------------------------- | -------------------------------- | ------------------------------------------------------------------------------- |
| label             | string                                                        | false                            | The label text for the duration component                                       |
| years             | DurationField                                                 | false                            | Config for the years field                                                      |
| months            | DurationField                                                 | false                            | Config for the months field                                                     |
| dontWrap          | boolean                                                       | false                            | Prevents the input from being wrapped in a [field component](/components/field) |
| mutuallyExclusive | `MutuallyExclusive` [_(ref)_](/components/mutually-exclusive) | false                            | Configuration object if this is a mutually exclusive input                      |
| legend            | string                                                        | Only if mutuallyExclusive is set | Text content for the legend                                                     |
| legendClasses     | string                                                        | false                            | Classes for the legend                                                          |
| error             | `Error` [_(ref)_](/components/error)                          | false                            | Configuration for validation errors                                             |

## DurationField

| Name  | Type          | Required | Description                  |
| ----- | ------------- | -------- | ---------------------------- |
| id    | string        | true     | ID for the input             |
| name  | string        | true     | Name attribute for the input |
| value | string        | false    | Value for the input          |
| label | DurationLabel | true     | Config for the input label   |

## DurationLabel

| Name  | Type   | Required | Description                                      |
| ----- | ------ | -------- | ------------------------------------------------ |
| title | string | true     | Text for the title attribute of the input suffix |
| text  | string | true     | Text for input suffix                            |
