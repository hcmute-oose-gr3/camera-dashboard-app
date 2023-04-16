import { detectLocale, isLocale } from '~/i18n/i18n-util';
import type { Handle, RequestEvent } from '@sveltejs/kit';
import { initAcceptLanguageHeaderDetector } from 'typesafe-i18n/detectors';
import type { Locales } from './i18n/i18n-types';
import { DbClient } from './lib/server/services/db-client';
import './app';

export const handle: Handle = async ({ event, resolve }) => {
	const lang = event.url.searchParams.get('lang') ?? '';
	const locale = isLocale(lang) ? (lang as Locales) : getPreferredLocale(event);

	const sessionToken = event.cookies.get('session_token');
	if (sessionToken) {
		const user = await DbClient.instance.collections.users.findOne(
			{ sessionToken },
			{ limit: 1, projection: { _id: 1 } }
		);
		event.locals.userId = user?._id.toHexString();
	}

	event.locals.locale = locale;
	return resolve(event, { transformPageChunk: ({ html }) => html.replace('%lang%', locale) });
};

const getPreferredLocale = ({ request }: RequestEvent) => {
	const acceptLanguageDetector = initAcceptLanguageHeaderDetector(request);

	return detectLocale(acceptLanguageDetector);
};
