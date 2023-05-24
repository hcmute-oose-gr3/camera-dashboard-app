import { ObjectId } from 'mongodb';
import type { PageServerLoad } from './$types';
import { DbClient } from '~/lib/server/services/db-client';
import { Deserializer } from '~/lib/server/services/deserializer';
import { Pageable } from '~/lib/models/pageable';

export const load = (async ({ depends, params, url }) => {
	depends('profiles');
	const pageable = new Pageable(url.searchParams.get('page'), url.searchParams.get('size'));
	const profiles = await DbClient.instance.collections.profiles
		.find(
			{ dashboardId: new ObjectId(params.id) },
			{ projection: { dashboardId: 0 }, skip: pageable.offset, limit: pageable.size }
		)
		.toArray();
	return { profiles: Deserializer.instance.deserialize(profiles) };
}) satisfies PageServerLoad;
