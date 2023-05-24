<script lang="ts">
	import type { PageData } from './$types';
	import LL from '~/i18n/i18n-svelte';
	import { getContext } from 'svelte';
	import { meta } from '~/routes';
	import Chart from './components/Chart.svelte';
	import { data } from './components/data';
	$meta = {
		title: $LL.statistic.title(),
	};
	let selectedOption = Object.keys(data)[0];
</script>

<div class="">
	<select bind:value={selectedOption}>
		{#each Object.keys(data) as key}
			<option value={key}>{key}</option>
		{/each}
	</select>
</div>
<div class="overflow-x-auto">
	<Chart {selectedOption} />
</div>
