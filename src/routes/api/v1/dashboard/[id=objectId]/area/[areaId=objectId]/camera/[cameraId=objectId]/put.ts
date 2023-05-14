import { ApiResponder } from '~/lib/server/services/api-responder';
import type { RequestHandler } from './$types';
import httpStatus from 'http-status';
import { DbClient } from '~/lib/server/services/db-client';
import { ObjectId } from 'mongodb';
import { z } from 'zod';

export const PUT = (async ({ request, params }) => {
	try {
		const formData = await request.formData();

		const schema = z.object({
			name: z.string().min(1),
			url: z.string().url(),
			securityLevel: z.number().min(0).max(2),
		});

		const parse = await schema.safeParseAsync({
			name: formData.get('name'),
			url: formData.get('url'),
			securityLevel: Number(formData.get('securityLevel')),
		});

		if (!parse.success) {
			return ApiResponder.instance.error(
				{
					error: {
						code: 'FIELD_ERROR',
						path: parse.error.issues[0].path,
						message: parse.error.issues[0].message,
					},
				},
				httpStatus.BAD_REQUEST
			);
		}

		const result = await DbClient.instance.collections.dashboards.updateOne(
			{
				_id: new ObjectId(params.id),
			},
			{
				$set: {
					'areas.$[a].cameras.$[c].name': parse.data.name,
					'areas.$[a].cameras.$[c].url': parse.data.url,
					'areas.$[a].cameras.$[c].securityLevel': parse.data.securityLevel,
				},
			},
			{
				arrayFilters: [
					{ 'a._id': new ObjectId(params.areaId) },
					{ 'c._id': new ObjectId(params.cameraId) },
				],
			}
		);
		return ApiResponder.instance.data(
			{
				data: result,
			},
			httpStatus.OK
		);
	} catch (e: any) {
		return ApiResponder.instance.error(
			{
				error: { code: 'EXCEPTION_ERROR', message: e.message || 'Exception' },
			},
			httpStatus.INTERNAL_SERVER_ERROR
		);
	}
}) satisfies RequestHandler;
