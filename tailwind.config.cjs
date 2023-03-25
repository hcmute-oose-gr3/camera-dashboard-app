/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
	theme: {
		extend: {
			colors: {
				brand: {
					'50': '#f6f7f6',
					'100': '#e1e6e1',
					'200': '#c2cdc3',
					'300': '#9cac9f',
					'400': '#7e9181',
					'500': '#5c7060',
					'600': '#48594b',
					'700': '#3c493f',
					'800': '#333c36',
					'900': '#2d342f',
				}
			}
		}
	},
	plugins: []
};
