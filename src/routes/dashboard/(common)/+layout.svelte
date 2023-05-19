<script lang="ts">
	import { blur, fade, fly, scale, slide } from 'svelte/transition';
	import { backIn, backOut, quadIn, quadInOut, quadOut } from 'svelte/easing';
	import type { LayoutData } from '../$types';
	export let data: LayoutData;
</script>

{#key data.url.href}
	<section
		in:fly|local={{ y: -8, duration: 400, delay: 100, easing: backOut }}
		out:fly|local={{ y: 4, duration: 100, easing: backIn }}
		class="absolute w-full h-full p-16"
	>
		<slot />
	</section>
{/key}
