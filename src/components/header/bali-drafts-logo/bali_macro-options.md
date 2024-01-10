## MastheadLogoStacked

| Name                   | Type   | Required | Description                                                                       |
| ---------------------- | ------ | -------- | --------------------------------------------------------------------------------- |
| mastheadLogoStackedUrl | string | false    | Wraps the logo in a link. Set the URL for the HTML `href` attribute for the link. |
| small                  | HTML   | true     | Provide a version of the logo to fit alongside other logos                        |

## MastheadLogoStackedArray

<!-- does the below work to set up MastheadLogoStacked as the required type - is it an object or an array ?? -->

| Name   | Type                          | Required | Description |
| ------ | ----------------------------- | -------- | ----------- |
| Logo 1 | object`<MastheadLogoStacked>` | true     | First Logo  |
| Logo 2 | object`<MastheadLogoStacked>` | true     | Second Logo |
| Logo 3 | object`<MastheadLogoStacked>` | false    | Third Logo  |

| mastheadLogoUrl | string | false | Wraps the logo in a link. Set the URL for the HTML `href` attribute for the link. |

## MastheadLogoStack

| Name    | Type   | Required | Description                                                                    |
| ------- | ------ | -------- | ------------------------------------------------------------------------------ |
| classes | string | false    | Classes to be added. Helpful to add a margin utility class to control spacing. |
| small   | HTML   | false    | Provide an image that will fit alongside other logos                           |
