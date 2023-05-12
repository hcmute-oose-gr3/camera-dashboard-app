import type { PageServerLoad } from './$types';
import { ObjectId } from 'mongodb';
import { DashboardRepository } from '~/lib/server/repositories/dashboard-repository';

export const load = (async ({ params, depends }) => {
	console.log('abc');
	depends('abc');
	return {
		id: params.id,
		areas: await DashboardRepository.instance
			.getAreas(new ObjectId(params.id))
			.then(
				(v) =>
					v?.areas?.map((c: any) => Object.assign(c, { _id: c._id.toHexString() })) || []
			)
	};
}) satisfies PageServerLoad;
