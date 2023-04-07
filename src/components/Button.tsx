import { JSX, ParentComponent, splitProps } from 'solid-js';

const Button: ParentComponent<JSX.ButtonHTMLAttributes<HTMLButtonElement>> = (
	props
) => {
	const [, rest] = splitProps(props, ['children', 'class']);
	return (
		<button
			{...rest}
			class={`px-2 py-2 rounded-md bg-primary-500 border-primary-600 border-[1px] ${props.class}`}
		>
			{props.children}
		</button>
	);
};

export default Button;
