| Name | Type   | Required | Description |
|------|--------|----------|-------------|
| id   | string | true     | The id of the textarea. This will also be added to the label if a label is specified |
| classes | string | false | Classes to add to the textarea. |
| name | string | false    | The name of the textarea |
| value | string | false | The value of the textarea. |
| attributes | object | false | HTML attributes (for example data attributes) to add to the textarea |
| label | `Label` [_(ref)_](/components/label) | false | Settings for the input label. `for` will automatically be set to match the textarea id |
| maxlength | number | false | The maximum amount of characters a user should be allowed to type in |
| charCountPlural | string | false | Required if `maxlength` is supplied. The string that will render how many characters are remaining. `{x}` Will be replaced with the number |
| charCountSingular | string | false | Required if `maxlength` is supplied. The string that will render how many characters are remaining (singular). `{x}` Will be replaced with the number |
| mutuallyExclusive | boolean | false | Whether to render a "mutually exclusive" checkbox |
| or   | string | false | Required if `mutuallyExclusive` set to true. The or text between the textarea and the checkbox |
| checkbox | `Checkbox` [_(ref)_](/components/checkboxes) | false |  Required if `mutuallyExclusive` set to true. Settings for the mutually exclusive checkbox |
| deselectMessage | string | false | Required if `mutuallyExclusive` is true. Visually hidden text to explain that the textarea will be cleared |
| deselectAdjective | string | false | Required if `mutuallyExclusive` is true. The status message for when checkbox is selected |
