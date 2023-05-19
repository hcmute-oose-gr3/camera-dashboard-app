import { get } from 'svelte/store';
import type { PageLoad } from './$types';
import LL from '~/i18n/i18n-svelte';

export const load = (() => {
	return { meta: { title: get(LL).dashboard.add.meta.title() } };
}) satisfies PageLoad;
