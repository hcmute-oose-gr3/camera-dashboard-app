import type { PageLoad } from './$types';

export const load = (async ({ data, depends }) => {
	return data;
}) satisfies PageLoad;
