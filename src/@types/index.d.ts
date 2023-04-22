import type { Locales } from '~/i18n/i18n-types';

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			locale: Locales;
			user?: {
				_id: string;
			};
		}
		// interface PageData {}
		// interface Platform {}
	}

	namespace NodeJS {
		interface ProcessEnv {
			MONGO_URI: string;
			NODE_ENV: 'production' | 'development';
		}
	}
}
