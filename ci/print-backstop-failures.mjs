import fs from 'node:fs/promises';

import { glob } from 'glob';

async function findLatestReportJson() {
    const reportPaths = await glob('backstop_data/bitmaps_test/**/report.json', {
        nodir: true,
    });

    if (!reportPaths.length) {
        return null;
    }

    const withTimes = await Promise.all(
        reportPaths.map(async (reportPath) => {
            const stat = await fs.stat(reportPath);
            return { reportPath, mtimeMs: stat.mtimeMs };
        }),
    );

    withTimes.sort((a, b) => b.mtimeMs - a.mtimeMs);
    return withTimes[0].reportPath;
}

function safeString(value) {
    return typeof value === 'string' ? value : '';
}

async function main() {
    const reportPath = await findLatestReportJson();

    if (!reportPath) {
        console.log('Backstop: no report.json found under backstop_data/bitmaps_test');
        return;
    }

    let report;
    try {
        report = JSON.parse(await fs.readFile(reportPath, 'utf8'));
    } catch (error) {
        console.log(`Backstop: failed to parse ${reportPath}`);
        console.log(String(error));
        return;
    }

    const tests = Array.isArray(report?.tests) ? report.tests : [];
    const failed = tests.filter((t) => t?.status && t.status !== 'pass');

    if (!failed.length) {
        console.log(`Backstop: no failed tests found in ${reportPath}`);
        return;
    }

    console.log(`Backstop failures (${failed.length}) from ${reportPath}:`);

    for (const t of failed) {
        const pair = t?.pair ?? {};
        const label = safeString(pair.label) || '(no label)';
        const viewport = safeString(pair.viewportLabel) || '(no viewport)';
        const url = safeString(pair.url);
        const mismatch = pair?.diff?.misMatchPercentage;
        const mismatchText = mismatch !== undefined ? String(mismatch) : 'unknown';

        console.log(`- ${label} [${viewport}] mismatch=${mismatchText}%${url ? ` url=${url}` : ''}`);
        if (pair.fileName) console.log(`  fileName=${pair.fileName}`);
        if (pair.reference) console.log(`  reference=${pair.reference}`);
        if (pair.test) console.log(`  test=${pair.test}`);
    }
}

await main();
