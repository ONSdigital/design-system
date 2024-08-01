### Link to Deprecation Ticket

Provide a link to the issue or ticket where the deprecation is tracked and discussed.

### Description of Change:

Detail what changes are being made, specifically outlining what is being deprecated or altered.

### Reason for Change:

Explain why the change is necessary, including any issues or benefits associated with the update.

### Components Impacted (if relevant):

List any specific components or areas of the codebase that are affected by this change.

### Migration steps:

    1. Locate all instances of `poweredBy` in your codebase.
    2. Replace `poweredBy` with `footerLogo`.

-   <details>
        <summary><b>Click for example:</b></summary>.  ←  this will be a collapsible element when copied in the md migration guide file or any github md files.

        ```njk
            OLD
            {{
                onsFooter({
                    "poweredBy": "<svg></svg>"
                })
            }}
            NEW
            {{
                onsFooter({
                    "footerLogo": {
                        "logos": {
                            "logo1": {
                                "logoImage": '<svg></svg>',
                                "logoUrl": "#0"
                            },
                            "logo2": {
                                "logoImage": '<svg></svg>',
                                "logoUrl": "#0"
                            }
                        }
                    }
                })
            }}
        ```

    </details>

### Planned Removal Version:

Indicate the version in which the deprecated feature or component will be removed.

### Checklist

This needs to be completed by the person raising the PR.

<!-- ignore-task-list-end -->

-   [ ] I have selected the correct Assignee
-   [ ] I have linked the correct Issue
