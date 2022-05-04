| Name             | Type                                 | Required | Description                                                                                                       |
| ---------------- | ------------------------------------ | -------- | ----------------------------------------------------------------------------------------------------------------- |
| id               | string                               | true     | The HTML `id` of the input. Used for the label’s `for` attribute.                                                 |
| label            | `Label` [_(ref)_](/components/label) | true     | Settings for the input label. The `for` attribute will be automatically set to use the value of the input’s `id`. |
| showPasswordText | string                               | true     | Text for the “Show password” checkbox toggle label                                                                |
| name             | string                               | false    | The HTML `name` attribute for the input                                                                           |
| fieldId          | string                               | false    | The HTML `id` for the field                                                                                       |
| fieldClasses     | string                               | false    | Classes for the field                                                                                             |
| error            | `Error` [_(ref)_](/components/error) | false    | Configuration for validation errors                                                                               |
