<script lang="ts">
	import type { PageData } from './$types';
	import Table from './components/Table.svelte';

	export let data: PageData;
	let checked = Array(data.cameras.length).fill(false);
</script>

<Table cameras={data.cameras} bind:checked />
