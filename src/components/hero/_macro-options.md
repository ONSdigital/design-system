| Name            | Type                                             | Required | Description                                                |
| --------------- | ------------------------------------------------ | -------- | ---------------------------------------------------------- |
| censusThemeDark | boolean                                          | false    | Setting to true sets the census adds the census dark theme |
| censusTheme     | boolean                                          | false    | Setting to true sets the census adds the census theme      |
| preTitleImage   | `Array<PreTitleImage>`                           | false    | Name of image to be put above title                        |
| placeholderURL  | string                                           | false    | Path to preTitleImage                                      |
| title           | string                                           | true     | Text for the hero title                                    |
| subtitle        | string                                           | false    | Text for the hero subtitle                                 |
| text            | string                                           | false    | Text to go under the hero title/subtitle                   |
| button          | `Button` [_(ref)_](/components/button)           | false    | Configuration for the hero button                          |
| collapsible     | `Collapsible` [_(ref)_](/components/collapsible) | false    | Configuration for the hero collapsible                     |
| suffixText      | string                                           | false    | Text to appear at the bottom of the hero                   |
| image           | `Array<Image>`                                   | false    | Hero main image to be placed in circular aperture          |

## Image

| Name     | Type   | Required | Description                                 |
| -------- | ------ | -------- | ------------------------------------------- |
| smallSrc | string | false    | Path to the small version of the hero image |
| largeSrc | string | false    | Path to the large version of the hero image |

## PreTitleImage

| Name | Type   | Required | Description                         |
| ---- | ------ | -------- | ----------------------------------- |
| alt  | string | false    | Alt text for the pre title image    |
| name | string | false    | The filename of the pre title image |
