# **_This is a template for future migration guides_**

# Migration Guide for Version 71.0.0

## Introduction

This document outlines the steps needed to migrate to version 71.0.0 of our Design System library. This release includes several deprecations/breaking-changes that may impact your projects. Please follow the guide to ensure a smooth transition.

## Table of Contents

1. [List of Deprecated Features](#list-of-deprecated-features)
2. [Migration Steps](#migration-steps)
    - [Component Deprecations](#component-deprecations)
    - [Parameter Deprecations](#parameter-deprecations)
    - [Pattern Deprecations](#pattern-deprecations)
3. [Contact Information](#contact-information)

## List of Deprecated Features/breaking-changes

### Components

-   **onsCallToAction**
-   **OldComponentName2**

### Parameters

-   **oldParameterName1**
-   **oldParameterName2**

### Patterns

-   **OldPatternName1**
-   **OldPatternName2**

## Migration Steps

### Component Deprecations

#### CTA to onsButton

-   **Description:** The CTA component has been removed.
-   **Reason for Deprecation:** The component was removed as it was only developed for use on the Census website.
-   **Removal of support:** Next major release date (specify date).
-   **Steps:**

    1. Locate all instances of `onsCallToAction` in your codebase.
    2. Replace `onsCallToAction` with `onsButton`.
    3. Update any related props or methods to align with the new component's macro options.

    -   **Example:**

        ```njk
        {% from "components/call-to-action/_macro.njk" import onsCallToAction %}

            {{-
                onsCallToAction({
                    "headingText": 'Call to action heading.',
                    "paragraphText": 'Descriptive text about call to action',
                    "button": {
                        "text": 'Start',
                        "url": '#0'
                    }
                })
            }}

        {% from "components/button/_macro.njk" import onsButton %}

            {{
                onsButton({
                    "text": 'Get started',
                    "url": '#0'
                })
            }}
        ```

#### OldComponentName2 to NewComponentName2

-   **Description:** Brief description of the component.
-   **Reason for Deprecation:** Explanation of why the component is deprecated.
-   **Removal of support:** Next major release date (specify date).
-   **Steps:**
    1. Locate all instances of `OldComponentName2` in your codebase.
    2. Replace `OldComponentName2` with `NewComponentName2`.
    3. Update any related props or methods to align with the new component's macro options.
    -   **Example:**
        ```njk

        ```

### Parameter Deprecations

#### oldParameterName1 to newParameterName1

-   **Description:** Brief description of the parameter.
-   **Reason for Deprecation:** Explanation of why the parameter is deprecated.
-   **Removal of support:** Next major release date (specify date).
-   **Steps:**
    1. Identify all uses of `oldParameterName1` in your code.
    2. Replace `oldParameterName1` with `newParameterName1`.
    -   **Example:**
        ```njk

        ```

#### oldParameterName2 to newParameterName2

-   **Description:** Brief description of the parameter.
-   **Reason for Deprecation:** Explanation of why the parameter is deprecated.
-   **Removal of support:** Next major release date (specify date).
-   **Steps:**
    1. Identify all uses of `oldParameterName2` in your code.
    2. Replace `oldParameterName2` with `newParameterName2`.
    -   **Example:**
        ```njk

        ```

### Pattern Deprecations

#### OldPatternName1 to NewPatternName1

-   **Description:** Brief description of the pattern.
-   **Reason for Deprecation:** Explanation of why the pattern is deprecated.
-   **Removal of support:** Next major release date (specify date).
-   **Steps:**
    1. Find occurrences of `OldPatternName1`.
    2. Refactor the code to use `NewPatternName1`.
    -   **Example:**
        ```njk

        ```

#### OldPatternName2 to NewPatternName2

-   **Description:** Brief description of the pattern.
-   **Reason for Deprecation:** Explanation of why the pattern is deprecated.
-   **Removal of support:** Next major release date (specify date).
-   **Steps:**
    1. Find occurrences of `OldPatternName2`.
    2. Refactor the code to use `NewPatternName2`.
    -   **Example:**
        ```njk

        ```

## Contact Information

For further assistance, please reach out to our support team:

-   **Email:** ons.design.system@ons.gov.uk
