import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import httpStatus from 'http-status';

export const load = (async ({ locals }) => {
	if (!locals.user) {
		throw redirect(httpStatus.FOUND, '/');
	}
}) satisfies LayoutServerLoad;
