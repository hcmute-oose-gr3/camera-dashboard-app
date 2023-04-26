import type { Dashboard } from '~/lib/models/dashboard';
import type { PageLoad } from './$types';
import type { ApiDataResponse } from '~/lib/models/api-response';

export const load = (async ({ fetch }) => {
	const response = await fetch('/api/v1/dashboard', { method: 'get' }).then(
		(v) => v.json() as Promise<ApiDataResponse<Dashboard[]>>
	);
	return {
		dashboards: response.data
	};
}) satisfies PageLoad;
