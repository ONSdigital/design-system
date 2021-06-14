| Name          | Type         | Required | Description                                                                                                     |
| ------------- | ------------ | -------- | --------------------------------------------------------------------------------------------------------------- |
| id            | string       | true     | ID for the fieldset. This is used to automatically generate IDs and names for each field if one isn't specified |
| classes       | string       | false    | Classes to add to the fieldset                                                                                  |
| legend        | string       | true     | Legend text for the address input                                                                               |
| legendClasses | string       | false    | Classes to apply to the legend                                                                                  |
| organisation  | AddressField | false    | Configuration for the organisation field. If not specified the organisation field will not render               |
| line1         | AddressField | false    | Configuration for the line1 field                                                                               |
| line2         | AddressField | false    | Configuration for the line2 field                                                                               |
| town          | AddressField | false    | Configuration for the town field                                                                                |
| county        | AddressField | false    | Configuration for the county field                                                                              |
| postcode      | AddressField | false    | Configuration for the postcode field                                                                            |
| uprn          | AddressField | false    | Configuration for the uprn field                                                                                |
| dontWrap      | boolean      | false    | Set to true to prevent the address fields from being wrapped in a fieldset                                      |

## AddressField

| Name       | Type                                 | Required | Description                          |
| ---------- | ------------------------------------ | -------- | ------------------------------------ |
| id         | string                               | false    | ID for the field                     |
| name       | string                               | false    | Sets the name attribute on the field |
| label.text | string                               | true     | The label for the input              |
| value      | string                               | false    | The value for the input              |
| error      | `Error` [_(ref)_](/components/error) | false    | Configuration for validation errors  |
