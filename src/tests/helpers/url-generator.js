const fs = require('fs');
const util = require('util');
const { glob } = require('glob');
const readdir = util.promisify(fs.readdir);

const testUrl = `http://host.docker.internal:3010`;

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
                const urlPath = file.replace(/^/, './').replace(/^\.\/src\/(.*\/example-.*?)\.njk$/, '/$1');
                const isChart = file.includes('/chart/');
                const misMatchThreshold = isChart ? 8.82 : 0.05;
                const requireSameDimensions = isChart ? false : true;
                urls.push({
                    url: `${testUrl}${urlPath}`,
                    label: urlPath,
                    delay: 2000,
                    misMatchThreshold: misMatchThreshold,
                    requireSameDimensions: requireSameDimensions,
                });
            }
        }
    }
    return urls;
};
