<script lang="ts">
	import { AnimateSharedLayout } from 'svelte-motion';
	import type { NavigationItemData } from '.';
	import NavigationItem from './NavigationItem.svelte';

	export let items: NavigationItemData[];
</script>

<AnimateSharedLayout>
	<nav
		class="font-display text-h4 font-bold px-4 py-1 bg-primary-100 -z-50 rounded-md border-primary-300 border"
	>
		<ul class="flex items-center gap-x-8">
			{#each items as item}
				<NavigationItem {item} />
			{/each}
		</ul>
	</nav>
</AnimateSharedLayout>
