| Name                | Type                                 | Required | Description                                                                                                                             |
| ------------------- | ------------------------------------ | -------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| id                  | string                               | true     | ID for the input                                                                                                                        |
| classes             | string                               | false    | CSS classes to apply to the wrapping element                                                                                            |
| content             | `TypeaheadContent`                   | true     | Aria and results messaging content                                                                                                      |
| apiUrl              | string                               | true     | URL of the API to call                                                                                                                  |
| inputClasses        | string                               | false    | CSS classes to apply to the input                                                                                                       |
| name                | string                               | true     | Name attribute for the input                                                                                                            |
| label               | `Label` [_(ref)_](/components/label) | true     | Label config for the input                                                                                                              |
| autocomplete        | string                               | true     | Autocomplete attribute used to override the browsers native autocomplete                                                                |
| error               | `Error` [_(ref)_](/components/error) | false    | Configuration for validation errors                                                                                                     |
| instructions        | string                               | true     | Aria instructions on how to use the component                                                                                           |
| externalInitialiser | boolean                              | false    | Whether the component is being initialised externally (i.e. The address lookup automatically sets this as it initialises the component) |

## TypeaheadContent

| Name                   | Type   | Required | Description                                                                                  |
| ---------------------- | ------ | -------- | -------------------------------------------------------------------------------------------- |
| aria_you_have_selected | string | true     | Aria text to describe what result has been selected                                          |
| aria_min_chars         | string | true     | Aria message for when the user needs to type in the minimum amount of characters             |
| aria_one_result        | string | true     | Aria message for one result is found                                                         |
| aria_n_results         | string | true     | Aria message for when N results are found                                                    |
| aria_limited_results   | string | true     | Aria message for when results have been limited                                              |
| more_results           | string | true     | Aria message for when there are more results to be refined                                   |
| results_title          | string | true     | Title for the suggestions list                                                               |
| no_results             | string | false    | Aria message for if no results are found. Item will not show if this has not been configured |
