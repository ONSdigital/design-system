import domready from '../../js/domready';

async function jiraCollector() {
    const triggers = [...document.querySelectorAll('.ons-js-jira-collector')];
    if (triggers.length) {
        const JiraCollector = (await import('./jira-collector')).default;
        triggers.forEach((trigger) => {
            new JiraCollector(trigger);
        });
    }
}

domready(jiraCollector);
