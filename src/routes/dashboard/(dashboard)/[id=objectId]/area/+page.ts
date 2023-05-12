import type { PageLoad } from './$types';

interface Test {
	a: number;
}

export const load = (async ({ data, depends }) => {
	depends('abc');
	return data as Omit<typeof data, 'areas._id'> & { areas: { _id: string } };
}) satisfies PageLoad;
