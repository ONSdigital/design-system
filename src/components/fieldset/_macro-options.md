| Name                  | Type    | Required | Description                                                                                                                                |
| --------------------- | ------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| id                    | string  | false    | The HTML `id` of the fieldset                                                                                                              |
| classes               | string  | false    | Classes to apply to the fieldset                                                                                                           |
| legend                | string  | true     | Text for the fieldset’s legend                                                                                                             |
| legendClasses         | string  | false    | Classes to apply to the legend element                                                                                                     |
| legendIsQuestionTitle | boolean | false    | When set to true, the text provided within the `legend` is rendered as an `<h1>` tag. Use when there is only a single fieldset on the page |
| legendTitleClasses    | string  | false    | Classes to apply to the `h1` created using `legendIsQuestionTitle`                                                                         |
| description           | string  | false    | Description for the fieldset                                                                                                               |
| attributes            | object  | false    | HTML attributes (for example, data attributes) to add to the fieldset                                                                      |
| error                 | Error   | false    | Configuration for validation errors                                                                                                        |
| dontWrap              | boolean | false    | Prevents the fields from being wrapped in a fieldset                                                                                       |
