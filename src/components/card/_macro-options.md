| Name            | Type                      | Required | Description                                                                                                                                                             |
| --------------- | ------------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| title           | `Object<Title>`           | true     | An object containing title attributes for [the card’s title](#title).                                                                                                   |
| image           | `Object<Image>` or `true` | false    | An object containing path attributes for [the card’s image](#image). If value is `true` will show placeholder with root as `placeholderURL` base path                   |
| body            | `Object<Body>`            | true     | An object containing body attributes for [the card’s body](#body).                                                                                                      |
| variant         | string                    | false    | A single value to adjust the component using available variants: “feature”                                                                                              |
| figureAlignment | string                    | false    | Set to `"bottom"` on feature cards with a headline figure to align the figure and supporting content together at the bottom of each card. Figure tops align by default. |

For feature cards with a headline figure, the macro adds the following wrappers automatically. Content providers do not need to add them:

- `ons-card__heading` groups the image and title (inside the title link when provided) and optional subtitle.
- `ons-card__content` groups the figure, supporting text and optional list. Both alignments use two shared grid rows: heading and content. By default, the content group aligns to the top of its row so figure tops stay aligned, even when headings wrap. Supporting text stays immediately below its figure, so its position can differ when a figure wraps. With bottom alignment, the content group aligns to the bottom of each card, keeping supporting text bottom-aligned across a row even when it wraps. Figure bottoms can differ.

These wrappers are not added to standard cards or feature cards without a headline figure.

The content group uses a grid gap of `0.5rem` (8px at the default font size) between its figure, supporting text and optional list in both alignments. The body paragraph has no margins.

Add `ons-card-set--headline-figures` alongside the container's grid classes to enable headline figure alignment. No alignment parameter is needed for the default top alignment. The macro adds `ons-card--figure-bottom` to feature cards with a figure when `figureAlignment` is `"bottom"`; this selects bottom alignment for the content group within the headline figure card set.

The headline figure card set fills the available row with one, two or three cards. See [the default headline figures example](example-card-set-with-headline-figures.html) for short content with single-line figures, and [the long-content example](example-card-set-with-headline-figures-long-content.html) for wrapping headings, figures and supporting text. Both use the default top alignment. If an optional list is present, it stays with the supporting text and forms the bottom of the content group.

Both examples use figures including [Census 2021 household figures](https://www.ons.gov.uk/peoplepopulationandcommunity/householdcharacteristics/homeinternetandsocialmediausage/bulletins/householdandresidentcharacteristicsenglandandwales/census2021) and [alcohol-specific deaths registered in 2023](https://www.ons.gov.uk/peoplepopulationandcommunity/healthandsocialcare/causesofdeath/bulletins/alcoholrelateddeathsintheunitedkingdom/registeredin2023). The long-content example shows how supporting text moves down beneath a wrapping figure while figure tops remain aligned.

Bottom alignment remains available by setting `figureAlignment` to `"bottom"` on every card in a set. The previous default example is retained in `_example-card-set-with-headline-figures-bottom-aligned.njk` alongside the component as a reference, but is not listed on the card examples page.

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
