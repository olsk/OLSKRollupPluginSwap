const { throws, deepEqual } = require('assert');

const mainModule = require('./main.js');

describe('OLSKRollupSwapTokens', function OLSKRollupSwapTokens() {

	it('throws if param1 not object', function () {
		throws(function () {
			mainModule.OLSKRollupSwapTokens(null, {});
		}, /OLSKErrorInputNotValid/);
	});

	it('throws if param1 without object.code', function () {
		throws(function () {
			mainModule.OLSKRollupSwapTokens({}, {});
		}, /OLSKErrorInputNotValid/);
	});

	it('throws if param2 not object', function () {
		throws(function () {
			mainModule.OLSKRollupSwapTokens({
				code: '',
			}, null);
		}, /OLSKErrorInputNotValid/);
	});

	it('returns null if no token', function() {
		deepEqual(mainModule.OLSKRollupSwapTokens({
			code: '',
		}, {}), null);
	});

	it('returns null if token not found', function() {
		deepEqual(mainModule.OLSKRollupSwapTokens({
			code: 'alfa',
		}, {
			bravo: 'charlie',
		}), null);
	});

	it('replaces token single', function() {
		deepEqual(mainModule.OLSKRollupSwapTokens({
			code: 'alfa',
		}, {
			alfa: 'bravo',
		}), {
			code: 'bravo',
		});
	});

	it('replaces token multiple', function() {
		deepEqual(mainModule.OLSKRollupSwapTokens({
			code: 'alfa alfa',
		}, {
			alfa: 'bravo',
		}), {
			code: 'bravo bravo',
		});
	});

	it('replaces token multiple [3]', function() { // testing two is insufficient
		deepEqual(mainModule.OLSKRollupSwapTokens({
			code: 'alfa alfa alfa',
		}, {
			alfa: 'bravo',
		}), {
			code: 'bravo bravo bravo',
		});
	});

	it('outputs map if specified', function() {
		deepEqual(typeof mainModule.OLSKRollupSwapTokens({
			code: 'alfa',
			map: true,
		}, {
			alfa: '',
		}).map, 'object');
	});

});
