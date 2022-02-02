| Name              | Type             | Required | Description                                                                                  |
| ----------------- | ---------------- | -------- | -------------------------------------------------------------------------------------------- |
| ariaLabel         | string           | false    | aria label for the message list. Defaults to `Message List`                                  |
| unreadText        | string           | true     | text label for unread message i.e. New                                                       |
| ariaLabelMetaData | string           | false    | aria label for the message metadata i.e. Message information. Defaults to `Message metadata` |
| ariaLabelMsg      | string           | false    | aria label for the message body i.e. Message preview. Defaults to `Message text`             |
| fromLabel         | string           | true     | Label for the visually hidden "from" label                                                   |
| dateLabel         | string           | true     | Label for the visually hidden "date" label                                                   |
| hiddenReadLabel   | string           | true     | Label for the visually hidden "Read the message" label                                       |
| messages          | `Array<Message>` | true     | An array of available messages                                                               |

## Message

| Name     | Type   | Required | Description                                 |
| -------- | ------ | -------- | ------------------------------------------- |
| id       | string | true     | ID for the message item                     |
| subject  | string | true     | Text displayed for the message subject      |
| fromText | string | true     | Text displayed for the message sender       |
| dateText | string | true     | Text displayed for the message date         |
| body     | string | true     | Text displayed for the message preview/body |
| url      | string | true     | Link to the message thread/conversation     |
