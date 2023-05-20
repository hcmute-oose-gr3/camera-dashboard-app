<script lang="ts">
	import { page } from '$app/stores';
	import Icon from '~/lib/components/Icon.svelte';
	import type { PageData } from '../$types';

	export let showModal: boolean;
	export let data: PageData;

	let dialog: HTMLDialogElement;
	$: if (dialog && showModal) dialog.showModal();
	// $: console.log(data);
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<dialog
	bind:this={dialog}
	on:close={() => (showModal = false)}
	on:click|self={() => dialog.close()}
	class="rounded-lg p-0"
>
	<div class="py-8">
		<div class="flex relative justify-between items-center pb-2 px-8">
			<div class="flex items-center space-x-3">
				<h4>Delete</h4>
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
		<div class="border-b-[2px] w-full" />
		<div class="w-full flex flex-col items-center mt-3">
			<div class="text-center w-fit mx-auto">
				<Icon name="ArchiveBoxXMark" />
			</div>
			<p class="text-opacity-10 text-xl text-center font-medium">
				{data.dashboard?.name}
			</p>
			<p />
		</div>
	</div>
</dialog>
