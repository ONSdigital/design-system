| Name       | Type    | Required | Description                                                                                                              |
| ---------- | ------- | -------- | ------------------------------------------------------------------------------------------------------------------------ |
| text       | string  | true     | If `html` is set, this is not required. Text for the button. If `html` is provided, the `text` argument will be ignored. |
| html       | string  | true     | If `text` is set, this is not required. HTML for the button. If `html` is provided, the `text` argument will be ignored. |
| type       | string  | true     | Type of `input` or `button` – `button`, `submit` or `reset`. Defaults to `submit`.                                       |
| name       | string  | true     | Name for the `button`                                                                                                    |
| value      | string  | true     | Value for the `button`                                                                                                   |
| id         | string  | false    | ID for the `button`                                                                                                      |
| classes    | string  | false    | Classes to add to the button component                                                                                   |
| print      | boolean | false    | Sets button into print button mode and adds the relevant classes                                                         |
| attributes | object  | false    | HTML attributes (for example data attributes) to add to the button component                                             |
