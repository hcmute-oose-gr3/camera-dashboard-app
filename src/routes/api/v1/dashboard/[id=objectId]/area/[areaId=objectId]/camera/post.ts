import { ApiResponder } from '~/lib/server/services/api-responder';
import type { RequestHandler } from './$types';
import httpStatus from 'http-status';
import { DbClient } from '~/lib/server/services/db-client';
import { ObjectId } from 'mongodb';
import { CameraConnection, CameraSecurityLevel } from '~/lib/models/dashboard';
import { z } from 'zod';

export const POST = (async (e) => {
	try {
		const formData = await e.request.formData();
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

		DbClient.instance.collections.dashboards.updateOne(
			{
				_id: new ObjectId(e.params.id),
				'areas._id': new ObjectId(e.params.areaId),
			},
			{
				$push: {
					'areas.$.cameras': {
						_id: new ObjectId(),
						updatedAt: new Date(),
						name: formData.get('name')!.toString(),
						url: formData.get('url')!.toString(),
						connection: CameraConnection.Connected,
						securityLevel: Number(
							formData.get('securityLevel')
						) as any as CameraSecurityLevel,
					},
				},
			}
		);

		return ApiResponder.instance.data(
			{
				data: [],
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
