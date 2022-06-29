| Name         | Type                                 | Required | Description                                                                                                  |
| ------------ | ------------------------------------ | -------- | ------------------------------------------------------------------------------------------------------------ |
| id           | string                               | true     | The HTML `id` of the select element. This used for the label’s `for` attribute.                              |
| classes      | string                               | false    | Classes to add to the select element                                                                         |
| name         | string                               | false    | The HTML `name` attribute for the select element                                                             |
| attributes   | object                               | false    | HTML attributes (for example, data attributes) to add to the select element                                  |
| label        | `Object<Label>`                      | true     | Settings for the [label](#label). The HTML `for` attribute will automatically be set to match the select id. |
| options      | `Array<SelectOption>`                | true     | An array of [options for the component](#selectoption)                                                       |
| fieldId      | string                               | false    | The HTML `id` of the field                                                                                   |
| fieldClasses | string                               | false    | Classes for the field                                                                                        |
| dontWrap     | boolean                              | false    | Prevents the select from being wrapped in a [field component](/components/field)                             |
| error        | `Error` [_(ref)_](/components/error) | false    | Configuration for validation errors                                                                          |

## SelectOption

| Name       | Type    | Required | Description                                                                                                                          |
| ---------- | ------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| text       | string  | true     | The text for the option                                                                                                              |
| value      | string  | false    | The value for the option. If not specified the value will set by the `text` parameter                                                |
| selected   | boolean | false    | Set to “true” to make an option selected when the page loads. Only one option should have this set.                                  |
| disabled   | boolean | false    | Set to “true” to disable an option. Use to set a default placeholder option that can’t be selected, for example, “Select an option”. |
| id         | string  | false    | The HTML `id` of the option element.                                                                                                 |
| attributes | object  | false    | HTML attributes (for example, data attributes) to add to the option element                                                          |

## Label

| Name        | Type    | Required | Description                                                                       |
| ----------- | ------- | -------- | --------------------------------------------------------------------------------- |
| text        | string  | true     | The text content of the label                                                     |
| description | string  | false    | Hint text to help users use the component                                         |
| classes     | string  | false    | Classes to add to the label                                                       |
| inline      | boolean | false    | Set to “true” to display the label on the same line and before the select element |
