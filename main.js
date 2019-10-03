import MagicString from 'magic-string';

export const OLSKRollupSwapTokens = function(param1, param2) {
	if (typeof param1 !== 'object' || param1 === null) {
		throw new Error('OLSKErrorInputNotValid');
	}

	if (typeof param1.code !== 'string') {
		throw new Error('OLSKErrorInputNotValid');
	}

	if (typeof param2 !== 'object' || param2 === null) {
		throw new Error('OLSKErrorInputNotValid');
	}

	const startIndexMap = Object.keys(param2).reduce(function (coll, item) {
		const startIndex = param1.code.indexOf(item);

		if (startIndex !== -1) {
			coll[item] = startIndex;
		};

		return coll;
	}, {});

	if (!Object.keys(startIndexMap).length) {
		return null;
	}

	let magicString = Object.keys(startIndexMap).reduce(function (coll, item) {
		(function ReplaceNextToken() {
			const endIndex = startIndexMap[item] + item.length;

			coll.overwrite(startIndexMap[item], endIndex, param2[item]);

			startIndexMap[item] = param1.code.slice(endIndex).indexOf(item);

			if (startIndexMap[item] === -1) {
				return;
			}

			startIndexMap[item] += endIndex;

			ReplaceNextToken();
		})();

		return coll;
	}, new MagicString(param1.code));

	return Object.assign({
		code: magicString.toString(),
	}, param1.map ? {
		map: magicString.generateMap({ hires: true }),
	} : {});
};
