<script lang="ts">
	import NavigationItem from './NavigationItem.svelte';
	import type { NavigationItemData } from '.';
	import { AnimateSharedLayout } from 'svelte-motion';

	export let items: NavigationItemData[];
</script>

<AnimateSharedLayout>
	<nav class="border border-fill-200 p-2 min-w-max h-max rounded-xl">
		<ol
			class="flex gap-2
			md:flex-col"
		>
			{#each items as item}
				<NavigationItem data={item} />
			{/each}
		</ol>
	</nav>
</AnimateSharedLayout>
