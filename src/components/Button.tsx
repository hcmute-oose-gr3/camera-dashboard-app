import { JSX, ParentComponent, splitProps } from 'solid-js';

const Button: ParentComponent<JSX.ButtonHTMLAttributes<HTMLButtonElement>> = (
	props
) => {
	const [, rest] = splitProps(props, ['children', 'class']);
	return (
		<button
			{...rest}
			class={`px-2 py-2 rounded-md text-fill-100 bg-primary-700 border-primary-600 border-[1px] disabled:bg-primary-300 disabled:border-primary-400/30 ${props.class}`}
		>
			{props.children}
		</button>
	);
};

export default Button;
