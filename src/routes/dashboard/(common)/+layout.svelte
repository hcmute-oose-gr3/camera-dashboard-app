<script lang="ts">
	import { fly } from 'svelte/transition';
	import { backIn, backOut } from 'svelte/easing';
	import type { LayoutData } from '../$types';
	import { meta } from '~/routes';
	import Icon from '~/lib/components/Icon.svelte';
	import BackNavigationButton from '~/lib/components/BackNavigationButton.svelte';
	export let data: LayoutData;
</script>

{#key data.url.href}
	<section
		in:fly|local={{ y: -8, duration: 400, delay: 100, easing: backOut }}
		out:fly|local={{ y: 4, duration: 100, easing: backIn }}
		class="absolute w-full h-full p-16"
	>
		<h1 class="flex gap-x-3 items-center">
			<BackNavigationButton />
			{$meta.title}
		</h1>
		<slot />
	</section>
{/key}
