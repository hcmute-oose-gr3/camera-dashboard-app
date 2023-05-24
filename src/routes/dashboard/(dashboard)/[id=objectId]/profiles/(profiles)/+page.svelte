<script lang="ts">
	import LL from '~/i18n/i18n-svelte';
	import { meta } from '~/routes';
	import type { PageData } from './$types';
	import Table from './components/Table.svelte';

	export let data: PageData;
	let checked = Array(data.profiles.length).fill(false);

	$meta = { title: $LL.dashboard.profiles.meta.title() };
</script>

<Table profiles={data.profiles} bind:checked />
