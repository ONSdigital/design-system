| Name              | Type                                                          | Required | Description                                                                                                  |
| ----------------- | ------------------------------------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------ |
| id                | string                                                        | true     | The base id for the inputs. `-day`, `-month`, and `-year` will be added to this id and applied to each input |
| classes           | string                                                        | false    | Classes to apply to the fieldset                                                                             |
| legend            | string                                                        | true     | The legend for the date fieldset                                                                             |
| description       | string                                                        | true     | The hint text for the date field                                                                             |
| day               | DateField                                                     | false    | Config for the day field. If this isn't provided then a day field will not render                            |
| month             | DateField                                                     | false    | Config for the month field. If this isn't provided then a month field will not render                        |
| year              | DateField                                                     | false    | Config for the year field. If this isn't provided then a year field will not render                          |
| mutuallyExclusive | `MutuallyExclusive` [_(ref)_](/components/mutually-exclusive) | false    | Configuration object if this is a mutually exclusive date                                                    |
| legendClasses     | string                                                        | false    | Classes to apply to the legend                                                                               |
| questionMode      | boolean                                                       | false    | Whether to change the visual layout of the input to a survey question                                        |
| dontWrap          | boolean                                                       | false    | Prevents the date inputs from being wrapped in a [fieldset component](/components/fieldset)                  |
| legendIsPageTitle | boolean                                                       | false    | Creates a `h1` inside the legend                                                                             |
| error             | `Error` [_(ref)_](/components/error)                          | false    | Configuration for validation errors                                                                          |

## DateField

| Name       | Type                                 | Required | Description                                                       |
| ---------- | ------------------------------------ | -------- | ----------------------------------------------------------------- |
| label      | `Label` [_(ref)_](/components/label) | true     | Label config for the field                                        |
| name       | string                               | true     | Name of the field                                                 |
| value      | number                               | false    | Preset value for the field                                        |
| attributes | object                               | false    | HTML attributes (for example data attributes) to add to the input |
