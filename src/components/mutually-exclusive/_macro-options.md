| Name                      | Type                                                                                    | Required | Description                                                                                                                                                                                                |
| ------------------------- | --------------------------------------------------------------------------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| exclusiveOptions          | object`<MutuallyExclusiveCheckbox>` or array`<Radio>` [_ref_](/components/radios#radio) | true     | Settings for the mutually exclusive [checkbox](#mutuallyexclusivecheckbox) or [radios](#)                                                                                                                  |
| or                        | string                                                                                  | true     | Text for the “Or” label that separates the mutually exclusive option from the answer options                                                                                                               |
| deselectMessage           | string                                                                                  | true     | The text the `aria-live` alert will announce to warn that selecting the exclusive option will clear or unselect all other answer options. For example, ”Selecting this will uncheck all other checkboxes”. |
| deselectGroupAdjective    | string                                                                                  | true     | The text the `aria-live` alert will announce when an answer option is cleared or unselected when the mutually exclusive option is selected                                                                 |
| deselectCheckboxAdjective | string                                                                                  | true     | The text the `aria-live` alert will announce when the mutually exclusive option is unselected when an answer option is selected or entered                                                                 |
| error                     | `Error` [_(ref)_](/components/error)                                                    | false    | Configuration for validation errors                                                                                                                                                                        |

## MutuallyExclusiveCheckbox

| Name       | Type                    | Required | Description                                                                         |
| ---------- | ----------------------- | -------- | ----------------------------------------------------------------------------------- |
| id         | string                  | true     | The HTML `id` of the checkbox                                                       |
| name       | string                  | false    | The HTML `name` attribute for the checkbox                                          |
| value      | string                  | true     | The HTML `value` attribute for the checkbox                                         |
| checked    | boolean                 | false    | Whether the checkbox should be checked                                              |
| classes    | string                  | false    | Classes to apply to the checkbox                                                    |
| label      | `Object<CheckboxLabel>` | true     | Settings for the [checkbox label](#checkboxlabel)                                   |
| attributes | object                  | false    | HTML attributes (for example, data attributes) to add to the checkbox input element |

## CheckboxLabel

| Name        | Type   | Required | Description                               |
| ----------- | ------ | -------- | ----------------------------------------- |
| text        | string | true     | The text content of the label             |
| description | string | false    | Hint text to help users fill in the input |
