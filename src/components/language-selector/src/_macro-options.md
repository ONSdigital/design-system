| Name            | Type            | Required | Description                                          |
| --------------- | --------------- | -------- | ---------------------------------------------------- |
| allLanguagesUrl | string          | true     | The url for the page showing all available languages |
| languages       | Array<Language> | true     | An array of available languages                      |

## Language

| Name            | Type    | Required | Description                                                                                        |
| --------------- | ------- | -------- | -------------------------------------------------------------------------------------------------- |
| url             | string  | true     | Url to change the application language                                                             |
| ISOCode         | string  | true     | the ISO language code for the language                                                             |
| text            | string  | true     | The name of the language to display                                                                |
| current         | boolean | true     | Whether this is the current selected language                                                      |
| buttonAriaLabel | string  | true     | The aria label for the selector button in this language                                            |
| chooseLanguage  | string  | true     | The text for the nojs fallback link to the page showing all available languages                    |
| allLanguages    | string  | false    | The text for the final "All languages" item in the list. If not supplied this item will not render |
