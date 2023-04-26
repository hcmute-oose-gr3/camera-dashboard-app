export interface NavigationEntryData {
	text: string;
	href: string;
	symbol: string;
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
