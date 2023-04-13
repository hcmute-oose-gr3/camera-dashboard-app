import type { BaseTranslation } from '../i18n-types';

const en = {
	login: {
		header: 'Sign in to camera dashboard',
		username: {
			label: 'Username',
			placeholder: 'Enter your username',
			min: 'Username must be at least {length:number} characters long',
			regex: 'Username can only contain letters and numbers'
		},
		password: {
			label: 'Password',
			placeholder: 'Enter your password',
			min: 'Password must be at least {length:number} characters long'
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
	}
} satisfies BaseTranslation;

export default en;
