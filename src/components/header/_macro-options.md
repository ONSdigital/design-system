| Name                  | Type                                              | Required                         | Description                                                                                                                           |
| --------------------- | ------------------------------------------------- | -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| phase                 | `PhaseBanner` [_(ref)_](/components/phase-banner) | false                            | Settings to set the Phase banner component within the HTML `<header>` element                                                         |
| wide                  | boolean                                           | false                            | Set to “true” to increase the maximum width of the layout container to 1280px                                                         |
| fullWidth             | boolean                                           | false                            | Set to “true” to increase the maximum width of the layout container to the full width of the viewport                                 |
| classes               | string                                            | false                            | Classes to add to the wrapping `header`                                                                                               |
| variants              | array or string                                   | false                            | An array of values or single value (string) to adjust the component using available variants: “internal”, "neutral" and “description” |
| mastheadLogoUrl       | string                                            | false                            | Wraps the masthead logo in a link. Set the URL for the HTML `href` attribute for the link.                                            |
| mastheadLogo          | object`<MastheadLogo>`                            | false                            | Settings for a [custom organisation logo](#mastheadlogo) in the masthead. Defaults to the ONS logo.                                   |
| language              | object`<Language>`                                | false                            | Settings for the [language selector](#language)                                                                                       |
| serviceLinks          | object`<ServiceLinks>`                            | false                            | Settings for the [service links](#servicelinks) in the masthead                                                                       |
| title                 | string                                            | true (unless `titleLogo` is set) | The title for the service                                                                                                             |
| description           | string                                            | false                            | Tagline or description for the service                                                                                                |
| titleAsH1             | boolean                                           | false                            | Override to wrap the header `title` in an `<h1>` heading                                                                              |
| titleLogo             | object`<TitleLogo>`                               | false                            | Settings for a [custom title logo](#titlelogo) in the header.                                                                         |
| titleUrl              | string                                            | false                            | Wraps the title logo in a link. Set the URL for the HTML `href` attribute for the link.                                               |
| button                | object`<SignOutButton>`                           | false                            | Settings for the [sign out button](#signoutbutton) in the header used to exit a transactional service                                 |
| navigation            | array`<Navigation>`                               | false                            | Settings for the [main menu links](#navigation)                                                                                       |
| siteSearchAutosuggest | `Autosuggest` [_(ref)_](/components/autosuggest)  | false                            | Sets the autosuggest functionality in the header                                                                                      |

## MastheadLogo

| Name          | Type                    | Required | Description                                                                    |
| ------------- | ----------------------- | -------- | ------------------------------------------------------------------------------ |
| classes       | string                  | false    | Classes to be added. Helpful to add a margin utility class to control spacing. |
| large         | HTML                    | false    | Any HTML to render an image for example embedded `<svg>` or `<img>`            |
| small         | HTML                    | false    | Optionally provide a version of the logo more suited to mobile viewports       |
| multipleLogos | object`<MultipleLogos>` | false    | Allows for up to three logos to be used in the masthead.                       |

## MultipleLogos

| Name  | Type           | Required | Description |
| ----- | -------------- | -------- | ----------- |
| logo1 | object`<Logo>` | true     | First Logo  |
| logo2 | object`<Logo>` | false    | Second Logo |
| logo3 | object`<Logo>` | false    | Third Logo  |

## Logo

| Name      | Type           | Required | Description                                                                                                   |
| --------- | -------------- | -------- | ------------------------------------------------------------------------------------------------------------- |
| logoImage | HTML or string | false    | Any HTML to render an image for example embedded `<svg>` or `<img>`. Use 'ONS Logo' for the default ONS icon. |
| logoUrl   | string         | false    | Wraps the masthead logo in a link. Set the URL for the HTML `href` attribute for the link.                    |

## TitleLogo

| Name    | Type   | Required | Description                                                                    |
| ------- | ------ | -------- | ------------------------------------------------------------------------------ |
| classes | string | false    | Classes to be added. Helpful to add a margin utility class to control spacing. |
| large   | HTML   | true     | Any HTML to render an image for example embedded `<svg>` or `<img>`            |
| small   | HTML   | false    | Optionally provide a version of the logo more suited to mobile viewports       |

## ServiceLinks

| Name                 | Type                   | Required | Description                                                                                                                           |
| -------------------- | ---------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| id                   | string                 | true     | The HTML `id` of the `<nav>` element. Used for the `aria-controls` attribute for the menu toggle button displayed on small viewports. |
| classes              | string                 | false    | Classes to add to the `<nav>` element                                                                                                 |
| ariaLabel            | string                 | false    | The `aria-label` attribute added to the `<nav>` element. Defaults to “Service links navigation”.                                      |
| ariaListLabel        | string                 | false    | The `aria-label` attribute added to the `<ul>` element. Defaults to “Service links”.                                                  |
| itemsList            | array`<Item>`          | true     | Settings for an array of [list items](#item) for each navigation link                                                                 |
| toggleServicesButton | object`<ToggleButton>` | true     | Settings for the [mobile service links toggle button](#togglebutton)                                                                  |

## Language

| Name      | Type               | Required | Description                                                  |
| --------- | ------------------ | -------- | ------------------------------------------------------------ |
| languages | array`<languages>` | true     | Settings for an array of [language toggle links](#languages) |

## Languages

| Name       | Type    | Required | Description                                                                                         |
| ---------- | ------- | -------- | --------------------------------------------------------------------------------------------------- |
| url        | string  | true     | URL to change the application language                                                              |
| ISOCode    | string  | true     | The ISO language code for the language                                                              |
| text       | string  | true     | The name of the language to display                                                                 |
| abbrText   | string  | false    | Abbreviated version of the language text can be provided. This will be displayed on small viewports |
| current    | boolean | true     | The current selected language                                                                       |
| attributes | object  | false    | HTML attributes (for example, data attributes) to add to the details element                        |

## Navigation

| Name                   | Type                      | Required | Description                                                                                                                    |
| ---------------------- | ------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------ |
| id                     | string                    | true     | The HTML `id` of the `<nav>` element. Used for the `aria-controls` attribute for the menu button displayed on small viewports. |
| ariaLabel              | string                    | false    | The `aria-label` attribute added to the `<nav>` element. Defaults to “Main menu”.                                              |
| itemsList              | array`<Item>`             | true     | Settings for an array of [list items](#item) for each navigation link                                                          |
| currentPath            | string or array`<string>` | true     | The path of the current active page. Multiple paths can be provided using an array to highlight nested navigation.             |
| toggleNavigationButton | array`<ToggleButton>`     | true     | Settings for the navigation [menu toggle button](#togglebutton) displayed on small viewports                                   |
| removeHorizontalSubNav | boolean                   | false    | Set to “true” to remove the sub navigation                                                                                     |
| subNavigation          | array`<subNavigation>`    | false    | Settings for the [sub navigation menu links](#subNavigation)                                                                   |

## ToggleButton

| Name      | Type   | Required | Description                                                                  |
| --------- | ------ | -------- | ---------------------------------------------------------------------------- |
| text      | string | false    | The text for the toggle button label. Defaults to “Menu”.                    |
| ariaLabel | string | false    | The `aria-label` attribute for the toggle button. Defaults to “Toggle menu”. |

## Item

| Name      | Type   | Required | Description                                                                                                                                                        |
| --------- | ------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| classes   | string | false    | Classes to add to the list item element                                                                                                                            |
| url       | string | true     | The URL for the HTML `href` attribute for the path to the linked page                                                                                              |
| text      | string | true     | The text label for the link                                                                                                                                        |
| id        | string | false    | The HTML `id` of the link                                                                                                                                          |
| ariaLabel | string | false    | The `aria-label` for the item.                                                                                                                                     |
| title     | string | false    | The title text for the list item element                                                                                                                           |
| iconType  | string | false    | Adds an icon to a service link item when set to the name of one of the [available icons](/foundations/icons#a-to-z). This is not compatible with navigation links. |

## SignOutButton

| Name       | Type   | Required | Description                                                                      |
| ---------- | ------ | -------- | -------------------------------------------------------------------------------- |
| text       | string | true     | Text for the button                                                              |
| name       | string | false    | Sets the HTML `name` attribute for the `<button>`. Not valid if `url` is set.    |
| url        | string | false    | If set, will create an HTML anchor link with the required classes and attributes |
| attributes | object | false    | HTML attributes (for example, data attributes) to add to the button              |

## SubNavigation

| Name                   | Type                      | Required | Description                                                                                                                    |
| ---------------------- | ------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------ |
| id                     | string                    | true     | The HTML `id` of the `<nav>` element. Used for the `aria-controls` attribute for the menu button displayed on small viewports. |
| ariaLabel              | string                    | false    | The `aria-label` attribute added to the `<nav>` element. Defaults to “Section menu”.                                           |
| itemsList              | array`<Item>`             | true     | Settings for an array of [list items](#item) for each navigation link                                                          |
| currentPath            | string or array`<string>` | true     | The path of the current active page. Multiple paths can be provided using an array to highlight nested navigation.             |
| removeHorizontalSubNav | boolean                   | false    | Set to “true” to remove the sub navigation                                                                                     |
