import httpStatus from 'http-status';
import { APIEvent } from 'solid-start';
import apiResponder from '~/services/api-responder';
import mongodbCollections from '~/services/mongodb-collections';

export const POST = async (e: APIEvent) => {
	const formData = await e.request.formData();
	const username = formData.get('username');
	const password = formData.get('password');
	if (!username || !password) {
		return apiResponder.error({
			error: {
				code: httpStatus.UNAUTHORIZED,
				message: 'Missing credentials',
			},
		});
	}
	const user = await mongodbCollections.users.findOne(
		{ name: username },
		{ projection: { _id: 0, name: 1 }, limit: 1 }
	);
	if (!user) {
		return apiResponder.error({
			error: {
				code: httpStatus.UNAUTHORIZED,
				message: 'Username not found',
			},
		});
	}
	return apiResponder.data({ data: user }, { status: httpStatus.OK });
};
