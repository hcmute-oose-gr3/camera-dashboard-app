import { createChainedI18nContext } from '@solid-primitives/i18n';
import { ParentComponent } from 'solid-js';
import en from '~/i18n/en';

const dictionaries = { en };

const [I18nProvider, __useI18nContext] = createChainedI18nContext({
	dictionaries,
	locale: 'en',
});

export default I18nProvider;

export const useI18nContext = () => {
	const ctx = __useI18nContext();
	if (!ctx) {
		throw new Error('useI18nContext must be used within an I18nProvider');
	}
	return ctx;
};
