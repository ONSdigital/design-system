| Name                  | Type                                                          | Required | Description                                                                                                                                |
| --------------------- | ------------------------------------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| field1                | `Object<DurationField>`                                       | true     | Settings for the first [duration field](#durationfield)                                                                                    |
| field2                | `Object<DurationField>`                                       | false    | Settings for the second [duration field](#durationfield)                                                                                   |
| id                    | string                                                        | false    | The HTML `id` attribute for the field. Applied if only a single field is used                                                              |
| dontWrap              | boolean                                                       | false    | Prevents the date inputs from being wrapped in the [fieldset component](/components/fieldset)                                              |
| legendIsQuestionTitle | boolean                                                       | false    | Creates an `h1` inside the legend. Use when the date is [the only fieldset on the page](/components/fieldset#legend-as-pagequestion-title) |
| mutuallyExclusive     | `MutuallyExclusive` [_(ref)_](/components/mutually-exclusive) | false    | Settings object if the duration is a mutually exclusive answer                                                                             |
| legendOrLabel         | string                                                        | true     | Text content for the `<legend>`. If only a single field is used, a `<label>` is created using the value from this parameter                |
| legendClasses         | string                                                        | false    | Classes for the `<legend>`                                                                                                                 |
| description           | string                                                        | false    | The hint text for the duration fields                                                                                                      |
| error                 | `Error` [_(ref)_](/components/error)                          | false    | Settings for validation errors for the whole component                                                                                     |

## DurationField

| Name       | Type    | Required | Description                                                           |
| ---------- | ------- | -------- | --------------------------------------------------------------------- |
| id         | string  | false    | The HTML `id` attribute for the input                                 |
| name       | string  | false    | The HTML `name` attribute for the input                               |
| value      | string  | false    | The HTML `value` for the input to set a preset value for the field    |
| suffix     | string  | true     | Suffix for the input. Used for the HTML `title` and `abbr` attributes |
| attributes | object  | false    | HTML attributes (for example, data attributes) to add to the element  |
| error      | boolean | false    | If set to `true` will style this specific field as if it has an error |
