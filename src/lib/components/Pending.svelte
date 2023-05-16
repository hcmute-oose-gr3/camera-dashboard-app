<script lang="ts">
	export let pending: boolean;
</script>

<div class="relative overflow-hidden">
	<div class="absolute transition duration-200 ease-in-out {!pending ? 'scale-0 opacity-0' : ''}">
		<slot name="pending" />
	</div>
	<div
		class="transition duration-200 text-icon-base ease-in-out {pending
			? 'scale-0 opacity-0'
			: ''}"
	>
		<slot />
	</div>
</div>
