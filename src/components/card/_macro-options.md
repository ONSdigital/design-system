| Name            | Type                      | Required | Description                                                                                                                                                             |
| --------------- | ------------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| title           | `Object<Title>`           | true     | An object containing title attributes for [the card’s title](#title).                                                                                                   |
| image           | `Object<Image>` or `true` | false    | An object containing path attributes for [the card’s image](#image). If value is `true` will show placeholder with root as `placeholderURL` base path                   |
| body            | `Object<Body>`            | true     | An object containing body attributes for [the card’s body](#body).                                                                                                      |
| variant         | string                    | false    | A single value to adjust the component using available variants: “feature”                                                                                              |
| figureAlignment | string                    | false    | Set to `"top"` on feature cards with a headline figure to align the tops of the figures and keep body text immediately below each figure. Defaults to bottom alignment. |

For feature cards with a headline figure, the macro adds the following wrappers automatically. Content providers do not need to add them:

- `ons-card__heading` groups the image and title (inside the title link when provided) and optional subtitle.
- `ons-card__content` groups the supporting text and optional list. With default bottom alignment, the figure stays outside this wrapper so headings, figures and supporting content occupy three shared grid rows. With top alignment, the wrapper also includes the figure so each card's supporting text follows its figure, using two shared grid rows.

These wrappers are not added to standard cards or feature cards without a headline figure.

Add `ons-card-set--headline-figures` alongside the container's grid classes to enable headline figure alignment. The macro adds `ons-card--figure-top` to feature cards with a figure when `figureAlignment` is `"top"`; this selects the two-row layout within the headline figure card set.

The headline figure card set fills the available row with one, two or three cards. Set `figureAlignment` to `"top"` on every card in a set to align the tops of figures instead of their bottoms; see [the top-aligned headline figures example](example-card-set-with-headline-figures-top-aligned.html) for a wrapping figure.

Headline figure card sets use the container's responsive grid gutters for both horizontal and vertical spacing, including between wrapped rows and the wider gutters in wide containers. On mobile, where the horizontal gutter is zero, stacked cards retain a `1rem` vertical gap.

On feature cards, providing `title.url` adds `ons-card--linked`, making the whole tile clickable using the title link. The headline is blue and underlined; hovering anywhere over the tile adds a pale-blue background. Focus and active states use a yellow background and dark outline, keeping the headline underlined. Cards without a title URL remain non-interactive, and standard cards retain their title-only links. Any additional links within a feature card remain independently clickable.

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
