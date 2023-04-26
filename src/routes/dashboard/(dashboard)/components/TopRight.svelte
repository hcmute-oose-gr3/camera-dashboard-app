<script lang="ts">
	import type { TopRightData } from '.';

	export let data: TopRightData;
</script>

<div class="flex items-center gap-x-4">
	<span class="material-symbols-rounded">search</span>
	<span class="material-symbols-rounded">notifications</span>
	<p>{data.email}</p>
	<div class="aspect-square rounded-full w-14 h-14 bg-primary-600" />
</div>
