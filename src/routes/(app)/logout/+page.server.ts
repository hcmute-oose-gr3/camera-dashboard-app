import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { DbClient } from '~/lib/server/services/db-client';
import { ObjectId } from 'mongodb';

export const load = (async (e) => {
	if (e.locals.user) {
		e.cookies.delete('session_token', {
			path: '/',
			httpOnly: true,
			sameSite: 'strict',
			secure: process.env.NODE_ENV === 'production'
		});
		try {
			await DbClient.instance.collections.users.updateOne(
				{ _id: new ObjectId(e.locals.user._id) },
				{ $unset: { sessionToken: true } }
			);
		} catch (e) {}
	}
	throw redirect(302, '/');
}) satisfies PageServerLoad;
