import { GET } from '~/routes/api/v1/dashboard/[id=objectId]/area/[areaId=objectId]/camera/+server';
import type { PageServerLoad } from './$types';
import type { Camera } from '~/lib/models/dashboard';

export const load = (async (e) => {
	return {
		cameras: await GET(e as any)
			.then((v) => v.json())
			.then((v) => v.data as (Camera & { _id: string })[]),
	};
}) satisfies PageServerLoad;
