| Name     | Type             | Required | Description                                                                                             |
| -------- | ---------------- | -------- | ------------------------------------------------------------------------------------------------------- |
| variants | array or string  | false    | An array of values or single value (string) to adjust the component using available variant, “inverted” |
| wide     | boolean          | false    | Set to “true” when using the `wide` page layout container                                               |
| title    | string           | true     | Text for the hero title                                                                                 |
| subtitle | string           | false    | Text for the hero subtitle                                                                              |
| text     | string           | false    | Text to follow the hero title and subtitle                                                              |
| button   | `Object<Button>` | false    | Settings for the hero [call to action button](#button)                                                  |

## Button

| Name    | Type   | Required | Description                  |
| ------- | ------ | -------- | ---------------------------- |
| text    | string | true     | Text for the button label    |
| url     | string | true     | URL for the button           |
| classes | string | false    | Classes to add to the button |
