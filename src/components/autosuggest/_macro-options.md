| Name                | Type    | Required | Description                                                                                          |
| ------------------- | ------- | -------- | ---------------------------------------------------------------------------------------------------- |
| autosuggestData     | string  | true     | URL of the JSON file with the autosuggest data that needs to be searched                             |
| allowMultiple       | boolean | false    | Allows the component to accept multiple selections                                                   |
| instructions        | string  | true     | Instructions on how to use the autosuggest that will be read out by screenreaders                    |
| ariaYouHaveSelected | string  | true     | Aria message to tell the user that they have selected an answer                                      |
| ariaMinChars        | string  | true     | Aria message to tell the user how many charecters they need to enter before autosuggest will start   |
| ariaResultsLabel    | string  | true     | Aria message to tell the user that suggestions are available                                         |
| ariaOneResult       | string  | true     | Aria message to tell the user there is only one suggestion left                                      |
| ariaNResults        | string  | true     | Aria message to tell the user how many suggestions are left                                          |
| moreResults         | string  | true     | Aria message to tell the user to continue to type to refine suggestions                              |
| noResults           | string  | true     | message to tell the user there are no results                                                        |
| tooManyResults      | string  | true     | message to tell the user there are too many results to display and the user should refine the search |
| typeMore            | string  | true     | message to encourage the user to enter more characters to get suggestions                            |
| resultsTitle        | string  | true     | Title of results to be displayed on screen at the top of the results                                 |
