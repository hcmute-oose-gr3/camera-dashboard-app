<script lang="ts">
	import { page } from '$app/stores';
	import Icon from '~/lib/components/Icon.svelte';
	import type { PageData } from '../$types';
	import { goto } from '$app/navigation';
	import LL from '~/i18n/i18n-svelte';

	export let showModal: boolean;
	export let data: PageData;

	let dialog: HTMLDialogElement;
	$: if (dialog && showModal) dialog.showModal();
	async function handleDelete() {
		const json = await fetch(`/api/v1/dashboard/${data.dashoardId}`, {
			method: 'DELETE',
		})
			.then((r) => {
				goto('/dashboard');
			})
			.catch((e) => {
				console.log(e);
			});
	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<dialog
	bind:this={dialog}
	on:close={() => (showModal = false)}
	on:click|self={() => dialog.close()}
	class="rounded-lg p-0 w-[35%] bg-fill-100 text-fill-900"
>
	<div class="py-4">
		<div class="flex relative justify-between items-center pb-2 px-8">
			<div class="flex items-center space-x-3">
				<h4>{$LL.dashboard.setting.modal.title()}</h4>
				<div class="flex items-center">
					<h4>
						{data.user?.email}
					</h4>
					/
					<h4>
						{data.dashboard?.name}
					</h4>
				</div>
			</div>
			<button on:click={() => dialog.close()}><Icon name="XMark" /></button>
		</div>
		<div class="border-b-[1px] w-full border-fill-1000 border-opacity-20" />
		<div class="w-full flex flex-col items-center mt-4 space-y-3">
			<div class="text-center w-fit mx-auto">
				<Icon name="ArchiveBoxXMark" />
			</div>
			<p class="text-opacity-10 text-xl text-center font-medium">
				{data.dashboard?.name}
			</p>
			<div class="flex space-x-3">
				<div class="text-opacity-10 text-center font-medium flex items-center space-x-2">
					<Icon name="Square2Stack" />
					<p class="text-xs">
						{data.numberOfitems[0].numberOfAreas}
						{$LL.dashboard.setting.modal.items.area()}
					</p>
				</div>
				<div class="text-opacity-10 text-center font-medium flex items-center space-x-2">
					<Icon name="VideoCamera" />
					<p class="text-xs">
						{data.numberOfitems[0].numberOfCameras}
						{$LL.dashboard.setting.modal.items.camera()}
					</p>
				</div>
			</div>
		</div>
		<div class="border-b-[1px] border-fill-1000 border-opacity-20 w-full my-4" />
		<div class="w-full">
			<div
				class="w-[80%] border-[1px] hover:shadow-lg border-fill-1000 border-opacity-20 hover:border-opacity-80 mx-auto text-center rounded-lg"
			>
				<button class="p-2 rounded-lg" on:click={() => handleDelete()}>
					<p class="text-base">{$LL.dashboard.setting.modal.button()}</p>
				</button>
			</div>
		</div>
	</div>
</dialog>
