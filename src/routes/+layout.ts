import type { LayoutLoad } from './$types';
import { loadLocaleAsync } from '~/i18n/i18n-util.async';
import { setLocale } from '~/i18n/i18n-svelte';
import { browser } from '$app/environment';
import { isLocale } from '~/i18n/i18n-util';
import type { Locales } from '~/i18n/i18n-types';

export const load: LayoutLoad = async ({ data, url }) => {
	console.log('layout 1');
	let language: Locales | null = data.locale;
	if (browser) {
		language = url.searchParams.get('lang') as Locales | null;
		if (!language || !isLocale(language)) {
			language = localStorage.getItem('lang') as Locales | null;
			if (!language || !isLocale(language)) {
				language = data.locale;
			}
		}
		if (language !== localStorage.getItem('lang')) {
			localStorage.setItem('lang', language);
		}
		data.locale = language;
		document.getElementById('html')?.setAttribute('lang', language);
	}
	await loadLocaleAsync(language);
	setLocale(language);
	return { ...data, url };
};
