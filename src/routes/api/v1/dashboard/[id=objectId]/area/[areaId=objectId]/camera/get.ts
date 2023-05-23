import { ApiResponder } from '~/lib/server/services/api-responder';
import type { RequestHandler } from './$types';
import httpStatus from 'http-status';
import { DbClient } from '~/lib/server/services/db-client';
import { ObjectId } from 'mongodb';

export const GET = (async (e) => {
	try {
		const dashboard = await DbClient.instance.collections.dashboards.findOne(
			{
				_id: new ObjectId(e.params.id),
				'areas._id': new ObjectId(e.params.areaId),
			},
			{ projection: { _id: 0, areas: { 'cameras.$': 1 } } }
		);
		return ApiResponder.instance.data(
			{
				data:
					dashboard?.areas?.[0].cameras?.map((e) =>
						Object.assign(e, { _id: e._id.toHexString() })
					) || [],
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
