import LL from '~/i18n/i18n-svelte';
import type { PageLoad } from './$types';
import { get } from 'svelte/store';

export const load = (async ({ data }) => {
	return { ...data, meta: { title: get(LL).dashboard.meta.title } };
}) satisfies PageLoad;
