import { OLSKRollupSwapTokens } from './main.js';

import { createFilter } from 'rollup-pluginutils';
export default function swapPlugin( options = {} ) {
	const filter = createFilter( options.include, options.exclude );
	const sourceMap = options.sourceMap !== false;

	const swapTokens = options.OLSKRollupPluginSwapTokens || {};

	return {
		name: 'swap',

		_OLSKRollupSwapTokens: OLSKRollupSwapTokens,

		renderChunk(code, chunk, options) {
			return OLSKRollupSwapTokens({
				code: code,
				map: sourceMap || options.sourceMap || options.sourcemap,
			}, swapTokens);			
		},
		
	};
}
