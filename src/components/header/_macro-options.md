| Name         | Type                                               | Required | Description                                               |
| ------------ | -------------------------------------------------- | -------- | --------------------------------------------------------- |
| phase        | `PhaseBanner` [_(ref)_](/components/phase-banner)  | false    | Settings for the Phase banner component                   |
| fullWidth    | boolean                                            | false    | Set the header to be the full width of the viewport       |
| logoHref     | string                                             | false    | Path for the logo link. Defaults to "/"                   |
| logo         | string                                             | false    | Path for the logo. Defaults to "ons-logo-pos"             |
| language     | `Language` [_(ref)_](/patterns/language-selection) | false    | Settings for the language selection component             |
| serviceLinks | `Array<Navigation>`                                | false    | An array to render the service links list                 |
| title        | string                                             | true     | The title for the service                                 |
| desc         | string                                             | false    | Tagline/description for the service                       |
| button       | `Button` [_(ref)_](/components/button)             | false    | Settings for save and sign out using the button component |
| navigation   | `Array<Navigation>`                                | false    | An array to render the main navigation                    |

## Navigation

| Name          | Type          | Required | Description                                                |
| ------------- | ------------- | -------- | ---------------------------------------------------------- |
| currentPath   | string        | true     | Path to the default active page                            |
| classes       | string        | false    | Additional css classes for the navigation element          |
| id            | string        | true     | A unique ID for the navigation element                     |
| ariaLabel     | string        | true     | The aria-label added to the navigation element             |
| ariaListLabel | string        | true     | The aria-label added to the navigation list                |
| itemsList     | `Array<Item>` | true     | An array of list items to render in the navigation element |

## Item

| Name    | Type   | Required | Description                                       |
| ------- | ------ | -------- | ------------------------------------------------- |
| classes | string | false    | Additional css classes for the navigation element |
| path    | string | true     | The path to the linked page                       |
| title   | string | true     | The text for the link                             |
