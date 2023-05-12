<script lang="ts">
	export let visible = false;
</script>

<div
	class="grid ease-in-out duration-300 transform-[grid-template-cols] {visible
		? 'grid-cols-[0fr]'
		: 'grid-cols-[1fr]'}"
>
	<div class="overflow-hidden">
		<slot />
	</div>
</div>
