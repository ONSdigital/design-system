| Name     | Type       | Required | Description                                                                                 |
| -------- | ---------- | -------- | ------------------------------------------------------------------------------------------- |
| title    | string     | true     | The title for the article                                                                   |
| excerpt  | string     | true     | A short extract of text (for example, a short sentence to give some context of the article) |
| url      | string     | true     | The url for the link                                                                        |
| featured | boolean    | false    | Will render a featured version of the article if set to `true`                              |
| classes  | string     | false    | Custom classes to add to the article                                                        |
| image    | `Image`    | false    | An object containing path and filename attributes for the image                             |
| date     | `Date`     | true     | An object containing friendly date and system date formats                                  |
| category | `Category` | true     | An object containing category name and url                                                  |

## Image

| Name     | Type   | Required | Description                                                 |
| -------- | ------ | -------- | ----------------------------------------------------------- |
| smallSrc | string | true     | Path to the non-retina version of the image                 |
| largeSrc | string | true     | Path to the retina version of the image                     |
| alt      | string | true     | Alt tag to explain the appearance and function of the image |

## Date

| Name  | Type   | Required | Description                                         |
| ----- | ------ | -------- | --------------------------------------------------- |
| short | string | true     | Short format of the date (for example, 20 May 2020) |
| iso   | string | true     | ISO format of the date (for example, 2020-05-20)    |

## Category

| Name  | Type   | Required | Description                                                                |
| ----- | ------ | -------- | -------------------------------------------------------------------------- |
| title | string | true     | Category in which this article is associated (for example, Press releases) |
| url   | string | false    | The url for the category                                                   |
