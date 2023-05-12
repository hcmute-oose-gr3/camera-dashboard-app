import { get } from 'svelte/store';
import type { RequestHandler } from './$types';
import { Db, ObjectId, type WithId } from 'mongodb';
import type User from '~/lib/models/user';
import { DbClient } from '~/lib/server/services/db-client';
import { ApiResponder } from '~/lib/server/services/api-responder';
import httpStatus from 'http-status';

export const GET = (async (e) => {
	let id = e.params.id;
	let response: WithId<User> | null;
	try {
		response = await DbClient.instance.collections.users.findOne({
			_id: new ObjectId(id)
		});
	} catch (e) {
		return ApiResponder.instance.error(
			{
				error: {
					code: 'USER_NOT_FOUND_ERROR',
					message: 'Validation Fail'
				}
			},
			httpStatus.INTERNAL_SERVER_ERROR
		);
	}
	if (response == null) {
		return ApiResponder.instance.error(
			{
				error: {
					code: 'USER_NOT_FOUND_ERROR',
					message: 'Validation Fail'
				}
			},
			httpStatus.INTERNAL_SERVER_ERROR
		);
	}
	if (!response.unverified) {
		return ApiResponder.instance.error(
			{
				error: {
					code: 'USER_ALREADY_VERIFIED_ERROR',
					message: 'Already verified'
				}
			},
			httpStatus.INTERNAL_SERVER_ERROR
		);
	}

	try {
		DbClient.instance.collections.users.updateOne(
			{
				_id: new ObjectId(id)
			},
			{
				$unset: { unverified: true }
			}
		);
	} catch (e) {
		return ApiResponder.instance.error(
			{
				error: {
					code: 'UPDATE_ERROR',
					message: 'Update failure'
				}
			},
			httpStatus.INTERNAL_SERVER_ERROR
		);
	}
	return ApiResponder.instance.data({ data: 'Completed Verification' }, httpStatus.OK);
}) satisfies RequestHandler;
