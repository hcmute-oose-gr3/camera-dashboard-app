<script lang="ts">
	import Icon from '~/lib/components/Icon.svelte';
	import Modal from './modal/Modal.svelte';
	import type { PageData } from './$types';
	import Video from '../components/Video.svelte';
	import { onMount } from 'svelte';
	import LL from '~/i18n/i18n-svelte';
	import { paginate, LightPaginationNav } from 'svelte-paginate';
	import { ApiRoutes } from '~/lib/utils/api-routes';
	import { page } from '$app/stores';
	import { invalidate } from '$app/navigation';
	let showModal = false;
	export let data: PageData;
	let currentPage = 1;
	let pageSize = 5;
	let items = data.areas;
	$: paginatedItems = paginate({ items: data.areas, pageSize, currentPage });
	async function handleActivate(arae: any) {
		const form = new FormData();
		form.set('activate', arae.activate);
		form.set('id', data.id);
		form.set('idA', arae._id);
		const json = await fetch(ApiRoutes.AREA, {
			method: 'put',
			body: form
		}).then((v) => {
			data.areas.find((v) => v === arae).activate = !arae.activate;
			paginatedItems = paginatedItems;
		});
	}

	function submit() {
		invalidate('abc');
	}
</script>

<Modal bind:showModal bind:data on:submit={submit} />
<div class="w-[85%] mx-auto h-full shadow-lg rounded-lg relative flex flex-col">
	<div class="py-[32px] px-[32px] cursor-pointer">
		<div class="mb-12 flex justify-between">
			<p class="text-xl font-bold">{$LL.dashboard.area.home()}</p>
			<button on:click={() => (showModal = true)} class="flex">
				<Icon name="FolderPlus" class="text-black text-opacity-30" />
				<p class="text-black font-bold text-opacity-30">{$LL.dashboard.area.add()}</p>
			</button>
		</div>
		<table class="w-full h-full">
			<thead class="w-full">
				<tr class="grid grid-cols-4 bg-black bg-opacity-5 rounded-lg">
					<th class="text-center border-r-[2px] border-opacity-10 border-black">#</th>
					<th class="text-center border-r-[2px] border-opacity-10 border-black"
						>{$LL.dashboard.area.serial()}</th
					>
					<th class="text-center border-r-[2px] border-opacity-10 border-black">
						{$LL.dashboard.area.name()}
					</th>
					<th class="text-center border-r-[2px] border-opacity-10 border-black"
						>{$LL.dashboard.area.activate()}</th
					>
				</tr>
			</thead>
			<tbody class="w-full space-y-6">
				{#each paginatedItems as area, i}
					<tr class="grid grid-cols-4 mb-6 border-b-[1px] py-4 rounded-xl shadow-sm">
						<td class="text-center">
							<input type="checkbox" name="check" id="check" />
						</td>
						<td class="text-center">{i}</td>
						<td class="text-center">
						<td class="text-center">{area.name}</td>
							<a href=`/dashboard/${$page.params.id}/area/${area id}/camera`>
								{area.name}
							</a>
							</td>
						<td class="text-center">
							{#if area.activate}
								<button on:click={() => handleActivate(area)}>
									<Icon
										name="CheckCircle"
										class="text-green-700 text-center w-full"
									/>
								</button>
							{:else}
								<button on:click={() => handleActivate(area)}>
									<Icon name="XCircle" class="text-red-700 text-center w-full" />
								</button>
							{/if}
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
	<div class="py-[32px] px-[32px] cursor-pointer mt-auto">
		<LightPaginationNav
			totalItems={items.length}
			{pageSize}
			{currentPage}
			limit={1}
			showStepOptions={true}
			on:setPage={(e) => (currentPage = e.detail.page)}
			class="mt-auto"
		/>
	</div>
</div>
