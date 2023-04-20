<script lang="ts">
	import { instanceOf } from '~/lib/utils';
	import LL from '~/i18n/i18n-svelte';
	import Button from '~/lib/components/PrimaryButton.svelte';
	import Input from '~/lib/components/Input.svelte';
	import type { ApiDataResponse, ApiResponse } from '~/lib/models/api-response';
	import { fly } from 'svelte/transition';
	import { quadOut } from 'svelte/easing';
	import Spinner from '~/lib/components/Spinner.svelte';
	import { ApiRoutes } from '~/lib/utils/api-routes';
	import { onMount } from 'svelte';
	import { z } from 'zod';
	import { goto } from '$app/navigation';
	import type { PageData } from './$types';
	import SecondaryButton from '~/lib/components/SecondaryButton.svelte';
	import LogoType from '~/lib/components/LogoType.svelte';

	type FormFields = 'email' | 'password';

	export let data: PageData;
	let logging = false;
	let canSubmit = false;
	let fieldErrors: Partial<Record<FormFields, string>> = {};
	let formResponse: ApiResponse | undefined;
	const inputElements: Record<FormFields, HTMLInputElement> = {} as any;

	onMount(() => {
		canSubmit = true;
	});

	async function submit(this: HTMLFormElement) {
		logging = true;
		formResponse = undefined;

		const data = new FormData(this);
		const schema = z.object({
			email: z.string().trim().email($LL.login.email.regex()),
			password: z.string().min(6, $LL.login.password.min({ length: 6 }))
		});

		const result = await schema.safeParseAsync({
			email: data.get('email'),
			password: data.get('password')
		});
		if (!result.success) {
			fieldErrors = {};
			result.error.issues.forEach((iss) => {
				fieldErrors[iss.path[0] as FormFields] = iss.message;
			});
			inputElements[result.error.issues[0].path[0] as FormFields].focus();
			logging = false;
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
				logging = false;
			});

		formResponse = json;
		if (instanceOf<ApiDataResponse>(json, 'data')) {
			canSubmit = false;
			goto('/');
		}
	}
</script>

{#if data.user}
	<section class="mx-auto w-fit mt-48 text-center">
		<h1 class="uppercase text-h1 text-8xl text-primary-700">{$LL.login.oops()}</h1>
		<h3 class="mt-4">{$LL.login.alreadyLoggedIn()}</h3>
		<div class="mt-4">
			<a href="/">
				<Button type="button">{$LL.login.back()}</Button>
			</a>
			<a href="/logout" class="ml-4">
				<SecondaryButton type="button">{$LL.login.logout()}</SecondaryButton>
			</a>
		</div>
	</section>
{:else}
	<div class="w-max mx-auto">
		<LogoType class="mt-16" />
		<h3 class="text-center mt-6 text-fill-600">{$LL.login.header()}</h3>
		<div class="mx-auto w-min mt-4">
			<form
				class="text-left flex flex-col gap-y-6 min-w-[400px] bg-fill-100 border-fill-300 border-[1px] rounded-lg p-4"
				method="post"
				action={ApiRoutes.LOGIN}
				on:submit|preventDefault={submit}
			>
				<div class="flex flex-col gap-y-1">
					<Input
						bind:input={inputElements.email}
						id="email"
						name="email"
						type="email"
						spellcheck={false}
						novalidate
						placeholder={$LL.login.email.placeholder()}
						class="transition"
						label={$LL.login.email.label()}
						caption={fieldErrors?.email}
						accent={fieldErrors?.email ? 'negative' : undefined}
					/>
				</div>
				<div class="flex flex-col gap-y-1 relative">
					<a href="/reset-password" class="absolute right-0 top-0">
						{$LL.login.forgotPassword()}
					</a>
					<Input
						bind:input={inputElements.password}
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
{/if}
