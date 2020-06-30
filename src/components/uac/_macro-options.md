| Name                | Type                                 | Required | Description                                                                                          |
| ------------------- | ------------------------------------ | -------- | ---------------------------------------------------------------------------------------------------- |
| id                  | string                               | true     | ID for the input                                                                                     |
| classes             | string                               | false    | Classes to apply to the field wrapping the input                                                     |
| label               | `Label` [_(ref)_](/components/label) | true     | Config for the input label                                                                           |
| type                | string                               | false    | Whether the input should be of type "number". Defaults to text                                       |
| name                | string                               | false    | Name attribute for the input                                                                         |
| maxlength           | number                               | false    | Maximum length for the UAC code not including spaces. Defaults to 16                                 |
| groupSize           | number                               | false    | Number of characters before a space is automatically added. Defaults to 4                            |
| securityMessage     | string                               | false    | The security message to place below the input. If not specified the message and lock will not render |
| postTextboxLinkText | string                               | false    | The text for the link to follow the textbox                                                          |
| postTextboxLinkUrl  | string                               | false    | The url for the link to follow the textbox                                                           |
