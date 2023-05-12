import type { PageServerLoad } from './$types';
import { ObjectId, type WithId } from 'mongodb';
import type { Area } from '~/lib/models/dashboard';
import { DashboardRepository } from '~/lib/server/repositories/dashboard-repository';

export const load = (async ({ params, depends }) => {
	depends('abc');
	return {
		id: params.id,
		areas: (await DashboardRepository.instance
			.getAreas(new ObjectId(params.id))
			.then(
				(v) =>
					v?.areas?.map((c: any) => Object.assign(c, { _id: c._id.toHexString() })) || []
			)) as (WithId<Area> & { _id: string })[]
	};
}) satisfies PageServerLoad;
