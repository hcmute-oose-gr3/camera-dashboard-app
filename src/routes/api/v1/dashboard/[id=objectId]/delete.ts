import { DbClient } from '~/lib/server/services/db-client';
import { ObjectId } from 'mongodb';
import { ApiResponder } from '~/lib/server/services/api-responder';
import httpStatus from 'http-status';
import type { RequestHandler } from './$types';

export const DELETE = (async (e) => {
	try {
		const result1 = await DbClient.instance.collections.users.updateOne(
			{
				_id: new ObjectId(e.locals.user?._id),
			},
			{
				$pull: { dashboards: new ObjectId(e.params.id) },
			}
		);
		const result2 = await DbClient.instance.collections.dashboards.deleteOne({
			_id: new ObjectId(e.params.id),
		});
		return ApiResponder.instance.data(
			{
				data: result1,
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
