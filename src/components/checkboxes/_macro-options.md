| Name              | Type                                                          | Required | Description                                                                                                 |
| ----------------- | ------------------------------------------------------------- | -------- | ----------------------------------------------------------------------------------------------------------- |
| id                | string                                                        | false    | Id to apply to the fieldset                                                                                 |
| classes           | string                                                        | false    | Classes to apply to the fieldset                                                                            |
| legend            | string                                                        | false    | The legend to apply to the fieldset                                                                         |
| legendClasses     | string                                                        | false    | Classes to apply to the legend                                                                              |
| name              | string                                                        | true     | The name to apply to the checkboxes                                                                         |
| checkboxes        | `Array<Checkbox>`                                             | true     | An array of checkboxes to render                                                                            |
| mutuallyExclusive | `MutuallyExclusive` [_(ref)_](/components/mutually-exclusive) | false    | Configuration object if this is a mutually exclusive checkbox list                                          |
| dontWrap          | boolean                                                       | false    | Prevents the checkboxes from being wrapped in a [fieldset component](/components/fieldset)                  |
| legendIsPageTitle | boolean                                                       | false    | Creates a `h1` inside the legend ([further information](/components/fieldset#legend-as-pagequestion-title)) |
| open              | boolean                                                       | false    | Whether the 'other' input should be displayed                                                               |

## Checkbox

| Name         | Type                                                                           | Required                       | Description                                                                        |
| ------------ | ------------------------------------------------------------------------------ | ------------------------------ | ---------------------------------------------------------------------------------- |
| id           | string                                                                         | true                           | The id of the checkbox                                                             |
| name         | string                                                                         | true                           | The name of the checkbox                                                           |
| value        | string                                                                         | true                           | The value of the checkbox                                                          |
| classes      | string                                                                         | false                          | Classes to apply to the checkbox                                                   |
| inputClasses | string                                                                         | false                          | Classes to apply to the checkbox input                                             |
| checked      | boolean                                                                        | false                          | Whether the checkbox should be checked                                             |
| label        | `Label` [_(ref)_](/components/label)                                           | true                           | Settings for the checkbox label                                                    |
| other        | `Input` [_(ref)_](/components/input) or `Select` [_(ref)_](/components/select) | false                          | Object with settings for other input or select                                     |
| otherType    | string                                                                         | false (true if other provided) | Can be set to `select` or `input` to set what other input you want in a radio      |
| attributes   | object                                                                         | false                          | HTML attributes (for example data attributes) to add to the checkbox input element |
| error        | `Error` [_(ref)_](/components/error)                                           | false                          | Configuration for validation errors                                                |
