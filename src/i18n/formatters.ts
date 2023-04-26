import type { FormattersInitializer } from 'typesafe-i18n';
import type { Locales, Formatters } from './i18n-types';
import { date } from 'typesafe-i18n/formatters';

export const initFormatters: FormattersInitializer<Locales, Formatters> = (locale: Locales) => {
	const formatters: Formatters = {
		shortDate: date(locale, {
			weekday: 'long',
			day: 'numeric',
			month: 'short',
			year: 'numeric'
		})
	};

	return formatters;
};
