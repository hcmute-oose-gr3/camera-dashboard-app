<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { backIn, backOut, quadIn, quadOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';
	import { z } from 'zod';
	import LL from '~/i18n/i18n-svelte';
	import FileInput from '~/lib/components/FileInput.svelte';
	import Icon from '~/lib/components/Icon.svelte';
	import Input from '~/lib/components/Input.svelte';
	import Pending from '~/lib/components/Pending.svelte';
	import PrimaryButton from '~/lib/components/PrimaryButton.svelte';
	import Spinner from '~/lib/components/Spinner.svelte';
	import Toast from '~/lib/components/Toast.svelte';
	import type { ApiErrorResponse, ApiResponse } from '~/lib/models/api-response';
	import { instanceOf } from '~/lib/utils';
	import type { PageData } from './$types';

	type Fields = 'name' | 'image';

	$: ({ edit: text } = $LL.dashboard.profiles);

	export let data: PageData;

	let pending = true;
	let fieldErrors: { [key in Fields]?: string } = {};
	let inputElements: { [key in Fields]?: HTMLInputElement } = {};
	let formResponse: ApiResponse;
	let files: FileList;
	let imageBase64: string = data.profile.imageUrl;
	$: {
		if (files) {
			const file = files.item(0);
			if (file) {
				const fileReader = new FileReader();
				fileReader.readAsDataURL(file);
				fileReader.addEventListener('load', function (this: FileReader) {
					imageBase64 = this.result;
				});
			}
		}
	}

	async function submit(this: HTMLFormElement) {
		const formData = new FormData(this);

		const schema = z.object({
			name: z.string().min(1, text.name.nonempty()),
		});

		const parse = await schema.safeParseAsync({
			name: formData.get('name'),
		});

		fieldErrors = {};
		if (!parse.success) {
			parse.error.issues.forEach((iss) => {
				fieldErrors[iss.path[0] as Fields] = iss.message;
			});
			for (const issue of parse.error.issues) {
				if (issue.path[0] === 'alertLevel') {
					continue;
				}
				inputElements[issue.path[0] as Exclude<Fields, 'alertLevel'>]?.focus();
				break;
			}
			return;
		}

		pending = true;
		formResponse = await fetch(this.action, { method: 'put', body: formData })
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
</script>

<form
	action="/api/v1/dashboard/{$page.params.id}/profiles/{$page.params.profileId}"
	class="flex flex-col gap-y-4 w-max"
	on:submit|preventDefault={submit}
>
	<div class="flex flex-col gap-y-1 w-full min-w-[24rem]">
		<Input
			autofocus
			type="text"
			id="id"
			name="id"
			disabled
			value={data.profile._id}
			label={text.id.label()}
			aria-required
		/>
	</div>
	<div class="flex flex-col gap-y-1 w-full min-w-[24rem]">
		<Input
			type="text"
			id="name"
			name="name"
			bind:value={data.profile.name}
			label={text.name.label()}
			placeholder={text.name.placeholder()}
			accent={fieldErrors.name ? 'negative' : undefined}
			caption={fieldErrors.name || undefined}
			aria-required
		/>
	</div>
	<div class="flex flex-col gap-y-1 w-full min-w-[24rem]">
		<FileInput
			id="image"
			name="image"
			accept="image/*"
			label={text.image.label()}
			accent={fieldErrors.image ? 'negative' : undefined}
			caption={fieldErrors.image || undefined}
			aria-required
			bind:files
		/>
	</div>
	<PrimaryButton type="submit" class="w-max">
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
	{#key imageBase64}
		<div
			class="flex"
			in:fly|local={{ y: 8, delay: 100, duration: 400, easing: backOut }}
			out:fly|local={{ y: -4, duration: 100, easing: backIn }}
		>
			<img
				src={imageBase64}
				alt="Profile preview"
				class="max-h-[29rem] object-fill rounded-md border-fill-300 border"
			/>
		</div>
	{/key}
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
</form>
