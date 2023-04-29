import httpStatus from 'http-status';
import { ObjectId } from 'mongodb';
import { ApiResponder } from '~/lib/server/services/api-responder';
import { DbClient } from '~/lib/server/services/db-client';
import type { RequestHandler } from './$types';

export const GET = (async (e) => {
	if (!e.locals.user) {
		return ApiResponder.instance.error(
			{
				error: { code: 'NOT_LOGGED_IN_ERROR', message: 'You are not logged in yet' }
			},
			httpStatus.UNAUTHORIZED
		);
	}
	e.cookies.delete('session_token', {
		path: '/',
		httpOnly: true,
		sameSite: 'strict',
		secure: process.env.NODE_ENV === 'production'
	});
	try {
		await DbClient.instance.collections.users.updateOne(
			{ _id: new ObjectId(e.locals.user._id) },
			{ $unset: { sessionToken: true } }
		);
	} catch (e) {
		throw e;
	}
	return ApiResponder.instance.data({ data: {} }, httpStatus.OK);
}) satisfies RequestHandler;
