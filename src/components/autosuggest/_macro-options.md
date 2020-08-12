| Name                | Type   | Required | Description                                                                                        |
| ------------------- | ------ | -------- | -------------------------------------------------------------------------------------------------- |
| autosuggestData     | string | true     | URL of the JSON file with the autosuggest data that needs to be searched                           |
| instructions        | string | true     | Instructions on how to use the autosuggest that will be read out by screenreaders                  |
| ariaYouHaveSelected | string | true     | Aria message to tell the user that they have selected an answer                                    |
| ariaMinChars        | string | true     | Aria message to tell the user how many charecters they need to enter before autosuggest will start |
| ariaOneResult       | string | true     | Aria message to tell the user there is only one suggestion left                                    |
| ariaNResults        | string | true     | Aria message to tell the user how many suggestions are left                                        |
| ariaLimitedResults  | string | true     | Aria message to tell the user if the results have been limited and what they are limited to        |
| moreResults         | string | true     | Aria message to tell the user to continue to type to refine suggestions                            |
| resultsTitle        | string | true     | Title of results to be displayed on screen at the top of the results                               |
