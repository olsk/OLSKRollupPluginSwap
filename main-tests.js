const { throws, deepEqual } = require('assert');

const mod = require('./main.js');

describe('OLSKRollupSwapTokens', function OLSKRollupSwapTokens() {

	it('throws if param1 not object', function () {
		throws(function () {
			mod.OLSKRollupSwapTokens(null, {});
		}, /OLSKErrorInputNotValid/);
	});

	it('throws if param1 without object.code', function () {
		throws(function () {
			mod.OLSKRollupSwapTokens({}, {});
		}, /OLSKErrorInputNotValid/);
	});

	it('throws if param2 not object', function () {
		throws(function () {
			mod.OLSKRollupSwapTokens({
				code: '',
			}, null);
		}, /OLSKErrorInputNotValid/);
	});

	it('returns null if no token', function() {
		deepEqual(mod.OLSKRollupSwapTokens({
			code: '',
		}, {}), null);
	});

	it('returns null if token not found', function() {
		deepEqual(mod.OLSKRollupSwapTokens({
			code: 'alfa',
		}, {
			bravo: 'charlie',
		}), null);
	});

	it('replaces token single', function() {
		deepEqual(mod.OLSKRollupSwapTokens({
			code: 'alfa',
		}, {
			alfa: 'bravo',
		}), {
			code: 'bravo',
		});
	});

	it('replaces token multiple', function() {
		deepEqual(mod.OLSKRollupSwapTokens({
			code: 'alfa alfa',
		}, {
			alfa: 'bravo',
		}), {
			code: 'bravo bravo',
		});
	});

	it('replaces token multiple [3]', function() { // testing two is insufficient
		deepEqual(mod.OLSKRollupSwapTokens({
			code: 'alfa alfa alfa',
		}, {
			alfa: 'bravo',
		}), {
			code: 'bravo bravo bravo',
		});
	});

	it('outputs map if specified', function() {
		deepEqual(typeof mod.OLSKRollupSwapTokens({
			code: 'alfa',
			map: true,
		}, {
			alfa: '',
		}).map, 'object');
	});

});
