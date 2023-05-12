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
		logout: 'Log out',
		error: {
			missingCredentials: 'Missing login credentials',
			emailNotFound: 'Email or password is incorrect',
			wrongPassword: 'Email or password is incorrect'
		}
	},
	dashboard: {
		entry: {
			dashboard: 'Dashboard',
			camera: 'Camera',
			logout: 'Sign out',
			contact: 'Contact'
		},
		card: {
			createdAt: 'Created date: {date:Date|shortDate}',
			updatedAt: 'Last modified date: {date:Date|shortDate}'
		},
		contact: {
			title: 'Get in touch',
			subtitle: 'Contact to be informed',
			form: {
				title: 'Contact form',
				name: {
					title: 'Your name',
					placehodler: 'Enter your name'
				},
				mail: {
					title: 'Mail',
					placehodler: 'Enter your email'
				},
				phone: {
					title: 'Your phone',
					placehodler: 'Enter your phone'
				},
				message: {
					title: 'Message',
					placeholder: 'Your name'
				}
			},
			service: {
				title: 'Service',
				feature: {
					camera: 'Camera',
					area: 'Area',
					contact: 'Contact',
					other: 'Other'
				}
			},
			button: {
				title: 'Send message'
			}
		}
	},
	signup: {
		header: 'Sign up for a camera dashboard',
		password: {
			label: 'Password',
			placeholder: 'Enter your password',
			min: 'Password must be at least {length:number} characters long'
		},
		confirmpassword: {
			label: 'Confirm password',
			placeholder: 'Enter your password again',
			equals: 'Password and confirm password do not match'
		},
		email: {
			label: 'Email',
			placeholder: 'Enter your email',
			regex: 'Email is invalid'
		},
		signup: 'Sign up',
		haveAccount: 'Already have an account?',
		login: 'Log in',
		success: 'You have signed in successfully'
	}
} satisfies BaseTranslation;

export default en;
