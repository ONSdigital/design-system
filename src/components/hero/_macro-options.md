| Name           | Type             | Required | Description                                                                                                   |
| -------------- | ---------------- | -------- | ------------------------------------------------------------------------------------------------------------- |
| variants       | array or string  | false    | An array of values or single value (string) to adjust the component using available variant, “dark, analysis” |
| wide           | boolean          | false    | Set to “true” when using the `wide` page layout container                                                     |
| title          | string           | true     | Text for the hero title                                                                                       |
| subtitle       | string           | false    | Text for the hero subtitle                                                                                    |
| text           | string           | false    | Text to follow the hero title and subtitle                                                                    |
| button         | `Object<Button>` | false    | Settings for the hero [call to action button](#button)                                                        |
| html           | string           | false    | Allows arbitrary HTML for additional content to be added to the component                                     |
| detailsColumns | integer          | false    | Number of grid columns for the hero to span on screens larger than the medium breakpoint, defaults to 8       |

## Button

| Name    | Type   | Required | Description                  |
| ------- | ------ | -------- | ---------------------------- |
| text    | string | true     | Text for the button label    |
| url     | string | true     | URL for the button           |
| classes | string | false    | Classes to add to the button |
