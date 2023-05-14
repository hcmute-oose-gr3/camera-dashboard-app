<script lang="ts">
	import { fade, fly, scale } from 'svelte/transition';
	import SideBarNavigation from './components/SideBarNavigation.svelte';
	import { quadIn, quadOut } from 'svelte/easing';
	import TopRight from './components/TopRight.svelte';
	import type { LayoutData } from './$types';
	import type { NavigationEntryData } from './components';
	import Typewriter from 'svelte-typewriter';
	import LL from '~/i18n/i18n-svelte';
	import { page } from '$app/stores';
	import type { PageMeta } from '.';
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';

	export let data: LayoutData;

	let entries: NavigationEntryData[] = [
		{
			text: $LL.dashboard.entry.dashboard(),
			href: `/dashboard/${$page.params.id}`,
			icon: 'RectangleGroup'
		},
		{
			text: $LL.dashboard.entry.area(),
			href: `/dashboard/${$page.params.id}/area`,
			icon: 'Square2Stack'
		}
	];
	let footerEntries = [
		{
			text: $LL.dashboard.entry.logout(),
			href: `/logout`,
			icon: 'ArrowLeftOnRectangle'
		}
	] satisfies NavigationEntryData[];
	let currentEntry: NavigationEntryData | undefined;
	let lastIndex: number = -1;
	let delta = 1;

	const meta = writable<PageMeta>({ title: '' });
	setContext('meta', meta);

	$: {
		const index = entries.findIndex((e) => e.href === data.url.pathname);
		delta = index > lastIndex ? 1 : -1;
		lastIndex = index;
		currentEntry = entries[index];
	}

	$: ({ title } = $meta);
</script>

<svelte:head>
	<title>{$meta.title}</title>
</svelte:head>

<div in:scale={{ start: 1.04, duration: 700, easing: quadOut }} class="flex min-h-screen h-full">
	<SideBarNavigation {entries} {footerEntries} />
	<div class="ml-16 transition-[margin] lg:ml-52 p-6 w-full">
		<div class="flex justify-between items-center mb-3 relative gap-x-12">
			<div>
				<Typewriter delay={320} interval={70} keepCursorOnFinish={false} mode="cascade">
					<h1>
						{title}
					</h1>
				</Typewriter>
			</div>
			<TopRight data={{ email: data.user?.email ?? '', imageUrl: '' }} />
		</div>
		{#key data.url.pathname.split('/', 4).join('/')}
			<section
				in:fly|local={{
					y: 5 * delta,
					duration: 100,
					delay: 200,
					easing: quadOut
				}}
				out:fly|local={{ y: -15 * delta, opacity: 1, duration: 200, easing: quadIn }}
			>
				<slot />
			</section>
		{/key}
	</div>
</div>
