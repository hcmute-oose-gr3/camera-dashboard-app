import { CameraConnection, CameraSecurityLevel } from '~/lib/models/dashboard';
import type { PageLoad } from './$types';

export const load = (async (e) => {
	return e.data;
}) satisfies PageLoad;
