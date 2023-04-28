<script lang="ts">
	import NavigationEntry from './NavigationEntry.svelte';
	import type { NavigationEntryData } from '.';
	import Logo from '~/lib/components/Logo.svelte';
	import { AnimateSharedLayout } from 'svelte-motion';

	export let entries: NavigationEntryData[];
	export let footerEntries: NavigationEntryData[];
</script>

<section
	class="fixed h-screen w-full max-w-[4rem] lg:max-w-[13rem] transition-[max-width] bg-fill-100 px-3 py-6 flex flex-col justify-start border-r-2 border-r-fill-200"
>
	<Logo class="w-6 h-6 mx-auto lg:mx-0 lg:w-12 lg:h-12 fill-primary-700" />
	<div class="mt-6 flex flex-col justify-between h-full">
		<AnimateSharedLayout>
			<nav>
				<ol class="flex flex-col gap-y-2 list-none">
					{#each entries as entry}
						<NavigationEntry data={entry} />
					{/each}
				</ol>
			</nav>
			<footer>
				<ol class="flex flex-col gap-y-2 list-none">
					{#each footerEntries as entry}
						<NavigationEntry data={entry} />
					{/each}
				</ol>
			</footer>
		</AnimateSharedLayout>
	</div>
</section>
