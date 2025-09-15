// scripts/createJiraIssue.js
const fetch = require('node-fetch');

async function run() {
    try {
        // GitHub issue data from environment variable
        const githubIssue = JSON.parse(process.env.GITHUB_ISSUE);

        // Jira credentials from environment variables
        const jiraDomain = process.env.JIRA_DOMAIN;
        const projectKey = process.env.JIRA_PROJECT_KEY;
        const authString = Buffer.from(`${process.env.JIRA_USER_EMAIL}:${process.env.JIRA_API_TOKEN}`).toString('base64');

        // Map GitHub labels to Jira issue types
        const labelToIssueType = {
            bug: 'Bug',
            story: 'Story',
            task: 'Task',
            improvement: 'Improvement',
        };

        // Determine Jira issue type based on first matching label
        const issueTypeName = githubIssue.labels.map((label) => label.name.toLowerCase()).find((name) => labelToIssueType[name]) || 'Task';

        const jiraIssueType = labelToIssueType[issueTypeName];

        // Jira payload
        const bodyData = {
            fields: {
                project: { key: projectKey },
                summary: githubIssue.title,
                description: `GitHub Issue: ${githubIssue.html_url}\n\n${githubIssue.body || ''}`,
                issuetype: { name: jiraIssueType },
                labels: githubIssue.labels.map((label) => label.name),
            },
        };

        // Create Jira issue
        const res = await fetch(`https://${jiraDomain}/rest/api/3/issue`, {
            method: 'POST',
            headers: {
                Authorization: `Basic ${authString}`,
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bodyData),
        });

        if (!res.ok) {
            console.error(`Failed to create Jira issue: ${res.status} ${await res.text()}`);
            process.exit(1);
        } else {
            const data = await res.json();
            console.log(`Created Jira issue: ${data.key}`);
        }
    } catch (err) {
        console.error('Error creating Jira issue:', err);
        process.exit(1);
    }
}

run();
