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
			logout: 'Sign out'
		},
		card: {
			createdAt: 'Created date: {date:Date|shortDate}',
			updatedAt: 'Last modified date: {date:Date|shortDate}'
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
	},
	camera: {
		addCamera: 'Add camera',
		table: {
			serial: {
				header: 'Serial'
			},
			homeId: {
				header: 'Home ID'
			},
			connection: {
				header: 'Connection',
				disconnected: 'Disconnected',
				connected: 'Connected'
			},
			securityLevel: {
				header: 'Security Level',
				low: 'Low',
				medium: 'Medium',
				high: 'High'
			},
			actions: {
				header: 'Actions'
			}
		},
		addForm: {
			name: {
				label: 'Camera name',
				placeholder: 'Enter camera name',
				nonempty: 'Camera name must not be empty'
			},
			url: {
				label: 'URL',
				placeholder: 'Enter camera stream URL',
				url: 'URL is not valid'
			},
			securityLevel: {
				legend: 'Choose a security level:',
				low: {
					label: 'Low'
				},
				medium: {
					label: 'Medium'
				},
				high: {
					label: 'High'
				},
				required: 'Please choose exactly one of security levels.'
			},
			submit: 'Add camera'
		}
	}
} satisfies BaseTranslation;

export default en;
