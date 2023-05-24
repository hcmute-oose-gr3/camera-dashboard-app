import { ApiResponder } from '~/lib/server/services/api-responder';
import type { RequestHandler } from './$types';
import httpStatus from 'http-status';
import { DbClient } from '~/lib/server/services/db-client';
import { ObjectId } from 'mongodb';
import { z } from 'zod';
import { Cloudinary } from '~/lib/server/services/cloudinary';
import type { UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';

export const POST = (async ({ request, params }) => {
	try {
		const formData = await request.formData();

		const schema = z.object({
			name: z.string().min(1),
		});

		const parse = await schema.safeParseAsync({
			name: formData.get('name'),
		});

		if (!parse.success) {
			return ApiResponder.instance.error(
				{
					error: {
						code: 'FORM_ERROR',
						path: parse.error.issues[0].path,
						message: parse.error.issues[0].message,
					},
				},
				httpStatus.BAD_REQUEST
			);
		}

		const file = formData.get('image');
		if (!file || !(file instanceof File)) {
			return ApiResponder.instance.error(
				{
					error: {
						code: 'FORM_ERROR',
						path: 'image',
						message: 'Image is required',
					},
				},
				httpStatus.BAD_REQUEST
			);
		}

		const [err, uploadResult] = await new Promise<
			[UploadApiErrorResponse | undefined, UploadApiResponse]
		>(async (resolve) => {
			Cloudinary.instance.uploader
				.upload_stream(
					{
						resource_type: 'image',
						folder: 'profiles',
					},
					(err, result) => {
						resolve([err, result as any]);
					}
				)
				.end(Buffer.from(await file.arrayBuffer()));
		});

		if (err) {
			return ApiResponder.instance.caught(err);
		}

		const data = {
			dashboardId: new ObjectId(params.id),
			name: parse.data.name,
			image: {
				publicId: uploadResult.public_id,
				version: uploadResult.version,
			},
		};

		await DbClient.instance.collections.profiles.insertOne(data);
		return ApiResponder.instance.data({ data }, httpStatus.OK);
	} catch (e: any) {
		return ApiResponder.instance.caught(e);
	}
}) satisfies RequestHandler;
