import { ApiResponder } from '~/lib/server/services/api-responder';
import type { RequestHandler } from './$types';
import httpStatus from 'http-status';
import { DbClient } from '~/lib/server/services/db-client';
import { ObjectId } from 'mongodb';
import { Pageable } from '~/lib/models/pageable';

export const GET = (async ({ params, url }) => {
	try {
		const pageable = new Pageable(url.searchParams.get('page'), url.searchParams.get('size'));
		const profiles = await DbClient.instance.collections.profiles
			.find(
				{
					dashboardId: new ObjectId(params.id),
				},
				{ projection: { dashboardId: 0 }, skip: pageable.offset, limit: pageable.size }
			)
			.toArray();
		return ApiResponder.instance.data(
			{
				data: profiles,
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
