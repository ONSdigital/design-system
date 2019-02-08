| Name              | Type                                                          | Required | Description                                               |
| ----------------- | ------------------------------------------------------------- | -------- | --------------------------------------------------------- |
| legend            | string                                                        | false    | The legend to apply to the fieldset                       |
| name              | string                                                        | true     | The name to apply to the checkboxes                       |
| checkboxes        | `Array<Checkbox>`                                             | true     | An array of checkboxes to render                          |
| mutuallyExclusive | `MutuallyExclusive` [_(ref)_](/components/mutually-exclusive) | false    | Configuration object if this is a mutually exclusive list |

## Checkbox
| Name | Type | Required | Description |
|------|--------|----------|-------------|
| id | string | true | The id of the checkbox |
| name | string | true | The name of the checkbox |
| value | string | true | The value of the checkbox |
| classes | string | false | Classes to apply to the checkbox |
| inputClasses | string | false | Classes to apply to the checkbox input |
| checked | boolean | false | Whether the checkbox should be checked |
| label | `Label` [_(ref)_](/components/label) | true | Settings for the checkbox label |
| other | `Input` [_(ref)_](/components/input) | false | Object with settings for other input |
