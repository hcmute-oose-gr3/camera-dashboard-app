<script lang="ts">
	import type { PageData } from './$types';
	import LL from '~/i18n/i18n-svelte';
	import { getContext } from 'svelte';
	import type { WritablePageMeta } from '~/routes';
	import Chart from './components/Chart.svelte';

	const meta = getContext('meta') as WritablePageMeta;

	$: $meta.title = $LL.statistic.title();
</script>

<Chart />
