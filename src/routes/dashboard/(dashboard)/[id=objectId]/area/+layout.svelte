<script lang="ts">
	import { backIn, backOut } from 'svelte/easing';

	import { scale } from 'svelte/transition';
	import type { LayoutData } from './$types';
	export let data: LayoutData;
</script>

{#key data.url.pathname.split('/', 6).slice(4, -1).join('/')}
	<div
		in:scale|local={{ start: 0.99, duration: 400, delay: 100, easing: backOut }}
		out:scale|local={{ start: 1.01, duration: 100, easing: backIn }}
	>
		<slot />
	</div>
{/key}
