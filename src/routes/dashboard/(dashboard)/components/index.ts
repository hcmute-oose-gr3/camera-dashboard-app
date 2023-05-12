import type { IconName } from 'svelted-heroicons';

export interface NavigationEntryData {
	text: string;
	href: string;
	icon: IconName;
	children?: NavigationEntryData[];
}

export interface TopRightData {
	email: string;
	imageUrl: string;
}

export const motionTransition = {
	type: 'spring',
	stiffness: 93,
	damping: 14
};
