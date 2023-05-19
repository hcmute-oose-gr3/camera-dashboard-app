<script lang="ts">
	import type { PageData } from './$types';
	import LL from '~/i18n/i18n-svelte';
	import { getContext } from 'svelte';
	import type { WritablePageMeta } from '../..';
	import Table from './components/Chart.svelte';
	import { warning } from './components/data';

	// export let data: PageData;
	let checked = Array(warning.length).fill(false);

	const meta = getContext('meta') as WritablePageMeta;

	$: $meta.title = $LL.statistic.title();
</script>
