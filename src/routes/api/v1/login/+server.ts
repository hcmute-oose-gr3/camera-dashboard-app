import httpStatus from 'http-status';
import apiResponder from '~/lib/server/services/api-responder';
import mongodbCollections from '~/lib/server/services/mongodb-collections';

export const POST = async (e) => {
	const formData = await e.request.formData();
	const username = formData.get('username');
	const password = formData.get('password');
	if (!username || !password) {
		return apiResponder.error({
			error: {
				code: httpStatus.UNAUTHORIZED,
				message: 'Missing credentials'
			}
		});
	}
	const user = await mongodbCollections.users.findOne(
		{ name: username },
		{ projection: { name: 1 }, limit: 1 }
	);
	if (!user) {
		return apiResponder.error({
			error: {
				code: httpStatus.UNAUTHORIZED,
				message: 'Username not found'
			}
		});
	}

	const token = crypto.randomUUID();
	await mongodbCollections.users.updateOne(
		{
			_id: user._id
		},
		{ $set: { sessionToken: token } }
	);

	e.cookies.set('session_token', token, {
		path: '/',
		maxAge: 60 * 60 * 24 * 30,
		httpOnly: true,
		sameSite: 'strict',
		secure: process.env.NODE_ENV === 'production'
	});
	return apiResponder.data({ data: user }, { status: httpStatus.OK });
};