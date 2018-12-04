| Name | Type   | Required | Description |
|------|--------|----------|-------------|
| legend | string | false  | The legend to apply to the fieldset |
| name | string | true     | The name to apply to the checkboxes |
| checkboxes | `Array<Checkbox>` | true | An array of checkboxes to render |
| mutuallyExclusive | boolean | false | Whether to render this as a mutually exclusive checkbox list |
| or   | string | false | Required if `mutuallyExclusive` is true. The or text between the main options and the mutually exclusive option |
| deselectMessage | string | false | Required if `mutuallyExclusive` is true. Visually hidden text to explain that the current option will deselect all other options |
| deselectAdjective | string | false | Required if `mutuallyExclusive` is true. The status message for when all other options are deselected |

## Checkbox
| Name | Type   | Required | Description |
|------|--------|----------|-------------|
| id   | string | true     | The id of the checkbox |
| name | string | true     | The name of the checkbox |
| value | string | true    | The value of the checkbox |
| classes | string | false | Classes to apply to the checkbox |
| checked | boolean | false | Whether the checkbox should be checked |
| label | `Label` [_(ref)_](/components/label) | true | Settings for the checkbox label |
| other | `Input` [_(ref)_](/components/input) | false | Object with settings for other input |
| exclusive | boolean | false |  Required if `mutuallyExclusive` is true on parent. When set to true this option will deselect all other selected options when clicked |
