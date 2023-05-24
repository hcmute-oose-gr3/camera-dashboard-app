import { ApiResponder } from '~/lib/server/services/api-responder';
import type { PageServerLoad } from './$types';
import { DbClient } from '~/lib/server/services/db-client';
import { ObjectId } from 'mongodb';
import { Deserializer } from '~/lib/server/services/deserializer';

export const load = (async ({ params }) => {
	try {
		const aggregate = await DbClient.instance.collections.dashboards
			.aggregate([
				{ $match: { _id: new ObjectId(params.id) } },
				{ $limit: 1 },
				{
					$project: {
						_id: 0,
						areas: {
							_id: 1,
							name: 1,
							cameras: {
								_id: 1,
								name: 1,
								url: 1,
							},
						},
					},
				},
				{ $unwind: '$areas' },
				{ $replaceRoot: { newRoot: '$areas' } },
				{ $unwind: '$cameras' },
				{
					$lookup: {
						from: 'alerts',
						localField: 'cameras._id',
						foreignField: 'cameraId',
						as: 'alert',
					},
				},
				{ $match: { alert: [] } },
				{
					$group: {
						_id: '$_id',
						name: { $first: '$name' },
						areas: { $push: '$cameras' },
					},
				},
				{ $sort: { _id: 1 } },
				{
					$project: {
						_id: 1,
						name: 1,
						cameras: '$areas',
					},
				},
			])
			.toArray();
		return { areas: Deserializer.instance.deserialize(aggregate) };
	} catch (e) {
		return ApiResponder.instance.caught(e);
	}
}) satisfies PageServerLoad;
