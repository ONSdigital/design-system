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
    data.urls = [];
    data.skipurls = [];
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
    const skipUrls = [
        'example-errors-proto.html',
        'example-errors-proto-errors.html',
        'example-radios-with-revealed-text-area-expanded.html',
        'example-radios-with-revealed-select.html',
        'example-radios-with-revealed-select-expanded.html',
        'example-radios-with-revealed-radios.html',
        'example-radios-with-revealed-radios-expanded.html',
        'example-radios-with-revealed-checkboxes.html',
        'example-radios-with-revealed-checkboxes-expanded.html',
        'example-radios-with-clear-button.html',
        'example-radios-with-clear-button-expanded.html',
        'example-accordion.html',
        'example-button-custom.html',
        'example-button-download.html',
    ];
    for (const directory of directories) {
        const folders = await readdir(directory.path);
        for (const folder of folders) {
            const files = await glob(`${directory.path}/${folder}/**/*.html`);
            const filteredFiles = files.filter(
                (path) =>
                    !path.includes('index.html') &&
                    !path.includes('example-skip-to-content.html') &&
                    !skipUrls.some((skip) => path.includes(skip)), // doesn't add index.html, example-skip-to-content and examples mentioned in skipUrls.
            );
            const filesWithskipURls = files.filter((path) => skipUrls.some((skip) => path.includes(skip)));
            for (const file of filteredFiles) {
                data.urls.push(file.replace('build/', 'http://localhost/'));
            }
            //add the examples mentioned in skipUrls in a seperate array
            for (const file of filesWithskipURls) {
                data.skipurls.push(file.replace('build/', 'http://localhost/'));
            }
        }
    }
    return JSON.stringify(data);
}

createUrlsFile();
