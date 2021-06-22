| Name                  | Type                                                          | Required                         | Description                                                                                                                                     |
| --------------------- | ------------------------------------------------------------- | -------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| id                    | string                                                        | true                             | The id of the input. This will also be added to the label if a label is specified                                                               |
| type                  | string                                                        | false                            | The type of the input, e.g. `number`, `email`, `tel`. Will default to `text`                                                                    |
| classes               | string                                                        | false                            | Classes to add to the input.                                                                                                                    |
| name                  | string                                                        | false                            | The name of the input                                                                                                                           |
| value                 | string &#124; number                                          | false                            | The value to set the input to                                                                                                                   |
| min                   | number                                                        | false                            | Minimum accepted number or date                                                                                                                 |
| max                   | number                                                        | false                            | Maximum accepted number or date                                                                                                                 |
| minLength             | number                                                        | false                            | Minimum accepted length of input value                                                                                                          |
| maxLength             | number                                                        | false                            | Maximum accepted length of input value                                                                                                          |
| attributes            | object                                                        | false                            | HTML attributes (for example data attributes) to add to the input                                                                               |
| label                 | `Label` [_(ref)_](/components/label)                          | false                            | Settings for the input label. `for` will automatically be set to match the input id                                                             |
| prefix                | `InputPrefix`                                                 | false                            | Settings to prefix the input with                                                                                                               |
| suffix                | `InputSuffix`                                                 | false                            | Settings to suffix the input with                                                                                                               |
| fieldId               | string                                                        | false                            | Id for the field                                                                                                                                |
| fieldClasses          | string                                                        | false                            | Classes for the field                                                                                                                           |
| dontWrap              | boolean                                                       | false                            | Prevents the input from being wrapped in a [field component](/components/field)                                                                 |
| mutuallyExclusive     | `MutuallyExclusive` [_(ref)_](/components/mutually-exclusive) | false                            | Configuration object if this is a mutually exclusive input                                                                                      |
| CharCheckLimit        | `CharCheckLimit`                                              | false                            | Configuration object if this input has a character count                                                                                        |
| legend                | string                                                        | Only if mutuallyExclusive is set | Text content for the legend                                                                                                                     |
| legendClasses         | string                                                        | false                            | Classes for the legend                                                                                                                          |
| error                 | `Error` [_(ref)_](/components/error)                          | false                            | Configuration for validation errors                                                                                                             |
| autocomplete          | string                                                        | true                             | Autocomplete attribute used to override the browsers native autocomplete                                                                        |
| accessiblePlaceholder | boolean                                                       | false                            | Will add the provided label as an accessible placeholder                                                                                        |
| searchButton          | `Button` [_(ref)_](/components/button)                        | false                            | Settings for the button used for a search pattern.                                                                                              |
| postTextboxLinkText   | string                                                        | false                            | The text for the link to follow the textbox                                                                                                     |
| postTextboxLinkUrl    | string                                                        | false                            | The url for the link to follow the textbox                                                                                                      |
| listeners             | object                                                        | false                            | Creates a `script` element that adds an event listener to the element by `id`. Takes `key { event }` and `value { function }`                   |
| required              | boolean                                                       | false                            | Adds the `required` attribute to the input to indicate that the user must specify a value for the input before the owning form can be submitted |

## Prefix/Suffix

| Name  | Type   | Required | Description                                                                                      |
| ----- | ------ | -------- | ------------------------------------------------------------------------------------------------ |
| text  | string | true     | The text for the prefix/suffix                                                                   |
| title | string | true     | The title of the prefix/suffix. For example where `text` is "cm", `title` would be "centimetres" |
| id    | string | false    | Id for the prefix/suffix                                                                         |

## Autosuggest

