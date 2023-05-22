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
	import Icon from '~/lib/components/Icon.svelte';

	export let data: LayoutData;

	let entries: NavigationEntryData[] = [
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
	];
	let footerEntries = [
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
					{#if globalThis.history?.length}
						<button
							on:click={() => {
								globalThis.history?.back();
							}}
						>
							<Icon
								name="ArrowLongLeft"
								class="transition ease-in-out
							hover:-translate-x-1 hover:text-primary-700"
							/>
						</button>
					{/if}
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
				out:fly|local={{ y: -4 * delta, opacity: 1, duration: 100, easing: backIn }}
			>
				<slot />
			</section>
		{/key}
	</div>
</div>
