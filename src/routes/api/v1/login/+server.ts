import httpStatus from 'http-status';
import apiResponder from '~/lib/server/services/api-responder';
import bcrypt from 'bcrypt';
import { DbClient } from '~/lib/server/services/db-client.js';

export const POST = async (e) => {
	const formData = await e.request.formData();
	const email = formData.get('email');
	const password = formData.get('password');
	if (!email || !password) {
		return apiResponder.error({
			error: {
				code: httpStatus.UNAUTHORIZED,
				message: 'Missing credentials'
			}
		});
	}
	const user = await DbClient.instance.collections.users.findOne(
		{ email },
		{ projection: { email: 1, password: 1 }, limit: 1 }
	);
	if (!user) {
		return apiResponder.error({
			error: {
				code: httpStatus.UNAUTHORIZED,
				message: 'Email not found'
			}
		});
	}

	const matched = await bcrypt.compare(password.toString(), user.password);
	if (!matched) {
		return apiResponder.error({
			error: {
				code: httpStatus.UNAUTHORIZED,
				message: 'Password does not match'
			}
		});
	}

	const token = crypto.randomUUID();
	await DbClient.instance.collections.users.updateOne(
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
