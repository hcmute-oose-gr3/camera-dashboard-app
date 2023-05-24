import type { PageLoad } from './$types';

export const load = (async (e) => {
	e.depends('camera');
	return e.data;
}) satisfies PageLoad;
