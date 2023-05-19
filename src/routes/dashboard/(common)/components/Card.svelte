<script lang="ts">
	import type { WithId } from 'mongodb';
	import LL from '~/i18n/i18n-svelte';
	import type { Dashboard } from '~/lib/models/dashboard';

	export let data: WithId<Dashboard>;
	let days = 0;
	$: {
		const today = new Date();
		const createdDate = new Date(data.createdAt);
		days = Math.round(
			(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()) -
				Date.UTC(
					createdDate.getFullYear(),
					createdDate.getMonth(),
					createdDate.getDate()
				)) /
				(1000 * 60 * 60 * 24)
		);
	}
</script>

<a
	href="/dashboard/{data._id}"
	class="text-left font-normal bg-fill-100 border border-fill-300 p-6 rounded-xl flex flex-col gap-y-6 justify-between
transition duration-100 ease-in-out
hover:translate-y-1 hover:scale-105"
>
	<h1 class="text-primary-700">{data.name}</h1>
	<p class="text-fill-400 font-medium text-sm">
		{#if days === 0}
			{$LL.dashboard.card.createdToday()}
		{:else}
			{$LL.dashboard.card.createdDaysAgo({ days })}
		{/if}
	</p>
</a>
