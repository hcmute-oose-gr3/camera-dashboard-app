import type { PageLoad } from './$types';

export const load = (async ({ data, depends }) => {
	depends('abc');
	return data;
}) satisfies PageLoad;
