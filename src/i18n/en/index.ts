import type { BaseTranslation } from '../i18n-types';

const en = {
	logo: {
		name: 'Camera Dashboard'
	},
	login: {
		header: 'Sign in to your dashboard',
		email: {
			label: 'Email',
			placeholder: 'Enter your email',
			regex: 'Email is invalid'
		},
		password: {
			label: 'Password',
			placeholder: 'Enter your password',
			empty: 'Password must be not be empty'
		},
		login: 'Sign in',
		forgotPassword: 'Forgot password?',
		noAccount: "Don't have an account?",
		signUp: 'Sign up',
		success: 'You have logged in successfully',
		oops: 'Oops!',
		alreadyLoggedIn: 'It seems like you have already logged in.',
		back: 'Back',
		logout: 'Log out'
	},
	dashboard: {
		card: {
			createdAt: 'Created date: {date:Date|shortDate}',
			updatedAt: 'Last modified date: {date:Date|shortDate}'
		}
	}
} satisfies BaseTranslation;

export default en;
