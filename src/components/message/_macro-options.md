| Name           | Type   | Required | Description                                                            |
| -------------- | ------ | -------- | ---------------------------------------------------------------------- |
| type           | string | true     | Set to “sent” or “received” to style message type                      |
| id             | string | false    | The HTML `id` of the message header metadata element                   |
| name           | string | false    | The HTML `name` attribute for the message header metadata element      |
| fromLabel      | string | true     | Label for the “From” prefix in the message header metadata element     |
| fromValue      | string | true     | Value of the “From” sender name in the message header metadata element |
| fromId         | string | false    | The HTML `id` of the `fromValue` element                               |
| fromName       | string | false    | The HTML `name` attribute of the `fromValue` element                   |
| sentLabel      | string | true     | Label for the “Sent” prefix in the message header metadata element     |
| sentValue      | string | true     | Value of the “Sent” date stamp in the message header metadata element  |
| sentId         | string | false    | The HTML `id` of the `sentValue` element                               |
| sentName       | string | false    | The HTML `name` attribute of the `sentValue` element                   |
| unreadLinkText | string | false    | Text for the the “Mark unread” link element                            |
| unreadLink     | string | false    | The URL for the “Mark unread” link element’s `href` attribute          |
| unreadLinkId   | string | false    | The HTML `id` of the “Mark unread” link element                        |
| messageID      | string | false    | The HTML `id` of the message body                                      |
| messageName    | string | false    | The HTML `name` attribute of the message body                          |
