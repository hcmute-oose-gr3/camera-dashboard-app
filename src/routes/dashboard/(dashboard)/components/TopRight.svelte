<script lang="ts">
	import Icon from '~/lib/components/Icon.svelte';
	import type { TopRightData } from '.';

	export let data: TopRightData;
</script>

<div class="items-center gap-x-4 hidden md:flex">
	<!-- <Icon name="MagnifyingGlass" />
	<Icon name="Bell" /> -->
	<p>{data.email}</p>
	<div class="aspect-square rounded-full w-14 h-14 bg-primary-600" />
</div>
