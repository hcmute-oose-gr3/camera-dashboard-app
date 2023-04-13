export const instanceOf = <T>(object: any, property: keyof T): object is T => {
	return property in object;
};
