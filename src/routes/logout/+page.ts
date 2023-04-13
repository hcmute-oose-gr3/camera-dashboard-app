import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { APIRoutes } from '~/lib/utils/api-routes';

export const load = (async ({ fetch }) => {
	try {
		await fetch(APIRoutes.LOGOUT, { method: 'get' });
	} catch (e) {
		throw e;
	}
	throw redirect(302, '/');
}) satisfies PageLoad;
