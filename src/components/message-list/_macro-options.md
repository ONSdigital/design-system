| Name              | Type             | Required | Description                                                                                                                  |
| ----------------- | ---------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------- |
| ariaLabel         | string           | false    | The `aria-label` attribute for the message list element. Defaults to “Message List”.                                         |
| unreadText        | string           | true     | Text label for each unread message suffix displayed in brackets, for example, “New”                                          |
| ariaLabelMetaData | string           | false    | The `aria-label` attribute for each message metadata information. Defaults to “Message metadata”.                            |
| ariaLabelMsg      | string           | false    | The `aria-label` attribute for each message body preview. Defaults to “Message text”.                                        |
| fromLabel         | string           | true     | The visually hidden screen reader “From” prefix for each message metadata information                                        |
| dateLabel         | string           | true     | The visually hidden screen reader “Sent” prefix for each message metadata information                                        |
| hiddenReadLabel   | string           | true     | The visually hidden screen reader “Read the message” prefix for each visually hidden link to the message conversation thread |
| messages          | `Array<Message>` | true     | Settings for each [message item](#message)                                                                                   |

## Message

| Name     | Type    | Required | Description                                                                      |
| -------- | ------- | -------- | -------------------------------------------------------------------------------- |
| id       | string  | true     | The HTML `id` for the message item                                               |
| url      | string  | true     | The URL for the HTML `href` attribute to link to the message conversation thread |
| subject  | string  | true     | Text displayed for the message subject                                           |
| fromText | string  | true     | Value of the “From” sender name in the message metadata information              |
| dateText | string  | true     | Value of the “Sent” date stamp in the message metadata information               |
| body     | string  | true     | Text displayed for the message body snippet                                      |
| unread   | boolean | false    | Set to “true” to display the unread message suffix after the `subject`           |
