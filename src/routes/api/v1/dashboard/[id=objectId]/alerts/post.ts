import { ApiResponder } from '~/lib/server/services/api-responder';
import type { RequestHandler } from './$types';
import httpStatus from 'http-status';
import { DbClient } from '~/lib/server/services/db-client';
import { ObjectId } from 'mongodb';
import { z } from 'zod';
import { isValidTimeString } from '~/lib/utils';
import { Deserializer } from '~/lib/server/services/deserializer';

export const POST = (async ({ request, params }) => {
	try {
		const formData = await request.formData();
		const dashboardId = new ObjectId(params.id);

		if (formData.has('cameraId')) {
			return handleZonePOST(dashboardId, formData);
		} else if (formData.has('profileId')) {
			// TODO: profile POST
		} else if (formData.has('startTime')) {
			return handleTimePOST(dashboardId, formData);
		}
		return ApiResponder.instance.error(
			{
				error: {
					code: 'VALIDATION_ERROR',
					message: 'Invalid data',
				},
			},
			httpStatus.BAD_REQUEST
		);
	} catch (e: any) {
		return ApiResponder.instance.error(
			{
				error: {
					code: e.name || 'INTERNAL_SERVER_ERROR',
					message: e.message || httpStatus['500_MESSAGE'],
				},
			},
			httpStatus.INTERNAL_SERVER_ERROR
		);
	}
}) satisfies RequestHandler;

async function handleTimePOST(dashboardId: ObjectId, formData: FormData) {
	const schema = z.object({
		name: z.string().min(1),
		startTime: z.string().refine((v) => isValidTimeString(v), 'Invalid start time'),
		endTime: z.string().refine((v) => isValidTimeString(v), 'Invalid end time'),
		alertLevel: z.number().min(0).max(2),
	});

	const parse = await schema.safeParseAsync({
		name: formData.get('name'),
		startTime: formData.get('startTime'),
		endTime: formData.get('endTime'),
		alertLevel: Number(formData.get('alertLevel')),
	});

	if (!parse.success) {
		return ApiResponder.instance.error(
			{
				error: {
					code: 'VALIDATION_ERROR',
					path: parse.error.issues[0].path,
					message: parse.error.issues[0].message,
				},
			},
			httpStatus.BAD_REQUEST
		);
	}

	const data = {
		...parse.data,
		dashboardId,
	};
	await DbClient.instance.collections.alerts.insertOne(data);

	return ApiResponder.instance.data(
		{ data: Deserializer.instance.deserialize(data) },
		httpStatus.OK
	);
}

async function handleZonePOST(dashboardId: ObjectId, formData: FormData) {
	const schema = z.object({
		cameraId: z.string().refine((v) => ObjectId.isValid(v), 'Invalid camera id'),
		name: z.string().min(1),
		top: z.number(),
		left: z.number(),
		width: z.number(),
		height: z.number(),
	});

	const parse = await schema.safeParseAsync({
		cameraId: formData.get('cameraId'),
		name: formData.get('name'),
		top: Number(formData.get('top')),
		left: Number(formData.get('left')),
		width: Number(formData.get('width')),
		height: Number(formData.get('bottom')),
	});

	if (!parse.success) {
		return ApiResponder.instance.error(
			{
				error: {
					code: 'VALIDATION_ERROR',
					path: parse.error.issues[0].path,
					message: parse.error.issues[0].message,
				},
			},
			httpStatus.BAD_REQUEST
		);
	}

	const data = { ...parse.data, cameraId: new ObjectId(parse.data.cameraId), dashboardId };
	await DbClient.instance.collections.alerts.insertOne(data);

	return ApiResponder.instance.data(
		{ data: Deserializer.instance.deserialize(data) },
		httpStatus.OK
	);
}
