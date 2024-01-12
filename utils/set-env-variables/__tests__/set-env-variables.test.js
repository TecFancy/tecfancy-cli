'use strict';

const setEnvVariables = require('..');
const assert = require('assert').strict;

assert.strictEqual(setEnvVariables(), 'Hello from setEnvVariables');
console.info('setEnvVariables tests passed');
