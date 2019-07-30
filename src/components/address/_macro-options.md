| Name          | Type               | Required | Description                                                                                                     |
| ------------- | ------------------ | -------- | --------------------------------------------------------------------------------------------------------------- |
| id            | string             | true     | ID for the fieldset. This is used to automatically generate IDs and names for each field if one isn't specified |
| classes       | string             | false    | Classes to add to the fieldset                                                                                  |
| legend        | string             | true     | Legend text for the address input                                                                               |
| legendClasses | string             | false    | Classes to apply to the legend                                                                                  |
| organisation  | `AddressField`     | false    | Configuration for the organisation field. If not specified the organisation field will not render               |
| line1         | `AddressField`     | true     | Configuration for the line1 field                                                                               |
| line2         | `AddressField`     | false    | Configuration for the line2 field                                                                               |
| town          | `AddressField`     | false    | Configuration for the town field                                                                                |
| county        | `AddressField`     | false    | Configuration for the county field                                                                              |
| postcode      | `AddressField`     | true     | Configuration for the postcode field                                                                            |
| typeahead     | `AddressTypeahead` | false    | Configuration for if this is a typeahead                                                                        |
| dontWrap      | boolean            | false    | Set to true to prevent the address fields from being wrapped in a fieldset                                      |

## AddressField

| Name       | Type                                 | Required | Description                          |
| ---------- | ------------------------------------ | -------- | ------------------------------------ |
| id         | string                               | false    | ID for the field                     |
| name       | string                               | false    | Sets the name attribute on the field |
| label.text | string                               | true     | The label for the input              |
| value      | string                               | false    | The value for the input              |
| error      | `Error` [_(ref)_](/components/error) | false    | Configuration for validation errors  |

## AddressTypeahead

| Name         | Type                                                | Required | Description                                                                                 |
| ------------ | --------------------------------------------------- | -------- | ------------------------------------------------------------------------------------------- |
| label        | `Label` [_(ref)_](/components/label)                | true     | Config for the typeahead field label                                                        |
| id           | string                                              | false    | ID for the typeahead                                                                        |
| name         | string                                              | false    | Name attribute for the typeahead                                                            |
| content      | `TypeaheadContent` [_(ref)_](/components/typeahead) | true     | Aria and results messaging content                                                          |
| autocomplete | string                                              | true     | Autocomplete attribute used to override the browsers native autocomplete                    |
| or           | string                                              | true     | Text for the or between the manual and search buttons                                       |
| searchButton | string                                              | true     | Text for the search button                                                                  |
| manualButton | string                                              | true     | Text for the manual button                                                                  |
| selectError  | string                                              | true     | Text for the clientside validation error when the user needs to select a result to continue |
| searchURL    | string                                              | true     | URL for the search API                                                                      |
| retrieveURL  | string                                              | true     | URL for the API that returns the full details of the address                                |
