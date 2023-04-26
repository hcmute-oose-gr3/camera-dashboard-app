<script lang="ts">
	import LL from '~/i18n/i18n-svelte';
</script>

<div class="w-96 h-96 bg-yellow-500" />

{$LL.loremIpsum()}

<video autoplay preload="none" class="aspect-video rounded-2xl shadow-lg" loop>
	<source src="http://localhost:5173/api/v1/camera" type="video/mp4" />
	<track kind="captions" />
</video>
