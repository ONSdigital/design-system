| Name                      | Type                                 | Required | Description                                                                                              |
| ------------------------- | ------------------------------------ | -------- | -------------------------------------------------------------------------------------------------------- |
| checkbox                  | MutuallyExclusiveCheckbox            | true     | Configuration for the mutually exclusive checkbox                                                        |
| or                        | string                               | true     | Text for the "Or" label                                                                                  |
| deselectMessage           | string                               | true     | The text the aria-live will read to warn that selecting the exclusive option will clear all other inputs |
| deselectGroupAdjective    | string                               | true     | The text the aria-live will read when a field is deselected                                              |
| deselectCheckboxAdjective | string                               | true     | The text the aria-live will read when the checkbox is deselected                                         |
| error                     | `Error` [_(ref)_](/components/error) | false    | Configuration for validation errors                                                                      |
