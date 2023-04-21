import httpStatus from 'http-status';
import bcrypt from 'bcrypt';
import { DbClient } from '~/lib/server/services/db-client.js';
import type { RequestHandler } from './$types';
import { ApiResponder } from '~/lib/server/services/api-responder';

export const POST = async (e) => {
	const formData = await e.request.formData();
	const email = formData.get('email');
	const password = formData.get('password');
    const cfpassword = formData.get('confpassword');
	if (!email || !password || !cfpassword) {
		return ApiResponder.instance.error({
			error: {
				code: httpStatus.UNAUTHORIZED,
				message: 'Missing credentials'
			}
		});
	}
	const existuser = await DbClient.instance.collections.users.findOne(
		{ email:  email},
		{ projection: { email: 1 }, limit: 1 }
	);
	if (existuser) {
		return ApiResponder.instance.error({
			error: {
				code: httpStatus.UNAUTHORIZED,
				message: 'Email exist!!! please choose another email'
			}
		});
	}
    if(password != cfpassword) {
        return ApiResponder.instance.error({
			error: {
				code: httpStatus.BAD_REQUEST,
				message:'Password and confirm password do not match'
			}
		});
    }
	
    const hashPassword = await bcrypt.hash(password.toString(), 10);
    
    const user = await DbClient.instance.collections.users.insertOne({
        email: email.valueOf().toString(),
        password: hashPassword,
    })
	
	if (!user) {
		return ApiResponder.instance.error({
			error: {
				code: httpStatus.UNAUTHORIZED,
				message: 'SignUp Fail'
			}
		});
	}

	return ApiResponder.instance.data({ data: user }, { status: httpStatus.OK });
};
