import type { ProfileBasedAlert, TimeBasedAlert, ZoneBasedAlert } from '~/lib/models/alert';
import type { PageLoad } from './$types';

export const load = (async ({ depends, data }) => {
	depends('alerts');
	return data as {
		alerts: ((TimeBasedAlert | ProfileBasedAlert | ZoneBasedAlert) & { _id: string })[];
	};
}) satisfies PageLoad;
