### Link to Deprecation Ticket

### Description of Change:

### Reason for Change:

### Components Impacted (if relevant):

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

### Checklist

This needs to be completed by the person raising the PR.

<!-- ignore-task-list-end -->

-   [ ] I have selected the correct Assignee
-   [ ] I have linked the correct Issue
