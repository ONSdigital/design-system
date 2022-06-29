| Name         | Type                                                        | Required | Description                                                                                                                                           |
| ------------ | ----------------------------------------------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| title        | string                                                      | true     | The title for the card heading                                                                                                                        |
| titleSize    | string                                                      | false    | Number used to determine the heading level of the card title. Defaults to `2`                                                                         |
| titleClasses | string                                                      | false    | Font size classes for the card heading. Defaults to `ons-u-fs-m`                                                                                      |
| url          | string                                                      | true     | The URL for the title link `href` attribute                                                                                                           |
| id           | string                                                      | true     | The HTML `id` attribute for the card heading                                                                                                          |
| text         | string                                                      | true     | The excerpt text for the card element                                                                                                                 |
| textId       | string                                                      | true     | The HTML `id` for the card text excerpt. Used for the card’s `aria-describedBy` attribute                                                             |
| image        | `Object<Image>` or `true`                                   | false    | An object containing path attributes for [the card’s image](#image). If value is `true` will show placeholder with root as `placeholderURL` base path |
| itemsList    | `Array<ListItem>` [_(ref)_](/foundations/typography/#lists) | false    | A list of links for child items of the card                                                                                                           |

## Image

| Name           | Type   | Required | Description                                                                                                          |
| -------------- | ------ | -------- | -------------------------------------------------------------------------------------------------------------------- |
| smallSrc       | string | true     | Path to the non-retina version of the image                                                                          |
| largeSrc       | string | false    | Path to the retina version of the image                                                                              |
| alt            | string | false    | The HTML `alt` tag to explain the appearance and function of the image. Not required if the image is only decorative |
| placeholderURL | string | false    | Optional base path for placeholder image                                                                             |
