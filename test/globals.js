const { describe, it } = require('mocha');
const { assert }       = require('chai');
const rewire           = require('rewire');
const sinon            = require('sinon');

global.describe = describe;
global.it       = it;
global.assert   = assert;
global.rewire   = rewire;
global.sinon    = sinon;
