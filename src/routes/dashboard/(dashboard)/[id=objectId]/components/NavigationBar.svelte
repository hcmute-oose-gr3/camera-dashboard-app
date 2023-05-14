<script lang="ts">
	import { AnimateSharedLayout } from 'svelte-motion';
	import type { NavigationItemData } from '.';
	import NavigationItem from './NavigationItem.svelte';

	export let items: NavigationItemData[];
</script>

<AnimateSharedLayout>
	<nav class="font-display text-h4 font-bold">
		<ul class="flex items-center gap-x-8">
			{#each items as item}
				<NavigationItem {item} />
			{/each}
		</ul>
	</nav>
</AnimateSharedLayout>
