| Name                | Type                                 | Required | Description                                                                                            |
| ------------------- | ------------------------------------ | -------- | ------------------------------------------------------------------------------------------------------ |
| id                  | string                               | true     | ID for the input                                                                                       |
| classes             | string                               | false    | Classes to add to the panel wrapping the access code input                                             |
| label               | `Label` [_(ref)_](/components/label) | true     | Settings for the input label                                                                           |
| type                | string                               | false    | Sets the `type` attribute on the access code [input](/components/input). Defaults to `text`            |
| name                | string                               | false    | Sets the `name` attribute for the access code input                                                    |
| maxlength           | integer                              | false    | Maximum length for the access code not including spaces. Defaults to 16.                               |
| groupSize           | integer                              | false    | Number of characters or digits before a space is automatically added. Defaults to 4.                   |
| securityMessage     | string                               | false    | The security message to place below the input. If not set, the message and icon will not be displayed. |
| postTextboxLinkText | string                               | false    | The text for the link following the access code input                                                  |
| postTextboxLinkUrl  | string                               | false    | The url for the link following the access code input                                                   |
| error               | `Error` [_(ref)_](/components/error) | false    | Configuration for validation errors                                                                    |
