| Name              | Type                                                          | Required                         | Description                                                                         |
| ----------------- | ------------------------------------------------------------- | -------------------------------- | ----------------------------------------------------------------------------------- |
| id                | string                                                        | true                             | The id of the input. This will also be added to the label if a label is specified   |
| type              | string                                                        | false                            | The type of the input, e.g. `number`, `email`, `tel`. Will default to `text`        |
| classes           | string                                                        | false                            | Classes to add to the input.                                                        |
| name              | string                                                        | false                            | The name of the input                                                               |
| value             | string &#124; number                                          | false                            | The value to set the input to                                                       |
| min               | number                                                        | false                            | Minimum accepted number or date                                                     |
| max               | number                                                        | false                            | Maximum accepted number or date                                                     |
| minLength         | number                                                        | false                            | Minimum accepted length of input value                                              |
| maxLength         | number                                                        | false                            | Maximum accepted length of input value                                              |
| attributes        | object                                                        | false                            | HTML attributes (for example data attributes) to add to the input                   |
| label             | `Label` [_(ref)_](/components/label)                          | false                            | Settings for the input label. `for` will automatically be set to match the input id |
| prefix            | `InputPrefix`                                                 | false                            | Settings to prefix the input with                                                   |
| suffix            | `InputSuffix`                                                 | false                            | Settings to suffix the input with                                                   |
| fieldId           | string                                                        | false                            | Id for the field                                                                    |
| fieldClasses      | string                                                        | false                            | Classes for the field                                                               |
| dontWrap          | boolean                                                       | false                            | Prevents the input from being wrapped in a [field component](/components/field)     |
| mutuallyExclusive | `MutuallyExclusive` [_(ref)_](/components/mutually-exclusive) | false                            | Configuration object if this is a mutually exclusive input                          |
| legend            | string                                                        | Only if mutuallyExclusive is set | Text content for the legend                                                         |
| legendClasses     | string                                                        | false                            | Classes for the legend                                                              |
| error             | `Error` [_(ref)_](/components/error)                          | false                            | Configuration for validation errors                                                 |
| autocomplete      | string                                                        | true                             | Autocomplete attribute used to override the browsers native autocomplete            |

## Prefix/Suffix

| Name  | Type   | Required | Description                                                                                      |
| ----- | ------ | -------- | ------------------------------------------------------------------------------------------------ |
| text  | string | true     | The text for the prefix/suffix                                                                   |
| title | string | true     | The title of the prefix/suffix. For example where `text` is "cm", `title` would be "centimeters" |
| id    | string | false    | Id for the prefix/suffix                                                                         |

## Typeahead

| Name          | Type             | Required | Description                                                                     |
| ------------- | ---------------- | -------- | ------------------------------------------------------------------------------- |
| content       | TypeaheadContent | true     | Aria and results messaging content                                              |
| typeaheadData | string           | true     | URL of the JSON file with the typeahead data that needs to be searched          |
| instructions  | string           | false    | Instructions on how to use the typeahead that will be read out by screenreaders |

## TypeaheadContent

| Name                   | Type   | Required | Description                                                                                      |
| ---------------------- | ------ | -------- | ------------------------------------------------------------------------------------------------ |
| aria_you_have_selected | string | true     | Aria message to tell the user that they have selected an answer                                  |
| aria_min_chars         | string | true     | Aria message to tell the user how many charecters they need to enter before typeahead will start |
| aria_one_result        | string | true     | Aria message to tell the user there is only one suggestion left                                  |
| aria_n_results         | string | true     | Aria message to tell the user how many suggestions are left                                      |
| aria_limited_results   | string | true     | Aria message to tell the user if the results have been limited and what they are limited to      |
| more_results           | string | true     | Aria message to tell the user to continue to type to refine suggestions                          |
| results_title          | string | true     | Title of results to be displayed on screen at the top of the results                             |
