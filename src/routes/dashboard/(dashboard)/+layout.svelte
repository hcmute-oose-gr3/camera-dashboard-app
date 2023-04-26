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

	export let data: LayoutData;

	let entries: NavigationEntryData[] = [
		{
			text: $LL.dashboard.entry.dashboard(),
			href: `/dashboard/${$page.params.id}`,
			icon: 'RectangleGroup'
		},
		{
			text: $LL.dashboard.entry.camera(),
			href: `/dashboard/${$page.params.id}/camera`,
			icon: 'VideoCamera'
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

	$: {
		const index = entries.findIndex((e) => e.href === data.url.pathname);
		delta = index > lastIndex ? 1 : -1;
		lastIndex = index;
		currentEntry = entries[index];
	}
</script>

<div class="overflow-hidden">
	<div
		in:scale={{ start: 1.04, duration: 700, easing: quadOut }}
		class="flex min-h-screen h-full"
	>
		<SideBarNavigation {entries} {footerEntries} />
		<div class="ml-16 transition-[margin] lg:ml-52 p-6 w-full">
			<div class="flex flex-row md:justify-between md:items-center mb-3 relative gap-x-12">
				{#key currentEntry}
					<div
						in:fade={{ delay: 300, duration: 300, easing: quadOut }}
						out:fade={{ duration: 300, easing: quadIn }}
					>
						<div>
							<Typewriter
								delay={320}
								interval={70}
								keepCursorOnFinish={false}
								mode="cascade"
							>
								<h1>{currentEntry?.text}</h1>
							</Typewriter>
						</div>
					</div>
				{/key}
				<TopRight data={{ email: data.user?.email ?? '', imageUrl: '' }} />
			</div>
			{#key data.url.href}
				<section
					in:fly={{
						y: 5 * delta,
						duration: 300,
						delay: 400,
						easing: quadOut
					}}
					out:fly={{ y: -15 * delta, opacity: 1, duration: 400, easing: quadIn }}
				>
					<slot />
				</section>
			{/key}
		</div>
	</div>
</div>
