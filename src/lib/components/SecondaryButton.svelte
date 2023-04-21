<button
	on:click
	{...$$restProps}
	class={`group px-4 py-1 rounded-md text-fill-900 bg-fill-100 border-fill-500 border transition ease-in
	disabled:bg-fill-300
	hover:bg-fill-200
	active:scale-[0.99] active:rotate-1 active:bg-fill-300 active:ring-0 active:ring-offset-0
	focus:outline-none focus:ring focus:ring-offset-1 focus:ring-primary-500
	${$$restProps.class}`}
>
	<slot />
</button>
