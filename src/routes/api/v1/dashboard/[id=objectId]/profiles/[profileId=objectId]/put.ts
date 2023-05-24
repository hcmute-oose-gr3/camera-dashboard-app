import { ApiResponder } from '~/lib/server/services/api-responder';
import type { RequestHandler } from './$types';
import httpStatus from 'http-status';
import { DbClient } from '~/lib/server/services/db-client';
import { ObjectId } from 'mongodb';
import { z } from 'zod';
import { isValidTimeString } from '~/lib/utils';
import { Deserializer } from '~/lib/server/services/deserializer';
import { Cloudinary } from '~/lib/server/services/cloudinary';
import { UploadApiErrorResponse, type UploadApiResponse } from 'cloudinary';
import type { Profile } from '~/lib/models/profile';

export const PUT = (async ({ request, params }) => {
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

		const file = formData.get('image') as File;
		const profile = await DbClient.instance.collections.profiles.findOne(
			{ _id: new ObjectId(params.profileId) },
			{ projection: { _id: 0 } }
		);
		if (!profile) {
			return ApiResponder.instance.error(
				{
					error: {
						code: 'NOT_FOUND_ERROR',
						message: 'Profile not found',
					},
				},
				httpStatus.NOT_FOUND
			);
		}
		if (file.size > 0) {
			const [err, result] = await new Promise<
				[UploadApiErrorResponse | undefined, UploadApiResponse]
			>(async (resolve) => {
				Cloudinary.instance.uploader
					.upload_stream(
						{
							public_id: profile?.image.publicId,
							resource_type: 'image',
							overwrite: true,
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
			profile.image = {
				publicId: result.public_id,
				version: result.version,
			};
		}

		delete (profile as any)._id;
		profile.name = parse.data.name;

		await DbClient.instance.collections.profiles.replaceOne(
			{
				_id: new ObjectId(params.profileId),
			},
			profile
		);
		return ApiResponder.instance.data({ data: profile }, httpStatus.OK);
	} catch (e: any) {
		return ApiResponder.instance.caught(e);
	}
}) satisfies RequestHandler;
