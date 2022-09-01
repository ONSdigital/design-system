| Name                  | Type                                                          | Required | Description                                                                                                                                    |
| --------------------- | ------------------------------------------------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| field1                | `Object<DurationField>`                                       | true     | Settings for the first [duration field](#durationfield)                                                                                        |
| field2                | `Object<DurationField>`                                       | false    | Settings for the second [duration field](#durationfield)                                                                                       |
| id                    | string                                                        | false    | The HTML `id` attribute for the field. Applied if only a single field is used                                                                  |
| dontWrap              | boolean                                                       | false    | Prevents the date inputs from being wrapped in the [fieldset component](/components/fieldset)                                                  |
| legendIsQuestionTitle | boolean                                                       | false    | Creates an `h1` inside the legend. Use when the duration is [the only fieldset on the page](/components/fieldset#legend-as-pagequestion-title) |
| mutuallyExclusive     | `MutuallyExclusive` [_(ref)_](/components/mutually-exclusive) | false    | Settings object if the duration is a mutually exclusive answer                                                                                 |
| legendOrLabel         | string                                                        | true     | Text content for the `<legend>`. If only a single field is used, a `<label>` is created using the value from this parameter                    |
| legendClasses         | string                                                        | false    | Classes for the `<legend>`                                                                                                                     |
| description           | string                                                        | false    | The hint text for the duration fields                                                                                                          |
| error                 | `Error` [_(ref)_](/components/error)                          | false    | Settings for validation errors for the whole component                                                                                         |

## DurationField

| Name       | Type                   | Required | Description                                                           |
| ---------- | ---------------------- | -------- | --------------------------------------------------------------------- |
| id         | string                 | false    | The HTML `id` attribute for the input                                 |
| name       | string                 | false    | The HTML `name` attribute for the input                               |
| value      | string                 | false    | The HTML `value` for the input to set a preset value for the field    |
| suffix     | object `<InputSuffix>` | true     | Settings for the [input suffix](#inputsuffix)                         |
| attributes | object                 | false    | HTML attributes (for example, data attributes) to add to the element  |
| error      | boolean                | false    | If set to `true` will style this specific field as if it has an error |

## InputSuffix

| Name  | Type   | Required | Description                                                                                                                                                                                                                                     |
| ----- | ------ | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| text  | string | true     | The visible text label for the prefix or suffix, for example, “Minutes“                                                                                                                                                                         |
| title | string | false    | The HTML `title` attribute for the `<abbr>` element, required if the visible `text` label is an abbreviation. Use to write out the long form of an abbreviated prefix or suffix. For example, if `text` is “mins”, `title` should be “Minutes”. |
| id    | string | true     | The HTML `id` of the element used for the prefix or suffix. Used for the input’s `aria-labelledby` attribute.                                                                                                                                   |
