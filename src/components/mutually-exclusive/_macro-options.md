| Name                      | Type                                 | Required | Description                                                                                                                                                                                                |
| ------------------------- | ------------------------------------ | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| exclusiveOptions          | `Array<Checkbox>` or `Array<radio>`  | true     | Configuration for the mutually exclusive options                                                                                                                                                           |
| or                        | string                               | false    | Text for the “Or” label that separates the mutually exclusive checkbox from the answer options, defaults to "Or".                                                                                          |
| deselectMessage           | string                               | true     | The text the aria-live alert will announce to warn that selecting the exclusive checkbox will clear or unselect all other answer options. For example, ”Selecting this will uncheck all other checkboxes”. |
| deselectGroupAdjective    | string                               | true     | The text the aria-live alert will announce when an answer option is cleared or unselected when the mutually exclusive checkbox is selected                                                                 |
| deselectCheckboxAdjective | string                               | true     | The text the aria-live alert will announce when the mutually exclusive checkbox is unselected when an answer option is selected or entered                                                                 |
| error                     | `Error` [_(ref)_](/components/error) | false    | Configuration for validation errors                                                                                                                                                                        |
| dontWrap                  | boolean                              | false    | Prevents the checkboxes,date input,duration,input and Textarea from being wrapped in a [fieldset component](/components/fieldset)                                                                          |

## Checkboxes

| Name            | Type              | Required                     | Description                                                       |
| --------------- | ----------------- | ---------------------------- | ----------------------------------------------------------------- |
| checkboxesLabel | string            | true (unless inside a radio) | A prompt for the checkboxes, for example, “Select all that apply” |
| checkboxes      | array`<Checkbox>` | true                         | Settings for each [checkbox](#checkbox)                           |

## Date Input

| Name          | Type                | Required | Description                                                                                                                        |
| ------------- | ------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| legendOrLabel | string              | true     | The HTML `legend` for the date fieldset. If only a single field is used, the `label` will be overridden with this property’s value |
| legendClasses | string              | false    | Classes to apply to the HTML `legend` element when using `legendIsQuestionTitle`                                                   |
| day           | `Object<DateField>` | false    | Settings for the day [date field](#datefield)                                                                                      |
| month         | `Object<DateField>` | true     | Settings for the month [date field](#datefield)                                                                                    |
| year          | `Object<DateField>` | false    | Settings for the year [date field](#datefield)                                                                                     |

## Duration

| Name   | Type                    | Required | Description                                              |
| ------ | ----------------------- | -------- | -------------------------------------------------------- |
| field1 | `Object<DurationField>` | true     | Settings for the first [duration field](#durationfield)  |
| field2 | `Object<DurationField>` | false    | Settings for the second [duration field](#durationfield) |

## Input

| Name       | Type                                 | Required | Description                                                                                                                                    |
| ---------- | ------------------------------------ | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| width      | string                               | false    | Sets the width of the textarea input by number of characters. See [input component](/components/input/#width-constrained) for details.         |
| attributes | object                               | false    | HTML attributes (for example, data attributes) to add to the option element                                                                    |
| type       | string                               | false    | Sets the HTML `type` attribute for the `<input>`. Can be set to either: “number”, “email”, “tel”, “password”, or “search”. Defaults to “text”. |
| label      | `Label` [_(ref)_](/components/label) | false    | Settings for the input label. `for` will automatically be set to match the input id                                                            |
| prefix     | object `<InputPrefix>`               | false    | Settings for the [input prefix](#inputprefixinputsuffix)                                                                                       |

## TextArea

| Name           | Type                     | Required | Description                                                                                                                            |
| -------------- | ------------------------ | -------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| name           | string                   | false    | The HTML `name` attribute for the textarea                                                                                             |
| width          | string                   | false    | Sets the width of the textarea input by number of characters. See [input component](/components/input/#width-constrained) for details. |
| charCheckLimit | Object`<CharCheckLimit>` | false    | Settings for the textarea [character limit counter](#charchecklimit)                                                                   |
