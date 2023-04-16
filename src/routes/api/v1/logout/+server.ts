import httpStatus from 'http-status';
import { ObjectId } from 'mongodb';
import apiResponder from '~/lib/server/services/api-responder';
import { DbClient } from '~/lib/server/services/db-client';

export const GET = async (e) => {
	if (!e.locals.user) {
		return apiResponder.error({
			error: { code: httpStatus.UNAUTHORIZED, message: 'You are not logged in yet' }
		});
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
	return apiResponder.data({ data: {} }, { status: httpStatus.OK });
};
