import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import httpStatus from 'http-status';

export const load = (({ data }) => {
	if (!data.camera) {
		throw error(httpStatus.NOT_FOUND, { message: 'Camera not found' });
	}
	return data;
}) satisfies PageLoad;
