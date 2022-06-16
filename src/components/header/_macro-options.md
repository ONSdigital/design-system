<<<<<<< HEAD
| Name | Type | Required | Description |
| ---------------- | ------------------------------------------------- | --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| phase | `PhaseBanner` [_(ref)_](/components/phase-banner) | false | Settings to set the Phase banner component within the HTML `<header>` element |
| wide | boolean | false | Set to “true” to increase the maximum width of the layout container to 1280px |
| fullWidth | boolean | false | Set to “true” to make the header the full width of the viewport |
| variants | array or string | false | An array of values or single value (string) to adjust the component using available variants: “internal” and “description” |
| logoHref | string | false | Wraps the masthead logo in a link. Set the URL for the HTML `href` attribute for the link. |
| logo | string | false | The name of an alternative masthead SVG logo set with the `onsIcon()` macro. Defaults to “ons-logo-pos-`{current language ISO code}`”. |
| mobileLogo | string | false | The name of the mobile version of an alternative masthead SVG logo set by the `onsIcon()` macro. Defaults to “ons-logo-stacked-pos-`{current language ISO code}`”. |
| logoAlt | string | false (unless `logo` is set) | The text for the HTML `<title>` element for the SVG to describe the graphic |
| language | `Language` [_(ref)_](/patterns/change-language) | false | Settings for the language selector component |
| serviceLinks | object`<ServiceLinks>` | false | Settings for the [service links](#servicelinks) in the masthead |
| title | string | true (unless `titleLogo` is set) | The title for the service |
| description | string | false | Tagline or description for the service |
| titleAsH1 | boolean | false | Override to wrap the header `title` in an `<h1>` heading |
| titleLogo | string | false | The name of an SVG logo to use instead of a title string set with the `onsIcon()` macro. |
| titleLogoAlt | string | false (unless `titleLogo` is set) | The text for the HTML `<title>` element for the SVG to describe the graphic |
| titleLogoHref | string | false | Wraps the title logo in a link. Set the URL for the HTML `href` attribute for the link. |
| button | object`<SignOutButton>` | false | Settings for the [sign out button](#signoutbutton) in the header used to exit a transactional service |
| navigation | array`<Navigation>` | false | Settings for the [main menu links](#navigation) |
| customHeaderLogo | string | false | Set to “true” to make the masthead taller to accommodate [a logo with a taller aspect ratio](#custom-organisation-logo) |
=======
| Name | Type | Required | Description |
| ---------------- | ------------------------------------------------- | ------------------------------------ | -------------------------------------------------------------------------------------------------------------------------- |
| phase | `PhaseBanner` [_(ref)_](/components/phase-banner) | false | Settings for the Phase banner component |
| fullWidth | boolean | false | Set the header to be the full width of the viewport |
| variants | array or string | false | An array of values or single value (string) to adjust the component using available variants: “internal” and “description” |
| logoHref | string | false | Path for the masthead logo link. Defaults to "/" |
| logo | string | false | Path for the masthead logo. Defaults to "ons-logo-en/cy" |
| mobileLogo | string | false | Path for the mobile version of the logo. Defaults to "ons-logo-stacked-pos" |
| language | `Language` [_(ref)_](/patterns/change-language) | false | Settings for the language selector component |
| serviceLinks | `Array<Navigation>` [_(ref)_](#servicelinks) | false | An array to render the service links list |
| title | string | true | The title for the service |
| description | string | false | Tagline/description for the service |
| button | `Button` [_(ref)_](/components/button) | false | Settings for save and sign out using the button component |
| navigation | `Array<Navigation>` [_(ref)_](#navigation) | true (if `toggleButton` supplied) | An array of all navigation links |
| titleAsH1 | boolean | false | Override to render the header title as a H1 |
| titleLogo | string | false | URL for image to use instead of a title string |
| titleLogoAlt | string | false (if `titleLogo` not specified) | Alt tag for the title logo |
| titleLogoHref | string | false | Will wrap the title logo in a link to the specified URL |
| customHeaderLogo | string | false | Set to 'true' to make the masthead taller to accommodate a logo with a taller aspect ratio |
| wide | boolean | false | Set to `true` to increase the maximum width of the layout container to 1280px. |

> > > > > > > 39f025c03ebabeb91a42f5587c1400a81b17defb

## ServiceLinks

| Name                 | Type                   | Required | Description                                                                                                                           |
| -------------------- | ---------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| id                   | string                 | true     | The HTML `id` of the `<nav>` element. Used for the `aria-controls` attribute for the menu toggle button displayed on small viewports. |
| classes              | string                 | false    | Classes to add to the `<nav>` element                                                                                                 |
| ariaLabel            | string                 | false    | The `aria-label` attribute added to the `<nav>` element. Defaults to “Service links navigation”.                                      |
| ariaListLabel        | string                 | false    | The `aria-label` attribute added to the `<ul>` element. Defaults to “Service links”.                                                  |
| itemsList            | array`<Item>`          | true     | Settings for an array of [list items](#item) for each navigation link                                                                 |
| toggleServicesButton | object`<ToggleButton>` | true     | Settings for the [mobile service links toggle button](#togglebutton)                                                                  |

## Navigation

<<<<<<< HEAD
| Name | Type | Required | Description |
| ------------ | --------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| id | string | true | The HTML `id` of the `<nav>` element. Used for the `aria-controls` attribute for the menu button displayed on small viewports. |
| ariaLabel | string | false | The `aria-label` attribute added to the `<nav>` element. Defaults to “Main menu”. |
| itemsList | array`<Item>` | true | Settings for an array of [list items](#item) for each navigation link |
| siteBasePath | string | false | If the root path for your site is not `/` (i.e. if using the prototype kit), you can set this path to the home page to set the active page |
| currentPath | string | true | The path of the current active page |
| toggleButton | array`<ToggleButton>` | true | Settings for the navigation [menu toggle button](#togglebutton) displayed on small viewports |

## ToggleButton

| Name      | Type   | Required | Description                                                                  |
| --------- | ------ | -------- | ---------------------------------------------------------------------------- |
| text      | string | false    | The text for the toggle button label. Defaults to “Menu”.                    |
| ariaLabel | string | false    | The `aria-label` attribute for the toggle button. Defaults to “Toggle menu”. |

## Item

| Name    | Type   | Required | Description                                                           |
| ------- | ------ | -------- | --------------------------------------------------------------------- |
| classes | string | false    | Classes to add to the list item element                               |
| url     | string | true     | The URL for the HTML `href` attribute for the path to the linked page |
| title   | string | true     | The text label for the link                                           |
| id      | string | false    | The HTML `id` of the link                                             |

## SignOutButton

| Name         | Type   | Required | Description                                                                                            |
| ------------ | ------ | -------- | ------------------------------------------------------------------------------------------------------ |
| text         | string | true     | Text for the button                                                                                    |
| name         | string | false    | Sets the HTML `name` attribute for the `<button>`. Not valid if `url` is set.                          |
| url          | string | false    | If set, will create an HTML anchor link with the required classes and attributes                       |
| iconType     | string | false    | Adds an icon to the button, before the label, by setting the [icon type](/foundations/icons#icon-type) |
| iconPosition | string | false    | Sets the [icon position](/foundations/icons#icon-position) of the button                               |
| attributes   | object | false    | HTML attributes (for example, data attributes) to add to the button                                    |

=======
| Name | Type | Required | Description |
| ------------ | ---------------------------------------------- | ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| currentPath | string | true | Path to the default active page |
| classes | string | false | Additional css classes for the navigation element |
| id | string | true | A unique ID for the navigation element |
| ariaLabel | string | false | The aria-label added to the navigation element. Defaults to `Main menu` |
| itemsList | `Array<Item>` [_(ref)_](#item) | true | An array of list items to render in the navigation element |
| siteBasePath | string | false | If the base path for your site is not `/` (i.e. in a prototype), you can use this to get the active functionality working on your Home link |
| toggleButton | `Array<ToggleButton>` [_(ref)_](#togglebutton) | true (if `navigation` supplied) | Configuration for the mobile navigation toggle button |

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

> > > > > > > 39f025c03ebabeb91a42f5587c1400a81b17defb
