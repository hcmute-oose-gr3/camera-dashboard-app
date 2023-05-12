import { GET } from '~/routes/api/v1/dashboard/[id=objectId]/area/[areaId=objectId]/camera/+server';
import type { PageServerLoad } from './$types';
import type { WithId } from 'mongodb';
import type { Camera } from '~/lib/models/dashboard';

export const load = ((e) => {
	return {
		cameras: GET(e as any)
			.then((v) => v.json())
			.then((v) => v.data as WithId<Camera>[])
	};
}) satisfies PageServerLoad;
