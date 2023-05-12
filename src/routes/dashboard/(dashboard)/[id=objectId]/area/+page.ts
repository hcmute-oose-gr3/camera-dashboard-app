import type { PageLoad } from './$types';

export const load = (async ({ data, depends }) => {
	depends('abc');
	console.log('abc');

	return data;
}) satisfies PageLoad;
