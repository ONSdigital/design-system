const fs = require('fs');
const util = require('util');
const { glob } = require('glob');
const readdir = util.promisify(fs.readdir);

const testUrl = `http://host.docker.internal:3010`;

function getShardInfo() {
    const shardCount = Number.parseInt(process.env.VR_SHARD_COUNT ?? '1');
    const shardIndex = Number.parseInt(process.env.VR_SHARD_INDEX ?? '0');

    if (shardCount < 1 || shardIndex < 0 || shardIndex >= shardCount) {
        throw new Error(`Invalid VR shard values: VR_SHARD_INDEX=${shardIndex}, VR_SHARD_COUNT=${shardCount}`);
    }

    return { shardCount, shardIndex };
}

export default async () => {
    let urls = [];
    const { shardCount, shardIndex } = getShardInfo();
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
                urls.push({
                    url: `${testUrl}${urlPath}`,
                    label: urlPath,
                    delay: 2000,
                    misMatchThreshold: 0.05,
                });
            }
        }
    }

    // just return the URLs for the current shard
    return urls.sort((a, b) => a.label.localeCompare(b.label)).filter((_, index) => index % shardCount === shardIndex);
};
