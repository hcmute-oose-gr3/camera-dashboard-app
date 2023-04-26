import type { ParamMatcher } from '@sveltejs/kit';

// https://github.com/mongodb/js-bson/blob/v4.2.0/src/objectid.ts#L301
const checkForHexRegExp = new RegExp('^[0-9a-fA-F]{24}$');

const isValid = (id: string) => {
	return id.length === 12 || (id.length === 24 && checkForHexRegExp.test(id));
};

export const match = ((param) => {
	return isValid(param);
}) satisfies ParamMatcher;
