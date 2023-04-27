import type { PageServerLoad } from './$types';
import { ObjectId } from 'mongodb';
import { DashboardRepository } from '~/lib/server/repositories/dashboard-repository';

export const load = (async ({ params }) => {
	return {
		cameras: await DashboardRepository.instance
			.getCameras(new ObjectId(params.id))
			.then(
				(v) => v?.cameras?.map((c) => Object.assign(c, { _id: c._id.toHexString() })) || []
			)
	};
}) satisfies PageServerLoad;
