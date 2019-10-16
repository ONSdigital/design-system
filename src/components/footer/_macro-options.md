| Name         | Type                                   | Required | Description                                                                                             |
| ------------ | -------------------------------------- | -------- | ------------------------------------------------------------------------------------------------------- |
| OGLLink      | `OGLLink`                              | false    | An object containing settings for the OGL link                                                          |
| cols         | `Array<FooterCol>`                     | false    | An array of `FooterCol` objects. _Maximum of 3_                                                         |
| rows         | `Array<FooterRow>`                     | false    | An array of `FooterRow` objects                                                                         |
| poweredByONS | boolean &#124; `PoweredByONS`          | false    | Whether to show the ONS logo, and optionally settings for the logo                                      |
| lang         | string                                 | false    | The current page language. Will change out the ONS logo if `poweredByONS` is provided. Defaults to `en` |
| button       | `Button` [_(ref)_](/components/button) | false    | Settings for save and sign out using the button component                                               |

## OGLLink

| Name | Type   | Required | Description                  |
| ---- | ------ | -------- | ---------------------------- |
| pre  | string | true     | The text before the OGL link |
| url  | string | true     | The url for the OGL link     |
| link | string | true     | The text of the OGL link     |
| post | string | true     | The text after the OGL link  |

## FooterCol

| Name      | Type                                                   | Required | Description                    |
| --------- | ------------------------------------------------------ | -------- | ------------------------------ |
| itemsList | `Array<ListItem>` [_(ref)_](/styles/typography/#lists) | true     | A list of links for the column |
| title     | string                                                 | false    | The title of the column        |

## FooterRow

| Name      | Type                                                   | Required | Description                 |
| --------- | ------------------------------------------------------ | -------- | --------------------------- |
| itemsList | `Array<ListItem>` [_(ref)_](/styles/typography/#lists) | true     | A list of links for the row |
