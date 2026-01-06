import { defineConfig, globalIgnores } from 'eslint/config';
import prettier from 'eslint-plugin-prettier';
// @ts-ignore
import unusedImports from 'eslint-plugin-unused-imports';
import globals from 'globals';
import babelParser from '@babel/eslint-parser';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all,
});

export default defineConfig([
    globalIgnores(['**/build/']),
    {
        extends: compat.extends('prettier'),

        plugins: {
            prettier,
            'unused-imports': unusedImports,
        },

        languageOptions: {
            globals: {
                ...globals.browser,
                $: true,
                jQuery: true,
                browser: true,
                ga: true,
            },

            parser: babelParser,
        },

        rules: {
            'prettier/prettier': 'error',
            'no-unused-vars': [1],
            'no-alert': 0,
            strict: [2, 'never'],
            'new-cap': [0],
            'consistent-return': 0,
            'no-underscore-dangle': 0,
            'no-var': [1],
            'one-var': [0],

            'max-len': [
                0,
                {
                    code: 140,
                    ignoreUrls: true,
                },
            ],

            'comma-dangle': ['error', 'always-multiline'],
            'arrow-parens': 1,
            'unused-imports/no-unused-imports': 'error',

            'unused-imports/no-unused-vars': [
                'error',
                {
                    vars: 'all',
                    varsIgnorePattern: '^_',
                    args: 'after-used',
                    argsIgnorePattern: '^_',
                },
            ],
        },
    },
]);
