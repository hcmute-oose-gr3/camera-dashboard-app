import httpStatus from 'http-status';
import { ObjectId } from 'mongodb';
import apiResponder from '~/lib/server/services/api-responder';
import mongodbCollections from '~/lib/server/services/mongodb-collections.js';

export const GET = async (e) => {
	if (!e.locals.userId) {
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
		await mongodbCollections.users.updateOne(
			{ _id: new ObjectId(e.locals.userId) },
			{ $unset: { sessionToken: true } }
		);
	} catch (e) {
		throw e;
	}
	return apiResponder.data({ data: {} }, { status: httpStatus.OK });
};
