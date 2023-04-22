import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = ((e) => {
	if (!e.locals.user) {
		throw redirect(302, '/login');
	}
}) satisfies PageServerLoad;
