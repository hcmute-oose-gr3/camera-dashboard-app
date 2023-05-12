<script lang="ts">
	import NavigationBar from '~/routes/dashboard/(dashboard)/[id=objectId]/components/NavigationBar.svelte';
	import type { NavigationItemData } from '~/routes/dashboard/(dashboard)/[id=objectId]/components';
	import type { LayoutData } from './$types';
	import { page } from '$app/stores';
	import { fly } from 'svelte/transition';
	import { quadIn, quadOut } from 'svelte/easing';
	export let data: LayoutData;
	const items = [
		{
			text: 'All cameras',
			href: `/dashboard/${$page.params.id}/area/${$page.params.areaId}/camera`
		},
		{
			text: 'Add camera',
			href: `/dashboard/${$page.params.id}/area/${$page.params.areaId}/camera/add`
		}
	] satisfies NavigationItemData[];

	let delta = 1;
	let lastIndex = -1;
	$: {
		const index = items.findIndex((i) => i.href === data.url.pathname);
		delta = index > lastIndex ? 1 : -1;
		lastIndex = index;
	}
</script>

<NavigationBar {items} />
{#key data.url}
	<div
		class="mt-4"
		in:fly|local={{ x: -5 * delta, duration: 200, delay: 200, easing: quadOut }}
		out:fly|local={{ x: 5 * delta, duration: 200, easing: quadIn }}
	>
		<slot />
	</div>
{/key}
