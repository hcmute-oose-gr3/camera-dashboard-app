import { get } from 'svelte/store';
import type { PageLoad } from './$types';
import LL from '~/i18n/i18n-svelte';

export const load = (({ data }) => {
	console.log('page 1');

	return Object.assign(data, {
		meta: {
			title: get(LL).dashboard.meta.namedTitle({ dashboardName: data.dashboard?.name ?? '' }),
		},
	});
}) satisfies PageLoad;
