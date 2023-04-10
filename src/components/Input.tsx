import { Component, JSX, Show, splitProps } from 'solid-js';
import styles from './Input.module.css';

interface Props extends JSX.InputHTMLAttributes<HTMLInputElement> {
	label?: JSX.Element;
	caption?: JSX.Element;
	accent?: 'positive' | 'negative';
}

const Input: Component<Props> = (props) => {
	const [_, rest] = splitProps(props, ['label', 'caption']);
	return (
		<>
			<Show when={props.label}>
				<label
					for={props.id}
					classList={
						props.accent
							? { [styles[`label-${props.accent}`]]: true }
							: {}
					}
				>
					{props.label}
				</label>
			</Show>
			<input
				{...rest}
				classList={
					props.accent
						? { [styles[`input-${props.accent}`]]: true }
						: {}
				}
			/>
			<Show when={props.caption}>
				<div
					classList={
						props.accent
							? { [styles[`caption-${props.accent}`]]: true }
							: {}
					}
				>
					{props.caption}
				</div>
			</Show>
		</>
	);
};

export default Input;
