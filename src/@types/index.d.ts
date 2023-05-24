import type { string } from 'zod';
import type { Locales } from '~/i18n/i18n-types';

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			locale: Locales;
			user?: {
				_id: string;
				email: string;
			};
		}
		// interface PageData {}
		// interface Platform {}
	}

	namespace NodeJS {
		interface ProcessEnv {
			MONGO_URI: string;
			NODE_ENV: 'production' | 'development';
			CLOUDINARY_CLOUD_NAME: string;
			CLOUDINARY_API_KEY: string;
			CLOUDINARY_API_SECRET: string;
			EMAIL_SERVER_USER: string;
			EMAIL_SERVER_PASSWORD: string;
			EMAIL_SERVER_HOST: string;
			EMAIL_SERVER_PORT: string;
			EMAIL_FROM: string;
		}
	}
}
