import type { PageServerLoad } from './$types';
import { ObjectId, type WithId } from 'mongodb';
import type { Area } from '~/lib/models/dashboard';
import { DashboardRepository } from '~/lib/server/repositories/dashboard-repository';

export const load = (async ({ params, depends }) => {
	return {
		id: params.id
	};
}) satisfies PageServerLoad;
