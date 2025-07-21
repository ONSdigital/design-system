const fs = require('fs');
const util = require('util');
const { glob } = require('glob');
const readdir = util.promisify(fs.readdir);

async function createUrlsFile() {
    try {
        const urls = await getUrls();
        fs.writeFileSync('./lighthouse/urls.json', urls);
    } catch (e) {
        console.error(e);
        return;
    }
}

async function getUrls() {
    let data = {};
    data.urlsWithoutKnownIssues = [];
    data.urlsWithKnownIssues = [];
    const directories = [
        {
            path: './build/components',
        },
        {
            path: './build/patterns',
        },
        {
            path: './build/foundations',
        },
    ];
    // collect all the examples fail at 'aria-allowed-attr' audit check
    const knownIssueFiles = [
        'example-errors-proto-errors.html',
        'example-feedback-form.html',
        'example-radios-with-revealed-text-input.html',
        'example-radios-with-revealed-text-input-expanded.html',
        'example-radios-with-revealed-text-area.html',
        'example-radios-with-revealed-text-area-expanded.html',
        'example-radios-with-revealed-select.html',
        'example-radios-with-revealed-select-expanded.html',
        'example-radios-with-revealed-radios-expanded.html',
        'example-radios-with-revealed-checkboxes.html',
        'example-radios-with-revealed-checkboxes-expanded.html',
        'example-radios-with-clear-button.html',
        'example-radios-with-clear-button-expanded.html',
        'example-button-download.html',
    ];
    for (const directory of directories) {
        const folders = await readdir(directory.path);
        for (const folder of folders) {
            const files = await glob(`${directory.path}/${folder}/**/*.html`);
            const filesWithoutKnownIssues = files.filter(
                (path) =>
                    !path.includes('index.html') &&
                    !path.includes('example-skip-to-content.html') &&
                    !knownIssueFiles.some((filename) => path.includes(filename)), // doesn't add index.html, example-skip-to-content and examples mentioned in knownIssueUrls
            );
            for (const file of filesWithoutKnownIssues) {
                data.urlsWithoutKnownIssues.push(file.replace('build/', 'http://localhost/'));
            }

            const filesWithKnownIssues = files.filter((path) => knownIssueFiles.some((filename) => path.includes(filename)));
            //add the examples mentioned in knownIssueUrls in a separate array
            for (const file of filesWithKnownIssues) {
                data.urlsWithKnownIssues.push(file.replace('build/', 'http://localhost/'));
            }
        }
    }
    return JSON.stringify(data);
}

createUrlsFile();
