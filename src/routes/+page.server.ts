import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import httpStatus from 'http-status';

export const load = ((e) => {
	if (!e.locals.user) {
		throw redirect(httpStatus.FOUND, '/login');
	}
	throw redirect(httpStatus.FOUND, '/dashboard');
}) satisfies PageServerLoad;
