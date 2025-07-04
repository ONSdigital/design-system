| Name                       | Type                                                      | Required | Description                                                                                                                        |
| -------------------------- | --------------------------------------------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| variants                   | array or string                                           | false    | An array of values or single value (string) to adjust the component using available variant, “dark, navy-blue, grey and pale-blue” |
| wide                       | boolean                                                   | false    | Set to “true” when using the `wide` page layout container                                                                          |
| title                      | string                                                    | true     | Text for the hero title                                                                                                            |
| subtitle                   | string                                                    | false    | Text for the hero subtitle                                                                                                         |
| text                       | string                                                    | false    | Text to follow the hero title and subtitle                                                                                         |
| button                     | `Object<Button>`                                          | false    | Settings for the hero [call to action button](#button)                                                                             |
| html                       | string                                                    | false    | Allows arbitrary HTML for additional content to be added to the component                                                          |
| detailsColumns             | integer                                                   | false    | Number of grid columns for the hero to span on screens larger than the medium breakpoint, defaults to 8                            |
| descriptionList            | `DescriptionList` [_(ref)_](/components/description-list) | false    | Settings to set the DescriptionList component within the HTML `<hero>` element                                                     |
| officialStatisticsBadge    | boolean                                                   | false    | Set to “true” display the official statistics badge (only available for the "grey" hero variant)                                   |
| officialStatisticsBadgeUrl | string                                                    | false    | URL for the Statistics Badge                                                                                                       |
| topic                      | string                                                    | false    | Topic for the hero                                                                                                                 |
| breadcrumbs                | `Breadcrumbs` [_(ref)_](/components/breadcrumbs)          | false    | Settings to set the Breadcrumbs component within the HTML `<hero>` element                                                         |
| censusLogo                 | boolean                                                   | false    | Set to “true” display the census 2021 logo (only available for the "grey" hero variant)                                            |
| informationPanel           | `Object<InformationPanel>`                                | false    | Settings for the information panel (only available for the "grey" hero variant)                                                    |

## Button

| Name    | Type   | Required | Description                  |
| ------- | ------ | -------- | ---------------------------- |
| text    | string | true     | Text for the button label    |
| url     | string | true     | URL for the button           |
| classes | string | false    | Classes to add to the button |

## InformationPanel

| Name      | Type                | Required | Description                                                                                                      |
| --------- | ------------------- | -------- | ---------------------------------------------------------------------------------------------------------------- |
| panelText | string              | false    | Text for the panel                                                                                               |
| panelType | string              | false    | A single value to the colour of the information panel. Available colours: "ons-red", "ons-orange" or "ons-green" |
| PanelLink | `Object<PanelLink>` | false    | Settings for the panel link                                                                                      |

## PanelLink

| Name      | Type   | Required | Description                            |
| --------- | ------ | -------- | -------------------------------------- |
| text      | string | false    | Text for the panel link                |
| url       | string | false    | URL for the panel link                 |
| ariaLabel | string | false    | Optional aria label for the panel link |
