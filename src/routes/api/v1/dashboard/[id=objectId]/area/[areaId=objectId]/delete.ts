import { ApiResponder } from '~/lib/server/services/api-responder';
import type { RequestHandler } from './$types';
import httpStatus from 'http-status';
import { DbClient } from '~/lib/server/services/db-client';
import { ObjectId } from 'mongodb';

export const DELETE = (async (e) => {
	try {
		const result = await DbClient.instance.collections.dashboards.updateOne(
			{
				_id: new ObjectId(e.params.id),
			},
			{
				$pull: { areas: { _id: new ObjectId(e.params.areaId) } },
			}
		);
		return ApiResponder.instance.data(
			{
				data: result,
			},
			httpStatus.OK
		);
	} catch (e: any) {
		return ApiResponder.instance.error(
			{
				error: { code: 'EXCEPTION_ERROR', message: e.message || 'Exception' },
			},
			httpStatus.INTERNAL_SERVER_ERROR
		);
	}
}) satisfies RequestHandler;
