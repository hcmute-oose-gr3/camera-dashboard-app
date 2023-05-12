<script lang="ts">
	import { twMerge } from 'tailwind-merge';
</script>

<input
	type="radio"
	{...$$restProps}
	class={twMerge(
		'form-radio w-5 h-5 rounded text-primary-700 focus:ring-primary-500 transition',
		$$restProps.class
	)}
/>
