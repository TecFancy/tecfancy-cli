'use strict';

const spinner = require('..');
const assert = require('assert').strict;

assert.strictEqual(spinner(), 'Hello from spinner');
console.info('spinner tests passed');