| Name                    | Type              | Required | Description                                                                                                                                        |
| ----------------------- | ----------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| autosuggestData         | string            | true     | URL of the JSON file with the autosuggest data that needs to be searched                                                                           |
| APIDomain               | string            | false    | Set an api domain when using an external API to suggest results                                                                                    |
| APIDomainBearerToken    | string            | false    | Set a bearer token for api authorization on the AIMS address api. Defaults to basic auth                                                           |
| allowMultiple           | boolean           | false    | Allows the component to accept multiple selections                                                                                                 |
| instructions            | string            | true     | Instructions on how to use the autosuggest that will be read out by screenreaders                                                                  |
| ariaYouHaveSelected     | string            | true     | Aria message to tell the user that they have selected an answer                                                                                    |
| ariaMinChars            | string            | true     | Aria message to tell the user how many charecters they need to enter before autosuggest will start                                                 |
| ariaResultsLabel        | string            | true     | Aria message to tell the user that suggestions are available                                                                                       |
| ariaOneResult           | string            | true     | Aria message to tell the user there is only one suggestion left                                                                                    |
| ariaNResults            | string            | true     | Aria message to tell the user how many suggestions are left                                                                                        |
| ariaLimitedResults      | string            | true     | Aria message to tell the user if the results have been limited and what they are limited to                                                        |
| groupCount              | string            | true     | Aria message to tell the user the number of addresses in a group e.g. {n} addresses                                                                |
| ariaGroupedResults      | string            | true     | Aria message to tell the user about a grouped result e.g There are {n} for {x}                                                                     |
| moreResults             | string            | true     | Aria message to tell the user to continue to type to refine suggestions                                                                            |
| noResults               | string            | true     | message to tell the user there are no results                                                                                                      |
| tooManyResults          | string            | true     | message to tell the user there are too many results to display and the user should refine the search                                               |
| typeMore                | string            | true     | message to encourage the user to enter more characters to get suggestions                                                                          |
| resultsTitle            | string            | true     | Title of results to be displayed on screen at the top of the results                                                                               |
| errorTitle              | string            | false    | Error message title displayed in the error panel                                                                                                   |
| errorMessageEnter       | string            | false    | Error message description displayed in the error panel when the input is empty                                                                     |
| errorMessageSelect      | string            | false    | Error message description displayed in the error panel when a suggestion has not been selected                                                     |
| errorMessageAPI         | string            | false    | Error message displayed when the API has failed during a search                                                                                    |
| errorMessageAPILinkText | string            | false    | Link text used to toggle to a manual mode when using the address macro                                                                             |
| isEditable              | boolean           | false    | Used with the address macro to invoke population of manual fields upon selection of suggestion                                                     |
| options                 | `Object<Options>` | false    | Option to provide key value pairs that will be added as data attributes to the component that will be added as parameters to the address index api |
| mandatory               | boolean           | false    | Set the autosuggest input to be mandatory and use client side validation for empty form submission                                                 |

## Options

| Name       | Type   | Required | Description                                      |
| ---------- | ------ | -------- | ------------------------------------------------ |
| regionCode | string | false    | Sets the provided region code e.g. en-gb         |
| adressType | string | false    | Sets the provided address type e.g. resedential  |
| oneYearAgo | string | false    | If "true" will set a query parameter of epoch=75 |

## CharCheckLimit

| Name                       | Type    | Required | Description                                                                                                                                                |
| -------------------------- | ------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| limit                      | number  | false    | The maximum amount of characters a user should type in                                                                                                     |
| charcheckCountdown         | boolean | false    | Displays the number of remaining characters allowed based on the limit                                                                                     |
| charCountPlural            | string  | false    | Required if `CharCheckLimit` is supplied. The string that will render how many characters are remaining. `{x}` Will be replaced with the number            |
| charCountSingular          | string  | false    | Required if `CharCheckLimit` is supplied. The string that will render how many characters are remaining (singular). `{x}` Will be replaced with the number |
| charCountOverLimitSingular | string  | false    | Required if `CharCheckLimit` is supplied. The string that will render how many characters are over (singular). `{x}` Will be replaced with the number      |
| charCountOverLimitPlural   | string  | false    | Required if `CharCheckLimit` is supplied. The string that will render how many characters are over (plural). `{x}` Will be replaced with the number        |
