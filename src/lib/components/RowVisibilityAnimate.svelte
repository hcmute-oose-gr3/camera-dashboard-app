<script lang="ts">
	export let visible = false;
</script>

<div
	class="grid ease-in-out duration-300 transform-[grid-template-rows] {!visible
		? 'grid-rows-[0fr]'
		: 'grid-rows-[1fr]'}"
>
	<div class="overflow-hidden">
		<slot />
	</div>
</div>
