export default {
	login: {
		header: 'Sign in to camera dashboard',
		username: {
			label: 'Username',
			placeholder: 'Enter your username',
			min: ({ length }: { length: number }) =>
				`Username must be at least ${length} characters long`,
			regex: 'Username can only contain letters and numbers',
		},
		password: {
			label: 'Password',
			placeholder: 'Enter your password',
			min: ({ length }: { length: number }) =>
				`Password must be at least ${length} characters long`,
		},
		login: 'Sign in',
		forgotPassword: 'Forgot password?',
		noAccount: "Don't have an account?",
		signUp: 'Sign up',
	},
};
