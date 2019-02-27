| Name               | Type   | Required | Description                                                                                                           |
| ------------------ | ------ | -------- | --------------------------------------------------------------------------------------------------------------------- |
| id                 | string | true     | id for the details                                                                                                    |
| title              | string | true     | The title for the details                                                                                             |
| content            | string | true     | HTML content for the details                                                                                          |
| closeButton        | string | false    | Text for the button when the details are open. If not specified button will not render                                |
| closeButtonClasses | string | false    | Classes to add to the close button. If classes are provided the `btn--secondary` class will not be applied by default |
| classes            | string | false    | Classes to add to the details element                                                                                 |
| attributes         | object | false    | HTML attributes (for example data attributes) to add to the details element                                           |
