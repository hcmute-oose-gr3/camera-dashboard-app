import type { PageServerLoad } from './$types';
import { ObjectId } from 'mongodb';
import { DashboardRepository } from '~/lib/server/repositories/dashboard-repository';
import { DbClient } from '~/lib/server/services/db-client';

export const load = (async ({ params }) => {
	const dashboardId = new ObjectId(params.id);
	const [dashboardWithName, areas] = await Promise.all([
		DbClient.instance.collections.dashboards.findOne(
			{ _id: dashboardId },
			{ projection: { _id: 0, name: 1 } }
		),
		DashboardRepository.instance.getCameras(new ObjectId(params.id)).then((v) => v?.areas ?? [])
	]);
	return {
		dashboard: dashboardWithName,
		cameras: areas.flatMap(
			(v) =>
				v.cameras?.map((c) =>
					Object.assign(c, {
						_id: c._id.toHexString(),
						areaId: v._id.toHexString()
					})
				) || []
		)
	};
}) satisfies PageServerLoad;
