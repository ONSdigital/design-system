| Name             | Type                                              | Required                             | Description                                                                                |
| ---------------- | ------------------------------------------------- | ------------------------------------ | ------------------------------------------------------------------------------------------ |
| phase            | `PhaseBanner` [_(ref)_](/components/phase-banner) | false                                | Settings for the Phase banner component                                                    |
| fullWidth        | boolean                                           | false                                | Set the header to be the full width of the viewport                                        |
| logoHref         | string                                            | false                                | Path for the masthead logo link. Defaults to "/"                                           |
| logo             | string                                            | false                                | Path for the masthead logo. Defaults to "ons-logo-pos"                                     |
| mobileLogo       | string                                            | false                                | Path for the mobile version of the logo. Defaults to "ons-logo-stacked-pos"                |
| language         | `Language` [_(ref)_](/patterns/change-language)   | false                                | Settings for the language selector component                                               |
| serviceLinks     | `Array<Navigation>` [_(ref)_](#navigation)        | false                                | An array to render the service links list                                                  |
| title            | string                                            | true                                 | The title for the service                                                                  |
| desc             | string                                            | false                                | Tagline/description for the service                                                        |
| button           | `Button` [_(ref)_](/components/button)            | false                                | Settings for save and sign out using the button component                                  |
| navigation       | `Array<Navigation>` [_(ref)_](#navigation)        | false                                | An array of navigation links                                                               |
| titleAsH1        | boolean                                           | false                                | Override to render the header title as a H1                                                |
| titleLogo        | string                                            | false                                | URL for image to use instead of a title string                                             |
| titleLogoAlt     | string                                            | false (if `titleLogo` not specified) | Alt tag for the title logo                                                                 |
| titleLogoHref    | string                                            | false                                | Will wrap the title logo in a link to the specified URL                                    |
| customHeaderLogo | string                                            | false                                | Set to 'true' to make the masthead taller to accommodate a logo with a taller aspect ratio |
| wide             | boolean                                           | false                                | If set to true will set a wider page style by adding css to the container                  |

## Navigation

| Name                   | Type                                                        | Required | Description                                                                                                                                 |
| ---------------------- | ----------------------------------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| currentPath            | string                                                      | true     | Path to the default active page                                                                                                             |
| currentPageTitle       | string                                                      | false    | Page title to be used in sub navigation mobile menu                                                                                         |
| classes                | string                                                      | false    | Additional css classes for the navigation element                                                                                           |
| id                     | string                                                      | true     | A unique ID for the navigation element                                                                                                      |
| ariaLabel              | string                                                      | false    | The aria-label added to the navigation element. Defaults to `Main menu` or `Service links navigation` if set with serviceLinks param        |
| itemsList              | `Array<Item>` [_(ref)_](#item)                              | true     | An array of list items to render in the navigation element                                                                                  |
| siteBasePath           | string                                                      | false    | If the base path for your site is not `/` (i.e. in a prototype), you can use this to get the active functionality working on your Home link |
| toggleNavigationButton | `toggleNavigationButton` [_(ref)_](#toggleNavigationButton) | true     | Configuration for the mobile navigation toggle button                                                                                       |
| subNavigation          | `subNavigation` [_(ref)_](#subNavigation)                   | false    | An array of sub navigation links                                                                                                            |

## toggleNavigationButton

| Name      | Type   | Required | Description                                                        |
| --------- | ------ | -------- | ------------------------------------------------------------------ |
| text      | string | true     | Text to be displayed on toggle button                              |
| ariaLabel | string | false    | Aria label for toggle button. Defaults to `Toggle main navigation` |

## subNavigation

| Name         | Type                           | Required | Description                                                                    |
| ------------ | ------------------------------ | -------- | ------------------------------------------------------------------------------ |
| currentPath  | string                         | true     | Path to the default active page                                                |
| id           | string                         | true     | A unique ID for the sub navigation element                                     |
| ariaLabel    | string                         | false    | The aria-label added to the sub navigation element. Defaults to `Section menu` |
| itemsList    | `Array<Item>` [_(ref)_](#item) | true     | An array of list items to render in the navigation element                     |
| overviewURL  | string                         | true     | URL to the overview page. Only shown on mobile menu                            |
| overviewText | string                         | false    | Text for the overview page link. Defaults to "Overview"                        |

## Item

| Name     | Type                                 | Required | Description                                                     |
| -------- | ------------------------------------ | -------- | --------------------------------------------------------------- |
| classes  | string                               | false    | Additional css classes for the navigation element               |
| url      | string                               | true     | The path to the linked page                                     |
| title    | string                               | true     | The text for the link                                           |
| id       | string                               | false    | The id for the link                                             |
| sections | `Array<Section>` [_(ref)_](#section) | false    | An array of section items of an item. Only shown on mobile menu |

## Section

| Name         | Type                             | Required | Description                                     |
| ------------ | -------------------------------- | -------- | ----------------------------------------------- |
| sectionTitle | string                           | false    | The text for a heading for the section children |
| children     | `Array<Child>` [_(ref)_](#child) | false    | An array of child list items of an section      |

## Child

| Name  | Type   | Required | Description                |
| ----- | ------ | -------- | -------------------------- |
| url   | string | true     | The url to the linked page |
| title | string | true     | The text for the link      |
| id    | string | false    | The id for the link        |
