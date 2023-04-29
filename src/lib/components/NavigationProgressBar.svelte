<script lang="ts">
	import { navigating } from '$app/stores';
	import { sineIn, sineOut } from 'svelte/easing';
	import { tweened } from 'svelte/motion';

	const progress = tweened(0);
	let width: number;
	let hidden = false;
	let hiddenTimeout = 0;

	$: {
		if ($navigating) {
			progress.set(0, { duration: 0 }).finally(() => {
				if ($navigating) {
					progress.set(0.7, { duration: 6000, easing: sineOut });
				}
			});
		} else {
			progress.set(1, { duration: 200, easing: sineIn });
		}
	}

	$: {
		if (!$navigating) {
			if (hiddenTimeout) {
				clearTimeout(hiddenTimeout);
			}
			hiddenTimeout = setTimeout(() => {
				hidden = true;
			}, 500) as any as number;
		} else {
			hidden = false;
		}
	}
	$: width = $progress * (globalThis?.innerWidth || 0);
</script>

<div class="w-screen absolute transition duration-200 {hidden ? 'opacity-0' : 'opacity-100'}">
	<div class="w-full h-1 bg-primary-400" />
	<div class="fixed inset-0 h-1 bg-primary-700" style="width: {width}px;" />
</div>
