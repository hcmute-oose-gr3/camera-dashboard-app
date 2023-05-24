<script lang="ts">
	import { onMount } from 'svelte';
	import { data, series } from './data';
	import { afterUpdate } from 'svelte';
	import { getDaysArray } from './getMonthly';
	let div: HTMLDivElement;
	let div2: HTMLDivElement;
	export let selectedOption: any;
	let chartData: number[] = [];
	let chart: any;
	let chart2: any;
	$: console.log(selectedOption);
	const seriesData: Array<[string, number]> = [];

	for (let i = 1; i <= 30; i++) {
		const day = i.toString();
		const value = Math.random() * 10;

		seriesData.push([day, value]);
	}
	onMount(async () => {
		const ApexCharts = await import('apexcharts').then((r) => r.default);
		chart = new ApexCharts(div, {
			series: [
				{
					data: chartData,
				},
			],
			chart: {
				height: 500,
				type: 'bar',
				events: {
					dataPointSelection: function (event: any, chartContext: any, config: any) {
						const monthIndex = config.dataPointIndex;
						const selectedMonth = chartContext.w.config.xaxis.categories[monthIndex];

						const daysArray = getDaysArray(2023, selectedMonth);
						console.log(daysArray);
						function getRandomData(min: any, max: any, length: any) {
							const data = [];

							for (let i = 0; i < length; i++) {
								const randomValue =
									Math.floor(Math.random() * (max - min + 1)) + min;
								data.push(randomValue);
							}

							return data;
						}

						// Usage example:
						const updatedSeries = series.map((item: any) => ({
							name: item.name,
							data: getRandomData(1, 100, item.data.length),
						}));
						chart2 = new ApexCharts(div2, {
							series: updatedSeries,
							// series: [
							// 	{
							// 		name: 'PRODUCT A',
							// 		data: [
							// 			44, 55, 41, 67, 22, 43, 2, 1, 3, 31, 23, 12, 12, 0, 2, 0, 0,
							// 			0, 21, 0, 12, 2,
							// 		],
							// 	},
							// ],
							chart: {
								type: 'bar',
								height: 350,
								stacked: true,
								toolbar: {
									show: true,
								},
								zoom: {
									enabled: true,
								},
							},
							responsive: [
								{
									breakpoint: 480,
									options: {
										legend: {
											position: 'bottom',
											offsetX: -10,
											offsetY: 0,
										},
									},
								},
							],
							plotOptions: {
								bar: {
									horizontal: false,
									borderRadius: 10,
									dataLabels: {
										total: {
											enabled: true,
											style: {
												fontSize: '13px',
												fontWeight: 900,
											},
										},
									},
								},
							},
							xaxis: {
								type: 'datetime',
								categories: daysArray,
							},
							legend: {
								position: 'right',
								offsetY: 40,
							},
							fill: {
								opacity: 1,
							},
						});
						chart2.render();
					},
				},
			},
			plotOptions: {
				bar: {
					borderRadius: 10,
					dataLabels: {
						position: 'top',
					},
				},
			},
			dataLabels: {
				enabled: true,
				offsetY: -20,
				style: {
					fontSize: '12px',
					colors: ['#304758'],
				},
			},

			xaxis: {
				categories: [
					'Jan',
					'Feb',
					'Mar',
					'Apr',
					'May',
					'Jun',
					'Jul',
					'Aug',
					'Sep',
					'Oct',
					'Nov',
					'Dec',
				],
				position: 'top',
				axisBorder: {
					show: false,
				},
				axisTicks: {
					show: false,
				},
				crosshairs: {
					fill: {
						type: 'gradient',
						gradient: {
							colorFrom: '#D8E3F0',
							colorTo: '#BED1E6',
							stops: [0, 100],
							opacityFrom: 0.4,
							opacityTo: 0.5,
						},
					},
				},
				tooltip: {
					enabled: true,
				},
			},
			yaxis: {
				axisBorder: {
					show: false,
				},
				axisTicks: {
					show: false,
				},
			},
			title: {
				text: 'Chart Warning',
				floating: true,
				offsetY: 510,
				align: 'center',
				style: {
					color: '#444',
				},
			},
		});
		chart.render();
	});
	afterUpdate(() => {
		chartData = data[selectedOption as keyof typeof data];
		if (chart) {
			chart.updateSeries([
				{
					data: chartData,
				},
			]);
		}
	});
</script>

<div bind:this={div} />
<div bind:this={div2} />
