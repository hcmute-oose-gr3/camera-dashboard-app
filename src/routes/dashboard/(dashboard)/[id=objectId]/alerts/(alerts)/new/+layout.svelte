<script lang="ts">
	import { page } from '$app/stores';
	import LL from '~/i18n/i18n-svelte';
	import type { NavigationItemData } from '../components';
	import NavigationMenu from '../components/NavigationMenu.svelte';
	import type { LayoutData } from './$types';
	import { slide } from 'svelte/transition';
	import { cubicIn, cubicOut } from 'svelte/easing';

	export let data: LayoutData;
	let items: NavigationItemData[];
	$: items = [
		{
			text: $LL.dashboard.alert.new.time.navigation(),
			href: `/dashboard/${$page.params.id}/alerts/new/time`,
		},
		{
			text: $LL.dashboard.alert.new.profile.navigation(),
			href: `/dashboard/${$page.params.id}/alerts/new/profile`,
		},
		{
			text: $LL.dashboard.alert.new.zone.navigation(),
			href: `/dashboard/${$page.params.id}/alerts/new/zone`,
		},
	] satisfies NavigationItemData[];

	let path: string;
	$: path = data.url.pathname.split('/', 6).slice(5).join('/');
</script>

<section
	class="flex flex-col-reverse justify-between gap-2
	md:flex-row"
>
	{#key path}
		<div
			class="flex flex-col w-full gap-y-4"
			in:slide|local={{ duration: 400, delay: 100, easing: cubicOut }}
			out:slide|local={{ duration: 100, easing: cubicIn }}
		>
			<slot />
		</div>
	{/key}
	<NavigationMenu {items} />
</section>
