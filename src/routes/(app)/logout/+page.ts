import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { ApiRoutes } from '~/lib/utils/api-routes';
import httpStatus from 'http-status';

export const load = (async ({ fetch }) => {
	await fetch(ApiRoutes.LOGOUT, { method: 'get' }).finally(() => {
		throw redirect(httpStatus.FOUND, '/');
	});
}) satisfies PageLoad;
