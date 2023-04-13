<button
	on:click
	{...$$restProps}
	class={`group px-4 py-1 rounded-md text-fill-100 bg-primary-700 transition ease-in
	disabled:bg-fill-600
	hover:bg-primary-800
	active:scale-[0.99] active:rotate-1 active:bg-primary-700 active:ring-0 active:ring-offset-0
	${$$restProps.class}`}
>
	<slot />
</button>
