<script lang="ts">
	import type { PageData } from './$types';
	import Table from './components/Table.svelte';

	export let data: PageData;
	let checked = Array(data.areas.length).fill(false);
</script>

<Table areas={data.areas} bind:checked />
