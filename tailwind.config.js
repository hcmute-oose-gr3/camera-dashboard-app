/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		fontSize: {
			// 16px based
			h1: ['1.8462rem', { fontWeight: 'bold' }],
			h2: ['1.5385rem', { fontWeight: 'bold' }],
			h3: ['1.2307rem', { fontWeight: 'bold' }],
			h4: ['1.0769rem', { fontWeight: 'bold' }],
			h5: ['1rem', { fontWeight: 'bold' }],
			p: ['1rem'],
			button: ['1.0769rem', { fontWeight: 'bold' }],
			a: ['1rem', { fontWeight: 'bold' }]

			// 13px based
			// h1: ['1.5rem', { fontWeight: 'bold' }],
			// h2: ['1.25rem', { fontWeight: 'bold' }],
			// h3: ['1rem', { fontWeight: 'bold' }],
			// h4: ['0.875rem', { fontWeight: 'bold' }],
			// h5: ['0.8125rem', { fontWeight: 'bold' }],
			// p: ['0.8125rem'],
			// button: ['0.875rem', { fontWeight: 'bold' }],
			// a: ['0.8125rem', { fontWeight: 'bold' }],
		},
		fontFamily: {
			body: ["'Poppins'", 'sans-serif']
		},
		extend: {
			colors: {
				primary: {
					100: '#ffffff',
					200: '#ecf0ff',
					300: '#c5d4ff',
					400: '#84aaff',
					500: '#498fff',
					600: '#007af0',
					700: '#0069d0',
					800: '#0051a2',
					900: '#003a79',
					1000: '#002451'
				},
				fill: {
					100: '#ffffff',
					200: '#f0f0f5',
					300: '#d3d4dd',
					400: '#aaaab9',
					500: '#8f8fa2',
					600: '#7a7b8e',
					700: '#696979',
					800: '#515162',
					900: '#3a3a47',
					1000: '#24252E'
				},
				positive: {
					100: '#ffffff',
					200: '#e1f6df',
					300: '#9de695',
					400: '#54c241',
					500: '#40a42b',
					600: '#2e8e16',
					700: '#217b00',
					800: '#166000',
					900: '#0e4700',
					1000: '#052d00'
				},
				negative: {
					100: '#ffffff',
					200: '#feeced',
					300: '#fac8c9',
					400: '#ff888b',
					500: '#f75b60',
					600: '#f02532',
					700: '#d01e29',
					800: '#a4151e',
					900: '#790c14',
					1000: '#510609'
				}
			}
		}
	},
	plugins: []
};