<script lang="ts">
	import NavigationBar from '~/routes/dashboard/(dashboard)/[id=objectId]/components/NavigationBar.svelte';
	import type { NavigationItemData } from '~/routes/dashboard/(dashboard)/[id=objectId]/components';
	import type { LayoutData } from './$types';
	import { page } from '$app/stores';
	import { fly } from 'svelte/transition';
	import { backIn, backOut } from 'svelte/easing';
	import { getContext } from 'svelte';
	import type { WritablePageMeta } from '~/routes/dashboard/(dashboard)';
	import LL from '~/i18n/i18n-svelte';
	export let data: LayoutData;
	const items = [
		{
			text: 'All cameras',
			href: `/dashboard/${$page.params.id}/area/${$page.params.areaId}/camera`,
		},
		{
			text: 'Add camera',
			href: `/dashboard/${$page.params.id}/area/${$page.params.areaId}/camera/add`,
		},
	] satisfies NavigationItemData[];

	let delta = 1;
	let lastIndex = -1;
	$: {
		const index = items.findIndex((i) => i.href === data.url.pathname);
		delta = index > lastIndex ? 1 : -1;
		lastIndex = index;
	}

	const meta = getContext('meta') satisfies WritablePageMeta;
	$: $meta.title = $LL.dashboard.area.meta.namedTitle({ areaName: data.areaName });
</script>

<NavigationBar {items} />
{#key data.url}
	<div
		class="mt-4"
		in:fly|local={{ x: -6 * delta, duration: 400, delay: 100, easing: backOut }}
		out:fly|local={{ opacity: 1, x: 4 * delta, duration: 100, easing: backIn }}
	>
		<slot />
	</div>
{/key}
