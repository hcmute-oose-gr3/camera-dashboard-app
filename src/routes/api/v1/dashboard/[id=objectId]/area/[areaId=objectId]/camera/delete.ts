import { ApiResponder } from '~/lib/server/services/api-responder';
import type { RequestHandler } from './$types';
import httpStatus from 'http-status';
import { DbClient } from '~/lib/server/services/db-client';
import { ObjectId } from 'mongodb';

export const DELETE = (async ({ request, params }) => {
	try {
		const ids: ObjectId[] = await request
			.json()
			.then((v) => v.map((s: string) => new ObjectId(s)));

		const deleteResult = await DbClient.instance.collections.dashboards.updateOne(
			{
				_id: new ObjectId(params.id),
				'areas._id': new ObjectId(params.areaId),
			},
			{
				$pull: { 'areas.$.cameras': { _id: { $in: ids } } },
			}
		);
		return ApiResponder.instance.data({ data: deleteResult }, httpStatus.OK);
	} catch (e: any) {
		return ApiResponder.instance.error(
			{
				error: { code: 'EXCEPTION_ERROR', message: e.message || 'Exception' },
			},
			httpStatus.INTERNAL_SERVER_ERROR
		);
	}
}) satisfies RequestHandler;
