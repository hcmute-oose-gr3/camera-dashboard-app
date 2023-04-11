import { detectLocale, i18n, isLocale } from '~/i18n/i18n-util';
import { loadAllLocales } from '~/i18n/i18n-util.sync';
import type { Handle, RequestEvent } from '@sveltejs/kit';
import { initAcceptLanguageHeaderDetector } from 'typesafe-i18n/detectors';
import type { Locales } from './i18n/i18n-types';

loadAllLocales();
const L = i18n();

export const handle: Handle = async ({ event, resolve }) => {
	const lang = event.url.searchParams.get('lang') ?? '';
	const locale = isLocale(lang) ? (lang as Locales) : getPreferredLocale(event);

	event.locals.locale = locale;
	return resolve(event, { transformPageChunk: ({ html }) => html.replace('%lang%', locale) });
};

const getPreferredLocale = ({ request }: RequestEvent) => {
	const acceptLanguageDetector = initAcceptLanguageHeaderDetector(request);

	return detectLocale(acceptLanguageDetector);
};
