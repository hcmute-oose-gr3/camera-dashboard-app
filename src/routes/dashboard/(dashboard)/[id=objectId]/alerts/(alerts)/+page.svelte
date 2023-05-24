<script lang="ts">
	import LL from '~/i18n/i18n-svelte';
	import { meta } from '~/routes';
	import type { PageData } from './$types';
	import Table from './components/Table.svelte';

	export let data: PageData;
	let checked = Array(data.alerts.length).fill(false);

	$meta = { title: $LL.dashboard.alert.meta.title() };
</script>

<Table alerts={data.alerts} bind:checked />
