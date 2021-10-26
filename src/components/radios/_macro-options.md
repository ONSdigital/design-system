| Name                  | Type                                 | Required | Description                                                                                                                    |
| --------------------- | ------------------------------------ | -------- | ------------------------------------------------------------------------------------------------------------------------------ |
| id                    | string                               | false    | Id to apply to the fieldset                                                                                                    |
| classes               | string                               | false    | Classes to apply to the fieldset                                                                                               |
| legend                | string                               | true     | The legend to apply to the fieldset                                                                                            |
| legendClasses         | string                               | false    | Classes to apply to the legend                                                                                                 |
| borderless            | boolean                              | false    | Removes the border surrounding the input and label                                                                             |
| name                  | string                               | true     | The name to apply to the radios                                                                                                |
| radios                | `Array<Radio>`                       | true     | An array of radios to render                                                                                                   |
| dontWrap              | boolean                              | false    | Prevents the radios from being wrapped in a [fieldset component](/components/fieldset)                                         |
| legendIsQuestionTitle | boolean                              | false    | Creates a `h1` inside the legend [further information](/components/fieldset#legend-as-pagequestion-title)                      |
| value                 | string                               | false    | Can be used to set the checked radio. This can also be achieved by setting the `checked` parameter on the `Radio` item to true |
| error                 | `Error` [_(ref)_](/components/error) | false    | Configuration for validation errors                                                                                            |
| or                    | string                               | false    | Text for the or label                                                                                                          |
| clearRadios           | `Object<ClearRadios>`                | false    | An object containing values for the clear selection button                                                                     |
| open                  | boolean                              | false    | Whether the 'other' input should be displayed                                                                                  |

## Radio

| Name              | Type                                                                                                                                                                   | Required                       | Description                                                                                                          |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------ | -------------------------------------------------------------------------------------------------------------------- |
| id                | string                                                                                                                                                                 | true                           | The id of the radio                                                                                                  |
| name              | string                                                                                                                                                                 | true                           | The name of the radio                                                                                                |
| value             | string                                                                                                                                                                 | true                           | The value of the radio                                                                                               |
| checked           | boolean                                                                                                                                                                | false                          | Whether the radio should be checked                                                                                  |
| label             | `Label` [_(ref)_](/components/label)                                                                                                                                   | true                           | Settings for the radio label                                                                                         |
| other             | `Input` [_(ref)_](/components/input), `Select` [_(ref)_](/components/select), `Checkboxes` [_(ref)_](/components/checkboxes) or `Radios` [_(ref)_](/components/radios) | false                          | Object with settings for other input, select, checkboxes or radios                                                   |
| otherType         | string                                                                                                                                                                 | false (true if other provided) | Can be set to `select`, `input`, `checkboxes` or `radios` to set what other input you want in a radio                |
| selectAllChildren | boolean                                                                                                                                                                | false                          | Provide `true` when using `checkboxes` `otherType` to select all other checkboxes upon selecting the reveal checkbox |
| attributes        | object                                                                                                                                                                 | false                          | HTML attributes (for example, data attributes) to add to the radio input element                                     |

## ClearRadios

| Name            | Type   | Required | Description                                                                 |
| --------------- | ------ | -------- | --------------------------------------------------------------------------- |
| text            | string | true     | The text displayed for the button                                           |
| name            | string | false    | The name attribute value for the button                                     |
| ariaClearText   | string | true     | The text to be announced to screen readers when a radio has been selected   |
| ariaClearedText | string | true     | The text to be announced to screen readers when the button has been clicked |
