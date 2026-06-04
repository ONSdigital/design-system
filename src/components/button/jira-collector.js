export default class JiraCollector {
    constructor(trigger) {
        this.trigger = trigger;
        this.collectorId = trigger.getAttribute('data-collector-id');
        this.src = trigger.getAttribute('data-collector-src');

        if (!this.collectorId || !this.src) {
            return;
        }

        this.registerProps();
        this.loadScript();
    }

    registerProps() {
        // Keyed by collectorId — Atlassian's pattern. Defined before the script loads.
        window.ATL_JQ_PAGE_PROPS = window.ATL_JQ_PAGE_PROPS || {};
        window.ATL_JQ_PAGE_PROPS[this.collectorId] = {
            triggerFunction: (showCollectorDialog) => {
                this.trigger.addEventListener('click', (event) => {
                    event.preventDefault();
                    showCollectorDialog();
                });
            },
            fieldValues: {
                description: `Submitted from: ${window.location.href}`,
            },
        };
    }

    loadScript() {
        // Load the collector script AFTER its props are defined.
        const script = document.createElement('script');
        script.src = this.src;
        script.async = true;
        document.body.appendChild(script);
    }
}
