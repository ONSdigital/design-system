const { TextDecoder, TextEncoder } = require('node:util');
const { ReadableStream, TransformStream } = require('node:stream/web');
const { MessageChannel, MessagePort } = require('node:worker_threads');

Object.assign(globalThis, { TextDecoder, TextEncoder, ReadableStream, TransformStream, MessageChannel, MessagePort });
