| Name            | Type                                             | Required | Description                                                               |
| --------------- | ------------------------------------------------ | -------- | ------------------------------------------------------------------------- |
| censusTheme     | boolean                                          | false    | Set to `true` for the census theme                                        |
| censusThemeDark | boolean                                          | false    | Set to `true` for census dark theme                                       |
| wide            | boolean                                          | false    | Set to `true` when using the `wide` page layout container                 |
| preTitleImage   | `Array<PreTitleImage>`                           | false    | Settings for the [image before the title](#pretitleimage)                 |
| placeholderURL  | string                                           | false    | Base path to `preTitleImage` folder                                       |
| title           | string                                           | true     | Text for the hero title                                                   |
| subtitle        | string                                           | false    | Text for the hero subtitle                                                |
| text            | string                                           | false    | Text to follow the hero title and subtitle                                |
| button          | `Object<Button>`                                 | false    | Settings for the hero [call to action button](#button)                    |
| collapsible     | `Collapsible` [_(ref)_](/components/collapsible) | false    | Settings to use the collapsible component in the hero                     |
| suffixText      | string                                           | false    | HTML to appear at the bottom of the hero                                  |
| image           | `Array<Image>`                                   | false    | Settings for the hero [main image](#image) displayed in circular aperture |

## Image

| Name     | Type   | Required | Description                                        |
| -------- | ------ | -------- | -------------------------------------------------- |
| smallSrc | string | true     | Path to the small version of the hero image        |
| largeSrc | string | false    | Path to the large retina version of the hero image |

## Button

| Name    | Type   | Required | Description                  |
| ------- | ------ | -------- | ---------------------------- |
| text    | string | true     | Text for the button label    |
| url     | string | true     | URL for the button           |
| classes | string | false    | Classes to add to the button |

## PreTitleImage

| Name | Type   | Required | Description                         |
| ---- | ------ | -------- | ----------------------------------- |
| alt  | string | true     | Alt text for the pre title image    |
| name | string | true     | The filename of the pre title image |
