| Name                  | Type                                                          | Required | Description                                                                                                                                  |
| --------------------- | ------------------------------------------------------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| id                    | string                                                        | true     | The base HTML `id` for the inputs. `-day`, `-month`, and `-year` will be appended to this id and applied to each input                       |
| classes               | string                                                        | false    | Classes to apply to the fieldset                                                                                                             |
| legendOrLabel         | string                                                        | true     | The HTML `legend` for the date fieldset. If only a single field is used, the `label` will be overridden with this property’s value           |
| legendClasses         | string                                                        | false    | Classes to apply to the HTML `legend`. Use to set the utility class `.ons-u-vh` to visually hide the legend if repeated in the page heading. |
| description           | string                                                        | true     | The hint text for the date fieldset. Use to provide guidance on the required format                                                          |
| day                   | `Object<DateField>`                                           | false    | Settings for the day [date field](#datefield)                                                                                                |
| month                 | `Object<DateField>`                                           | true     | Settings for the month [date field](#datefield)                                                                                              |
| year                  | `Object<DateField>`                                           | false    | Settings for the year [date field](#datefield)                                                                                               |
| mutuallyExclusive     | `MutuallyExclusive` [_(ref)_](/components/mutually-exclusive) | false    | Settings object if the date is a mutually exclusive answer                                                                                   |
| dontWrap              | boolean                                                       | false    | Prevents the date inputs from being wrapped in the [fieldset component](/components/fieldset)                                                |
| legendIsQuestionTitle | boolean                                                       | false    | Creates an `h1` inside the legend. Use when the date is [the only fieldset on the page](/components/fieldset#legend-as-pagequestion-title)   |
| error                 | `Error` [_(ref)_](/components/error)                          | false    | Settings for validation errors                                                                                                               |

## DateField

| Name       | Type                                 | Required | Description                                                        |
| ---------- | ------------------------------------ | -------- | ------------------------------------------------------------------ |
| label      | `Label` [_(ref)_](/components/label) | true     | Label config for the field                                         |
| name       | string                               | true     | Name of the field                                                  |
| value      | number                               | false    | Preset value for the field                                         |
| attributes | object                               | false    | HTML attributes (for example, data attributes) to add to the input |
