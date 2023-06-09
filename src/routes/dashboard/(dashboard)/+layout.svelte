<script lang="ts">
	import { page } from '$app/stores';
	import Typewriter from 'svelte-typewriter';
	import { backIn, backOut, quadOut } from 'svelte/easing';
	import { fly, scale } from 'svelte/transition';
	import LL from '~/i18n/i18n-svelte';
	import type { LayoutData } from './$types';
	import type { NavigationEntryData } from './components';
	import SideBarNavigation from './components/SideBarNavigation.svelte';
	import TopRight from './components/TopRight.svelte';
	import { meta } from '~/routes';
	import BackNavigationButton from '~/lib/components/BackNavigationButton.svelte';

	export let data: LayoutData;

	let entries: NavigationEntryData[];
	$: entries = [
		{
			text: $LL.dashboard.entry.dashboard(),
			href: `/dashboard/${$page.params.id}`,
			icon: 'RectangleGroup',
		},
		{
			text: $LL.dashboard.entry.area(),
			href: `/dashboard/${$page.params.id}/area`,
			icon: 'Square2Stack',
		},
		{
			text: $LL.dashboard.entry.alert(),
			href: `/dashboard/${$page.params.id}/alerts`,
			icon: 'ShieldExclamation',
		},
		{
			text: $LL.dashboard.entry.profiles(),
			href: `/dashboard/${$page.params.id}/profiles`,
			icon: 'User',
		},
		{
			text: $LL.dashboard.entry.statistic(),
			href: `/dashboard/${$page.params.id}/statistic`,
			icon: 'ChartBar',
		},
	];
	let footerEntries: NavigationEntryData[];
	$: footerEntries = [
		{
			text: $LL.dashboard.entry.setting(),
			href: `/dashboard/${$page.params.id}/settings`,
			icon: 'Cog8Tooth',
		},
		{
			text: $LL.dashboard.entry.logout(),
			href: `/logout`,
			icon: 'ArrowLeftOnRectangle',
		},
	] satisfies NavigationEntryData[];
	let currentEntry: NavigationEntryData | undefined;
	let lastIndex: number = -1;
	let delta = 1;

	$: {
		const index = entries.findIndex((e) => e.href === data.url.pathname);
		delta = index > lastIndex ? 1 : -1;
		lastIndex = index;
		currentEntry = entries[index];
	}
</script>

<div in:scale={{ start: 1.04, duration: 400, easing: quadOut }} class="flex min-h-screen h-full">
	<SideBarNavigation {entries} {footerEntries} />
	<div class="ml-16 transition-[margin] lg:ml-52 p-6 w-full">
		<div class="flex justify-between items-center mb-3 relative gap-x-12">
			<div>
				<div class="flex gap-x-3">
					<BackNavigationButton />
					<Typewriter delay={150} interval={55} mode="cascade">
						<h1>
							{$meta.title}
						</h1>
					</Typewriter>
				</div>
			</div>
			<TopRight data={{ email: data.user?.email ?? '', imageUrl: '' }} />
		</div>
		{#key data.url.pathname.split('/', 4).join('/')}
			<section
				in:fly|local={{
					y: 6 * delta,
					duration: 400,
					delay: 100,
					easing: backOut,
				}}
				out:fly|local={{ y: -4 * delta, duration: 100, easing: backIn }}
			>
				<slot />
			</section>
		{/key}
	</div>
</div>
