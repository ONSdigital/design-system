module.exports = {
    /** resolves from test to snapshot path */
    resolveSnapshotPath: (testPath, snapshotExtension) => {
        return testPath.replace('src/', '__snapshots__/') + snapshotExtension;
    },

    /** resolves from snapshot to test path */
    resolveTestPath: (snapshotFilePath, snapshotExtension) => {
        return snapshotFilePath.replace('__snapshots__/', 'src/').slice(0, -snapshotExtension.length);
    },

    testPathForConsistencyCheck: 'some/__tests__/example.test.js',
};
