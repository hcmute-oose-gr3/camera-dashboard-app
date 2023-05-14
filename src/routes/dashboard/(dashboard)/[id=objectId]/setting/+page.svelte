<script lang="ts">
	import Icon from '~/lib/components/Icon.svelte';
	import { loadLocaleAsync } from '~/i18n/i18n-util.async';
	import LL, { setLocale } from '~/i18n/i18n-svelte';
	import { browser } from '$app/environment';
	import { isLocale } from '~/i18n/i18n-util';
	import type { Locales } from '~/i18n/i18n-types';
	import { getContext } from 'svelte';
	import type { WritablePageMeta } from '../..';
	let check = false;
	let options = ['en', 'vi'];
	const setTheme = () => {
		const a = document.getElementById('html');
		if (a?.getAttribute('data-theme') === 'light') {
			a?.setAttribute('data-theme', 'dark');
			check = true;
		} else {
			a?.setAttribute('data-theme', 'light');
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
	const meta = getContext('meta') as WritablePageMeta;

	$: $meta.title = $LL.dashboard.setting.meta.title();
</script>

<!-- svelte-ignore missing-declaration -->
<div class="space-y-6 px-6 mt-12">
	<div class="">
		<h2>{$LL.dashboard.setting.theme.title()}</h2>
		<div class="flex space-x-6 mt-4 lg:ml-12">
			<p>{$LL.dashboard.setting.theme.color()}</p>
			<button on:click={setTheme} class="boder-[1px]">
				{#if check === false}
					<Icon name="Moon" />
				{:else}
					<Icon name="Sun" />
				{/if}
			</button>
		</div>
	</div>
	<div class="">
		<h2>{$LL.dashboard.setting.language.title()}</h2>
		<div class="flex space-x-6 mt-4 lg:ml-12 items-center">
			<p>{$LL.dashboard.setting.language.language()}</p>
			<select
				class="form-select rounded-2xl text-fill-1000 bg-fill-100"
				id="language"
				on:change={(e) => setLang(e)}
			>
				{#each options as value}<option class="">{value}</option>{/each}
			</select>
		</div>
	</div>
</div>
