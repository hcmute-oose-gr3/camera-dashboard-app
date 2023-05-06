import type { RequestHandler } from './$types';
import { ObjectId } from 'mongodb';
import { ApiResponder } from '~/lib/server/services/api-responder';
import { UserRepository } from '~/lib/server/repositories/user-repository';
import httpStatus from 'http-status';

export const GET = (async ({ locals }) => {
	return ApiResponder.instance.data(
		{
			data: await UserRepository.instance.getDashboard(new ObjectId(locals.user!._id))
		},
		httpStatus.OK
	);
}) satisfies RequestHandler;
