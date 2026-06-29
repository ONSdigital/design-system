import { createHash } from 'node:crypto';
import path from 'node:path';
import fs from 'fs-extra';
import { glob } from 'glob';

const cwd = process.cwd();
const sourceRoot = path.join(cwd, 'src/static');
const buildRoot = path.join(cwd, 'build');

const binaryExtensions = new Set([
    '.png',
    '.jpg',
    '.jpeg',
    '.gif',
    '.webp',
    '.svg',
    '.ico',
    '.avif',
    '.woff',
    '.woff2',
    '.ttf',
    '.otf',
    '.eot',
    '.pdf',
    '.zip',
]);

const textAssetExtensions = new Set([
    '.css',
]);

function createSha256(buffer) {
    return createHash('sha256').update(buffer).digest('hex');
}

function isBinaryAsset(filePath) {
    const extension = path.extname(filePath).toLowerCase();
    return binaryExtensions.has(extension);
}

function isTextAsset(filePath) {
    const extension = path.extname(filePath).toLowerCase();
    return textAssetExtensions.has(extension);
}

async function verifyAsset(relativePath) {
    const sourcePath = path.join(sourceRoot, relativePath);
    const builtPath = path.join(buildRoot, relativePath);

    if (!(await fs.pathExists(builtPath))) {
        return {
            relativePath,
            reason: 'missing',
        };
    }

    const [sourceBuffer, builtBuffer] = await Promise.all([fs.readFile(sourcePath), fs.readFile(builtPath)]);

    if (sourceBuffer.length !== builtBuffer.length) {
        return {
            relativePath,
            reason: 'size',
            sourceSize: sourceBuffer.length,
            builtSize: builtBuffer.length,
        };
    }

    const sourceHash = createSha256(sourceBuffer);
    const builtHash = createSha256(builtBuffer);

    if (sourceHash !== builtHash) {
        return {
            relativePath,
            reason: 'checksum',
            sourceHash,
            builtHash,
        };
    }

    return null;
}

async function verifyCssAsset(cssFilePath) {
    if (!(await fs.pathExists(cssFilePath))) {
        return {
            filePath: cssFilePath,
            reason: 'missing',
        };
    }

    const buffer = await fs.readFile(cssFilePath);

    if (buffer.length === 0) {
        return {
            filePath: cssFilePath,
            reason: 'empty',
            size: 0,
        };
    }

    const content = buffer.toString('utf8');
    
    // Verify CSS content is valid (not binary data)
    // Check for common binary file signatures (null bytes)
    if (buffer.includes(0)) {
        return {
            filePath: cssFilePath,
            reason: 'binary-content',
            size: buffer.length,
        };
    }

    return null;
}

async function run() {
    const sourceFiles = await glob('**/*', {
        cwd: sourceRoot,
        nodir: true,
    });

    const binaryFiles = sourceFiles.filter(isBinaryAsset);

    const mismatches = (await Promise.all(binaryFiles.map(verifyAsset))).filter(Boolean);

    if (mismatches.length) {
        console.error(`Binary asset integrity check failed (${mismatches.length} mismatch(es)).`);
        for (const mismatch of mismatches) {
            if (mismatch.reason === 'missing') {
                console.error(`- ${mismatch.relativePath}: missing from build output`);
            } else if (mismatch.reason === 'size') {
                console.error(`- ${mismatch.relativePath}: size differs (src ${mismatch.sourceSize}, build ${mismatch.builtSize})`);
            } else {
                console.error(`- ${mismatch.relativePath}: checksum differs (src ${mismatch.sourceHash}, build ${mismatch.builtHash})`);
            }
        }
        process.exit(1);
    }

    if (binaryFiles.length) {
        console.log(`Binary asset integrity check passed (${binaryFiles.length} file(s) verified).`);
    }

    // Verify CSS files in build directory
    const cssDir = path.join(buildRoot, 'css');
    const cssMismatches = [];

    if (await fs.pathExists(cssDir)) {
        const cssFiles = await glob('*.css', {
            cwd: cssDir,
        });

        if (cssFiles.length) {
            const cssVerifications = await Promise.all(
                cssFiles.map((cssFile) => verifyCssAsset(path.join(cssDir, cssFile)))
            );

            cssMismatches.push(...cssVerifications.filter(Boolean));

            if (cssMismatches.length) {
                console.error(`CSS asset verification failed (${cssMismatches.length} issue(s)).`);
                for (const mismatch of cssMismatches) {
                    if (mismatch.reason === 'missing') {
                        console.error(`- ${mismatch.filePath}: file missing`);
                    } else if (mismatch.reason === 'empty') {
                        console.error(`- ${mismatch.filePath}: file is empty`);
                    } else if (mismatch.reason === 'binary-content') {
                        console.error(`- ${mismatch.filePath}: file contains binary data (size ${mismatch.size})`);
                    }
                }
                process.exit(1);
            }

            console.log(`CSS asset verification passed (${cssFiles.length} file(s) verified).`);
        }
    }
}

run().catch((error) => {
    console.error('Asset verification failed with an unexpected error.');
    console.error(error);
    process.exit(1);
});
