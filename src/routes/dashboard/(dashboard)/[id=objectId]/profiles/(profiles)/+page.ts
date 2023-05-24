import type { PageLoad } from './$types';
import type { Profile } from '~/lib/models/profile';

export const load = (async ({ depends, data }) => {
	depends('profiles');
	return data as {
		profiles: (Omit<Profile, 'dashboardId'> & { _id: string })[];
	};
}) satisfies PageLoad;
