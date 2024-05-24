| Name      | Type            | Required | Description                                     |
| --------- | --------------- | -------- | ----------------------------------------------- |
| languages | Array<Language> | true     | Settings for the [list of languages](#language) |

## Language

| Name | Type   | Required | Description                            |
| ---- | ------ | -------- | -------------------------------------- |
| url  | string | true     | URL to change the application language |

<<<<<<< Updated upstream
| ISOCode | string | true | The ISO language code for the language |
| text | string | true | The name of the language to display |
| abbrText | string | false | Abbreviated version of the language text can be provided. This will be displayed on small viewports |
| current | boolean | true | The current selected language |
| attributes | object | false | HTML attributes (for example, data attributes) to add to the details element |
