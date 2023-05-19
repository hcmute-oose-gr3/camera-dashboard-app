import type { RequestHandler } from './$types';
import { ObjectId } from 'mongodb';
import { ApiResponder } from '~/lib/server/services/api-responder';
import { UserRepository } from '~/lib/server/repositories/user-repository';
import httpStatus from 'http-status';
import { DbClient } from '~/lib/server/services/db-client';

export const POST = (async ({ locals, request }) => {
	try {
		const formData = await request.formData();

		const name = formData.get('name')?.toString();
		if (!name) {
			return ApiResponder.instance.error(
				{
					error: { code: 'MISSING_DATA_ERROR', message: 'Missing data' },
				},
				httpStatus.BAD_REQUEST
			);
		}

		const insertResult = await DbClient.instance.collections.dashboards.insertOne({
			name,
			owner: new ObjectId(locals.user!._id),
			updatedAt: new Date(),
		});

		if (!insertResult.acknowledged) {
			return ApiResponder.instance.error(
				{
					error: { code: 'INSERT_ERROR', message: 'Failed to insert new record' },
				},
				httpStatus.INTERNAL_SERVER_ERROR
			);
		}

		const updateResult = await DbClient.instance.collections.users.updateOne(
			{ _id: new ObjectId(locals.user!._id) },
			{
				$push: { dashboards: insertResult.insertedId },
			}
		);

		if (!updateResult.acknowledged) {
			return ApiResponder.instance.error(
				{
					error: { code: 'UPDATE_ERROR', message: 'Failed to update user dashboard' },
				},
				httpStatus.INTERNAL_SERVER_ERROR
			);
		}

		return ApiResponder.instance.data(
			{ data: { _id: insertResult.insertedId } },
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
	return ApiResponder.instance.data(
		{
			data: await UserRepository.instance.getDashboard(new ObjectId(locals.user!._id)),
		},
		httpStatus.OK
	);
}) satisfies RequestHandler;
