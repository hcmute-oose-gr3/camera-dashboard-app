import { ObjectId } from 'mongodb';
import type { PageServerLoad } from './$types';
import { DbClient } from '~/lib/server/services/db-client';
import { Deserializer } from '~/lib/server/services/deserializer';
import { Pageable } from '~/lib/models/pageable';

export const load = (async ({ depends, params, url }) => {
	depends('alerts');
	const pageable = new Pageable(url.searchParams.get('page'), url.searchParams.get('size'));
	const aggregate = await DbClient.instance.collections.alerts
		.aggregate([
			{ $match: { dashboardId: new ObjectId(params.id) } },
			{ $skip: pageable.offset },
			{ $limit: pageable.size },
		])
		.toArray();
	return { alerts: Deserializer.instance.deserialize(aggregate) };
}) satisfies PageServerLoad;
