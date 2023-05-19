import { get } from 'svelte/store';
import type { LayoutLoad } from './$types';
import LL from '~/i18n/i18n-svelte';

export const load = (({ data }) => {
	return Object.assign(data, {
		meta: { title: get(LL).dashboard.area.meta.namedTitle({ areaName: data.areaName }) },
	});
}) satisfies LayoutLoad;
