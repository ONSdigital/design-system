| Name        | Type   | Required | Description                                                                                                            |
| ----------- | ------ | -------- | ---------------------------------------------------------------------------------------------------------------------- |
| title       | string | true     | The title for the announcement banner                                                                                  |
| description | string | true     | The description for the announcement banner                                                                            |
| link        | object | true     | The link for the announcement banner                                                                                   |
| variant     | string | false    | A single value to change the colour of the banner, available variants: "black", “teal” and “red” (defaults to "black") |

## Link

| Name       | Type   | Required | Description                                                              |
| ---------- | ------ | -------- | ------------------------------------------------------------------------ |
| url        | string | true     | The URL for the HTML `href` attribute of the banner link                 |
| text       | string | true     | The text for the banner link                                             |
| attributes | object | false    | HTML attributes (for example, data attributes) to add to the banner link |
