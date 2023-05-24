import { clamped } from '~/lib/utils';

function makeDot() {
	const dot = document.createElement('div');
	dot.className = 'absolute w-[8px] h-[8px] bg-yellow-500/50 pointer-events-none rounded-full';
	return dot;
}

function makeRect() {
	const rect = document.createElement('div');
	rect.className =
		'absolute bg-yellow-500/50 border-2 border-dashed border-yellow-500 pointer-events-none';
	return rect;
}

export function editor(node: HTMLVideoElement, prop: { data: any; store: any }) {
	const dot = makeDot();
	const rect = makeRect();
	document.body.appendChild(dot);
	document.body.appendChild(rect);
	let dragging = false;

	const move = (e: PointerEvent) => {
		const bound = node.getBoundingClientRect();

		if (
			e.clientX >= bound.left &&
			e.clientX <= bound.right &&
			e.clientY >= bound.top &&
			e.clientY <= bound.bottom
		) {
			dot.style.display = 'block';
			dot.style.left = e.clientX - 4 + 'px';
			dot.style.top = e.clientY - 4 + 'px';
		} else {
			dot.style.display = 'none';
		}

		if (!dragging) {
			return;
		}

		const x = clamped(e.clientX, bound.left, bound.right);
		const y = clamped(e.clientY, bound.top, bound.bottom);

		if (x < prop.data.left) {
			prop.data.left = x;
			rect.style.left = prop.data.left + 'px';
		}
		if (y < prop.data.top) {
			prop.data.top = y;
			rect.style.top = prop.data.top + 'px';
		}
		prop.data.width = x - prop.data.left;
		prop.data.height = y - prop.data.top;
		rect.style.width = x - prop.data.left + 'px';
		rect.style.height = y - prop.data.top + 'px';
		prop.data.widthRatio = node.clientWidth / prop.data.width;
		prop.data.heightRatio = node.clientHeight / prop.data.height;
		prop.store.set({
			top: (prop.data.top - node.offsetTop) / prop.data.clientHeight,
			left: (prop.data.left - node.offsetLeft) / prop.data.clientWidth,
			width: 1 / prop.data.widthRatio,
			height: 1 / prop.data.heightRatio,
		});
	};

	const down = (e: PointerEvent) => {
		dragging = true;
		prop.data.topRatio = e.clientY / node.offsetTop;
		prop.data.leftRatio = e.clientX / node.offsetLeft;
		prop.data.top = e.clientY;
		prop.data.left = e.clientX;
		prop.data.clientWidth = node.clientWidth;
		prop.data.clientHeight = node.clientHeight;

		rect.style.top = prop.data.top + 'px';
		rect.style.left = prop.data.left + 'px';
		rect.style.width = '0px';
		rect.style.height = '0px';
		prop.store.set({
			top: (prop.data.top - node.offsetTop) / prop.data.clientHeight,
			left: (prop.data.left - node.offsetLeft) / prop.data.clientWidth,
			width: 0,
			height: 0,
		});
	};

	const observer = new ResizeObserver(() => {
		const widthRatio = node.clientWidth / prop.data.clientWidth;
		const heightRatio = node.clientHeight / prop.data.clientHeight;

		const top = node.offsetTop * prop.data.topRatio;
		const left = node.offsetLeft * prop.data.leftRatio;
		rect.style.top = top - (top - node.offsetTop) * (1 - heightRatio) + 'px';
		rect.style.left = left - (left - node.offsetLeft) * (1 - widthRatio) + 'px';
		rect.style.width = prop.data.width * widthRatio + 'px';
		rect.style.height = prop.data.height * heightRatio + 'px';
	});
	observer.observe(node);

	const up = (e: PointerEvent) => {
		dragging = false;
	};

	document.addEventListener('pointermove', move);
	node.addEventListener('pointerdown', down);
	document.addEventListener('pointerup', up);

	return {
		destroy() {
			observer.disconnect();
			document.removeEventListener('pointermove', move);
			node.removeEventListener('pointerdown', down);
			document.removeEventListener('pointerup', up);
			document.body.removeChild(dot);
			document.body.removeChild(rect);
		},
	};
}
