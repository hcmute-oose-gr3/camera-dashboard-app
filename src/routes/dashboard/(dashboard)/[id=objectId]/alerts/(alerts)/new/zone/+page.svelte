<script lang="ts">
	import Input from '~/lib/components/Input.svelte';
	import Pending from '~/lib/components/Pending.svelte';
	import LL from '~/i18n/i18n-svelte';
	import PrimaryButton from '~/lib/components/PrimaryButton.svelte';
	import Spinner from '~/lib/components/Spinner.svelte';
	import Icon from '~/lib/components/Icon.svelte';
	import { onMount } from 'svelte';
	import { z } from 'zod';
	import { page } from '$app/stores';
	import type { ApiErrorResponse, ApiResponse } from '~/lib/models/api-response';
	import { fly } from 'svelte/transition';
	import { instanceOf } from '~/lib/utils';
	import Toast from '~/lib/components/Toast.svelte';
	import { quadIn, quadOut } from 'svelte/easing';
	import type { Camera } from '~/lib/models/camera';
	import RowVisibilityAnimate from '~/lib/components/RowVisibilityAnimate.svelte';
	import Select from '~/lib/components/Select.svelte';
	import type { PageData } from './$types';
	import { editor } from '.';
	import { writable } from 'svelte/store';

	type Fields = 'name' | 'camera';

	$: ({ new: text } = $LL.dashboard.alert);
	export let data: PageData;

	let pending = true;
	let fieldErrors: { [key in Fields]?: string } = {};
	let inputElements: { [key in Fields]?: HTMLInputElement } = {};
	let formResponse: ApiResponse;
	let camera: Camera & { _id: string };

	async function submit(this: HTMLFormElement) {
		const formData = new FormData(this);

		console.log(camera);
		const schema = z.object({
			name: z.string().min(1, text.name.nonempty()),
			camera: z.string().min(1, text.zone.camera.nonempty()),
		});

		const parse = await schema.safeParseAsync({
			name: formData.get('name'),
			camera: formData.get('camera') ?? '',
		});

		fieldErrors = {};
		if (!parse.success) {
			parse.error.issues.forEach((iss) => {
				fieldErrors[iss.path[0] as Fields] = iss.message;
			});
			for (const issue of parse.error.issues) {
				inputElements[issue.path[0] as Exclude<Fields, 'alertLevel'>]?.focus();
				break;
			}
			return;
		}

		if ($editorStore.width === 0 && $editorStore.height === 0) {
			fieldErrors.camera = text.zone.camera.missingZone();
			return;
		}

		pending = true;
		formData.delete('camera');
		formData.set('cameraId', camera._id);
		formData.set('top', $editorStore.top + '');
		formData.set('left', $editorStore.left + '');
		formData.set('width', $editorStore.width + '');
		formData.set('height', $editorStore.height + '');
		formResponse = await fetch(this.action, {
			method: 'post',
			body: formData,
		})
			.then((v) => v.json())
			.catch(
				(e) =>
					({
						apiVersion: '',
						error: {
							code: e.name,
							message: e.message,
						},
					} satisfies ApiErrorResponse)
			)
			.finally(() => {
				pending = false;
			});
	}

	onMount(() => {
		pending = false;
	});

	let editorData: any = {};
	let editorStore = writable({ top: 0, left: 0, width: 0, height: 0 });
</script>

<form
	action="/api/v1/dashboard/{$page.params.id}/alerts"
	class="flex justify-start gap-x-4"
	on:submit|preventDefault={submit}
>
	<div class="flex flex-col gap-y-4">
		<div class="flex flex-col gap-y-1 min-w-[24rem]">
			<Input
				autofocus
				type="text"
				id="name"
				name="name"
				label={text.name.label()}
				placeholder={text.name.placeholder()}
				accent={fieldErrors.name ? 'negative' : undefined}
				caption={fieldErrors.name || undefined}
				aria-required
			/>
		</div>
		<div class="flex flex-col gap-y-1 min-w-[24rem]">
			<Select
				id="camera"
				name="camera"
				label={text.zone.camera.label()}
				accent={fieldErrors.camera ? 'negative' : undefined}
				caption={fieldErrors.camera || undefined}
				aria-required
				bind:value={camera}
			>
				<option value selected disabled>
					{text.zone.camera.placeholder()}
				</option>
				{#each data.areas as area}
					<optgroup label="{text.zone.area()} - {area.name}">
						{#each area.cameras as camera}
							<option value={camera}>{camera.name}</option>
						{/each}
					</optgroup>
				{/each}
			</Select>
		</div>
		<div class="xl:hidden">
			<RowVisibilityAnimate visible={!!camera}>
				{#if camera}
					<video
						use:editor={{ data: editorData, store: editorStore }}
						src={camera.url}
						autoplay
						muted
						loop
						class="rounded-md border border-fill-300"
					>
						<track kind="captions" />
					</video>
				{/if}
			</RowVisibilityAnimate>
		</div>
		<div class="flex gap-x-8 justify-between">
			<p class="text-sm font-medium">
				{text.zone.position()}
				<span class="bg-fill-800 text-fill-200 px-4 py-0.5 rounded"
					>{Math.floor($editorStore.left * 100) / 100} - {Math.floor(
						$editorStore.top * 100
					) / 100}</span
				>
			</p>
			<p class="text-sm font-medium">
				{text.zone.size()}
				<span class="bg-fill-800 text-fill-200 px-4 py-0.5 rounded"
					>{Math.floor($editorStore.width * 100) / 100} - {Math.floor(
						$editorStore.height * 100
					) / 100}</span
				>
			</p>
		</div>
		<PrimaryButton type="submit" class="w-fit">
			<div class="flex gap-x-1 items-center">
				<Pending {pending}>
					<div slot="pending">
						<Spinner class="w-full h-full" />
					</div>
					<Icon name="PlusSmall" class="text-icon-base" />
				</Pending>
				{text.submit()}
			</div>
		</PrimaryButton>
		{#if formResponse}
			{#key formResponse}
				<div
					in:fly={{ y: -4, delay: 200, duration: 100, easing: quadOut }}
					out:fly={{ y: 2, duration: 100, easing: quadIn }}
				>
					{#if instanceOf(formResponse, 'error')}
						<Toast
							icon="ExclamationCircle"
							iconClass="bg-negative-500"
							text="{formResponse.error.code}: {formResponse.error.message}"
							textClass="bg-negative-200"
						/>
					{:else}
						<Toast icon="Check" text={text.success()} />
					{/if}
				</div>
			{/key}
		{/if}
	</div>
	<RowVisibilityAnimate visible={!!camera}>
		{#if camera}
			<video
				use:editor={{ data: editorData, store: editorStore }}
				src={camera.url}
				autoplay
				muted
				loop
				class="hidden xl:block rounded-lg w-full max-w-[82rem] border border-fill-300"
			>
				<track kind="captions" />
			</video>
		{/if}
	</RowVisibilityAnimate>
</form>
