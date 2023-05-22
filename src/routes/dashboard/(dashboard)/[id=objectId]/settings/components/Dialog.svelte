<script lang="ts">
	import { page } from '$app/stores';
	import Icon from '~/lib/components/Icon.svelte';
	import type { PageData } from '../$types';
	import { goto } from '$app/navigation';
	import LL from '~/i18n/i18n-svelte';
	import SecondaryButton from '~/lib/components/SecondaryButton.svelte';
	import PrimaryButton from '~/lib/components/PrimaryButton.svelte';

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

<dialog
	bind:this={dialog}
	on:close={() => (showModal = false)}
	class="rounded-xl p-0 min-w-[30rem] bg-fill-100 text-fill-1000"
>
	<div class="py-4">
		<div class="flex relative justify-between items-center px-4 pb-4">
			<div class="flex items-center space-x-3">
				<h4>
					{$LL.dashboard.settings.modal.title({
						dashboard: data.dashboard?.name ?? '...',
					})}
				</h4>
			</div>
			<SecondaryButton on:click={() => dialog.close()} class="p-1 border-none bg-fill-200"
				><Icon name="XMark" class="w-5 h-5" /></SecondaryButton
			>
		</div>
		<div class="border-b-[1px] w-full border-fill-600 border-opacity-20" />
		<div class="w-full flex flex-col items-center mt-4 gap-y-6">
			<div class="space-y-2">
				<div class="w-fit mx-auto">
					<Icon name="ArchiveBoxXMark" class="w-10 h-10" />
				</div>
				<h1>
					{data.dashboard?.name}
				</h1>
			</div>
			<div class="flex gap-x-12">
				<div class="text-center">
					<p class="leading-none text-h1">
						{data.numberOfitems[0].numberOfAreas}
					</p>
					<p>
						{$LL.dashboard.settings.modal.items.area()}
					</p>
				</div>
				<div class="text-center">
					<p class="leading-none text-h1">
						{data.numberOfitems[0].numberOfCameras}
					</p>
					<p>
						{$LL.dashboard.settings.modal.items.camera()}
					</p>
				</div>
				<!-- <div class="text-center font-medium flex items-center space-x-2">
					<Icon name="VideoCamera" />
					<p>
						{data.numberOfitems[0].numberOfCameras}
						{$LL.dashboard.settings.modal.items.camera()}
					</p>
				</div> -->
			</div>
		</div>
		<div class="border-b-[1px] border-fill-600 border-opacity-20 w-full my-4" />
		<PrimaryButton
			class="text-negative-700 bg-negative-200 p-2 rounded-lg block mx-auto
			hover:bg-negative-300 hover:text-negative-800 focus:ring-negative-500"
			on:click={() => handleDelete()}
		>
			<p class="text-base">{$LL.dashboard.settings.modal.button()}</p>
		</PrimaryButton>
	</div>
</dialog>
