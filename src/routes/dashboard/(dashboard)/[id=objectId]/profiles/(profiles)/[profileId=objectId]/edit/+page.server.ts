import type { PageServerLoad } from './$types';
import { DbClient } from '~/lib/server/services/db-client';
import { ObjectId } from 'mongodb';
import { Deserializer } from '~/lib/server/services/deserializer';
import { Cloudinary } from '~/lib/server/services/cloudinary';

export const load = (async ({ params }) => {
	const profile = await DbClient.instance.collections.profiles.findOne({
		_id: new ObjectId(params.profileId),
	});
	return {
		profile: !profile
			? null
			: Deserializer.instance.deserialize({
					...profile,
					imageUrl: Cloudinary.instance.url(profile.image.publicId, {
						version: profile.image.version,
						format: 'webp',
						secure: true,
					}),
			  }),
	};
}) satisfies PageServerLoad;
