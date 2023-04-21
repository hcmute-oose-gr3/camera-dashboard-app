<script lang="ts">
	export let href: string;
</script>

<a
	{href}
	{...$$restProps}
	class="text-primary-600 text-a
	visited:text-fill-700
	hover:underline hover:underline-offset-2
	focus:underline-offset-2 focus:outline-none focus:rounded
	focus:ring focus:ring-offset-1 focus:ring-primary-500
	active:underline-offset-1 active:ring-transparent active:ring-offset-transparent {$$restProps.class}"
>
	<slot />
</a>
