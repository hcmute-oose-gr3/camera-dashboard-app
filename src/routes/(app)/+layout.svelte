<script lang="ts">
	import { blur } from 'svelte/transition';
	import { quadIn, quadOut } from 'svelte/easing';
	import type { LayoutData } from '../$types';
	export let data: LayoutData;
</script>

{#key data.url.href}
	<section
		in:blur={{ amount: 2, duration: 200, delay: 200, easing: quadIn }}
		out:blur|local={{ amount: 1, duration: 400, easing: quadOut }}
		class="absolute w-full h-full"
	>
		<slot />
	</section>
{/key}
