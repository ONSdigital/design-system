| Name  | Type                      | Required | Description                                                                                                                                           |
| ----- | ------------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| title | `Object<Title>`           | true     | An object containing title attributes for [the card’s title](#title).                                                                                 |
| image | `Object<Image>` or `true` | false    | An object containing path attributes for [the card’s image](#image). If value is `true` will show placeholder with root as `placeholderURL` base path |
| body  | `Object<Body>`            | true     | An object containing body attributes for [the card’s body](#body).                                                                                    |

## Image

| Name           | Type   | Required | Description                                                                                                          |
| -------------- | ------ | -------- | -------------------------------------------------------------------------------------------------------------------- |
| smallSrc       | string | true     | Path to the non-retina version of the image                                                                          |
| largeSrc       | string | false    | Path to the retina version of the image                                                                              |
| alt            | string | false    | The HTML `alt` tag to explain the appearance and function of the image. Not required if the image is only decorative |
| placeholderUrl | string | false    | Optional base path for placeholder image                                                                             |

## Title

| Name         | Type   | Required | Description                                                                   |
| ------------ | ------ | -------- | ----------------------------------------------------------------------------- |
| text         | string | true     | The text for the card title                                                   |
| headingLevel | int    | false    | Number used to determine the heading level of the card title. Defaults to `2` |
| classes      | string | false    | Font size classes for the card title. Defaults to `ons-u-fs-m`                |
| url          | string | true     | The URL for the title link `href` attribute                                   |
| id           | string | true     | The HTML `id` attribute for the card title                                    |

## Body

| Name      | Type                                                        | Required | Description                                                                               |
| --------- | ----------------------------------------------------------- | -------- | ----------------------------------------------------------------------------------------- |
| text      | string                                                      | true     | The excerpt text for the card element                                                     |
| id        | string                                                      | true     | The HTML `id` for the card text excerpt. Used for the card’s `aria-describedBy` attribute |
| itemsList | `Array<ListItem>` [_(ref)_](/foundations/typography/#lists) | false    | A list of links for child items of the card                                               |
