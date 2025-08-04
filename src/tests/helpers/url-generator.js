const fs = require('fs');
const util = require('util');
const { glob } = require('glob');
const readdir = util.promisify(fs.readdir);

const testUrl = `http://host.docker.internal:3010`;
const onReadyScript = require('../../../onReady.js');

export default async () => {
    let urls = [];
    const directories = [
        {
            path: './src/components',
        },
        {
            path: './src/patterns',
        },
        {
            path: './src/foundations',
        },
    ];
    for (const directory of directories) {
        const folders = await readdir(directory.path);
        for (const folder of folders) {
            const files = await glob(`${directory.path}/${folder}/**/example-*.njk`);
            for (const file of files) {
                const isIframeChart = file.includes('/chart/example-iframe-chart');
                const delay = isIframeChart ? 5000 : 2000;
                const urlPath = file.replace(/^/, './').replace(/^\.\/src\/(.*\/example-.*?)\.njk$/, '/$1');
                urls.push({
                    url: `${testUrl}${urlPath}`,
                    label: urlPath,
                    delay: delay,
                    misMatchThreshold: 0.05,
                    onReadyScript: onReadyScript,
                });
            }
        }
    }
    return urls;
};
