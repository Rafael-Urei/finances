import { tv } from 'tailwind-variants';

export const style = tv({
	slots: {
		header:
			'sticky top-0 w-full min-h-10 flex items-center lg:gap-8 lg:justify-start justify-between lg:px-32 px-2 py-4',
		logo: 'text-2xl font-semibold',
		nav: 'flex items-center gap-4 flex-1',
		navItem: 'text-sm font-medium text-zinc-400 hover:text-blue-600'
	},
	variants: {
		path: {
			true: {
				navItem: 'text-blue-600'
			}
		}
	}
});
