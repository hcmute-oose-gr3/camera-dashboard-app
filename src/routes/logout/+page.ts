import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { ApiRoutes } from '~/lib/utils/api-routes';

export const load = (async ({ fetch }) => {
	await fetch(ApiRoutes.LOGOUT, { method: 'get' }).finally(() => {
		throw redirect(302, '/');
	});
}) satisfies PageLoad;
