<script lang="ts">
	import Icon from '~/lib/components/Icon.svelte';
	import { loadLocaleAsync } from '~/i18n/i18n-util.async';
	import LL, { setLocale } from '~/i18n/i18n-svelte';
	import { browser } from '$app/environment';
	import Dialog from './components/Dialog.svelte';
	import type { PageData } from './$types';
	import SecondaryButton from '~/lib/components/SecondaryButton.svelte';
	import { meta } from '~/routes';
	import { onMount } from 'svelte';
	let check = false;
	let showModal = false;
	export let data: PageData;

	onMount(() => {
		check = document.getElementById('html')!.getAttribute('data-theme') !== 'light';
	});

	const setTheme = () => {
		const a = document.getElementById('html');
		if (a?.getAttribute('data-theme') === 'light') {
			a?.setAttribute('data-theme', 'dark');
			check = true;
			localStorage.setItem('theme', 'dark');
		} else {
			a?.setAttribute('data-theme', 'light');
			localStorage.setItem('theme', 'light');
			check = false;
		}
	};
	const setLang = async (e: any) => {
		const value: any = e.target.value;
		if (browser) {
			localStorage.setItem('lang', value);
			document.getElementById('html')?.setAttribute('lang', value);
		}
		await loadLocaleAsync(value);
		setLocale(value);
	};

	$: ({ settings: text } = $LL.dashboard);
	$: $meta.title = text.meta.title();
</script>

<Dialog bind:showModal {data} />
<div class="flex flex-col gap-y-6">
	<div class="flex flex-col gap-y-2">
		<h2>{text.theme.title()}</h2>
		<div class="flex gap-x-6 items-center">
			<p class="font-medium">{text.theme.color()}</p>
			<button on:click={setTheme} class="">
				{#if check === false}
					<Icon name="Moon" class="w-6 h-6" />
				{:else}
					<Icon name="Sun" class="w-6 h-6" />
				{/if}
			</button>
		</div>
	</div>
	<div class="flex flex-col gap-y-2">
		<h2>{text.language.title()}</h2>
		<div class="space-y-1">
			<label for="language" class="block">{text.language.language()}</label>
			<select
				class="form-select py-1.5 px-3 rounded-lg text-fill-1000 bg-fill-100 w-max min-w-[10rem]"
				id="language"
				on:change={(e) => setLang(e)}
			>
				<option value="en" selected={data.locale === 'en'}
					>{text.language.options.en()}</option
				>
				<option value="vi" selected={data.locale === 'vi'}
					>{text.language.options.vi()}</option
				>
			</select>
		</div>
	</div>
	<div class="space-y-2">
		<h2>{text.delete.title()}</h2>
		<div class="flex border border-negative-500/50 p-4 flex-col gap-y-4 rounded-xl w-fit">
			<div class="items-center flex space-x-12">
				<div class="">
					<h3>{text.delete.message()}</h3>
					<p>{text.delete.warning()}</p>
				</div>
				<div class="mt-2">
					<SecondaryButton class="text-negative-700" on:click={() => (showModal = true)}>
						{text.delete.button.message()}
					</SecondaryButton>
				</div>
			</div>
		</div>
	</div>
</div>
