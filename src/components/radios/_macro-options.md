| Name   | Type           | Required | Description                         |
| ------ | -------------- | -------- | ----------------------------------- |
| legend | string         | false    | The legend to apply to the fieldset |
| name   | string         | true     | The name to apply to the radios     |
| radios | `Array<Radio>` | true     | An array of radios to render        |

## Radio

| Name    | Type                                 | Required | Description                          |
| ------- | ------------------------------------ | -------- | ------------------------------------ |
| id      | string                               | true     | The id of the radio                  |
| name    | string                               | true     | The name of the radio                |
| value   | string                               | true     | The value of the radio               |
| checked | boolean                              | false    | Whether the radio should be checked  |
| label   | `Label` [_(ref)_](/components/label) | true     | Settings for the radio label         |
| other   | `Input` [_(ref)_](/components/input) | false    | Object with settings for other input |
