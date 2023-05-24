export function getDaysArray(year: any, selectedMonth: any) {
	console.log(selectedMonth);
	const month = getDaysInMonth(selectedMonth);
	const daysInMonth = new Date(year, month, 0).getDate();
	// console.log(daysInMonth);
	const daysArray = [];

	for (let i = 1; i <= daysInMonth; i++) {
		const currentDate = new Date(year, month - 1, i);
		const formattedDate = currentDate.toLocaleDateString('en-US', {
			month: '2-digit',
			day: '2-digit',
			timeZone: 'GMT',
		});

		daysArray.push(`${formattedDate} GMT`);
	}

	return daysArray;
}

function getDaysInMonth(month: string): number {
	const daysInMonthMap: Record<string, number> = {
		Jan: 1,
		Feb: 2,
		Mar: 3,
		Apr: 4,
		May: 5,
		Jun: 6,
		Jul: 7,
		Aug: 8,
		Sep: 9,
		Oct: 10,
		Nov: 11,
		Dec: 12,
	};

	return daysInMonthMap[month];
}

function getRandomData(count, decimalDigits) {
	const data = [];
	for (let i = 0; i < count; i++) {
		const randomValue = Math.random();
		const roundedValue = Number(randomValue.toFixed(decimalDigits));
		data.push(roundedValue);
	}
	return data;
}
