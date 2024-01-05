import type { Config } from 'tailwindcss';
import withMT from '@material-tailwind/react/utils/withMT';

const config = {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		fontFamily: {
			roboto: ['Roboto', 'sans-serif'],
		},
		extend: {
			colors: {
				'ucla-blue': '#596787',
				gunmetal: '#292F3F',
				charcoal: '#373E4E',
				'charleston-green': '#272A35',
			},
		},
	},
	plugins: [],
} satisfies Config;

export default withMT(config);
