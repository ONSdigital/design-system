| Name            | Type                      | Required | Description                                                                                                                                                             |
| --------------- | ------------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| title           | `Object<Title>`           | true     | An object containing title attributes for [the card’s title](#title).                                                                                                   |
| image           | `Object<Image>` or `true` | false    | An object containing path attributes for [the card’s image](#image). If value is `true` will show placeholder with root as `placeholderURL` base path                   |
| body            | `Object<Body>`            | true     | An object containing body attributes for [the card’s body](#body).                                                                                                      |
| variant         | string                    | false    | A single value to adjust the component using available variants: “feature”                                                                                              |
| figureAlignment | string                    | false    | Set to `"top"` on feature cards with a headline figure to align the tops of the figures and keep body text immediately below each figure. Defaults to bottom alignment. |

For feature cards with a headline figure, the macro groups the title and subtitle automatically so the example card set can align figures with CSS grid. Content providers do not need to add this wrapper.

The headline figure card set fills the available row with one, two or three cards. Set `figureAlignment` to `"top"` on every card in a set to align the tops of figures instead of their bottoms; see the top-aligned figures example for a wrapping figure.

Headline figure card sets use the container's responsive grid gutters for horizontal spacing, including the wider gutters in wide containers.

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
| subtitle     | string | false    | The text for the card subtitle                                                |
| headingLevel | int    | false    | Number used to determine the heading level of the card title. Defaults to `2` |
| classes      | string | false    | Font size classes for the card title. Defaults to `ons-u-fs-m`                |
| url          | string | false    | The URL for the title link `href` attribute                                   |
| id           | string | true     | The HTML `id` attribute for the card title                                    |

## Body

| Name      | Type                                                        | Required | Description                                                                               |
| --------- | ----------------------------------------------------------- | -------- | ----------------------------------------------------------------------------------------- |
| figure    | string                                                      | false    | Headline figure for the card element                                                      |
| text      | string                                                      | true     | The excerpt text for the card element                                                     |
| id        | string                                                      | true     | The HTML `id` for the card text excerpt. Used for the card’s `aria-describedBy` attribute |
| itemsList | `Array<ListItem>` [_(ref)_](/foundations/typography/#lists) | false    | A list of links for child items of the card                                               |
