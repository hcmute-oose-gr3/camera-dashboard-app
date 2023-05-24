import httpStatus from 'http-status';
import bcrypt from 'bcrypt';
import { DbClient } from '~/lib/server/services/db-client.js';
import { ApiResponder } from '~/lib/server/services/api-responder';
import { transporter } from '~/lib/utils/nodemailer';
import LL from '~/i18n/i18n-svelte.js';
import { get } from 'svelte/store';
import type User from '~/lib/models/user.js';
import type { InsertOneResult } from 'mongodb';

export const POST = async (e) => {
	const formData = await e.request.formData();
	const email = formData.get('email') as string | null;
	const password = formData.get('password') as string | null;
	const cfpassword = formData.get('confpassword') as string | null;
	if (!email || !password || !cfpassword) {
		return ApiResponder.instance.error(
			{
				error: {
					code: 'MISSING_DATA_ERROR',
					message: 'Missing required data',
				},
			},
			httpStatus.UNAUTHORIZED
		);
	}
	if (password != cfpassword) {
		return ApiResponder.instance.error(
			{
				error: {
					code: 'CONFIRM_PASSWORD_ERROR',
					message: 'Password and confirm password do not match',
				},
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
					message: 'Email exist!!! please choose another email',
				},
			},
			httpStatus.UNAUTHORIZED
		);
	}

	const hashPassword = await bcrypt.hash(password.toString(), 12);

	let response: InsertOneResult<User>;
	try {
		response = await DbClient.instance.collections.users.insertOne({
			email: email.valueOf().toString(),
			password: hashPassword,
			unverified: true,
		});
	} catch (e) {
		return ApiResponder.instance.error(
			{
				error: {
					code: 'SIGN_UP_EXCEPTION_ERROR',
					message: 'SignUp Fail',
				},
			},
			httpStatus.INTERNAL_SERVER_ERROR
		);
	}
	const options = {
		from: process.env.EMAIL_SERVER_USER,
		to: email,
		subject: get(LL).signup.verifyMail.subject(),
		html: get(LL).signup.verifyMail.body({
			email: email,
			url: `https://camera-dashboard-app-duydang2311.vercel.app/verify/${response.insertedId.toHexString()}`,
		}),
	};

	try {
		transporter
			.sendMail(options)
			.then((data) => {
				console.log(data);
			})
			.catch((e) => console.log(e));
	} catch (e) {
		console.log(e);
	}
	return ApiResponder.instance.data({ data: 'Check Your mail' }, httpStatus.OK);
};
