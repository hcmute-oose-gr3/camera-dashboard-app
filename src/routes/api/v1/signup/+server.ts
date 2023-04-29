import httpStatus from 'http-status';
import bcrypt from 'bcrypt';
import { DbClient } from '~/lib/server/services/db-client.js';
import { ApiResponder } from '~/lib/server/services/api-responder';

export const POST = async (e) => {
	const formData = await e.request.formData();
	const email = formData.get('email');
	const password = formData.get('password');
	const cfpassword = formData.get('confpassword');
	if (!email || !password || !cfpassword) {
		return ApiResponder.instance.error(
			{
				error: {
					code: 'MISSING_DATA_ERROR',
					message: 'Missing required data'
				}
			},
			httpStatus.UNAUTHORIZED
		);
	}
	if (password != cfpassword) {
		return ApiResponder.instance.error(
			{
				error: {
					code: 'CONFIRM_PASSWORD_ERROR',
					message: 'Password and confirm password do not match'
				}
			},
			httpStatus.BAD_REQUEST
		);
	}
	const count = await DbClient.instance.collections.users.countDocuments(
		{ email: email },
		{ limit: 1 }
	);
	if (count) {
		return ApiResponder.instance.error(
			{
				error: {
					code: 'EMAIL_IN_USED_ERROR',
					message: 'Email exist!!! please choose another email'
				}
			},
			httpStatus.UNAUTHORIZED
		);
	}

	const hashPassword = await bcrypt.hash(password.toString(), 12);

	const response = await DbClient.instance.collections.users
		.insertOne({
			email: email.valueOf().toString(),
			password: hashPassword
		})
		.catch((e) => {
			return ApiResponder.instance.error(
				{
					error: {
						code: 'SIGN_UP_EXCEPTION_ERROR',
						message: 'SignUp Fail'
					}
				},
				httpStatus.INTERNAL_SERVER_ERROR
			);
		});

	return ApiResponder.instance.data({ data: response }, httpStatus.OK);
};
