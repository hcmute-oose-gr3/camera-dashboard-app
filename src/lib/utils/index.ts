export const instanceOf = <T>(object: any, property: keyof T): object is T => {
	return property in object;
};

export const isValidTimeString = (time: string): boolean => {
	const splits = time.split(':');
	if (splits.length !== 2) {
		return false;
	}
	const hour = Number(splits[0]);
	if (isNaN(hour) || hour < 0 || hour > 23) {
		return false;
	}
	const minute = Number(splits[1]);
	if (isNaN(minute) || minute < 0 || minute > 59) {
		return false;
	}
	return true;
};

export const clamped = (value: number, low: number, high: number) => {
	return value < low ? low : value > high ? high : value;
};
