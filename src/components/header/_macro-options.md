| Name             | Type                                              | Required                             | Description                                                                                                         |
| ---------------- | ------------------------------------------------- | ------------------------------------ | ------------------------------------------------------------------------------------------------------------------- |
| phase            | `PhaseBanner` [_(ref)_](/components/phase-banner) | false                                | Settings for the Phase banner component                                                                             |
| fullWidth        | boolean                                           | false                                | Set the header to be the full width of the viewport                                                                 |
| variants         | array or string                                   | false                                | An array of values or single value (string) to adjust the 'header' using available variants - internal, description |
| logoHref         | string                                            | false                                | Path for the masthead logo link. Defaults to "/"                                                                    |
| logo             | string                                            | false                                | Path for the masthead logo. Defaults to "ons-logo-pos"                                                              |
| mobileLogo       | string                                            | false                                | Path for the mobile version of the logo. Defaults to "ons-logo-stacked-pos"                                         |
| language         | `Language` [_(ref)_](/patterns/change-language)   | false                                | Settings for the language selector component                                                                        |
| serviceLinks     | `Array<Navigation>` [_(ref)_](#servicelinks)      | false                                | An array to render the service links list                                                                           |
| title            | string                                            | true                                 | The title for the service                                                                                           |
| desc             | string                                            | false                                | Tagline/description for the service                                                                                 |
| button           | `Button` [_(ref)_](/components/button)            | false                                | Settings for save and sign out using the button component                                                           |
| navigation       | `Array<Navigation>` [_(ref)_](#navigation)        | true (if `toggleButton` supplied)    | An array of all navigation links                                                                                    |
| titleAsH1        | boolean                                           | false                                | Override to render the header title as a H1                                                                         |
| titleLogo        | string                                            | false                                | URL for image to use instead of a title string                                                                      |
| titleLogoAlt     | string                                            | false (if `titleLogo` not specified) | Alt tag for the title logo                                                                                          |
| titleLogoHref    | string                                            | false                                | Will wrap the title logo in a link to the specified URL                                                             |
| customHeaderLogo | string                                            | false                                | Set to 'true' to make the masthead taller to accommodate a logo with a taller aspect ratio                          |
| wide             | boolean                                           | false                                | If set to true will set a wider page style by adding css to the container                                           |

## ServiceLinks

| Name                 | Type                                           | Required                          | Description                                                                            |
| -------------------- | ---------------------------------------------- | --------------------------------- | -------------------------------------------------------------------------------------- |
| id                   | string                                         | true                              | A unique ID for the navigation element                                                 |
| ariaLabel            | string                                         | false                             | The aria-label added to the navigation element. Defaults to `Service links navigation` |
| itemsList            | `Array<Item>` [_(ref)_](#item)                 | true                              | An array of list items to render in the navigation element                             |
| toggleServicesButton | `Array<ToggleButton>` [_(ref)_](#togglebutton) | true (if `serviceLinks` supplied) | Configuration for the mobile service links toggle button                               |

## Navigation

| Name         | Type                                           | Required                        | Description                                                                                                                                 |
| ------------ | ---------------------------------------------- | ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| currentPath  | string                                         | true                            | Path to the default active page                                                                                                             |
| classes      | string                                         | false                           | Additional css classes for the navigation element                                                                                           |
| id           | string                                         | true                            | A unique ID for the navigation element                                                                                                      |
| ariaLabel    | string                                         | false                           | The aria-label added to the navigation element. Defaults to `Main menu`                                                                     |
| itemsList    | `Array<Item>` [_(ref)_](#item)                 | true                            | An array of list items to render in the navigation element                                                                                  |
| siteBasePath | string                                         | false                           | If the base path for your site is not `/` (i.e. in a prototype), you can use this to get the active functionality working on your Home link |
| toggleButton | `Array<ToggleButton>` [_(ref)_](#togglebutton) | true (if `navigation` supplied) | Configuration for the mobile navigation toggle button                                                                                       |

## ToggleButton

| Name      | Type   | Required | Description                                               |
| --------- | ------ | -------- | --------------------------------------------------------- |
| text      | string | true     | Text to be displayed on toggle button. Defaults to `Menu` |
| ariaLabel | string | false    | Aria label for toggle button. Defaults to `Toggle menu`   |

## Item

| Name    | Type   | Required | Description                                       |
| ------- | ------ | -------- | ------------------------------------------------- |
| classes | string | false    | Additional css classes for the navigation element |
| path    | string | true     | The path to the linked page                       |
| title   | string | true     | The text for the link                             |
| id      | string | false    | The id for the link                               |
