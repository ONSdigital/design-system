| Name                  | Type    | Required | Description                                                                                            |
| --------------------- | ------- | -------- | ------------------------------------------------------------------------------------------------------ |
| id                    | string  | false    | The HTML `id` for the label                                                                            |
| text                  | string  | true     | The text content of the label                                                                          |
| for                   | string  | true     | The id of the input the label is forÎ                                                                  |
| description           | string  | false    | Hint text following the label to help users answer                                                     |
| classes               | string  | false    | Classes to add to the label                                                                            |
| attributes            | object  | false    | HTML attributes to add to the label, for example, data attributes                                      |
| inputType             | string  | false    | Set to “radio” or “checkbox” to add the relevant CSS for checkboxes or radios. Defaults to text input. |
| accessiblePlaceholder | boolean | false    | Will add the provided label as an accessible placeholder within the input                              |
