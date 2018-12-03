| Name | Type   | Required | Description |
|------|--------|----------|-------------|
| id   | string | true     | The base id for the inputs. `-day`, `-month`, and `-year` will be added to this id and applied to each input |
| legend | string | true   | The legend for the date fieldset |
| description | string | true | The hint text for the date field |
| dayLabel | string | true | The label for the day input |
| monthLabel | string | true | The label for the month input |
| yearLabel | string | true | The label for the year input |
| dayValue | number | false | The value of the day input |
| monthValue | number | false | The value of the month input |
| yearValue | number | false | The value of the year input |
| mutuallyExclusive | boolean | false | Whether to render a "mutually exclusive" checkbox |
| or   | string | false | Required if `mutuallyExclusive` set to true. The or text between the date input and the checkbox |
| checkbox | `Checkbox` [_(ref)_](/components/checkboxes) | false |  Required if `mutuallyExclusive` set to true. Settings for the mutually exclusive checkbox |
| deselectMessage | string | false | Required if `mutuallyExclusive` is true. Visually hidden text to explain that the current option will clear the current date |
| deselectAdjective | string | false | Required if `mutuallyExclusive` is true. The status message for when checkbox is selected |
