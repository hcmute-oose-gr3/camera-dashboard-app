import type { PageLoad } from './$types';

export const load = (async (e) => {
	return e.data;
}) satisfies PageLoad;
