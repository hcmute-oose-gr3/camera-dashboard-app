import { ApiResponder } from '~/lib/server/services/api-responder';
import type { RequestHandler } from './$types';
import httpStatus from 'http-status';
import { DbClient } from '~/lib/server/services/db-client';
import { ObjectId } from 'mongodb';
import { Pageable } from '~/lib/models/pageable';

export const GET = (async ({ params, url }) => {
	try {
		const pageable = new Pageable(url.searchParams.get('page'), url.searchParams.get('size'));
		const dashboard = await DbClient.instance.collections.dashboards.findOne(
			{
				_id: new ObjectId(params.id),
			},
			{ projection: { _id: 0, alerts: { $slice: [pageable.offset, pageable.size] } } }
		);
		return ApiResponder.instance.data(
			{
				data: dashboard?.alerts ?? [],
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
