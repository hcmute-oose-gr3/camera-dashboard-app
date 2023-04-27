<script lang="ts">
	export let type: string;
	export let src: string;

	$: console.log();
</script>

<video {...$$restProps} class="p-0.5 w-full shadow-lg bg-fill-100 rounded-[2rem]">
	<source {type} {src} />
	<track kind="captions" />
</video>
