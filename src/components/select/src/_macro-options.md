| Name | Type   | Required | Description |
|------|--------|----------|-------------|
| id   | string | true     | The id of the select. This will also be added to the label if a label is specified |
| classes | string | false | Classes to add to the select. |
| name | string | false    | The name of the select |
| value | string &#124; number | false | The value of the select. Helpful for setting the preselected value |
| attributes | object | false | HTML attributes (for example data attributes) to add to the input |
| label | `Label` [_(ref)_](/components/label) | false | Settings for the input label. `for` will automatically be set to match the input id |
| options | `Array<SelectOption>` | true | An array of options for the select |

## SelectOption
| Name | Type   | Required | Description |
|------|--------|----------|-------------|
| text | string | true     | The text for the option |
| value | string &#124; number | false | The value for the option. If not specified the value will be equal to `text` |
| selected | boolean | false | Whether the option is selected. Only one option should have this set |
| disabled | boolean | false | Whether the option should be disabled. Useful for creating a default option that should not be reselectable, e.g. "Please select" |
