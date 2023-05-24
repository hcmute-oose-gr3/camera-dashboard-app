import { DbClient } from '~/lib/server/services/db-client';
import type { LayoutServerLoad } from './$types';
import { ObjectId } from 'mongodb';

export const load = (async ({ params }) => {
	const dashboard = await DbClient.instance.collections.dashboards.findOne(
		{
			_id: new ObjectId(params.id),
			'areas._id': new ObjectId(params.areaId)
		},
		{ projection: { _id: 0, 'areas.name.$': 1 } }
	);
	return { areaName: dashboard?.areas?.[0].name || '' };
}) satisfies LayoutServerLoad;
