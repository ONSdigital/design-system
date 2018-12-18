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
| mutuallyExclusive | `MutuallyExclusive` [_(ref)_](/components/mutually-exclusive) | false | Configuration object if this is a mutually exclusive list |
