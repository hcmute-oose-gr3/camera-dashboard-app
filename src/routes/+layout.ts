import type { LayoutLoad } from './$types';
import { loadLocaleAsync } from '~/i18n/i18n-util.async';
import { setLocale } from '~/i18n/i18n-svelte';
import { browser } from '$app/environment';
import { isLocale } from '~/i18n/i18n-util';
import type { Locales } from '~/i18n/i18n-types';

export const load: LayoutLoad = async ({ data, url }) => {
	if (browser) {
		let storedLanguage = localStorage.getItem('lang') as Locales | null;
		if (!storedLanguage || !isLocale(storedLanguage)) {
			storedLanguage = data.locale;
		}
		let language = (url.searchParams.get('lang') as Locales | null) || storedLanguage;

		data.locale = language;
		await loadLocaleAsync(language);
		if (storedLanguage !== language) {
			localStorage.setItem('lang', language);
		}
		document.getElementsByTagName('html')[0]?.setAttribute('lang', language);
		setLocale(language);
	}
	return { ...data, url };
};
