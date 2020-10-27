| Name                 | Type                                   | Required | Description                                                                                          |
| -------------------- | -------------------------------------- | -------- | ---------------------------------------------------------------------------------------------------- |
| OGLLink              | `OGLLink`                              | false    | An object containing settings for the OGL link                                                       |
| footerWarning        | `footerWarning`                        | false    | An object containing settings for the Footer Warning                                                 |
| copyrightDeclaration | `copyrightDeclaration`                 | false    | An object containing settings for the Copyright Declaration                                          |
| cols                 | `Array<FooterCol>`                     | false    | An array of `FooterCol` objects. _Maximum of 3_                                                      |
| rows                 | `Array<FooterRow>`                     | false    | An array of `FooterRow` objects                                                                      |
| poweredBy            | boolean &#124; `PoweredBy`             | false    | Whether to show the ONS logo, and optionally settings for the logo                                   |
| lang                 | string                                 | false    | The current page language. Will change out the ONS logo if `poweredBy` is provided. Defaults to `en` |
| button               | `Button` [_(ref)_](/components/button) | false    | Settings for save and sign out using the button component                                            |
| newTabWarning        | string                                 | false    | Text for warning of links opening in new tabs                                                        |
| crest                | boolean                                | false    | If set to true will add the UK coat of arms to the footer                                            |

## OGLLink

| Name | Type   | Required | Description                  |
| ---- | ------ | -------- | ---------------------------- |
| pre  | string | true     | The text before the OGL link |
| url  | string | true     | The url for the OGL link     |
| link | string | true     | The text of the OGL link     |
| post | string | true     | The text after the OGL link  |

## FooterWarning

| Name | Type   | Required | Description                      |
| ---- | ------ | -------- | -------------------------------- |
| pre  | string | true     | The text before the warning link |
| url  | string | true     | The url for the warning link     |
| link | string | true     | The text of the warning link     |
| post | string | true     | The text after the warning link  |

## CopyrightDeclaration

| Name      | Type   | Required | Description                                                      |
| --------- | ------ | -------- | ---------------------------------------------------------------- |
| copyright | string | true     | The text for the copyright declaration                           |
| text      | string | true     | The text that comes before the link on the copyright declaration |
| link      | string | true     | The text for the copyright link                                  |
| url       | string | true     | The url for the copyright link                                   |

## FooterCol

| Name      | Type                                                   | Required | Description                    |
| --------- | ------------------------------------------------------ | -------- | ------------------------------ |
| itemsList | `Array<ListItem>` [_(ref)_](/styles/typography/#lists) | true     | A list of links for the column |
| title     | string                                                 | false    | The title of the column        |

## FooterRow

| Name      | Type                                                   | Required | Description                 |
| --------- | ------------------------------------------------------ | -------- | --------------------------- |
| itemsList | `Array<ListItem>` [_(ref)_](/styles/typography/#lists) | true     | A list of links for the row |
