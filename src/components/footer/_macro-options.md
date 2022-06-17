| Name                 | Type                           | Required | Description                                                                                            |
| -------------------- | ------------------------------ | -------- | ------------------------------------------------------------------------------------------------------ |
| classes              | string                         | false    | Classes to add to the footer                                                                           |
| footerWarning        | string                         | false    | The HTML content for the footer warning panel                                                          |
| cols                 | array`<FooterCol>`             | false    | An array of objects for each of the 3 allowed [footer columns](#footercol)                             |
| rows                 | array`<FooterRow>`             | false    | An array for the first [footer row](#footerrow)                                                        |
| legal                | array`<LegalRow>`              | false    | An array of for the [row of legal links](#legalrow)                                                    |
| poweredBy            | object`<PoweredBy>`            | false    | Settings for [a supporting organisation logo](#poweredby)                                              |
| lang                 | string                         | false    | Set the ISO language code for current page to display the correct language ONS logo. Defaults to “en”. |
| newTabWarning        | string                         | false    | Leading line of text to warn users that all footer links will open a new tab                           |
| OGLLink              | object`<OGLLink>`              | false    | An object containing settings for the [Open Government Licence content](#ogllink)                      |
| copyrightDeclaration | object`<copyrightDeclaration>` | false    | Settings for the [Copyright Declaration](#copyrightdeclaration)                                        |
| crest                | boolean                        | false    | Set to “true” display the UK Royal Coat or Arms in the footer                                          |
| wide                 | boolean                        | false    | Set to “true” to increase the maximum width of the layout container to 1280px                          |
| attributes           | object                         | false    | HTML attributes (for example, data attributes) to add to the footer                                    |

## OGLLink

| Name | Type   | Required                    | Description                                           |
| ---- | ------ | --------------------------- | ----------------------------------------------------- |
| pre  | string | true (unless `HTML` is set) | The text before the OGL link                          |
| url  | string | true (unless `HTML` is set) | The URL for the HTML `href` attribute of the OGL link |
| link | string | true (unless `HTML` is set) | The text label for the OGL link                       |
| post | string | true (unless `HTML` is set) | The text after the OGL link                           |
| HTML | string | false                       | The alternative HTML for the OGL content              |

## CopyrightDeclaration

| Name      | Type   | Required | Description                                  |
| --------- | ------ | -------- | -------------------------------------------- |
| copyright | string | true     | The text for the copyright declaration       |
| text      | string | true     | The text following the copyright declaration |

## FooterCol

| Name      | Type                                                        | Required | Description                       |
| --------- | ----------------------------------------------------------- | -------- | --------------------------------- |
| itemsList | array`<ListItem>` [_(ref)_](/foundations/typography/#lists) | true     | A list of links for the column    |
| title     | string                                                      | false    | The `<h2>` heading for the column |

## FooterRow

| Name      | Type                                                        | Required | Description                 |
| --------- | ----------------------------------------------------------- | -------- | --------------------------- |
| itemsList | array`<ListItem>` [_(ref)_](/foundations/typography/#lists) | true     | A list of links for the row |

## LegalRow

| Name      | Type                                                        | Required | Description                 |
| --------- | ----------------------------------------------------------- | -------- | --------------------------- |
| itemsList | array`<ListItem>` [_(ref)_](/foundations/typography/#lists) | true     | A list of links for the row |

## PoweredBy

| Name | Type   | Required | Description                                                                 |
| ---- | ------ | -------- | --------------------------------------------------------------------------- |
| logo | string | true     | The name of the organisation SVG logo set by the `onsIcon()` macro          |
| alt  | string | true     | The text for the HTML `<title>` element for the SVG to describe the graphic |
