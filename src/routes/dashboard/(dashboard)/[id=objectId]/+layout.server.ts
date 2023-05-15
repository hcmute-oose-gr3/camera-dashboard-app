import { DbClient } from '~/lib/server/services/db-client';
import type { LayoutServerLoad } from './$types';
import { ObjectId } from 'mongodb';
import { error } from '@sveltejs/kit';
import httpStatus from 'http-status';

export const load = (async ({ params, locals }) => {
	const count = await DbClient.instance.collections.users.countDocuments(
		{ _id: new ObjectId(locals.user!._id), dashboards: new ObjectId(params.id) },
		{ limit: 1 }
	);
	if (!count) {
		throw error(httpStatus.FORBIDDEN, { message: 'Forbidden' });
	}
}) satisfies LayoutServerLoad;
