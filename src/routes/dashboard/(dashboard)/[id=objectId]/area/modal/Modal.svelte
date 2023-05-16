<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import { z } from 'zod';
	import LL from '~/i18n/i18n-svelte';
	import Icon from '~/lib/components/Icon.svelte';
	import PrimaryButton from '~/lib/components/PrimaryButton.svelte';
	import Spinner from '~/lib/components/Spinner.svelte';
	import Input from '~/lib/components/Input.svelte';
	import { ApiRoutes } from '~/lib/utils/api-routes';
	import type { ApiDataResponse, ApiResponse } from '~/lib/models/api-response';
	import { instanceOf } from '~/lib/utils';
	import { fly } from 'svelte/transition';
	import { quadOut } from 'svelte/easing';
	import Pending from '~/lib/components/Pending.svelte';
	type FormFields = 'name' | 'serial' | 'activate';
	export let showModal: boolean;
	export let data: any;
	let dialog: HTMLDialogElement;
	let fieldErrors: Partial<Record<FormFields, string>> = {};
	const inputElements: Record<FormFields, HTMLInputElement> = {} as any;
	let submitting = false;
	let canSubmit = false;
	let formResponse: ApiResponse | undefined;
	const dispatcher = createEventDispatcher<{ submit: () => void }>();
	onMount(() => {
		canSubmit = true;
	});
	$: if (dialog && showModal) dialog.showModal();
	async function submit(this: HTMLFormElement) {
		const form = new FormData(this);
		submitting = true;
		formResponse = undefined;
		const schema = z.object({
			name: z.string().min(6, $LL.dashboard.area.modal.name.min()),
		});
		const result = await schema.safeParseAsync({
			name: form.get('name'),
		});
		if (!result.success) {
			fieldErrors = {};
			result.error.issues.forEach((iss, idx) => {
				fieldErrors[iss.path[idx] as FormFields] = iss.message;
			});
			inputElements[result.error.issues[0].path[0] as FormFields].focus();
			submitting = false;
			return;
		}
		form.set('name', result.data.name);
		if (form.get('activate') === null) {
			console.log('asds');
			form.set('activate', 'false');
		} else {
			form.set('activate', 'true');
		}
		form.set('id', data.id);
		const json = await fetch(this.action, {
			method: 'post',
			body: form,
		})
			.then((v) => v.json())
			.finally(() => {
				submitting = false;
				dispatcher('submit');
			});
		formResponse = json;
	}
</script>

<dialog bind:this={dialog} on:close={() => (showModal = false)} class="w-[40%] rounded-lg h-fit">
	<form class=" px-[32px]" on:submit|preventDefault={submit} action={ApiRoutes.AREA}>
		<div class="flex justify-between items-center pb-2 border-b-[1px]">
			<p class="font-bold">{$LL.dashboard.area.modal.title()}</p>
			<button on:click={() => dialog.close()}>X</button>
		</div>
		<div class="mt-12 justify-between flex">
			<div class="flex flex-col gap-y-1">
				<Input
					bind:input={inputElements.name}
					id="name"
					name="name"
					type="text"
					spellcheck={false}
					class="transition"
					label={$LL.dashboard.area.modal.name.titel()}
					caption={fieldErrors?.name}
					accent={fieldErrors?.name ? 'negative' : undefined}
				/>
			</div>
			<div class="space-x-4 flex items-center">
				<p class="font-bold">{$LL.dashboard.area.modal.activate.title()}</p>
				<div class="">
					<label for="true">{$LL.dashboard.area.modal.activate.true()}</label>
					<input bind:this={inputElements.activate} type="checkbox" name="activate" />
				</div>
			</div>
		</div>
		<div class="mt-12 flex justify-between pb-12">
			<div class="">
				<PrimaryButton type="submit" class="w-max" disabled={!canSubmit || submitting}>
					<div class="flex gap-x-3 items-center">
						<Pending pending={submitting}>
							<div slot="pending">
								<Spinner class="w-full h-full" />
							</div>
							<Icon name="ArrowRightOnRectangle" class="text-icon-base" />
						</Pending>
						{$LL.dashboard.area.modal.title()}
					</div>
				</PrimaryButton>
			</div>
		</div>
		{#if formResponse}
			<!-- svelte-ignore missing-declaration -->
			<div transition:fly={{ y: 20, easing: quadOut, duration: 200 }}>
				{#if instanceOf(formResponse, 'error')}
					<div
						class={`border-[1px] rounded-md p-4 mt-4 bg-negative-200 border-negative-400`}
					>
						<p>
							<span class="text-negative-700 text-h5">
								{formResponse.error.code}
							</span>{' '}
							{formResponse.error.message}.
						</p>
					</div>
				{:else}
					<div
						class={`border-[1px] rounded-md p-4 mt-4 bg-positive-200 border-positive-400`}
					>
						<p>
							<span class="text-positive-700 text-h5"> 200 </span>{' '}
							{$LL.signup.success()}.
						</p>
					</div>
				{/if}
			</div>
		{/if}
	</form>
</dialog>
