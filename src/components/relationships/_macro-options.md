| Name                   | Type    | Required | Description                                                                                                                           |
| ---------------------- | ------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| legend                 | string  | true     | The legend for the radios. This is visually hidden by default so should be set to match the question title                            |
| dontVisuallyHideLegend | boolean | false    | Prevents the legend from being visually hidden by default                                                                             |
| secondaryDescription   | string  | true     | Default text for the secondary relationship playback below the component                                                              |
| titleRelated           | string  | true     | Text to replace the question / legend with when a relationship is selected. The placeholder `{x}` gets replaced with the relationship |
| titleUnrelated         | string  | true     | Text to replace the question / legend with when a the people are unrelated                                                            |
| playbackRelated        | string  | true     | Text to replace the playback with when a relationship is selected. The placeholder `{x}` gets replaced with the relationship          |
| playbackUnrelated      | string  | true     | Text to replace the playback with when a the people are unrelated                                                                     |
| id                     | string  | false    | ID to add to the component                                                                                                            |
| classes                | string  | false    | Classes to apply to the relationships component                                                                                       |
