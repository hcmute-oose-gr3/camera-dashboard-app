<script lang="ts">
	import type { PageData } from './$types';
	import Video from './components/Video.svelte';

	export let data: PageData;
</script>

<div class="grid grid-cols-3 gap-6 w-full">
	{#each data.cameras as camera, i (i)}
		<a
			href="{data.url.pathname}/camera/{camera._id}"
			class="block hover:scale-[1.03] transition-transform ease-in-out"
		>
			<Video
				src="https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_2mb.mp4"
				type="video/mp4"
				autoplay
				loop
				muted
				oncanplay="this.muted=true"
			/>
		</a>
	{/each}
</div>
