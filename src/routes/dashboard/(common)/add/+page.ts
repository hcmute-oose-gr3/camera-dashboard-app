import type { PageLoad } from './$types';

export const load = (() => {
	return { meta: { title: get(LL).dashboard.add.meta.title() } };
}) satisfies PageLoad;
