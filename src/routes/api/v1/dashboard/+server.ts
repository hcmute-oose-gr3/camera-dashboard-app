import { DbClient } from '~/lib/server/services/db-client';
import type { RequestHandler } from './$types';
import { ObjectId } from 'mongodb';
import type { Dashboard } from '~/lib/models/dashboard';
import { ApiResponder } from '~/lib/server/services/api-responder';

export const GET = (async ({ locals }) => {
	const cursor = DbClient.instance.collections.users.aggregate<Dashboard>([
		{ $match: { _id: new ObjectId(locals.user!._id) } },
		{ $limit: 1 },
		{ $project: { dashboards: 1 } },
		{
			$lookup: {
				from: 'dashboards',
				localField: 'dashboards',
				foreignField: '_id',
				as: 'dashboardsInfo'
			}
		},
		{ $unwind: '$dashboardsInfo' },
		{
			$replaceRoot: {
				newRoot: '$dashboardsInfo'
			}
		}
	]);
	return ApiResponder.instance.data({ data: await cursor.toArray() });
}) satisfies RequestHandler;
