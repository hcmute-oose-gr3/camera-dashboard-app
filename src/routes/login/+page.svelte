<script lang="ts">
	import { instanceOf } from '~/lib/utils';
	import LL from '~/i18n/i18n-svelte';
	import Button from '~/lib/components/Button.svelte';
	import Input from '~/lib/components/Input.svelte';
	import type { APIErrorResponse, APIDataResponse, APIResponse } from '~/lib/models/api-response';
	import { fly } from 'svelte/transition';
	import { quadOut, sineInOut } from 'svelte/easing';
	import Spinner from '~/lib/components/Spinner.svelte';
	import { APIRoutes } from '~/lib/utils/api-routes';
	import { onMount } from 'svelte';
	import { string, object, ValidationError, type InferType } from 'yup';

	type FormFields = 'username' | 'password';
	let logging = false;
	let canSubmit = false;
	let fieldErrors: Partial<Record<FormFields, string>> = {};
	let formResponse: APIResponse | undefined;

	onMount(() => {
		canSubmit = true;
	});

	async function submit(this: HTMLFormElement) {
		logging = true;
		formResponse = undefined;

		const data = new FormData(this);
		const schema = object({
			password: string().min(3, $LL.login.password.min({ length: 6 })),
			username: string()
				.trim()
				.min(3, $LL.login.username.min({ length: 3 }))
				.matches(/^[a-zA-Z0-9]+$/, $LL.login.username.regex())
		});

		let result!: InferType<typeof schema>;
		try {
			result = await schema.validate(
				{
					username: data.get('username'),
					password: data.get('password')
				},
				{ abortEarly: true }
			);
		} catch (e) {
			logging = false;
			fieldErrors = {};
			if (e instanceof ValidationError) {
				fieldErrors[e.path as keyof typeof fieldErrors] = e.message;
			}
			return;
		}

		fieldErrors = {};
		data.set('username', result.username!);
		const json = await fetch(this.action, {
			method: 'post',
			body: data
		})
			.then((v) => v.json())
			.finally(() => {
				logging = false;
			});

		formResponse = json;
		if (instanceOf<APIDataResponse>(json, 'data')) {
			canSubmit = false;
		}
	}
</script>

<div transition:fly={{ y: -10, duration: 200, easing: sineInOut }}>
	<h1 class="text-center mx-auto mt-24">
		{$LL.login.header()}
	</h1>
	<div class="mx-auto w-min mt-6">
		<form
			class="flex flex-col gap-y-6 min-w-[400px] bg-fill-100 border-fill-300 border-[1px] rounded-lg p-4 mt-8"
			method="post"
			action={APIRoutes.LOGIN}
			on:submit|preventDefault={submit}
		>
			<div class="flex flex-col gap-y-1">
				<Input
					id="username"
					name="username"
					type="text"
					spellcheck={false}
					placeholder={$LL.login.username.placeholder()}
					class="transition"
					label={$LL.login.username.label()}
					caption={fieldErrors?.username}
					accent={fieldErrors?.username ? 'negative' : undefined}
				/>
			</div>
			<div class="flex flex-col gap-y-1 relative">
				<a href="/reset-password" class="absolute right-0 top-0">
					{$LL.login.forgotPassword()}
				</a>
				<Input
					id="password"
					name="password"
					type="password"
					placeholder={$LL.login.password.placeholder()}
					class="transition"
					label={$LL.login.password.label()}
					caption={fieldErrors?.password}
					accent={fieldErrors?.password ? 'negative' : undefined}
				/>
			</div>
			<Button type="submit" class="w-max" disabled={!canSubmit || logging}>
				<div class="flex gap-x-3 items-center">
					<div class="w-6 h-6 relative overflow-hidden">
						<div
							class="absolute transition duration-200 ease-in-out {!logging
								? 'scale-0 opacity-0'
								: ''}"
						>
							<Spinner class="w-full h-full" />
						</div>
						<p
							class="transition duration-200 material-symbols-rounded text-icon-base ease-in-out {logging
								? 'scale-0 opacity-0'
								: ''}"
						>
							login
						</p>
					</div>
					{$LL.login.login()}
				</div>
			</Button>
		</form>
		<div class="bg-fill-200/20 border-fill-300 border-[1px] rounded-md p-4 mt-4">
			<span>{$LL.login.noAccount()}</span>{' '}
			<a href="/signup">{$LL.login.signUp()}</a>.
		</div>

		{#if formResponse}
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
							{$LL.login.success()}.
						</p>
					</div>
				{/if}
			</div>
		{/if}
	</div>
</div>
