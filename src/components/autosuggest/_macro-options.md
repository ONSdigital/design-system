| Name                    | Type              | Required | Description                                                                                                                                        |
| ----------------------- | ----------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| autosuggestData         | string            | true     | URL of the JSON file with the autosuggest data that needs to be searched                                                                           |
| APIDomain               | string            | false    | Set an api domain when using an external API to suggest results                                                                                    |
| instructions            | string            | true     | Instructions on how to use the autosuggest that will be read out by screenreaders                                                                  |
| ariaYouHaveSelected     | string            | true     | Aria message to tell the user that they have selected an answer                                                                                    |
| ariaMinChars            | string            | true     | Aria message to tell the user how many charecters they need to enter before autosuggest will start                                                 |
| ariaOneResult           | string            | true     | Aria message to tell the user there is only one suggestion left                                                                                    |
| ariaNResults            | string            | true     | Aria message to tell the user how many suggestions are left                                                                                        |
| ariaLimitedResults      | string            | true     | Aria message to tell the user if the results have been limited and what they are limited to                                                        |
| ariaGroupedResults      | string            | true     | Aria message to tell the user about a grouped result e.g There are {n} for {x}                                                                     |
| groupCount              | string            | true     | Aria message to tell the user the number of addresses in a group e.g. {n} addresses                                                                |
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
| oneYearAgo | string | false    | If "true" will set a query parameter of epoch=72 |
