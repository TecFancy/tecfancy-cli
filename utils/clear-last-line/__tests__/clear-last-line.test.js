'use strict';

const clearLastLine = require('..');
const assert = require('assert').strict;

assert.strictEqual(clearLastLine(), 'Hello from clearLastLine');
console.info('clearLastLine tests passed');
