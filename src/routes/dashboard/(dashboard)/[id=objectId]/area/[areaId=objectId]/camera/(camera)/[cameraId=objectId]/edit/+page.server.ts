import { DbClient } from '~/lib/server/services/db-client';
import type { PageServerLoad } from './$types';
import { ObjectId, type WithId } from 'mongodb';
import type { Camera } from '~/lib/models/camera';
import { error } from '@sveltejs/kit';
import httpStatus from 'http-status';

export const load = (async ({ params }) => {
	const camera = await DbClient.instance.collections.dashboards
		.aggregate<WithId<Camera>>([
			{ $match: { _id: new ObjectId(params.id) } },
			{ $match: { 'areas._id': new ObjectId(params.areaId) } },
			{ $unwind: '$areas' },
			{ $replaceRoot: { newRoot: '$areas' } },
			{ $unwind: '$cameras' },
			{ $match: { 'cameras._id': new ObjectId(params.cameraId) } },
			{ $replaceRoot: { newRoot: '$cameras' } },
		])
		.next();
	if (!camera) {
		throw error(httpStatus.NOT_FOUND, { message: 'Camera not found' });
	}
	return { camera: Object.assign(camera, { _id: camera._id.toHexString() }) };
}) satisfies PageServerLoad;
