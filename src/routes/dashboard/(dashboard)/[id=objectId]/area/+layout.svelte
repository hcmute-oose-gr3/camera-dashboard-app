<script lang="ts">
	import { slide } from 'svelte/transition';
	import { cubicIn, cubicOut } from 'svelte/easing';
	import type { LayoutData } from './$types';
	export let data: LayoutData;
</script>

{#key data.url.pathname.split('/', 6).slice(4, -1).join('/')}
	<div
		in:slide|local={{ duration: 400, delay: 100, easing: cubicOut }}
		out:slide|local={{ duration: 200, easing: cubicIn }}
	>
		<slot />
	</div>
{/key}
