# Design System Library Deprecation and Release Policy

## Overview

This policy outlines release process to ensure smooth transitions and maintain the stability and reliability of the library. It also details the procedures and timelines for deprecating components, utilities, and other features in the design system library.

## Release Policy

### Versioning

We follow [Semantic Versioning](https://semver.org/) to manage releases:

-   **Major Releases (X.0.0)**: Introduce breaking changes. Deprecated items are removed, and significant new features or changes are added.
-   **Minor Releases (X.Y.0)**: Add new features and enhancements in a backward-compatible manner. May include deprecations.
-   **Patch Releases (X.Y.Z)**: Include backward-compatible bug fixes and documentation updates.

### Release Schedule

-   **Breaking Change Releases**:
    -   Breaking change releases will take place every 6 months.

### Release Process

1. **Pre-release**:

    - **Feature Freeze**: Before a major or minor release, a feature freeze period is implemented to ensure stability.
    - **Testing**: Comprehensive testing is conducted, including unit tests, integration tests, and user acceptance tests.

2. **Release**:

    - **Release Notes**: Detailed release notes are published with each release, documenting new features, bug fixes, deprecations, and breaking changes.
    - **Versioning**: The new version is tagged in the repository and published, and the library is published to the package manager npm.
    - **Change Log**: Our change log is available on [GitHub](https://github.com/ONSdigital/design-system/releases). All releases are tagged and released on GitHub.

3. **Post-release**:
    - **Monitoring**: Monitor for any critical issues or bugs that need immediate attention.
    - **Support**: Provide support for users transitioning from deprecated features and resolving any upgrade-related issues.

## Deprecation Policy

### Definition of Deprecation

Deprecation is the process by which a component, utility, or feature is marked as obsolete and is scheduled for removal in a future release. Deprecation serves as a warning to users that they should transition to the recommended alternatives. Reasoning and instructions for how to migrate from the deprecated to the new functionality (the migration path) will be provided alongside the notice of deprecation, where functionality is removed entirely, alternative implementations will be recommended.

### Deprecation Guidelines

1. **Announcement**: Deprecation of a component, utility, or feature will be announced in the release notes of the version in which the deprecation first occurs. It will include:

    - The rationale for deprecation.
    - Migration paths or suggested alternatives.
    - The timeline for removal.

2. **Documentation**:

    - All deprecated items will be clearly marked in the documentation with a "Deprecated" label.
    - Documentation will include information on the deprecation and guidance on transitioning to alternatives.
    - Our documentation about the component is displayed on the [Service Manual](https://service-manual.ons.gov.uk/).

3. **Codebase**:
    - Deprecated code will be maintained and supported (excluding new features) until its removal.

### Deprecation Timeline

1. **Initial Announcement**: Deprecated items will be announced and documented in a minor release.
2. **Grace Period**: There will be a minimum of six months before the deprecated item is removed.
3. **Removal**: Deprecated items will be removed in the next major release following the grace period.

## Communication

-   **Deprecation Notices**: Send deprecation notices via appropriate channels (e.g., mailing lists, Slack, documentation site) to ensure all users are informed.
-   **Migration Guides**: Provide detailed migration guides and tools to assist users in transitioning from deprecated items to new alternatives.

## Review and Update

This policy will be reviewed and updated periodically to ensure it remains effective and meets the needs of the design system library users. If you have any feedback or suggestions you can get in touch with us by following the instructions on this page of the [Service Manual](https://service-manual.ons.gov.uk/community/our-community/get-in-touch)
