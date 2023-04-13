import httpStatus from 'http-status';
import apiResponder from '~/lib/server/services/api-responder';

export const GET = async (e) => {
	e.cookies.delete('session_token', {
		path: '/',
		httpOnly: true,
		sameSite: 'strict',
		secure: process.env.NODE_ENV === 'production'
	});
	return apiResponder.data({ data: {} }, { status: httpStatus.OK });
};
