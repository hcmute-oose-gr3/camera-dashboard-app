import { ApiResponder } from '~/lib/server/services/api-responder';
import type { RequestHandler } from './$types';
import httpStatus from 'http-status';
import { DbClient } from '~/lib/server/services/db-client';
import { ObjectId } from 'mongodb';

export const DELETE = (async ({ request }) => {
	try {
		const ids = (await request.json()) as string[];
		const deleteResult = await DbClient.instance.collections.profiles.deleteMany({
			_id: { $in: ids.map((id) => new ObjectId(id)) },
		});
		return ApiResponder.instance.data({ data: deleteResult }, httpStatus.OK);
	} catch (e) {
		return ApiResponder.instance.caught(e);
	}
}) satisfies RequestHandler;
