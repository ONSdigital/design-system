| Name                  | Type                                                          | Required | Description                                                                                                          |
| --------------------- | ------------------------------------------------------------- | -------- | -------------------------------------------------------------------------------------------------------------------- |
| field1                | DurationField                                                 | false    | Config for the years field                                                                                           |
| field2                | DurationField                                                 | false    | Config for the months field                                                                                          |
| dontWrap              | boolean                                                       | false    | Prevents the input from being wrapped in a [field component](/components/field)                                      |
| legendIsQuestionTitle | boolean                                                       | false    | Creates a `h1` inside the legend [further information](/components/fieldset#legend-as-pagequestion-title)            |
| mutuallyExclusive     | `MutuallyExclusive` [_(ref)_](/components/mutually-exclusive) | false    | Configuration object if this is a mutually exclusive input                                                           |
| legendOrLabel         | string                                                        | true     | Text content for the legend. If only a single field is used, a `label` is created using the value from this property |
| legendClasses         | string                                                        | false    | Classes for the legend                                                                                               |
| error                 | `Error` [_(ref)_](/components/error)                          | false    | Configuration for validation errors                                                                                  |

## DurationField

| Name       | Type    | Required | Description                                                           |
| ---------- | ------- | -------- | --------------------------------------------------------------------- |
| id         | string  | true     | ID for the input                                                      |
| name       | string  | true     | Name attribute for the input                                          |
| value      | string  | false    | Value for the input                                                   |
| suffix     | string  | true     | Suffix for the input. Used for the `title` and `abbr` attributes      |
| attributes | object  | false    | HTML attributes (for example data attributes) to add to the element   |
| error      | boolean | false    | If set to `true` will style this specific field as if it has an error |
