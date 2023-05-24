import type { Camera } from '~/lib/models/camera';
import type { PageLoad } from './$types';
import type { Area } from '~/lib/models/area';

export const load = (({ data }) => {
	return data as {
		areas: (Pick<Area, 'name' | 'cameras'> & { _id: string } & {
			cameras: (Pick<Camera, 'name' | 'url'> & { _id: string })[];
		})[];
	};
}) satisfies PageLoad;
