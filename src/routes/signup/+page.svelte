<script lang="ts">
	import { onMount } from 'svelte';
	import { quadOut, sineIn } from 'svelte/easing';
	import LL from '~/i18n/i18n-svelte';
	import Input from '~/lib/components/Input.svelte';
	import PrimaryButton from '~/lib/components/PrimaryButton.svelte';
	import Spinner from '~/lib/components/Spinner.svelte';
	import type { ApiDataResponse, ApiResponse } from '~/lib/models/api-response';
	import { ApiRoutes } from '~/lib/utils/api-routes';
	import { z } from 'zod';
	import { fly } from 'svelte/transition';
	import { instanceOf } from '~/lib/utils';
	import { goto } from '$app/navigation';
	import LogoType from '~/lib/components/LogoType.svelte';

	type FormFields = 'email' | 'password' | 'confirmpassword';

	let signing = false;
	let canSubmit = false;
	let fieldErrors: Partial<Record<FormFields, string>> = {};
	let formResponse: ApiResponse | undefined;
	const inputElements: Record<FormFields, HTMLInputElement> = {} as any;

	onMount(() => {
		canSubmit = true;
	});

	async function submit(this: HTMLFormElement) {
		signing = true;
		formResponse = undefined;

		const data = new FormData(this);
		const schema = z.object({
			password: z.string().min(6, $LL.signup.password.min({ length: 6 })),
			confirmpassword: z.string().min(6, $LL.signup.confirmpassword.equals()),
			email: z.string().email()
		}).refine(data => data.confirmpassword === data.password, {
			path: ['confirmpassword'],
			message: $LL.signup.confirmpassword.equals()
		});
		const result = await schema.safeParseAsync({
			email: data.get('email'),
			password: data.get('password'),
			confirmpassword: data.get('confpassword')
		});
		if (!result.success) {
			fieldErrors = {};
			result.error.issues.forEach((iss) => {
				fieldErrors[iss.path[0] as FormFields] = iss.message;
			});
			inputElements[result.error.issues[0].path[0] as FormFields].focus();
			signing = false;
			return;
		}
		fieldErrors = {};
		data.set('email', result.data.email);
		const json = await fetch(this.action, {
			method: 'post',
			body: data
		})
			.then((v) => v.json())
			.finally(() => {
				signing = false;
			});

		formResponse = json;
		console.log(formResponse);
		if (instanceOf<ApiDataResponse>(json, 'data')) {
			canSubmit = false;
			goto('/login');
		}
	}
</script>

<div class="mx-auto">
	<h1 class="text-center mx-auto">
		<LogoType class="mt-16" />
		<h3 class="text-center mt-6 text-fill-600">{$LL.signup.header()}</h3>
	</h1>
	<div class="mx-auto w-min">
		<form
			class="flex flex-col gap-y-6 min-w-[400px] bg-fill-100 border-fill-300 border-[1px] rounded-lg p-4 mt-8"
			method="post"
			action={ApiRoutes.SIGNUP}
			on:submit|preventDefault={submit}
		>
			<div class="flex flex-col gap-y-1">
				<Input
					bind:input={inputElements.email}
					id="email"
					name="email"
					type="text"
					spellcheck={false}
					placeholder={$LL.signup.email.placeholder()}
					class="transition"
					label={$LL.signup.email.label()}
					caption={fieldErrors?.email}
					accent={fieldErrors?.email ? 'negative' : undefined}
				/>
			</div>
			<div class="flex flex-col gap-y-1">
				<Input
					bind:input={inputElements.password}
					id="password"
					name="password"
					type="password"
					spellcheck={false}
					placeholder={$LL.signup.password.placeholder()}
					class="transition"
					label={$LL.signup.password.label()}
					caption={fieldErrors?.password}
					accent={fieldErrors?.password ? 'negative' : undefined}
				/>
			</div>
			<div class="flex flex-col gap-y-1">
				<Input
					bind:input={inputElements.confirmpassword}
					id="confpassword"
					name="confpassword"
					type="password"
					spellcheck={false}
					placeholder={$LL.signup.confirmpassword.placeholder()}
					class="transition"
					label={$LL.signup.confirmpassword.label()}
					caption={fieldErrors?.confirmpassword}
					accent={fieldErrors?.confirmpassword ? 'negative' : undefined}
				/>
			</div>
			<PrimaryButton type="submit" class="w-max" disabled={!canSubmit || signing}>
				<div class="flex gap-x-3 items-center">
					<div class="w-6 h-6 relative overflow-hidden">
						<div
							class="absolute transition duration-200 ease-in-out {!signing
								? 'scale-0 opacity-0'
								: ''}"
						>
							<Spinner class="w-full h-full" />
						</div>
						<p
							class="transition duration-200 material-symbols-rounded text-icon-base ease-in-out {signing
								? 'scale-0 opacity-0'
								: ''}"
						>
							login
						</p>
					</div>
					{$LL.login.login()}
				</div>
			</PrimaryButton>
		</form>
		<div class="bg-fill-200/20 border-fill-300 border-[1px] rounded-md p-4 mt-4">
			<span>{$LL.signup.haveAccount()}</span>{' '}
			<a href="/login">{$LL.signup.login()}</a>.
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
							{$LL.signup.success()}.
						</p>
					</div>
				{/if}
			</div>
		{/if}
	</div>
</div>
