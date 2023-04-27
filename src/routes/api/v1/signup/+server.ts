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
		return ApiResponder.instance.error({
			error: {
				code: httpStatus.UNAUTHORIZED,
				message: 'Missing credentials'
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
	const count = await DbClient.instance.collections.users.countDocuments(
		{ email:  email},
		{ limit: 1 }
	);
	if (count) {
		return ApiResponder.instance.error({
			error: {
				code: httpStatus.UNAUTHORIZED,
				message: 'Email exist!!! please choose another email'
			}
		});
	}
	
    const hashPassword = await bcrypt.hash(password.toString(), 12);
    
    const response = await DbClient.instance.collections.users.insertOne({
        email: email.valueOf().toString(),
        password: hashPassword,
    })
	
	if (!response) {
		return ApiResponder.instance.error({
			error: {
				code: httpStatus.UNAUTHORIZED,
				message: 'SignUp Fail'
			}
		});
	}

	return ApiResponder.instance.data({ data: response }, { status: httpStatus.OK });
};
