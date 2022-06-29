| Name      | Type            | Required | Description                                     |
| --------- | --------------- | -------- | ----------------------------------------------- |
| languages | Array<Language> | true     | Settings for the [list of languages](#language) |

## Language

| Name       | Type    | Required | Description                                                                      |
| ---------- | ------- | -------- | -------------------------------------------------------------------------------- |
| url        | string  | true     | URL to change the application language                                           |
| ISOCode    | string  | true     | The ISO language code for the language                                           |
| text       | string  | true     | The name of the language to display                                              |
| current    | boolean | true     | The current selected language                                                    |
| attributes | object  | false    | HTML attributes (for example, data attributes) to add to the collapsible element |
